import request from 'supertest';
import app from '../../../src/infraestructure/web/app';
import { AuthService } from '../../../src/application/AuthApplicationService';
import { UserAdapter } from '../../../src/infraestructure/adapter/UserAdapter';
import {TipoUsuario} from "../../../src/infraestructure/entities/User";


jest.mock('../../../src/infraestructure/adapter/UserAdapter');
jest.mock('../../../src/application/AuthApplicationService');

const mockUser = {
  id_usuario: '123e4567-e89b-12d3-a456-426614174000',
  nombre: 'Kevin',
  apellido: 'Patiño',
  email: 'test@example.com',
  contrasena_hash: 'hashedpassword',
  telefono: '3001234567',
  direccion: 'Calle Falsa 123',
  ciudad: 'Medellín',
  departamento: 'Antioquia',
  tipo_usuario: TipoUsuario.DONANTE,
  fecha_registro: new Date('2024-01-01T00:00:00Z'),
  activo: true,
};

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('debe retornar un token si login es exitoso', async () => {
      jest.spyOn(UserAdapter.prototype, 'getUserByEmail').mockResolvedValue(mockUser);
      jest.spyOn(AuthService, 'comparePasswords').mockResolvedValue(true);
      jest.spyOn(AuthService, 'generateToken').mockReturnValue('fake-jwt-token');

      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('fake-jwt-token');
    });

    it('debe retornar 401 si el usuario no existe', async () => {
      jest.spyOn(UserAdapter.prototype, 'getUserByEmail').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'nouser', password: 'password123' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Usuario no encontrado');
    });

    it('debe retornar 401 si la contraseña es incorrecta', async () => {
      jest.spyOn(UserAdapter.prototype, 'getUserByEmail').mockResolvedValue(mockUser);
      jest.spyOn(AuthService, 'comparePasswords').mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'wrongpass' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Contraseña incorrecta');
    });
  });

  describe('register', () => {
    it('debe registrar un nuevo usuario y retornar 201', async () => {
      const hashedPassword = 'hashedPassword';
      const newUser = "test_id";

      jest.spyOn(AuthService, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(UserAdapter.prototype, 'createUser').mockResolvedValue(newUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          user: { username: 'newuser' },
          password: '123456',
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newUser);
    });
  });
});

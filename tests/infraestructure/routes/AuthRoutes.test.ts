import request from 'supertest';
import app from '../../../src/infraestructure/web/app';
import { AuthController } from '../../../src/infraestructure/controller/AuthController';


jest.mock('../../../src/infraestructure/controller/AuthController');

describe('AuthRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar 400 con mensaje personalizado si login lanza error', async () => {
    (AuthController.login as jest.Mock).mockImplementation(() => {
      throw new Error('Fallo interno en login');
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Authentication failed');
    expect(response.body.error).toBe('Fallo interno en login');
  });

  it('debe retornar 400 con mensaje personalizado si register lanza error', async () => {
    (AuthController.register as jest.Mock).mockImplementation(() => {
      throw new Error('Fallo interno en registro');
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({ user: { username: 'newuser' }, password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error creating user');
    expect(response.body.error).toBe('Fallo interno en registro');
  });
});

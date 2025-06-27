import { Request, Response } from 'express';
import { AuthService } from '../../application/AuthApplicationService';
import {UserAdapter} from "../adapter/UserAdapter";


export class AuthController {
  private static userAdapter: UserAdapter = new UserAdapter();

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await this.userAdapter.getUserByEmail(username);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isMatch = await AuthService.comparePasswords(password, user.contrasena_hash);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = AuthService.generateToken(user);
    res.json({ token, "userId": user.id_usuario });
  }

  static async register(req: Request, res: Response) {
    const { user, password } = req.body;

    const hashed = await AuthService.hashPassword(password);
    const newUser = await this.userAdapter.createUser(user, hashed);

    res.status(201).json(newUser);
  }
}

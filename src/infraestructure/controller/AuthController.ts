import { Request, Response } from 'express';
import { AuthService } from '../../application/AuthApplicationService';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    // const user = await UserRepository.findByUsername(username);
    // if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    // const isMatch = await AuthService.comparePasswords(password, user.password);
    // if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // const token = AuthService.generateToken(user);
    const token = AuthService.generateToken();
    res.json({ token });
  }

  // static async register(req: Request, res: Response) {
  //   const { username, password } = req.body;
  //
  //   const hashed = await AuthService.hashPassword(password);
  //   // const newUser = await UserRepository.create({ username, password: hashed });
  //
  //   res.status(201).json(newUser);
  // }
}

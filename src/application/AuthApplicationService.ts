import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../infraestructure/entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export class AuthService {
  static generateToken(user: User): string {
    return jwt.sign({ id: user.id_usuario, username: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}

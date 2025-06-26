import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../application/AuthApplicationService';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = AuthService.verifyToken(token);
    console.log(user);
    (req as any).user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
console.log("authenticateToken JWT_SECRET:", JWT_SECRET);

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log("Token verified. User payload:", user);
    (req as any).user = user;
    next();
  } catch (err: any) {
    console.error("Token verification failed:", err.message);
    return res.sendStatus(403);
  }
}

import { Role } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  role: Role;
}

export interface AuthRequest extends Express.Request {
  user?: JwtPayload;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Access denied' });

      return;
    }

    next();
  };
};

export const requireAdminOrSelf = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const targetId = req.params.id;
  const isAdmin = req.user?.role === 'ADMIN';
  const isSelf = req.user?.userId === targetId;

  if (!isAdmin && !isSelf) {
    res.status(403).json({ error: 'Access denied' });
    return;
  }

  next();
};

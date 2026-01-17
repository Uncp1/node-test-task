import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { JwtPayload } from '../types';
import z from 'zod';

const jwtPayloadSchema = z.object({
  userId: z.string(),
  role: z.enum(['ADMIN', 'USER']),
});

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, config.jwtSecret);
  return jwtPayloadSchema.parse(decoded);
};

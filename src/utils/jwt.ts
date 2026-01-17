import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { JwtPayload } from '../types';
import z from 'zod';

const jwtPayloadSchema = z
  .object({
    userId: z.string(),
    role: z.enum(['ADMIN', 'USER']),
  })
  .strip();

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: 86400,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log('Decoded token:', decoded); // временно для отладки
    return jwtPayloadSchema.parse(decoded);
  } catch (err) {
    console.error('Token verification error:', err); // временно для отладки
    throw err;
  }
};

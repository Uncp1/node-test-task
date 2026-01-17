import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || '86400', 10),
  databaseUrl: process.env.DATABASE_URL,
};

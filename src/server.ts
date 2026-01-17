import app from './app';
import { config } from './config/env';
import prisma from './config/database';

const start = async () => {
  await prisma.$connect();
  console.log('db connected');

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

start();

import { email } from 'zod';
import prisma from '../config/database';
import { comparePassword, hashPassword } from '../utils/passwords';
import { generateToken } from '../utils/jwt';

interface RegisterUser {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUser) => {
  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      password: hashedPassword,
    },
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('Account is blocked');
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};

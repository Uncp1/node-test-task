import { User } from '@prisma/client';
import prisma from '../config/database';

type UserPublic = Omit<User, 'password' | 'updatedAt'>;
type UserShort = Pick<User, 'id' | 'fullName' | 'email' | 'role' | 'isActive' | 'createdAt'>;
type UserBlocked = Pick<User, 'id' | 'fullName' | 'email' | 'isActive'>;

export const getUserById = async (id: string): Promise<UserPublic> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      birthDate: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const getAllUsers = async (): Promise<UserShort[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

export const blockUser = async (id: string): Promise<UserBlocked> => {
  const user = await prisma.user.update({
    where: { id },
    data: { isActive: false },
    select: {
      id: true,
      fullName: true,
      email: true,
      isActive: true,
    },
  });

  return user;
};

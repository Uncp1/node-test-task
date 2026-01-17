import prisma from '../config/database';

export const getUserById = async (id: string) => {
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

export const getAllUsers = async () => {
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

export const blockUser = async (id: string) => {
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

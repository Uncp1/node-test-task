import prisma from '../config/database';
import { hashPassword } from '../utils/passwords';

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

import { Request, Response } from 'express';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { loginUser, registerUser } from '../services/auth.service';
import { loginSchema, registerSchema } from '../validators/user.validator';

type RegisterBody = z.infer<typeof registerSchema>;
type LoginBody = z.infer<typeof loginSchema>;

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    // Prisma unique constraint error
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists' });

      return;
    }

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });

      return;
    }

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

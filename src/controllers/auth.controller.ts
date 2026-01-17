import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.services';
import { Prisma } from '@prisma/client';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    // Prisma unique constraint error
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      res.status(400).json({ error: 'Email already exists' });

      return;
    }

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

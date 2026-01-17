import { Request, Response } from 'express';
import { registerUser } from '../services/auth.services';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({ message: 'User registered', user });
  } catch (err: any) {
    // Prisma unique constraint error
    if (err.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists' });

      return;
    }
    res.status(500).json({ error: 'Server error' });
  }
};

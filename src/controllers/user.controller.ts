import { Request, Response } from 'express';
import { getUserById, getAllUsers } from '../services/user.service';

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const user = await getUserById(req.user.userId);

    res.json({ user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  res.json({ users });
};

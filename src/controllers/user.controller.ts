import { Request, Response } from 'express';
import { getUserById, getAllUsers, blockUser } from '../services/user.service';

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

      return;
    }

    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const user = await getUserById(id);

    res.json({ user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });

      return;
    }

    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const block = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const user = await blockUser(id);

    res.json({ message: 'User blocked', user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });

      return;
    }

    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

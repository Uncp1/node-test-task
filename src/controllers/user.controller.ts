import { Request, Response } from 'express';
import { getUserById, getAllUsers, blockUser } from '../services/user.service';

interface BlockParams {
  id: string;
}

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

    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  res.json({ users });
};

export const block = async (req: Request<BlockParams>, res: Response) => {
  try {
    const user = await blockUser(req.params.id);

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

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getMe, getAll, block } from '../controllers/user.controller';
import {
  requireAdminOrSelf,
  requireRole,
} from '../middlewares/role.middleware';
import { getUserById } from '../services/user.service';

const router = Router();

// Routes are protected
router.use(authMiddleware);

router.get('/me', getMe);
router.get('/:id', requireAdminOrSelf, getUserById);
router.get('/', requireRole('ADMIN'), getAll);

router.patch<{ id: string }>('/:id/block', requireAdminOrSelf, block);

export default router;

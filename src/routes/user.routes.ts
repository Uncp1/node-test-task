import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getMe, getAll, block, getById } from '../controllers/user.controller';
import {
  requireAdminOrSelf,
  requireRole,
} from '../middlewares/role.middleware';

const router = Router();

// Routes are protected
router.use(authMiddleware);

router.get('/me', getMe);
router.get('/:id', requireAdminOrSelf, getById);
router.get('/', requireRole('ADMIN'), getAll);

router.patch<{ id: string }>('/:id/block', requireAdminOrSelf, block);

export default router;

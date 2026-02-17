import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getMe, getAll, block, getById } from '../controllers/user.controller';
import { requireAdminOrSelf, requireRole } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../validators/user.validator';

const router = Router();

// Routes are protected
router.use(authMiddleware);

router.get('/me', getMe);
router.get('/:id', requireAdminOrSelf, getById);
router.get('/', requireRole('ADMIN'), getAll);

router.patch('/:id/block', validate(idParamSchema, 'params'), requireAdminOrSelf, block);

export default router;

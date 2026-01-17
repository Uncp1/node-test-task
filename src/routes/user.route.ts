import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getMe, getAll } from '../controllers/user.controller';

const router = Router();

// Routes are protected
router.use(authMiddleware);

router.get('/me', getMe);
router.get('/', getAll);

export default router;

import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { requireAuth } from '../middlewares/auth';
import { generalLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/sync', generalLimiter, requireAuth, AuthController.syncUser);

export default router;

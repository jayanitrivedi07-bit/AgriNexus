import { Router } from 'express';
import { AdvisoryController } from '../controllers/advisoryController';
import { requireAuth } from '../middlewares/auth';
import { expensiveOpLimiter } from '../middlewares/rateLimiter';

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post('/generate', expensiveOpLimiter, AdvisoryController.generate);
router.get('/', AdvisoryController.list);

export default router;

import { Router } from 'express';
import { AdvisoryController } from '../controllers/advisoryController';
import { requireAuth } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post('/generate', AdvisoryController.generate);
router.get('/', AdvisoryController.list);

export default router;

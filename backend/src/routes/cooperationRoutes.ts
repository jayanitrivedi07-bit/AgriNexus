import { Router } from 'express';
import { CooperationController } from '../controllers/cooperationController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.use(requireAuth);

router.post('/', CooperationController.publish);
router.get('/', CooperationController.list);

export default router;

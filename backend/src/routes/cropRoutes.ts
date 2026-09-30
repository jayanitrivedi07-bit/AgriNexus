import { Router } from 'express';
import { CropController } from '../controllers/cropController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.use(requireAuth);

router.get('/', CropController.list);

export default router;

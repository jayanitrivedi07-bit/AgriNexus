import { Router } from 'express';
import { SoilController } from '../controllers/soilController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.use(requireAuth);

router.get('/', SoilController.list);

export default router;

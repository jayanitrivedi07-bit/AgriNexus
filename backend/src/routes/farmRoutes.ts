import { Router } from 'express';
import { FarmController } from '../controllers/farmController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.use(requireAuth);

router.post('/', FarmController.create);
router.get('/', FarmController.list);
router.get('/:farmId', FarmController.get);
router.patch('/:farmId', FarmController.update);
router.delete('/:farmId', FarmController.delete);
router.get('/:farmId/twin', FarmController.getTwin);

export default router;

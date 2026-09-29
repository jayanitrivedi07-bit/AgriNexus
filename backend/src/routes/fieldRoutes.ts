import { Router } from 'express';
import { FieldController } from '../controllers/fieldController';
import { requireAuth } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post('/', FieldController.create);
router.get('/', FieldController.list);
router.get('/:fieldId', FieldController.get);

export default router;

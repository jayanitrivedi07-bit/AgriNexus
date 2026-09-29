import { Router } from 'express';
import multer from 'multer';
import { DiseaseController } from '../controllers/diseaseController';
import { requireAuth } from '../middlewares/auth';

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

router.use(requireAuth);

router.post('/analyze', upload.single('image'), DiseaseController.analyze);
router.get('/:analysisId', DiseaseController.get);

export default router;

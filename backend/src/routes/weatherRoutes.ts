import { Router } from 'express';
import { WeatherController } from '../controllers/weatherController';
import { requireAuth } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.get('/forecast', WeatherController.getForecast);
router.get('/', WeatherController.getForecast); // For simplicity, maps to forecast

export default router;

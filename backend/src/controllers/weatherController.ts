import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';
import { FarmService } from '../services/farmService';
import { AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export class WeatherController {
  static async getForecast(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      const days = parseInt(req.query.days as string) || 7;
      
      const farm = await FarmService.getFarm(farmId, ownerId);
      
      if (!farm) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      }
      
      const [longitude, latitude] = farm.location.coordinates;
      
      const forecast = await WeatherService.getForecast(latitude, longitude, days);
      
      res.json({ success: true, data: forecast });
    } catch (error: any) {
      logger.error('Failed to get weather forecast', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
    }
  }
}

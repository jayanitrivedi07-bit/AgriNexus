import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { CooperationService } from '../services/cooperationService';
import { logger } from '../utils/logger';

export class CooperationController {
  static async publish(req: AuthRequest, res: Response) {
    try {
      const signal = await CooperationService.publishSignal(req.body);
      res.status(201).json({ success: true, data: signal });
    } catch (error: any) {
      logger.error('Failed to publish signal', error);
      res.status(500).json({ success: false, error: { message: 'Failed to publish signal' } });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const { countryCode, regionCode } = req.query;
      if (!countryCode || !regionCode) {
        return res.status(400).json({ success: false, error: { message: 'countryCode and regionCode are required' }});
      }
      const signals = await CooperationService.getSignalsByRegion(countryCode as string, regionCode as string);
      res.json({ success: true, data: signals });
    } catch (error: any) {
      logger.error('Failed to list signals', error);
      res.status(500).json({ success: false, error: { message: 'Failed to list signals' } });
    }
  }
}

import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export class CropController {
  static async list(req: AuthRequest, res: Response) {
    try {
      const mockCrops = [
        { name: 'Wheat (Winter)', type: 'Cereal', status: 'Healthy', plantingDate: '2025-11-15', yield: '4.5 t/ha' },
        { name: 'Corn (Sweet)', type: 'Vegetable', status: 'Needs Attention', plantingDate: '2026-04-10', yield: '8.2 t/ha' },
        { name: 'Soybeans', type: 'Legume', status: 'Healthy', plantingDate: '2026-05-02', yield: '3.1 t/ha' }
      ];
      res.json({ success: true, data: mockCrops });
    } catch (error: any) {
      logger.error('Failed to list crops', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve crops' } });
    }
  }
}

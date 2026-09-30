import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export class SoilController {
  static async list(req: AuthRequest, res: Response) {
    try {
      const mockSoilData = [
        { zoneName: 'North Field A', testDate: '2026-09-20', phLevel: 6.5, nitrogen: 45, phosphorus: 20, potassium: 30 },
        { zoneName: 'South Valley B', testDate: '2026-09-18', phLevel: 7.1, nitrogen: 35, phosphorus: 25, potassium: 40 },
        { zoneName: 'East Terrace C', testDate: '2026-09-22', phLevel: 6.8, nitrogen: 55, phosphorus: 15, potassium: 25 }
      ];
      res.json({ success: true, data: mockSoilData });
    } catch (error: any) {
      logger.error('Failed to list soil data', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve soil data' } });
    }
  }
}

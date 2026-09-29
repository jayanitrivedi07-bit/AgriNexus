import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { FieldService } from '../services/fieldService';
import { logger } from '../utils/logger';

export class FieldController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { farmId } = req.params;
      const field = await FieldService.createField(farmId, req.body);
      res.status(201).json({ success: true, data: field });
    } catch (error: any) {
      logger.error('Failed to create field', error);
      res.status(500).json({ success: false, error: { message: 'Failed to create field' } });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const { farmId } = req.params;
      const fields = await FieldService.getFields(farmId);
      res.json({ success: true, data: fields });
    } catch (error: any) {
      logger.error('Failed to list fields', error);
      res.status(500).json({ success: false, error: { message: 'Failed to list fields' } });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
      const { farmId, fieldId } = req.params;
      const field = await FieldService.getField(farmId, fieldId);
      if (!field) {
        return res.status(404).json({ success: false, error: { message: 'Field not found' } });
      }
      res.json({ success: true, data: field });
    } catch (error: any) {
      logger.error('Failed to get field', error);
      res.status(500).json({ success: false, error: { message: 'Failed to get field' } });
    }
  }
}

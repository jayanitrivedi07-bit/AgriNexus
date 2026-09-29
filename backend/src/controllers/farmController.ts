import { Request, Response } from 'express';
import { FarmService } from '../services/farmService';
import { AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export class FarmController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farm = await FarmService.createFarm(ownerId, req.body);
      res.status(201).json({ success: true, data: farm });
    } catch (error: any) {
      logger.error('Failed to create farm', error);
      res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.message } });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farms = await FarmService.getFarmsByOwner(ownerId);
      res.json({ success: true, data: farms });
    } catch (error: any) {
      logger.error('Failed to list farms', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve farms' } });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      const farm = await FarmService.getFarm(farmId, ownerId);
      
      if (!farm) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      }
      
      res.json({ success: true, data: farm });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      const farm = await FarmService.updateFarm(farmId, ownerId, req.body);
      
      if (!farm) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      }
      
      res.json({ success: true, data: farm });
    } catch (error: any) {
      res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.message } });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      const success = await FarmService.deleteFarm(farmId, ownerId);
      
      if (!success) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      }
      
      res.json({ success: true, data: {} });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
    }
  }

  static async getTwin(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      const twin = await FarmService.getFarmTwin(farmId, ownerId);
      
      if (!twin) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      }
      
      res.json({ success: true, data: twin });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
    }
  }
}

import { Request, Response } from 'express';
import { AiService } from '../services/aiService';
import { FarmService } from '../services/farmService';
import { WeatherService } from '../services/weatherService';
import { AuthRequest } from '../middlewares/auth';
import { db } from '../config/firebase';
import { logger } from '../utils/logger';

export class AdvisoryController {
  static async generate(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      
      const farm = await FarmService.getFarm(farmId, ownerId);
      
      if (!farm) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      }
      
      const [longitude, latitude] = farm.location.coordinates;
      const weather = await WeatherService.getForecast(latitude, longitude, 3);
      
      const context = {
        farm,
        weather,
        // Mocking other data for MVP
        soil: { type: farm.soilType, moisture: 60, status: 'estimated' },
        vegetation: { ndvi: 0.72, status: 'observed', trend: 'stable' }
      };
      
      const advisory = await AiService.generateAdvisory(context);
      
      // Save advisory to firestore
      const now = new Date().toISOString();
      const advisoryDoc = {
        ...advisory,
        generatedBy: { type: 'ai', model: 'gemini-2.5-pro', version: 'v1' },
        sourceSnapshot: context,
        createdAt: now
      };
      
      const docRef = await db.collection(`farms/${farmId}/advisories`).add(advisoryDoc);
      
      res.json({ success: true, data: { id: docRef.id, ...advisoryDoc } });
    } catch (error: any) {
      logger.error('Advisory generation failed', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to generate advisory' } });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const farmId = req.params.farmId;
      
      const farm = await FarmService.getFarm(farmId, ownerId);
      if (!farm) return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Farm not found' } });
      
      const snapshot = await db.collection(`farms/${farmId}/advisories`)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
        
      const advisories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      res.json({ success: true, data: advisories });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
    }
  }
}

import { Response } from 'express';
import { VisionService } from '../services/visionService';
import { AuthRequest } from '../middlewares/auth';
import { db } from '../config/firebase';
import { logger } from '../utils/logger';

export class DiseaseController {
  static async analyze(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const file = req.file;
      const { crop, farmId } = req.body;
      
      if (!file) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Image file is required' } });
      }
      if (!crop) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Crop type is required' } });
      }
      
      // In a real app, upload file to Firebase Storage here and get URL.
      // We will skip upload to storage for MVP speed and just run inference.
      const imageReference = 'mock-storage-url'; 
      
      const analysis = await VisionService.analyzeCropImage(file.buffer, file.mimetype, crop);
      
      const now = new Date().toISOString();
      const analysisDoc = {
        userId: ownerId,
        farmId: farmId || null,
        imageReference,
        crop,
        ...analysis,
        model: 'gemini-2.5-pro',
        modelVersion: 'v1',
        createdAt: now
      };
      
      const docRef = await db.collection('diseaseAnalyses').add(analysisDoc);
      
      res.json({ success: true, data: { id: docRef.id, ...analysisDoc } });
    } catch (error: any) {
      logger.error('Disease analysis failed', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to analyze disease' } });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user!.uid;
      const analysisId = req.params.analysisId;
      
      const doc = await db.collection('diseaseAnalyses').doc(analysisId).get();
      
      if (!doc.exists || doc.data()?.userId !== ownerId) {
        return res.status(404).json({ success: false, error: { code: 'RESOURCE_NOT_FOUND', message: 'Analysis not found' } });
      }
      
      res.json({ success: true, data: { id: doc.id, ...doc.data() } });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
    }
  }
}

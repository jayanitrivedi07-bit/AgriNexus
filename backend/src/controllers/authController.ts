import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export class AuthController {
  static async syncUser(req: AuthRequest, res: Response) {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email;
      
      const userRef = db.collection('users').doc(uid);
      const doc = await userRef.get();
      
      if (!doc.exists) {
        // Create user
        const now = new Date().toISOString();
        const userData = {
          email: email || '',
          role: 'farmer',
          countryCode: 'IN', // Default
          language: 'en',
          createdAt: now,
          updatedAt: now,
          lastLoginAt: now
        };
        
        await userRef.set(userData);
        logger.info(`Created new user document for ${uid}`);
        return res.json({ success: true, data: userData });
      } else {
        // Update lastLoginAt
        await userRef.update({ lastLoginAt: new Date().toISOString() });
        return res.json({ success: true, data: doc.data() });
      }
    } catch (error: any) {
      logger.error('Failed to sync user', error);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to sync user data' } });
    }
  }
}

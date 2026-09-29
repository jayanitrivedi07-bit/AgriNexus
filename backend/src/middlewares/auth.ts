import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: string;
  };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Unauthorized' } });
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role as string | undefined,
    };
    
    next();
  } catch (error) {
    logger.error('Authentication failed', error);
    res.status(401).json({ success: false, error: { code: 'INVALID_FIREBASE_TOKEN', message: 'Unauthorized' } });
  }
};

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import { logger } from './utils/logger';

import helmet from 'helmet';
import { generalLimiter } from './middlewares/rateLimiter';

const app = express();

app.use(helmet());
// Secure CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Apply general rate limiter to all routes
app.use(generalLimiter);

// Health check endpoints for load balancer
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), instance: process.env.INSTANCE_ID || '1' });
});
app.get('/ready', (req, res) => {
  // In a real app, verify DB and Redis connection status here
  res.json({ status: 'ready' });
});

import farmRoutes from './routes/farmRoutes';
import weatherRoutes from './routes/weatherRoutes';
import advisoryRoutes from './routes/advisoryRoutes';
import diseaseRoutes from './routes/diseaseRoutes';
import authRoutes from './routes/authRoutes';
import fieldRoutes from './routes/fieldRoutes';
import cooperationRoutes from './routes/cooperationRoutes';

// Setup API routes here...
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/farms', farmRoutes);
app.use('/api/v1/farms/:farmId/fields', fieldRoutes);
app.use('/api/v1/farms/:farmId/weather', weatherRoutes);
app.use('/api/v1/farms/:farmId/advisories', advisoryRoutes);
app.use('/api/v1/disease', diseaseRoutes);
app.use('/api/v1/cooperation', cooperationRoutes);

app.use(errorHandler);

export default app;

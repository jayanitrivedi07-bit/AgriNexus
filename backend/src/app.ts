import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

import farmRoutes from './routes/farmRoutes';
import weatherRoutes from './routes/weatherRoutes';
import advisoryRoutes from './routes/advisoryRoutes';
import diseaseRoutes from './routes/diseaseRoutes';

// Setup API routes here...
app.use('/api/v1/farms', farmRoutes);
app.use('/api/v1/farms/:farmId/weather', weatherRoutes);
app.use('/api/v1/farms/:farmId/advisories', advisoryRoutes);
app.use('/api/v1/disease', diseaseRoutes);

app.use(errorHandler);

export default app;

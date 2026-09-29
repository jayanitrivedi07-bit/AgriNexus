import { createClient } from 'redis';
import { env } from './env';
import { logger } from '../utils/logger';

export const redisClient = createClient({
  url: env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 2000, // 2 seconds timeout
    reconnectStrategy: false // Do not retry
  }
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('Redis Client Connected'));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch (error) {
      logger.warn('Failed to connect to Redis. Rate limiting will fall back or fail gracefully.');
    }
  }
};

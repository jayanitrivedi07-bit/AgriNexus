import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const startServer = () => {
  try {
    const port = env.PORT || 5000;
    
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

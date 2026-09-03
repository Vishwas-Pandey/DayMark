import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './database/connection.js';
import { logger } from './common/logger/index.js';
import { providerManager } from './modules/ai/providers/provider.manager.js';

let server;

const startServer = async () => {
  try {
    await connectDB();
    providerManager.initialize();
    server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

const gracefulShutdown = () => {
  logger.info('SIGTERM/SIGINT received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('unhandledRejection', (err) => {
  logger.error(`UNHANDLED REJECTION! 💥 Shutting down... ${err.name}: ${err.message}`);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

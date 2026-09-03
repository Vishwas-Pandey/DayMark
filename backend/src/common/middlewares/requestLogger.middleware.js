import { logger } from '../logger/index.js';
import { getContext } from '../context/requestContext.js';

export const requestLogger = (req, res, next) => {
  res.on('finish', () => {
    const { startTime } = getContext();
    const responseTime = startTime ? Date.now() - startTime : 0;
    
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${responseTime}ms`
    }, 'Incoming Request');
  });
  next();
};

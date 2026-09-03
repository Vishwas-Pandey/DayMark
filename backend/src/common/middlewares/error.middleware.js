import { logger } from '../logger/index.js';
import { getRequestId } from '../context/requestContext.js';

export const errorMiddleware = (err, req, res, next) => {
  let { statusCode, message, errors } = err;
  statusCode = statusCode || 500;
  message = err.isOperational ? message : 'Internal Server Error';

  if (!err.isOperational) {
    logger.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    meta: {
      requestId: getRequestId(),
      timestamp: new Date().toISOString(),
      pagination: null
    },
    errors: errors && errors.length > 0 ? errors : [message]
  });
};

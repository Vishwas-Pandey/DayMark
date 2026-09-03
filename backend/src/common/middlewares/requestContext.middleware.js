import { v4 as uuidv4 } from 'uuid';
import { requestContext } from '../context/requestContext.js';

export const requestContextMiddleware = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.id = requestId;
  res.setHeader('x-request-id', requestId);

  const store = {
    requestId,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    startTime: Date.now(),
  };

  requestContext.run(store, () => next());
};

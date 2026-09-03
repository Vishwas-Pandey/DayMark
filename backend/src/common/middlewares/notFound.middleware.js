import { NotFoundError } from '../errors/AppError.js';

export const notFoundMiddleware = (req, res, next) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
};

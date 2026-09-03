import { AppError } from '../errors/AppError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err.name === 'ZodError') {
      const errors = err.issues.map(e => `${e.path.join('.')}: ${e.message}`);
      next(new AppError('Validation failed', 400, true, errors));
    } else {
      next(err);
    }
  }
};

import { verifyAccessToken } from './auth.tokens.js';
import { userRepository } from '#modules/users/user.repository.js';
import { AppError } from '#common/errors/AppError.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('You are not logged in. Please log in to get access.', 401);
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await userRepository.findById(decoded.id);
    
    if (!user) {
      throw new AppError('The user belonging to this token no longer exists.', 401);
    }
    
    // Future: check if user changed password after token was issued
    req.user = user;
    next();
  } catch (err) {
    throw new AppError('Invalid or expired token', 401);
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    // Placeholder for future role checking
    next();
  };
};

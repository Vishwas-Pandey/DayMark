import bcrypt from 'bcryptjs';
import { userRepository } from '#modules/users/user.repository.js';
import { authRepository } from './auth.repository.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './auth.tokens.js';
import { AppError, NotFoundError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (candidate, hash) => {
  return bcrypt.compare(candidate, hash);
};

export const authService = {
  register: async (data) => {
    const exists = await userRepository.findByEmail(data.email);
    if (exists) throw new AppError('Email already in use', 409);

    const nameParts = (data.name || '').trim().split(' ');
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Name';

    const hashedPassword = await hashPassword(data.password);
    const user = await userRepository.create({ 
      ...data, 
      firstName, 
      lastName, 
      password: hashedPassword 
    });
    
    // Automatically generate tokens so the user is logged in immediately after registration
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await authRepository.createSession({
      user: user._id,
      refreshToken,
      ip: data.ip || '0.0.0.0', // pass ip from controller
      userAgent: data.userAgent || 'unknown',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    logger.info({ userId: user._id, action: 'USER_REGISTERED' }, 'User registered');
    return { user, accessToken, refreshToken };
  },

  login: async ({ email, password, ip, userAgent }) => {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !user.password) throw new AppError('Invalid email or password', 401);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      logger.warn({ email, action: 'LOGIN_FAILED' }, 'Failed login attempt');
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await authRepository.createSession({
      user: user._id,
      refreshToken,
      ip,
      userAgent,
      expiresAt
    });

    logger.info({ userId: user._id, action: 'USER_LOGGED_IN' }, 'User logged in');
    return { user, accessToken, refreshToken };
  },

  logout: async (refreshToken) => {
    if (!refreshToken) return;
    const session = await authRepository.findSessionByToken(refreshToken);
    if (session) {
      await authRepository.revokeSession(session._id);
      logger.info({ userId: session.user, action: 'USER_LOGGED_OUT' }, 'User logged out');
    }
  },

  refresh: async ({ refreshToken, ip, userAgent }) => {
    if (!refreshToken) throw new AppError('No refresh token provided', 401);

    const session = await authRepository.findSessionByToken(refreshToken);
    if (!session) throw new AppError('Invalid or expired refresh token', 401);

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      await authRepository.revokeSession(session._id);
      throw new AppError('Refresh token expired', 401);
    }

    // Revoke old session (Rotation)
    await authRepository.revokeSession(session._id);

    const user = await userRepository.findById(decoded.id);
    if (!user) throw new NotFoundError('User not found');

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await authRepository.createSession({
      user: user._id,
      refreshToken: newRefreshToken,
      ip,
      userAgent,
      expiresAt
    });

    logger.info({ userId: user._id, action: 'REFRESH_TOKEN_ROTATED' }, 'Token rotated');
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
};

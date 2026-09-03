import { authService } from './auth.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toAuthResponse } from './auth.dto.js';
import { toUserResponse } from '#modules/users/user.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';
import { env } from '#config/env.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const authController = {
  register: asyncHandler(async (req, res) => {
    // Pass ip and userAgent to service so it can create a session
    req.body.ip = req.ip;
    req.body.userAgent = req.get('User-Agent') || 'unknown';
    
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    };
    
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(201).json(new ApiResponse(201, toAuthResponse(user, accessToken), 'Registration successful'));
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login({
      email,
      password,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(200).json(new ApiResponse(200, toAuthResponse(user, accessToken), 'Login successful'));
  }),

  logout: asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    await authService.logout(refreshToken);
    
    res.clearCookie('refreshToken', cookieOptions);
    res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
  }),

  refresh: asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    const { accessToken, refreshToken: newRefreshToken } = await authService.refresh({
      refreshToken,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    res.cookie('refreshToken', newRefreshToken, cookieOptions);
    res.status(200).json(new ApiResponse(200, { accessToken }, 'Token refreshed'));
  }),

  me: asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, toUserResponse(req.user), 'Current user retrieved'));
  })
};

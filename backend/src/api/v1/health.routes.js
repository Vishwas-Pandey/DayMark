import { Router } from 'express';
import mongoose from 'mongoose';
import { ApiResponse } from '../../common/responses/ApiResponse.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json(new ApiResponse(200, { status: 'UP' }, 'Health check passed'));
});

router.get('/ready', (req, res) => {
  const isReady = mongoose.connection.readyState === 1;
  const status = isReady ? 200 : 503;
  res.status(status).json(new ApiResponse(status, { database: isReady ? 'connected' : 'disconnected' }, isReady ? 'Service ready' : 'Service unavailable'));
});

router.get('/live', (req, res) => {
  res.status(200).json(new ApiResponse(200, {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  }, 'Liveness check passed'));
});

export default router;

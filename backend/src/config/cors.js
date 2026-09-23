import { env } from './env.js';

// CORS_ORIGIN may hold several comma-separated origins. The production
// frontends are always allowed so a missing env var can't lock users out.
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://day-mark-five.vercel.app',
  'https://day-mark-ec3y.vercel.app',
  ...env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean),
]);

export const corsConfig = {
  origin: (origin, callback) => {
    // Non-browser clients (curl, health checks) send no Origin header.
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['x-request-id'],
};

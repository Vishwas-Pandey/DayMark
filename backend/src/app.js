import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { env } from './config/env.js';
import { corsConfig } from './config/cors.js';
import { helmetConfig } from './config/helmet.js';
import { requestContextMiddleware } from './common/middlewares/requestContext.middleware.js';
import { requestLogger } from './common/middlewares/requestLogger.middleware.js';
import { errorMiddleware } from './common/middlewares/error.middleware.js';
import { notFoundMiddleware } from './common/middlewares/notFound.middleware.js';
import { mongoSanitize } from './common/middlewares/mongoSanitize.middleware.js';
import v1Routes from './api/v1/index.js';

const app = express();

// Security Middlewares
app.use(helmet(helmetConfig));
app.use(cors(corsConfig));
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize);
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in 15 minutes',
});
if (process.env.NODE_ENV === 'production') {
  app.use('/api', limiter);
}

app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}]`,
        req.method,
        req.originalUrl
    );
    next();
});

// Context & Logging
app.use(requestContextMiddleware);
app.use(requestLogger);

// API Routes
app.use('/api/v1', v1Routes);

// 404 & Global Error Handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

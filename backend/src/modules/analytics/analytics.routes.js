import { Router } from 'express';
import { analyticsController } from './analytics.controller.js';
import { dateRangeSchema, snapshotTypeSchema } from './analytics.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all analytics routes
router.use(authenticate);

// Dashboards
router.get('/dashboard', validate(dateRangeSchema), analyticsController.getDashboard);
router.get('/summary', validate(dateRangeSchema), analyticsController.getSummary);

// Time-bound
router.get('/daily', analyticsController.getDaily);
router.get('/weekly', analyticsController.getWeekly);
router.get('/monthly', analyticsController.getMonthly);
router.get('/yearly', analyticsController.getYearly);

// Specific Metrics
router.get('/productivity', validate(dateRangeSchema), analyticsController.getProductivity);
router.get('/heatmap', validate(dateRangeSchema), analyticsController.getHeatmap);
router.get('/trends', validate(dateRangeSchema), analyticsController.getTrends);

// Snapshots
router.get('/snapshot', validate(snapshotTypeSchema), analyticsController.getSnapshot);

export default router;

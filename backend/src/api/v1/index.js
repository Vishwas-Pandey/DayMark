import { Router } from 'express';
import healthRoutes from './health.routes.js';
import { userRoutes } from '#modules/users/index.js';
import { authRoutes } from '#modules/auth/index.js';
import { taskRoutes } from '#modules/tasks/index.js';
import { habitRoutes } from '#modules/habits/index.js';
import { goalRoutes } from '#modules/goals/index.js';
import { calendarRoutes } from '#modules/calendar/index.js';
import { journalRoutes } from '#modules/journal/index.js';
import { analyticsRoutes } from '#modules/analytics/index.js';
import { aiRoutes } from '#modules/ai/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'API v1 is running' });
});

router.use('', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/habits', habitRoutes);
router.use('/goals', goalRoutes);
router.use('/calendar', calendarRoutes);
router.use('/journal', journalRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/ai', aiRoutes);

export default router;

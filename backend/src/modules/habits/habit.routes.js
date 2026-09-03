import { Router } from 'express';
import { habitController } from './habit.controller.js';
import { createHabitSchema, updateHabitSchema, habitIdParamSchema, completeHabitSchema, undoHabitParamSchema } from './habit.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all habit routes
router.use(authenticate);

// Aggregation / Quick views
router.get('/today', habitController.getToday);
router.get('/weekly', habitController.getWeekly);
router.get('/monthly', habitController.getMonthly);

// Standard CRUD
router.get('/', habitController.getAll);
router.post('/', validate(createHabitSchema), habitController.create);

router.get('/:id', validate(habitIdParamSchema), habitController.getById);
router.patch('/:id', validate(habitIdParamSchema), validate(updateHabitSchema), habitController.update);
router.delete('/:id', validate(habitIdParamSchema), habitController.remove);

// State transitions
router.patch('/:id/restore', validate(habitIdParamSchema), habitController.restore);
router.patch('/:id/archive', validate(habitIdParamSchema), habitController.archive);
router.patch('/:id/pause', validate(habitIdParamSchema), habitController.pause);
router.patch('/:id/resume', validate(habitIdParamSchema), habitController.resume);

// Completion tracking
router.post('/:id/complete', validate(habitIdParamSchema), validate(completeHabitSchema), habitController.complete);
router.delete('/:id/complete/:completionId', validate(undoHabitParamSchema), habitController.undoComplete);

// Analytics
router.get('/:id/history', validate(habitIdParamSchema), habitController.getHistory);
router.get('/:id/stats', validate(habitIdParamSchema), habitController.getStats);

export default router;

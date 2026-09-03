import { Router } from 'express';
import { goalController } from './goal.controller.js';
import { 
  createGoalSchema, 
  updateGoalSchema, 
  goalIdParamSchema, 
  updateProgressSchema,
  attachTaskParamSchema,
  attachHabitParamSchema,
  attachTaskBodySchema,
  attachHabitBodySchema
} from './goal.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all goal routes
router.use(authenticate);

// Standard CRUD
router.get('/', goalController.getAll);
router.post('/', validate(createGoalSchema), goalController.create);

router.get('/:id', validate(goalIdParamSchema), goalController.getById);
router.patch('/:id', validate(goalIdParamSchema), validate(updateGoalSchema), goalController.update);
router.delete('/:id', validate(goalIdParamSchema), goalController.remove);

// State transitions
router.patch('/:id/restore', validate(goalIdParamSchema), goalController.restore);
router.patch('/:id/archive', validate(goalIdParamSchema), goalController.archive);
router.patch('/:id/pause', validate(goalIdParamSchema), goalController.pause);
router.patch('/:id/resume', validate(goalIdParamSchema), goalController.resume);
router.patch('/:id/complete', validate(goalIdParamSchema), goalController.complete);

// Progress
router.patch('/:id/progress', validate(goalIdParamSchema), validate(updateProgressSchema), goalController.updateProgress);

// Relationships
router.post('/:id/tasks', validate(goalIdParamSchema), validate(attachTaskBodySchema), goalController.attachTask);
router.delete('/:id/tasks/:taskId', validate(attachTaskParamSchema), goalController.detachTask);

router.post('/:id/habits', validate(goalIdParamSchema), validate(attachHabitBodySchema), goalController.attachHabit);
router.delete('/:id/habits/:habitId', validate(attachHabitParamSchema), goalController.detachHabit);

// Analytics
router.get('/:id/stats', validate(goalIdParamSchema), goalController.getStats);

export default router;

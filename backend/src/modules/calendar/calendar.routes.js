import { Router } from 'express';
import { calendarController } from './calendar.controller.js';
import { 
  createEventSchema, 
  updateEventSchema, 
  moveEventSchema, 
  resizeEventSchema, 
  eventIdParamSchema,
  dateRangeSchema
} from './calendar.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all calendar routes
router.use(authenticate);

// Global queries
router.get('/today', calendarController.getToday);
router.get('/week', validate(dateRangeSchema), calendarController.getWeek);
router.get('/month', validate(dateRangeSchema), calendarController.getMonth);
router.get('/agenda', validate(dateRangeSchema), calendarController.getAgenda);
router.get('/upcoming', calendarController.getUpcoming);
router.get('/conflicts', validate(dateRangeSchema), calendarController.getConflicts);
router.get('/stats', validate(dateRangeSchema), calendarController.getStats);

// Standard CRUD
router.get('/', calendarController.getAll);
router.post('/', validate(createEventSchema), calendarController.create);

router.get('/:id', validate(eventIdParamSchema), calendarController.getById);
router.patch('/:id', validate(eventIdParamSchema), validate(updateEventSchema), calendarController.update);
router.delete('/:id', validate(eventIdParamSchema), calendarController.remove);

// State & Geometry transitions
router.patch('/:id/restore', validate(eventIdParamSchema), calendarController.restore);
router.patch('/:id/complete', validate(eventIdParamSchema), calendarController.complete);
router.patch('/:id/cancel', validate(eventIdParamSchema), calendarController.cancel);
router.patch('/:id/move', validate(eventIdParamSchema), validate(moveEventSchema), calendarController.move);
router.patch('/:id/resize', validate(eventIdParamSchema), validate(resizeEventSchema), calendarController.resize);

export default router;

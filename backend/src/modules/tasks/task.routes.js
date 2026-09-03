import { Router } from 'express';
import { taskController } from './task.controller.js';
import { createTaskSchema, updateTaskSchema, taskIdParamSchema, bulkUpdateSchema, bulkDeleteSchema } from './task.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all task routes
router.use(authenticate);

// Global actions
router.get('/search', taskController.search);
router.post('/bulk-update', validate(bulkUpdateSchema), taskController.bulkUpdate);
router.post('/bulk-delete', validate(bulkDeleteSchema), taskController.bulkDelete);

// Standard CRUD
router.get('/', taskController.getAll);
router.post('/', validate(createTaskSchema), taskController.create);

router.get('/:id', validate(taskIdParamSchema), taskController.getById);
router.patch('/:id', validate(taskIdParamSchema), validate(updateTaskSchema), taskController.update);
router.delete('/:id', validate(taskIdParamSchema), taskController.remove);

// State transitions
router.patch('/:id/restore', validate(taskIdParamSchema), taskController.restore);
router.patch('/:id/archive', validate(taskIdParamSchema), taskController.archive);
router.patch('/:id/complete', validate(taskIdParamSchema), taskController.complete);
router.patch('/:id/reopen', validate(taskIdParamSchema), taskController.reopen);

export default router;

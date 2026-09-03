import { Router } from 'express';
import { userController } from './user.controller.js';
import { createUserSchema, updateUserSchema, userIdParamSchema } from './user.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';

const router = Router();

router.get('/', userController.getAll);
router.post('/', validate(createUserSchema), userController.create);

router.get('/:id', validate(userIdParamSchema), userController.getById);
router.patch('/:id', validate(userIdParamSchema), validate(updateUserSchema), userController.update);
router.delete('/:id', validate(userIdParamSchema), userController.remove);

router.patch('/:id/restore', validate(userIdParamSchema), userController.restore);

export default router;

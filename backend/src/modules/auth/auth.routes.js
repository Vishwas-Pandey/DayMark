import { Router } from 'express';
import { authController } from './auth.controller.js';
import { registerSchema, loginSchema } from './auth.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from './auth.middleware.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

router.get('/me', authenticate, authController.me);

export default router;

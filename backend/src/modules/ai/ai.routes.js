import { Router } from 'express';
import { aiController } from './ai.controller.js';
import { insightFilterSchema, chatRequestSchema } from './ai.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/status', aiController.getStatus);
router.get('/insights', validate(insightFilterSchema), aiController.generateInsights);

router.post('/chat', validate(chatRequestSchema), aiController.chat);
router.get('/conversations', aiController.listConversations);
router.get('/conversations/:id', aiController.getConversation);
router.delete('/conversations/:id', aiController.deleteConversation);

export default router;

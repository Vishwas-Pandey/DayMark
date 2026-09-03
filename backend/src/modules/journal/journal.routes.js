import { Router } from 'express';
import { journalController } from './journal.controller.js';
import { 
  createEntrySchema, 
  updateEntrySchema, 
  entryIdParamSchema,
  searchSchema
} from './journal.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all journal routes
router.use(authenticate);

// Global queries
router.get('/recent', journalController.getRecent);
router.get('/search', validate(searchSchema), journalController.search);
router.get('/stats', journalController.getStats);

// Standard CRUD
router.get('/', journalController.getAll);
router.post('/', validate(createEntrySchema), journalController.create);

router.get('/:id', validate(entryIdParamSchema), journalController.getById);
router.patch('/:id', validate(entryIdParamSchema), validate(updateEntrySchema), journalController.update);
router.delete('/:id', validate(entryIdParamSchema), journalController.remove);

// State transitions
router.patch('/:id/restore', validate(entryIdParamSchema), journalController.restore);
router.patch('/:id/favorite', validate(entryIdParamSchema), journalController.favorite);
router.patch('/:id/pin', validate(entryIdParamSchema), journalController.pin);

export default router;

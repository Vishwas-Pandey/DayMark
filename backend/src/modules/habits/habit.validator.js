import { z } from 'zod';

const scheduleSchema = z.object({
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  daysOfMonth: z.array(z.number().min(1).max(31)).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
}).optional();

const goalSchema = z.object({
  targetCount: z.number().min(1).optional(),
  targetUnit: z.string().trim().optional()
}).optional();

export const createHabitSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    description: z.string().trim().optional(),
    type: z.enum(['build', 'quit']).optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']).optional(),
    schedule: scheduleSchema,
    goal: goalSchema,
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    energy: z.enum(['low', 'medium', 'high']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    notes: z.string().trim().optional(),
    tags: z.array(z.string()).optional()
  })
});

export const updateHabitSchema = z.object({
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    type: z.enum(['build', 'quit']).optional(),
    status: z.enum(['active', 'paused', 'completed', 'archived']).optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']).optional(),
    schedule: scheduleSchema,
    goal: goalSchema,
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    energy: z.enum(['low', 'medium', 'high']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    notes: z.string().trim().optional(),
    tags: z.array(z.string()).optional()
  })
});

export const completeHabitSchema = z.object({
  body: z.object({
    completedAt: z.string().datetime().optional(),
    value: z.number().min(0).optional(),
    notes: z.string().trim().optional()
  })
});

export const habitIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid habit ID')
  })
});

export const undoHabitParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid habit ID'),
    completionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid completion ID')
  })
});

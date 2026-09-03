import { z } from 'zod';

const progressSchema = z.object({
  targetValue: z.number().min(0).optional(),
  currentValue: z.number().min(0).optional(),
  unit: z.string().trim().optional()
}).optional();

const timelineSchema = z.object({
  startDate: z.string().datetime().optional(),
  targetDate: z.string().datetime().optional().nullable()
}).optional();

export const createGoalSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    description: z.string().trim().optional(),
    type: z.enum(['outcome', 'milestone', 'project']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    category: z.enum(['health', 'career', 'education', 'finance', 'personal', 'relationships', 'custom']).optional(),
    progress: progressSchema,
    timeline: timelineSchema,
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().trim().optional(),
    taskIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID')).optional(),
    habitIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid habit ID')).optional()
  })
});

export const updateGoalSchema = z.object({
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    type: z.enum(['outcome', 'milestone', 'project']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    category: z.enum(['health', 'career', 'education', 'finance', 'personal', 'relationships', 'custom']).optional(),
    timeline: timelineSchema,
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().trim().optional()
  })
});

export const updateProgressSchema = z.object({
  body: z.object({
    targetValue: z.number().min(0).optional(),
    currentValue: z.number().min(0).optional()
  })
});

export const goalIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid goal ID')
  })
});

export const attachTaskParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid goal ID'),
    taskId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID')
  })
});

export const attachHabitParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid goal ID'),
    habitId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid habit ID')
  })
});

export const attachTaskBodySchema = z.object({
  body: z.object({
    taskId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID')
  })
});

export const attachHabitBodySchema = z.object({
  body: z.object({
    habitId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid habit ID')
  })
});

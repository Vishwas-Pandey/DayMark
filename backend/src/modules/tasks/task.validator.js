import { z } from 'zod';

const repeatSchema = z.object({
  enabled: z.boolean().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  interval: z.number().int().min(1).optional(),
  endsAt: z.string().datetime().optional()
}).optional();

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    description: z.string().trim().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    energy: z.enum(['low', 'medium', 'high']).optional(),
    estimatedMinutes: z.number().min(0).optional(),
    startDate: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
    reminderAt: z.string().datetime().optional(),
    labels: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    parentTask: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid parent task ID').optional(),
    position: z.number().optional(),
    repeat: repeatSchema
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    status: z.enum(['todo', 'in_progress', 'completed', 'archived']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    energy: z.enum(['low', 'medium', 'high']).optional(),
    estimatedMinutes: z.number().min(0).optional(),
    actualMinutes: z.number().min(0).optional(),
    startDate: z.string().datetime().optional().nullable(),
    dueDate: z.string().datetime().optional().nullable(),
    reminderAt: z.string().datetime().optional().nullable(),
    labels: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().trim().optional(),
    parentTask: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid parent task ID').optional().nullable(),
    position: z.number().optional(),
    repeat: repeatSchema
  })
});

export const bulkUpdateSchema = z.object({
  body: z.object({
    taskIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID')).min(1),
    updateData: z.object({
      status: z.enum(['todo', 'in_progress', 'completed', 'archived']).optional(),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
      labels: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional()
    })
  })
});

export const bulkDeleteSchema = z.object({
  body: z.object({
    taskIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID')).min(1)
  })
});

export const taskIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID')
  })
});

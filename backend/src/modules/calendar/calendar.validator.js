import { z } from 'zod';

const timeSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  timezone: z.string().optional(),
  allDay: z.boolean().optional()
});

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    description: z.string().trim().optional(),
    type: z.enum(['task', 'habit', 'meeting', 'focus', 'reminder', 'event', 'break', 'custom']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    time: timeSchema,
    location: z.object({
      location: z.string().trim().optional(),
      meetingUrl: z.string().url().optional().or(z.literal(''))
    }).optional(),
    relationships: z.object({
      taskId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      habitId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      goalId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional()
    }).optional(),
    visual: z.object({
      color: z.string().trim().optional(),
      icon: z.string().trim().optional()
    }).optional(),
    metadata: z.object({
      notes: z.string().trim().optional(),
      tags: z.array(z.string()).optional()
    }).optional()
  })
});

export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    type: z.enum(['task', 'habit', 'meeting', 'focus', 'reminder', 'event', 'break', 'custom']).optional(),
    status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    time: z.object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
      timezone: z.string().optional(),
      allDay: z.boolean().optional()
    }).optional(),
    location: z.object({
      location: z.string().trim().optional(),
      meetingUrl: z.string().url().optional().or(z.literal(''))
    }).optional(),
    visual: z.object({
      color: z.string().trim().optional(),
      icon: z.string().trim().optional()
    }).optional(),
    metadata: z.object({
      notes: z.string().trim().optional(),
      tags: z.array(z.string()).optional()
    }).optional()
  })
});

export const moveEventSchema = z.object({
  body: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  })
});

export const resizeEventSchema = z.object({
  body: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  })
});

export const dateRangeSchema = z.object({
  query: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    date: z.string().datetime().optional()
  })
});

export const eventIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID')
  })
});

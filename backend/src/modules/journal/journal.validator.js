import { z } from 'zod';

export const createEntrySchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    content: z.string().min(1, 'Content is required'),
    type: z.enum(['daily', 'gratitude', 'reflection', 'freeform', 'meeting', 'learning', 'custom']).optional(),
    mood: z.object({
      score: z.number().min(1).max(10).optional(),
      label: z.string().trim().optional()
    }).optional(),
    energy: z.enum(['low', 'medium', 'high']).optional(),
    productivity: z.number().min(1).max(10).optional(),
    emotionTags: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    relationships: z.object({
      taskIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
      habitIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
      goalIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
      calendarEventIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional()
    }).optional()
  })
});

export const updateEntrySchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    content: z.string().optional(),
    type: z.enum(['daily', 'gratitude', 'reflection', 'freeform', 'meeting', 'learning', 'custom']).optional(),
    mood: z.object({
      score: z.number().min(1).max(10).optional(),
      label: z.string().trim().optional()
    }).optional(),
    energy: z.enum(['low', 'medium', 'high']).optional(),
    productivity: z.number().min(1).max(10).optional(),
    emotionTags: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    relationships: z.object({
      taskIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
      habitIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
      goalIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
      calendarEventIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional()
    }).optional()
  })
});

export const searchSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    type: z.string().optional(),
    favorite: z.enum(['true', 'false']).optional(),
    pinned: z.enum(['true', 'false']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional()
  })
});

export const entryIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid entry ID')
  })
});

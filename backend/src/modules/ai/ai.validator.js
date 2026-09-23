import { z } from 'zod';

export const insightFilterSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    priority: z.string().optional()
  })
});

export const chatRequestSchema = z.object({
  body: z.object({
    message: z.string(),
    conversationId: z.string().optional(),
    template: z.string().optional()
  })
});

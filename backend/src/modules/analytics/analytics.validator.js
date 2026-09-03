import { z } from 'zod';

export const dateRangeSchema = z.object({
  query: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    timezone: z.string().optional()
  })
});

export const snapshotTypeSchema = z.object({
  query: z.object({
    type: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional()
  })
});

import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required').trim(),
    lastName: z.string().min(1, 'Last name is required').trim(),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    displayName: z.string().trim().optional(),
    timezone: z.string().optional(),
    locale: z.string().optional()
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).trim().optional(),
    lastName: z.string().min(1).trim().optional(),
    displayName: z.string().trim().optional(),
    avatar: z.string().url().optional().nullable(),
    timezone: z.string().optional(),
    locale: z.string().optional(),
    onboardingCompleted: z.boolean().optional(),
    onboardingStep: z.number().int().min(0).optional(),
    preferences: z.object({
      theme: z.enum(['light', 'dark', 'system']).optional(),
      weekStartsOn: z.number().int().optional(),
      reducedMotion: z.boolean().optional(),
      defaultView: z.string().optional(),
      reminderDefaults: z.any().optional()
    }).optional(),
    settings: z.object({
      notifications: z.object({
        email: z.boolean().optional(),
        push: z.boolean().optional(),
        digest: z.boolean().optional()
      }).optional(),
      privacy: z.object({
        shareActivity: z.boolean().optional(),
        publicProfile: z.boolean().optional()
      }).optional(),
      productivity: z.object({
        strictMode: z.boolean().optional()
      }).optional(),
      ai: z.object({
        enabled: z.boolean().optional(),
        dataSharing: z.boolean().optional()
      }).optional()
    }).optional()
  })
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID')
  })
});

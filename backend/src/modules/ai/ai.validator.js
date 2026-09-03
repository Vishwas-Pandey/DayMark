import { z } from 'zod';

export const contextModeSchema = z.object({
  query: z.object({
    mode: z.enum([
      'FULL_CONTEXT', 
      'DASHBOARD_CONTEXT', 
      'PLANNING_CONTEXT', 
      'REFLECTION_CONTEXT', 
      'FOCUS_CONTEXT', 
      'JOURNAL_CONTEXT'
    ]).optional()
  })
});

export const contextQuerySchema = contextModeSchema; // Alias for existing

export const memoryQuerySchema = z.object({
  query: z.object({
    type: z.enum(['recent', 'working', 'session', 'long_term']).optional()
  })
});

export const pipelineRunSchema = z.object({
  body: z.object({
    config: z.record(z.any()).optional(),
    initialContext: z.record(z.any()).optional()
  })
});

export const planningConfigSchema = z.object({
  body: z.object({
    workingHours: z.object({ start: z.string(), end: z.string() }).optional(),
    timezone: z.string().optional(),
    maxDeepWorkBlock: z.number().optional()
  })
});

export const insightFilterSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    priority: z.string().optional()
  })
});

export const automationExecutionSchema = z.object({
  body: z.object({
    eventName: z.string().optional(),
    payload: z.record(z.any()).optional()
  })
});
export const automationTestSchema = z.object({
  body: z.object({
    workflow: z.record(z.any()),
    mockData: z.record(z.any()).optional()
  })
});

export const providerTestSchema = z.object({
  body: z.object({
    provider: z.string().optional(),
    model: z.string().optional(),
    temperature: z.number().optional(),
    maxTokens: z.number().optional(),
    timeout: z.number().optional(),
    routingMode: z.string().optional(),
    prompt: z.string().optional()
  })
});

export const memoryIndexSchema = z.object({
  body: z.object({
    content: z.string(),
    metadata: z.record(z.any()).optional(),
    type: z.enum(['WORKING_MEMORY', 'SHORT_TERM_MEMORY', 'LONG_TERM_MEMORY', 'EPISODIC_MEMORY', 'SEMANTIC_MEMORY', 'SESSION_MEMORY']).optional()
  })
});
export const memorySearchSchema = z.object({
  query: z.object({
    q: z.string(),
    topK: z.string().transform(Number).optional(),
    threshold: z.string().transform(Number).optional(),
    category: z.string().optional()
  })
});

export const agentRunSchema = z.object({
  body: z.object({
    request: z.string(),
    conversationId: z.string().optional()
  })
});
export const agentActionSchema = z.object({
  body: z.object({
    agentId: z.string()
  })
});

export const chatRequestSchema = z.object({
  body: z.object({
    message: z.string(),
    conversationId: z.string().optional(),
    template: z.string().optional()
  })
});

export const executionRequestSchema = z.object({
  body: z.object({
    toolCalls: z.array(z.any()),
    context: z.any().optional()
  })
});
export const executionConfirmSchema = z.object({
  body: z.object({
    planId: z.string(),
    plan: z.any()
  })
});

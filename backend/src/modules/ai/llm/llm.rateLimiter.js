import { logger } from '#common/logger/index.js';

export const llmRateLimiter = {
  checkLimit: async (userId, providerName) => {
    // Simple placeholder
    logger.debug({ action: 'AI_RATE_LIMIT_CHECK', userId, providerName }, 'Checking LLM rate limits');
    return true; // allowed
  }
};

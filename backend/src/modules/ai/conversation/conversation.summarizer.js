import { logger } from '#common/logger/index.js';

export const conversationSummarizer = {
  summarizeContext: (messages) => {
    logger.debug({ action: 'AI_CONTEXT_SUMMARIZED' }, 'Summarizing context for compression');
    return 'Summary of previous messages...';
  }
};

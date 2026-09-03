import { logger } from '#common/logger/index.js';

export const conversationResponse = {
  buildNormalized: (llmResult, convId, metadata = {}) => {
    logger.debug({ action: 'AI_RESPONSE_COMPLETED', convId }, 'Normalizing LLM response');
    return {
      conversationId: convId,
      content: llmResult.text || llmResult,
      toolCalls: llmResult.toolCalls || [],
      reasoningSummary: 'Reasoning mock',
      citations: [],
      metadata: { ...metadata, provider: 'DEFAULT' },
      usage: { tokens: 150 },
      latency: 450
    };
  }
};

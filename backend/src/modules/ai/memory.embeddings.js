import { logger } from '#common/logger/index.js';
import { llmGateway } from './llm/llm.gateway.js';

export const memoryEmbeddings = {
  generate: async (userId, content, options = {}) => {
    logger.debug({ action: 'AI_EMBEDDING_GENERATED', userId }, 'Generating embedding via LLM Gateway');
    
    const rawEmbeddings = await llmGateway.embed(userId, content, options);
    
    return {
      embeddingId: `emb_${Date.now()}`,
      provider: 'DEFAULT', // Would be derived from options or Gateway resolution
      model: 'DEFAULT_EMBEDDING_MODEL',
      dimensions: rawEmbeddings.length,
      checksum: 'MOCK_CHECKSUM',
      createdAt: new Date(),
      vector: rawEmbeddings
    };
  }
};

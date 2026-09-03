import { memoryIndexer } from './memory.indexer.js';
import { memoryRetriever } from './memory.retriever.js';
import { aiRepository } from './ai.repository.js';
import { logger } from '#common/logger/index.js';

export const aiMemory = {
  create: async (userId, type, contextSnapshot) => {
    logger.info({ userId, type, action: 'AI_MEMORY_CREATED' }, 'Creating AI memory block');
    
    // Set TTL for working memory (e.g. 1 hour)
    let ttl = null;
    if (type === 'working' || type === 'session') {
      ttl = new Date(Date.now() + 60 * 60 * 1000); 
    }
    
    return aiRepository.saveMemory({
      userId,
      type,
      contextSnapshot,
      ttl
    });
  },
  
  index: async (userId, content, metadata) => memoryIndexer.index(userId, content, metadata),
  search: async (userId, query, options) => memoryRetriever.retrieveRelevantMemory(userId, query, options),
  
  load: async (userId, type) => {
    return aiRepository.loadMemory(userId, type);
  },
  
  cleanup: async (userId) => {
    logger.info({ userId, action: 'AI_MEMORY_CLEANUP' }, 'Cleaning up stale memory');
    return true;
  }
};

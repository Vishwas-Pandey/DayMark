import { logger } from '#common/logger/index.js';

export const memoryScoring = {
  score: (memoryObj, searchContext) => {
    logger.debug({ action: 'AI_MEMORY_SCORED' }, 'Scoring memory for retrieval');
    
    const importance = memoryObj.importance || 50;
    
    // Freshness decay mock
    const ageDays = (Date.now() - new Date(memoryObj.recency).getTime()) / (1000 * 3600 * 24);
    const freshness = Math.max(0, 100 - (ageDays * 2)); 
    
    const relevance = 80; // Semantic score mock
    
    return {
      importance,
      freshness,
      relevance,
      semanticScore: 0.85,
      retrievalScore: (importance * 0.2) + (freshness * 0.3) + (relevance * 0.5)
    };
  }
};

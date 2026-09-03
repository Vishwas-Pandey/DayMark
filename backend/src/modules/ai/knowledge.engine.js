import { logger } from '#common/logger/index.js';
import { memoryRetriever } from './memory.retriever.js';
import { memoryGraph } from './memory.graph.js';
import { knowledgeScoring } from './knowledge.scoring.js';

export const knowledgeEngine = {
  generateKnowledgePackage: async (userId, query, options = {}) => {
    logger.info({ action: 'AI_KNOWLEDGE_GENERATED', userId }, 'Generating integrated knowledge package');
    
    const relevantMemory = await memoryRetriever.retrieveRelevantMemory(userId, query, options);
    
    return {
      userId,
      query,
      knowledgePackage: relevantMemory,
      memoryPackage: [],
      relatedEntities: [],
      supportingEvidence: [],
      retrievalMetadata: { topK: options.topK || 5, threshold: options.threshold || 0.7 },
      graphSummary: memoryGraph.buildRelationships(relevantMemory),
      score: knowledgeScoring.scoreContext(relevantMemory)
    };
  }
};

import { llmGateway } from './llm/llm.gateway.js';
import { aiRepository } from './ai.repository.js';

export const memoryRetriever = {
  semanticSearch: async (userId, query, limit = 5) => {
    const embedding = await llmGateway.getEmbeddings(query);
    // Simulating Vector Search via MongoDB Atlas Vector Search / pgvector
    const results = await aiRepository.findSimilarMemories(userId, embedding, limit);
    
    // Hybrid scoring (freshness + importance + similarity)
    return results.sort((a, b) => b.hybridScore - a.hybridScore);
  }
};

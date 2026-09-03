import { logger } from '#common/logger/index.js';
import { memoryChunker } from './memory.chunker.js';
import { memoryEmbeddings } from './memory.embeddings.js';
import { memoryStore } from './memory.store.js';

export const memoryIndexer = {
  index: async (userId, content, metadata = {}, type = 'SEMANTIC_MEMORY') => {
    logger.info({ action: 'AI_MEMORY_INDEXED', userId, type }, 'Indexing new memory object');
    
    const chunks = memoryChunker.chunk(content);
    const indexedChunks = [];
    
    for (const chunk of chunks) {
      const embedding = await memoryEmbeddings.generate(userId, chunk.content);
      
      const memoryObj = {
        userId,
        type,
        rawContent: chunk.content,
        normalizedContent: chunk.content.toLowerCase(),
        embeddingReference: embedding.embeddingId,
        metadata: { ...metadata, ...chunk.metadata },
        relationships: [],
        ttl: null,
        importance: 50,
        recency: Date.now()
      };
      
      const saved = await memoryStore.save(memoryObj);
      indexedChunks.push(saved);
    }
    
    return indexedChunks;
  }
};

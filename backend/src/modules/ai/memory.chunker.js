import { logger } from '#common/logger/index.js';

export const memoryChunker = {
  chunk: (text, options = {}) => {
    logger.debug({ action: 'AI_MEMORY_CHUNKED' }, 'Chunking raw text for memory index');
    const { size = 500, overlap = 50 } = options;
    
    // Simplistic chunking placeholder
    if (!text) return [];
    
    const chunks = [];
    let start = 0;
    while (start < text.length) {
      chunks.push({
        content: text.slice(start, start + size),
        metadata: {
          startIndex: start,
          endIndex: Math.min(start + size, text.length)
        }
      });
      start += (size - overlap);
    }
    
    return chunks;
  }
};

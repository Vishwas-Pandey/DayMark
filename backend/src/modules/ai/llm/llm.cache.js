import { logger } from '#common/logger/index.js';

export const llmCache = {
  store: new Map(),
  
  get: async (hashKey) => {
    const val = llmCache.store.get(hashKey);
    if (val) logger.debug({ action: 'AI_CACHE_HIT', hashKey }, 'LLM Cache hit');
    return val || null;
  },
  
  set: async (hashKey, value, ttl = 3600) => {
    llmCache.store.set(hashKey, value);
    // basic in-memory eviction placeholder
    setTimeout(() => llmCache.store.delete(hashKey), ttl * 1000);
  },
  
  generateHash: (input, options) => {
    // simple string hash placeholder
    return JSON.stringify({ input, options });
  }
};

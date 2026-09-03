import { llmFallback } from './llm.fallback.js';
import { llmMetrics } from './llm.metrics.js';
import { llmCache } from './llm.cache.js';

export const llmExecutor = {
  execute: async (providerName, operationType, payload, options) => {
    const startTime = Date.now();
    
    const hash = llmCache.generateHash(payload, options);
    const cached = await llmCache.get(hash);
    if (cached) {
      return cached;
    }

    try {
      const result = await llmFallback.executeWithFallback(async (provider) => {
        if (operationType === 'chat') return provider.chat(payload, options);
        if (operationType === 'completion') return provider.completion(payload, options);
        if (operationType === 'embeddings') return provider.embeddings(payload, options);
        if (operationType === 'moderation') return provider.moderation(payload);
        throw new Error('Unknown operation type');
      }, providerName);
      
      const latency = Date.now() - startTime;
      
      // Cache the result
      await llmCache.set(hash, result);
      
      // Record metrics
      llmMetrics.record({
        success: true,
        latency,
        provider: providerName,
        tokens: 10, // mock
        cost: 0.0001, // mock
        fallback: false
      });
      
      return result;
    } catch (error) {
      llmMetrics.record({ success: false, provider: providerName, fallback: true });
      throw error;
    }
  }
};

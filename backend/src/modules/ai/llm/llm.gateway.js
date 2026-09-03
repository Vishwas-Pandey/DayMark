import { providerManager } from '../providers/provider.manager.js';
import { PROVIDER_TYPES } from '../providers/provider.types.js';
import { AppError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

export const llmGateway = {
  generate: async (prompt, options) => {
    const provider = providerManager.getDefaultProvider();
    if (!provider) throw new AppError('AI Service unavailable', 503);

    try {
      const result = await provider.completion(prompt, options);
      return { text: result.content, provider: result.provider };
    } catch (error) {
      logger.warn({ error: error.message, provider: provider.name }, 'Primary AI provider failed, falling back to mock');
      const fallback = providerManager.getProvider(PROVIDER_TYPES.MOCK);
      if (!fallback || fallback === provider) throw new AppError('AI Service unavailable', 503);
      const result = await fallback.completion(prompt, options);
      return { text: result.content, provider: result.provider };
    }
  },
  embed: async (userId, content, options) => {
    const provider = providerManager.getDefaultProvider();
    if (!provider) throw new AppError('AI Service unavailable', 503);
    return provider.embeddings(content, options);
  },
  executeStream: async (prompt, options) => {
    try {
      const provider = providerManager.getPrimaryProvider();
      return await provider.stream(prompt, options);
    } catch (error) {
      logger.warn({ error: error.message }, 'Primary provider failed, attempting fallback');
      const fallback = providerManager.getFallbackProvider();
      if (!fallback) throw new AppError('AI Service unavailable', 503);
      return await fallback.stream(prompt, options);
    }
  },
  getEmbeddings: async (text) => {
    const provider = providerManager.getPrimaryProvider();
    return await provider.embed(text);
  }
};

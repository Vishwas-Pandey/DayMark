import { logger } from '#common/logger/index.js';
import { providerManager } from '../providers/provider.manager.js';

export const llmFallback = {
  executeWithFallback: async (operation, primaryProviderName) => {
    try {
      const primary = providerManager.getProvider(primaryProviderName);
      if (!primary) throw new Error(`Provider ${primaryProviderName} not found`);
      return await operation(primary);
    } catch (err) {
      logger.warn({ action: 'AI_PROVIDER_FAILED', error: err.message, primaryProviderName }, 'Primary provider failed, attempting fallback');
      
      const mockProvider = providerManager.getProvider('MOCK');
      if (mockProvider) {
        logger.info({ action: 'AI_PROVIDER_SWITCHED', newProvider: 'MOCK' }, 'Fell back to MOCK provider');
        return await operation(mockProvider);
      }
      
      throw new Error('All AI providers failed'); // Standardized error
    }
  }
};

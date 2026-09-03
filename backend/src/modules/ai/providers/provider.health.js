import { providerRegistry } from './provider.registry.js';
import { logger } from '#common/logger/index.js';

export const providerHealth = {
  checkAll: async () => {
    logger.debug({ action: 'AI_PROVIDER_HEALTH_CHECK' }, 'Checking health of all registered providers');
    const results = {};
    for (const [name, provider] of providerRegistry.providers.entries()) {
      try {
        results[name] = await provider.health();
      } catch (err) {
        results[name] = { status: 'unhealthy', error: err.message };
      }
    }
    return results;
  }
};

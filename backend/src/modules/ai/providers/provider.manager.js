import { providerRegistry } from './provider.registry.js';
import { providerFactory } from './provider.factory.js';
import { providerHealth } from './provider.health.js';
import { PROVIDER_TYPES } from './provider.types.js';
import { env } from '#config/env.js';

export const providerManager = {
  initialize: () => {
    const defaultProviderStr = env.AI_PROVIDER || PROVIDER_TYPES.MOCK;
    
    // Register the default
    providerRegistry.register(defaultProviderStr, providerFactory.create(defaultProviderStr));
    
    // Register mock as fallback if not default
    if (defaultProviderStr !== PROVIDER_TYPES.MOCK) {
      providerRegistry.register(PROVIDER_TYPES.MOCK, providerFactory.create(PROVIDER_TYPES.MOCK));
    }
  },
  
  getDefaultProvider: () => {
    const name = env.AI_PROVIDER || PROVIDER_TYPES.MOCK;
    return providerRegistry.get(name) || providerRegistry.get(PROVIDER_TYPES.MOCK);
  },
  
  getProvider: (name) => providerRegistry.get(name),
  registerProvider: providerRegistry.register,
  removeProvider: providerRegistry.remove,
  listProviders: providerRegistry.list,
  healthCheck: providerHealth.checkAll
};

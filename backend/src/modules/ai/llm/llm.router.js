import { providerManager } from '../providers/provider.manager.js';

export const llmRouter = {
  route: (mode) => {
    // mode: DEFAULT, CHEAPEST, FASTEST, HIGHEST_QUALITY, EMBEDDINGS, MODERATION
    // For now, always return the default registered provider
    return providerManager.getDefaultProvider().name;
  }
};

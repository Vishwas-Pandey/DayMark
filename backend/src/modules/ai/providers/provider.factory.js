import { PROVIDER_TYPES } from './provider.types.js';
import { OpenAIProvider } from './openai.provider.js';
import { AnthropicProvider } from './anthropic.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import { OpenRouterProvider } from './openrouter.provider.js';
import { MockProvider } from './mock.provider.js';
import { getProviderConfig } from './provider.config.js';

export const providerFactory = {
  create: (type) => {
    const conf = getProviderConfig(type);
    switch (type) {
      case PROVIDER_TYPES.OPENAI: return new OpenAIProvider(conf);
      case PROVIDER_TYPES.ANTHROPIC: return new AnthropicProvider(conf);
      case PROVIDER_TYPES.GEMINI: return new GeminiProvider(conf);
      case PROVIDER_TYPES.OPENROUTER: return new OpenRouterProvider(conf);
      case PROVIDER_TYPES.MOCK: return new MockProvider(conf);
      default: return new MockProvider(conf);
    }
  }
};

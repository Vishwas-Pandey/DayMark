import { env } from '#config/env.js';
import { PROVIDER_TYPES } from './provider.types.js';

const API_KEYS = {
  [PROVIDER_TYPES.OPENAI]: env.OPENAI_API_KEY,
  [PROVIDER_TYPES.ANTHROPIC]: env.ANTHROPIC_API_KEY,
  [PROVIDER_TYPES.GEMINI]: env.GEMINI_API_KEY,
  [PROVIDER_TYPES.OPENROUTER]: env.OPENROUTER_API_KEY,
};

export const getProviderConfig = (providerName) => {
  return {
    timeout: env.AI_TIMEOUT || 30000,
    maxRetries: env.AI_MAX_RETRIES || 3,
    apiKey: API_KEYS[providerName]
  };
};

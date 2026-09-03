import { BaseProvider } from './provider.base.js';

export class OpenAIProvider extends BaseProvider {
  constructor(config) {
    super(config);
    this.name = 'OPENAI';
  }
  
  async initialize() { return true; }
  async health() { return { status: 'healthy', provider: this.name }; }
  async chat(messages, options) { return { content: 'Mock OpenAI response', provider: this.name }; }
  async completion(prompt, options) { return { content: 'Mock OpenAI completion', provider: this.name }; }
  async embeddings(input, options) { return [0.1, 0.2, 0.3]; }
  async moderation(input) { return { flagged: false }; }
  countTokens(input) { return 10; }
  estimateCost(tokens, type) { return 0.0001; }
  async shutdown() { return true; }
}

import { BaseProvider } from './provider.base.js';

export class MockProvider extends BaseProvider {
  constructor(config) {
    super(config);
    this.name = 'MOCK';
  }
  
  async initialize() { return true; }
  async health() { return { status: 'healthy', provider: this.name }; }
  async chat(messages, options) { return { content: 'Mock provider response', provider: this.name }; }
  async completion(prompt, options) { return { content: 'Mock completion', provider: this.name }; }
  async embeddings(input, options) { return [0.0, 0.0, 0.0]; }
  async moderation(input) { return { flagged: false }; }
  countTokens(input) { return input.length; }
  estimateCost(tokens, type) { return 0; }
  async shutdown() { return true; }
}

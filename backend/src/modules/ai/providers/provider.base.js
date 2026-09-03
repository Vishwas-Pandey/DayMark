export class BaseProvider {
  constructor(config) {
    this.config = config;
    this.name = 'BASE';
  }
  
  async initialize() { throw new Error('Not implemented'); }
  async health() { throw new Error('Not implemented'); }
  async chat(messages, options) { throw new Error('Not implemented'); }
  async completion(prompt, options) { throw new Error('Not implemented'); }
  async embeddings(input, options) { throw new Error('Not implemented'); }
  async moderation(input) { throw new Error('Not implemented'); }
  countTokens(input) { throw new Error('Not implemented'); }
  estimateCost(tokens, type) { throw new Error('Not implemented'); }
  async shutdown() { throw new Error('Not implemented'); }
}

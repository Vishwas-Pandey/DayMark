import { BaseProvider } from './provider.base.js';

// Used when no AI key is configured, and as the fallback when the real provider
// fails. It can't generate advice, so it says so and echoes the user's own data
// summary that the prompt carries (see conversation.prompts.js).
const contextFrom = (prompt = '') => {
  const match = String(prompt).match(/Context:\n([\s\S]*?)\n\nHistory:/);
  return match ? match[1].trim() : '';
};

const reply = (prompt, { fallback } = {}) => {
  const intro = fallback
    ? "The AI service is temporarily unavailable, so I can't give a written answer right now."
    : "AI replies aren't enabled on this deployment (no AI provider key is configured), so I can't write an answer.";
  const context = contextFrom(prompt);
  return context ? `${intro}\n\nHere's what I can see in your workspace:\n\n${context}` : intro;
};

export class MockProvider extends BaseProvider {
  constructor(config) {
    super(config);
    this.name = 'MOCK';
  }

  async initialize() { return true; }
  async health() { return { status: 'healthy', provider: this.name }; }
  async chat(messages, options) {
    const last = Array.isArray(messages) ? messages[messages.length - 1]?.content : '';
    return { content: reply(last, options), provider: this.name };
  }
  async completion(prompt, options) { return { content: reply(prompt, options), provider: this.name }; }
  async embeddings(input, options) { return [0.0, 0.0, 0.0]; }
  async moderation(input) { return { flagged: false }; }
  countTokens(input) { return input.length; }
  estimateCost(tokens, type) { return 0; }
  async shutdown() { return true; }
}

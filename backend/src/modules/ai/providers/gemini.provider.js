import { BaseProvider } from './provider.base.js';

const GEMINI_MODEL = 'gemini-3.6-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

export class GeminiProvider extends BaseProvider {
  constructor(config) {
    super(config);
    this.name = 'GEMINI';
  }

  async initialize() {
    return true;
  }

  async health() {
    return { status: this.config?.apiKey ? 'healthy' : 'unconfigured', provider: this.name };
  }

  async chat(messages, options) {
    // messages: [{ role, content }] — flatten into a single transcript for the
    // plain-text generateContent call this app's prompt pipeline expects.
    const transcript = messages.map((m) => `${m.role}: ${m.content}`).join('\n');
    return this.completion(transcript, options);
  }

  async completion(prompt, options = {}) {
    if (!this.config?.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const res = await fetch(
      `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxOutputTokens ?? 1024
          }
        })
      }
    );

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error(`Gemini API error (${res.status}): ${errBody.slice(0, 300)}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';

    return { content: text || "I couldn't generate a response.", provider: this.name };
  }

  async embeddings(input, options) {
    if (!this.config?.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    const res = await fetch(
      `${GEMINI_API_BASE}/models/text-embedding-004:embedContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: { parts: [{ text: input }] } })
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.embedding?.values || [];
  }

  async moderation() {
    return { flagged: false };
  }

  countTokens(input) {
    return Math.ceil((input?.length || 0) / 4);
  }

  estimateCost() {
    return 0;
  }

  async shutdown() {
    return true;
  }
}

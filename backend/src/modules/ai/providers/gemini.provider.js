import { BaseProvider } from './provider.base.js';

const GEMINI_MODEL = 'gemini-3.6-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const REQUEST_TIMEOUT_MS = 20000;

const fetchWithTimeout = (url, options, timeoutMs = REQUEST_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
};

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

    let res;
    try {
      res = await fetchWithTimeout(
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
    } catch (err) {
      if (err.name === 'AbortError') throw new Error(`Gemini API request timed out after ${REQUEST_TIMEOUT_MS}ms`);
      throw err;
    }

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
    let res;
    try {
      res = await fetchWithTimeout(
        `${GEMINI_API_BASE}/models/text-embedding-004:embedContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: { parts: [{ text: input }] } })
        }
      );
    } catch {
      return [];
    }
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

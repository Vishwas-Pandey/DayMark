import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  // Render (and some other hosts) can leave PORT set to an empty string rather
  // than unset — Number('') is 0, which zod's default() won't catch since the
  // key isn't technically undefined. Treat blank as unset so the real port
  // (injected by the host, or the local default) is used instead of 0.
  PORT: z.preprocess((v) => (v === '' ? undefined : v), z.string().default('8000')).transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_URI: z.string().url(),
  CORS_ORIGIN: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  AI_PROVIDER: z.string().default('MOCK'),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  AI_TIMEOUT: z.string().default('30000').transform(Number),
  AI_MAX_RETRIES: z.string().default('3').transform(Number)
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;

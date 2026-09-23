import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    // One in-memory MongoDB per test file; run files sequentially to keep it simple.
    fileParallelism: false,
    testTimeout: 20000,
    hookTimeout: 60000
  }
});

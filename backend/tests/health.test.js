import { describe, it, expect } from 'vitest';
import { api } from './helpers.js';

describe('health and routing', () => {
  it('GET /api/v1/health returns UP', async () => {
    const res = await api().get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('UP');
  });

  it('GET /api/v1/ready reports the database as connected', async () => {
    const res = await api().get('/api/v1/ready');
    expect(res.status).toBe(200);
    expect(res.body.data.database).toBe('connected');
  });

  it('unknown routes return a 404 in the standard error shape', async () => {
    const res = await api().get('/api/v1/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.errors)).toBe(true);
  });
});

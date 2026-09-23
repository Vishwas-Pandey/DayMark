import { describe, it, expect, beforeEach } from 'vitest';
import { api, registerUser } from './helpers.js';

const auth = (token) => ({ Authorization: `Bearer ${token}` });
const idOf = (res) => res.body.data.id ?? res.body.data._id;

describe('habits', () => {
  let token;

  beforeEach(async () => {
    ({ token } = await registerUser());
  });

  it('creates a habit and returns it in the list', async () => {
    const created = await api().post('/api/v1/habits').set(auth(token)).send({ title: 'Read 20 pages', frequency: 'daily' });
    expect(created.status).toBe(201);

    const list = await api().get('/api/v1/habits').set(auth(token));
    expect(list.status).toBe(200);
    expect(JSON.stringify(list.body.data)).toContain('Read 20 pages');
  });

  it('rejects an invalid frequency', async () => {
    const res = await api().post('/api/v1/habits').set(auth(token)).send({ title: 'x', frequency: 'hourly' });
    expect(res.status).toBe(400);
  });

  it('records a completion and reflects it in stats', async () => {
    const created = await api().post('/api/v1/habits').set(auth(token)).send({ title: 'Meditate', frequency: 'daily' });
    const id = idOf(created);

    const done = await api().post(`/api/v1/habits/${id}/complete`).set(auth(token)).send({});
    expect(done.status).toBeLessThan(300);

    const stats = await api().get(`/api/v1/habits/${id}/stats`).set(auth(token));
    expect(stats.status).toBe(200);
  });

  it('pauses and resumes a habit', async () => {
    const created = await api().post('/api/v1/habits').set(auth(token)).send({ title: 'Run' });
    const id = idOf(created);

    const paused = await api().patch(`/api/v1/habits/${id}/pause`).set(auth(token));
    expect(paused.status).toBe(200);
    expect(paused.body.data.status).toBe('paused');

    const resumed = await api().patch(`/api/v1/habits/${id}/resume`).set(auth(token));
    expect(resumed.status).toBe(200);
    expect(resumed.body.data.status).toBe('active');
  });
});

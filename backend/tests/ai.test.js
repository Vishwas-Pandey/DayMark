import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { api, registerUser } from './helpers.js';
import { providerManager } from '../src/modules/ai/providers/provider.manager.js';

const auth = (token) => ({ Authorization: `Bearer ${token}` });

// AI_PROVIDER=MOCK in tests, so no external API is called.
describe('ai chat', () => {
  let token;

  // server.js does this at boot; tests import the app directly.
  beforeAll(() => providerManager.initialize());

  beforeEach(async () => {
    ({ token } = await registerUser());
  });

  it('requires authentication', async () => {
    const res = await api().post('/api/v1/ai/chat').send({ message: 'hi' });
    expect(res.status).toBe(401);
  });

  it('validates the chat payload', async () => {
    const res = await api().post('/api/v1/ai/chat').set(auth(token)).send({});
    expect(res.status).toBe(400);
  });

  it('answers a message and lists the conversation', async () => {
    const res = await api().post('/api/v1/ai/chat').set(auth(token)).send({ message: 'What should I focus on today?' });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeTruthy();
    // With the mock provider the reply says AI is off instead of pretending to be a network error.
    expect(JSON.stringify(res.body.data)).toMatch(/aren't enabled/);

    const list = await api().get('/api/v1/ai/conversations').set(auth(token));
    expect(list.status).toBe(200);
    expect(list.body.data.length).toBeGreaterThan(0);
  });

  it('returns 404 for an unknown conversation', async () => {
    const res = await api().get('/api/v1/ai/conversations/does-not-exist').set(auth(token));
    expect(res.status).toBe(404);
  });
});

describe('ai chat context', () => {
  it("includes the user's open tasks and active habits, and nothing from other users", async () => {
    const { conversationMemory } = await import('../src/modules/ai/conversation/conversation.memory.js');
    const { token } = await registerUser();
    const { token: otherToken } = await registerUser();

    await api().post('/api/v1/tasks').set(auth(token)).send({ title: 'Finish report', priority: 'high' });
    await api().post('/api/v1/habits').set(auth(token)).send({ title: 'Morning walk' });
    await api().post('/api/v1/tasks').set(auth(otherToken)).send({ title: 'Someone else task' });

    const me = await api().get('/api/v1/auth/me').set(auth(token));
    const context = await conversationMemory.fetchRelevantContext(me.body.data.id ?? me.body.data._id);

    expect(context).toContain('Finish report');
    expect(context).toContain('Morning walk');
    expect(context).not.toContain('Someone else task');
  });
});

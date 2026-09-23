import { describe, it, expect, beforeEach } from 'vitest';
import { api, registerUser } from './helpers.js';

const auth = (token) => ({ Authorization: `Bearer ${token}` });

describe('tasks', () => {
  let token;

  beforeEach(async () => {
    ({ token } = await registerUser());
  });

  const createTask = (body = { title: 'Write tests' }, t = token) =>
    api().post('/api/v1/tasks').set(auth(t)).send(body);

  it('requires authentication', async () => {
    const res = await api().get('/api/v1/tasks');
    expect(res.status).toBe(401);
  });

  it('creates and lists a task', async () => {
    const created = await createTask({ title: 'Write tests', priority: 'high' });
    expect(created.status).toBe(201);
    const id = created.body.data.id ?? created.body.data._id;
    expect(id).toBeTruthy();

    const list = await api().get('/api/v1/tasks').set(auth(token));
    expect(list.status).toBe(200);
    const titles = JSON.stringify(list.body.data);
    expect(titles).toContain('Write tests');
  });

  it('rejects a task without a title', async () => {
    const res = await createTask({});
    expect(res.status).toBe(400);
  });

  it('rejects a malformed task id', async () => {
    const res = await api().get('/api/v1/tasks/not-an-id').set(auth(token));
    expect(res.status).toBe(400);
  });

  it('updates, completes and deletes a task', async () => {
    const created = await createTask();
    const id = created.body.data.id ?? created.body.data._id;

    const updated = await api().patch(`/api/v1/tasks/${id}`).set(auth(token)).send({ title: 'Renamed' });
    expect(updated.status).toBe(200);
    expect(updated.body.data.title).toBe('Renamed');

    const completed = await api().patch(`/api/v1/tasks/${id}/complete`).set(auth(token));
    expect(completed.status).toBe(200);
    expect(completed.body.data.status).toBe('completed');

    const removed = await api().delete(`/api/v1/tasks/${id}`).set(auth(token));
    expect(removed.status).toBe(200);
  });

  it("does not let one user read another user's task", async () => {
    const created = await createTask({ title: 'Private' });
    const id = created.body.data.id ?? created.body.data._id;

    const { token: otherToken } = await registerUser();
    const res = await api().get(`/api/v1/tasks/${id}`).set(auth(otherToken));
    expect(res.status).toBe(404);
  });
});

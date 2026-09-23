import { describe, it, expect } from 'vitest';
import { api, registerUser } from './helpers.js';
import { Task } from '../src/modules/tasks/task.model.js';

const auth = (token) => ({ Authorization: `Bearer ${token}` });

describe('analytics heatmap', () => {
  it("groups completions by the viewer's timezone", async () => {
    const { token } = await registerUser();
    const created = await api().post('/api/v1/tasks').set(auth(token)).send({ title: 'Late night task' });
    const id = created.body.data.id ?? created.body.data._id;
    // 20:00 UTC on 10 Sep is 01:30 on 11 Sep in India.
    await Task.findByIdAndUpdate(id, { status: 'completed', completedAt: new Date('2026-09-10T20:00:00Z') });

    const range = { startDate: '2026-09-01T00:00:00.000Z', endDate: '2026-09-30T00:00:00.000Z' };
    const utc = await api().get('/api/v1/analytics/heatmap').query(range).set(auth(token));
    const ist = await api().get('/api/v1/analytics/heatmap').query({ ...range, timezone: 'Asia/Kolkata' }).set(auth(token));

    expect(utc.body.data.map((d) => d.date)).toEqual(['2026-09-10']);
    expect(ist.body.data.map((d) => d.date)).toEqual(['2026-09-11']);
  });

  it('falls back to UTC for an invalid timezone', async () => {
    const { token } = await registerUser();
    const res = await api().get('/api/v1/analytics/heatmap').query({ timezone: 'Not/AZone' }).set(auth(token));
    expect(res.status).toBe(200);
  });
});

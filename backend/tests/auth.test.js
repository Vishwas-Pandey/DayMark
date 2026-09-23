import { describe, it, expect } from 'vitest';
import { api, registerUser } from './helpers.js';

describe('auth', () => {
  it('registers a user, returns an access token and sets a refresh cookie', async () => {
    const { res, body } = await registerUser();
    expect(res.status).toBe(201);
    expect(res.body.data.accessToken).toBeTypeOf('string');
    expect(res.body.data.user.email).toBe(body.email);
    expect(res.body.data.user.password).toBeUndefined();
    expect(res.headers['set-cookie'].join(';')).toMatch(/refreshToken=.*HttpOnly/i);
  });

  it('rejects a duplicate email', async () => {
    const { body } = await registerUser();
    const res = await api().post('/api/v1/auth/register').send(body);
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  it('validates the register payload', async () => {
    const res = await api()
      .post('/api/v1/auth/register')
      .send({ name: '', email: 'not-an-email', password: 'short' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('logs in with correct credentials', async () => {
    const { body } = await registerUser();
    const res = await api().post('/api/v1/auth/login').send({ email: body.email, password: body.password });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTypeOf('string');
  });

  it('rejects a wrong password with 401', async () => {
    const { body } = await registerUser();
    const res = await api().post('/api/v1/auth/login').send({ email: body.email, password: 'WrongPassword1!' });
    expect(res.status).toBe(401);
  });

  it('GET /auth/me requires a token', async () => {
    const res = await api().get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });

  it('GET /auth/me returns the current user', async () => {
    const { token, body } = await registerUser();
    const res = await api().get('/api/v1/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(body.email);
  });

  it('refreshes the access token using the refresh cookie', async () => {
    const { res: reg } = await registerUser();
    const cookie = reg.headers['set-cookie'];
    const res = await api().post('/api/v1/auth/refresh').set('Cookie', cookie);
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTypeOf('string');
  });
});

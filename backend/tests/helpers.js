import request from 'supertest';
import app from '../src/app.js';

export const api = () => request(app);

export const registerUser = async (overrides = {}) => {
  const body = {
    name: 'Test User',
    email: `user${Date.now()}${Math.random().toString(16).slice(2, 6)}@example.com`,
    password: 'Password123!',
    ...overrides
  };
  const res = await api().post('/api/v1/auth/register').send(body);
  return { res, body, token: res.body?.data?.accessToken };
};

import api from './axios';

export const habitsApi = {
  list: (params) => api.get('/habits', { params }),
  get: (id) => api.get('/habits/' + id),
  create: (data) => api.post('/habits', data),
  update: (id, data) => api.patch('/habits/' + id, data),
  delete: (id) => api.delete('/habits/' + id),
  complete: (id, data = {}) => api.post('/habits/' + id + '/complete', data),
  getHistory: (id, params) => api.get('/habits/' + id + '/history', { params })
};

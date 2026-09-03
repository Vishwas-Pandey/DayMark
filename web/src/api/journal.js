import api from './axios';

export const journalApi = {
  list: (params) => api.get('/journal', { params }),
  get: (id) => api.get('/journal/' + id),
  create: (data) => api.post('/journal', data),
  update: (id, data) => api.patch('/journal/' + id, data),
  delete: (id) => api.delete('/journal/' + id)
};

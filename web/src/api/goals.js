import api from './axios';

export const goalsApi = {
  list: (params) => api.get('/goals', { params }),
  get: (id) => api.get('/goals/' + id),
  create: (data) => api.post('/goals', data),
  update: (id, data) => api.patch('/goals/' + id, data),
  updateProgress: (id, data) => api.patch('/goals/' + id + '/progress', data),
  delete: (id) => api.delete('/goals/' + id)
};

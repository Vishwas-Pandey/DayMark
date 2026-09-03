import api from './axios';

export const calendarApi = {
  list: (params) => api.get('/calendar', { params }),
  get: (id) => api.get('/calendar/' + id),
  create: (data) => api.post('/calendar', data),
  update: (id, data) => api.patch('/calendar/' + id, data),
  delete: (id) => api.delete('/calendar/' + id)
};

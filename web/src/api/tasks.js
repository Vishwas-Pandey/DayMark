import api from './axios';

export const tasksApi = {
  list: (params) => api.get('/tasks', { params }),
  get: (id) => api.get('/tasks/' + id),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.patch('/tasks/' + id, data),
  delete: (id) => api.delete('/tasks/' + id),
  bulkUpdate: (taskIds, updateData) => api.post('/tasks/bulk-update', { taskIds, updateData }),
  bulkDelete: (taskIds) => api.post('/tasks/bulk-delete', { taskIds })
};

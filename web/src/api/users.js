import api from './axios';

export const usersApi = {
  getProfile: (id) => api.get('/users/' + id),
  updateProfile: (id, data) => api.patch('/users/' + id, data),
  updatePreferences: (id, preferences) => api.patch('/users/' + id, { preferences })
};

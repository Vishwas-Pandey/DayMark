import api from './axios';

export const aiApi = {
  chat: (data) => api.post('/ai/chat', data),
  listConversations: () => api.get('/ai/conversations'),
  getConversation: (id) => api.get('/ai/conversations/' + id),
  deleteConversation: (id) => api.delete('/ai/conversations/' + id),
  getInsights: () => api.get('/ai/insights')
};

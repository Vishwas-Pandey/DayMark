import api from './axios';

export const aiApi = {
  chat: (data) => api.post('/ai/chat', data),
  streamChat: (data) => api.post('/ai/chat/stream', data),
  execute: (data) => api.post('/ai/execute', data),
  preview: (data) => api.post('/ai/execute/preview', data),
  confirm: (data) => api.post('/ai/execute/confirm', data),
  getCheckpoints: (agentId) => api.get('/ai/agent/checkpoints', { params: { agentId } }),
  listConversations: () => api.get('/ai/conversations'),
  getConversation: (id) => api.get('/ai/conversations/' + id),
  deleteConversation: (id) => api.delete('/ai/conversations/' + id),
  getInsights: () => api.get('/ai/insights')
};

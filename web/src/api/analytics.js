import api from './axios';

export const analyticsApi = {
  getSummary: (params) => api.get('/analytics/summary', { params }),
  getTrends: (params) => api.get('/analytics/trends', { params }),
  getInsights: () => api.get('/analytics/insights')
};

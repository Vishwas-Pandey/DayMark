import api from './axios';

export const analyticsApi = {
  getSummary: (params) => api.get('/analytics/summary', { params }),
  getTrends: (params) => api.get('/analytics/trends', { params }),
  // Days are grouped in the viewer's timezone so cells line up with local dates.
  getHeatmap: (params) => api.get('/analytics/heatmap', { params: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, ...params } })
};

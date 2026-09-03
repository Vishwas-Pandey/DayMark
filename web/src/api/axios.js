import axios from 'axios';

// Create base instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  withCredentials: true, // Send HTTP-only cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      
      const hasSession = localStorage.getItem('hasSession');
      const token = localStorage.getItem('accessToken');
      
      // Guests should never attempt token refresh
      if (!token && !hasSession) {
        return Promise.reject(error.response?.data || error);
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Attempt to refresh the token using HTTP-only cookie
        const { data } = await axios.post(
          api.defaults.baseURL + '/auth/refresh', 
          {}, 
          { withCredentials: true }
        );
        
        // data is the Axios response body (ApiResponse). The token is inside data.data
        const newAccessToken = data?.data?.accessToken || data?.accessToken;
        
        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }
        
        localStorage.setItem('accessToken', newAccessToken);
        
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('hasSession');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export default api;

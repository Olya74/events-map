import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173',});
  api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Add any custom headers or configurations here
      return config;
    },
    (error) => {
      // Handle request errors here
      return Promise.reject(error);
    }
  );
  export default api;
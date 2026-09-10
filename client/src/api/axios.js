import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true
});

// Request interceptor: attach token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('mindwell_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401, try refresh
API.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const { data } = await axios.get('http://localhost:5001/api/auth/refresh', { withCredentials: true });
        localStorage.setItem('mindwell_token', data.token);
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return axios(error.config);
      } catch {
        localStorage.removeItem('mindwell_token');
        localStorage.removeItem('mindwell_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
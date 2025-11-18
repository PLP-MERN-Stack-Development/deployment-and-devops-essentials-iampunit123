import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('safarivista_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('safarivista_token');
      localStorage.removeItem('safarivista_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.patch('/users/updateMe', data),
};

// Tours API
export const toursAPI = {
  getAll: (params = {}) => api.get('/tours', { params }),
  getFeatured: () => api.get('/tours/featured'),
  getById: (id) => api.get(`/tours/${id}`),
  getStats: () => api.get('/tours/stats'),
  search: (query) => api.get('/tours', { params: { search: query } }),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
  getStats: () => api.get('/bookings/stats'),
};

// Reviews API
export const reviewsAPI = {
  getByTour: (tourId) => api.get(`/tours/${tourId}/reviews`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.patch(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id) => api.patch(`/reviews/${id}/helpful`),
};

// Payments API
export const paymentsAPI = {
  createIntent: (data) => api.post('/payments/create-payment-intent', data),
  confirm: (data) => api.post('/payments/confirm-payment', data),
  getHistory: () => api.get('/payments/history'),
};

export default api;
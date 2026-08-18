import apiClient from './apiClient';

/** Common error helper for Redux thunks */
export const getApiError = (error, fallback = 'Something went wrong') =>
  error.response?.data?.message || fallback;

/* ─── Auth ─────────────────────────────────────────── */
export const authApi = {
  register: (userData) => apiClient.post('/auth/register', userData).then((res) => res.data),
  login: (credentials) => apiClient.post('/auth/login', credentials).then((res) => res.data),
  getProfile: () => apiClient.get('/auth/profile').then((res) => res.data),
  updateProfile: (profileData) => apiClient.put('/auth/profile', profileData).then((res) => res.data),
};

/* ─── Goals ────────────────────────────────────────── */
export const goalsApi = {
  getAll: () => apiClient.get('/goals').then((res) => res.data),
  getById: (id) => apiClient.get(`/goals/${id}`).then((res) => res.data),
  create: (goalData) => apiClient.post('/goals', goalData).then((res) => res.data),
  update: (id, goalData) => apiClient.put(`/goals/${id}`, goalData).then((res) => res.data),
  delete: (id) => apiClient.delete(`/goals/${id}`).then((res) => res.data),
};

/* ─── Journal ──────────────────────────────────────── */
export const journalApi = {
  getAll: () => apiClient.get('/journal').then((res) => res.data),
  getById: (id) => apiClient.get(`/journal/${id}`).then((res) => res.data),
  create: (entryData) => apiClient.post('/journal', entryData).then((res) => res.data),
  update: (id, entryData) => apiClient.put(`/journal/${id}`, entryData).then((res) => res.data),
  delete: (id) => apiClient.delete(`/journal/${id}`).then((res) => res.data),
};

/* ─── Assessments ──────────────────────────────────── */
export const assessmentsApi = {
  getQuestions: () => apiClient.get('/assessments/questions').then((res) => res.data),
  getAll: () => apiClient.get('/assessments').then((res) => res.data),
  submit: (answers, type = 'big-five') =>
    apiClient.post('/assessments', { answers, type }).then((res) => res.data),
};

/* ─── Admin ────────────────────────────────────────── */
export const adminApi = {
  getStats: () => apiClient.get('/admin/stats').then((res) => res.data),
  getUsers: () => apiClient.get('/admin/users').then((res) => res.data),
  updateUserRole: (id, role) =>
    apiClient.put(`/admin/users/${id}/role`, { role }).then((res) => res.data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`).then((res) => res.data),
};

/* ─── Health ───────────────────────────────────────── */
export const healthApi = {
  check: () => apiClient.get('/health').then((res) => res.data),
};

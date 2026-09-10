import API from './axios';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  logout: () => API.post('/auth/logout'),
  refresh: () => API.get('/auth/refresh'),
  me: () => API.get('/auth/me'),
};

export const onboardingAPI = {
  updateProfile: (data) => API.put('/onboarding/profile', data),
  updateGoals: (data) => API.put('/onboarding/goals', data),
  updatePreferences: (data) => API.put('/onboarding/preferences', data),
  saveConsent: (data) => API.post('/onboarding/consent', data),
  getStatus: () => API.get('/onboarding/status'),
  complete: () => API.put('/onboarding/complete'),
};

export const triageAPI = {
  submit: (data) => API.post('/triage/submit', data),
  getResult: () => API.get('/triage/result'),
};

export const assessmentAPI = {
  getAll: () => API.get('/assessments'),
  getById: (id) => API.get(`/assessments/${id}`),
  submit: (data) => API.post('/assessments/submit', data),
  getResults: () => API.get('/assessments/results'),
  getSnapshot: () => API.get('/assessments/snapshot'),
};

export const planAPI = {
  generate: () => API.post('/plans/generate'),
  getCurrent: () => API.get('/plans/current'),
  completeTask: (planId, taskIndex) => API.put(`/plans/${planId}/task/${taskIndex}`),
};

export const moodAPI = {
  log: (data) => API.post('/mood', data),
  getAll: (params) => API.get('/mood', { params }),
  getTrends: () => API.get('/mood/trends'),
};

export const journalAPI = {
  create: (data) => API.post('/journal', data),
  getAll: (params) => API.get('/journal', { params }),
  getById: (id) => API.get(`/journal/${id}`),
  update: (id, data) => API.put(`/journal/${id}`, data),
  delete: (id) => API.delete(`/journal/${id}`),
};

export const aiCoachAPI = {
  chat: (data) => API.post('/ai/coach/chat', data),
  getSessions: () => API.get('/ai/coach/sessions'),
  getSession: (id) => API.get(`/ai/coach/sessions/${id}`),
  createSession: () => API.post('/ai/coach/sessions'),
};

export const supportCircleAPI = {
  get: () => API.get('/support-circle'),
  addMember: (data) => API.post('/support-circle/members', data),
  updateMember: (id, data) => API.put(`/support-circle/members/${id}`, data),
  removeMember: (id) => API.delete(`/support-circle/members/${id}`),
};

export const professionalAPI = {
  getAll: (params) => API.get('/professionals', { params }),
  getById: (id) => API.get(`/professionals/${id}`),
};

export const bookingAPI = {
  create: (data) => API.post('/bookings', data),
  getAll: () => API.get('/bookings'),
  cancel: (id) => API.put(`/bookings/${id}/cancel`),
};

export const messageAPI = {
  getConversations: () => API.get('/messages/conversations'),
  getMessages: (id) => API.get(`/messages/${id}`),
  send: (data) => API.post('/messages', data),
};

export const notificationAPI = {
  getAll: () => API.get('/notifications'),
  markRead: (id) => API.put(`/notifications/${id}/read`),
  markAllRead: () => API.put('/notifications/read-all'),
};

export const progressAPI = {
  getSummary: () => API.get('/progress/summary'),
  getWeekly: () => API.get('/progress/weekly'),
};

export const adminAPI = {
  getDashboardStats: () => API.get('/admin/dashboard'),
  getPendingTherapists: () => API.get('/admin/therapists/pending'),
  updateTherapistStatus: (id, data) => API.put(`/admin/therapists/${id}/status`, data),
};

export const therapistAPI = {
  apply: (data) => API.post('/therapist/application/apply', data),
  getAppStatus: () => API.get('/therapist/application/status'),
  getDashboard: () => API.get('/therapist/dashboard'),
  getClients: () => API.get('/therapist/clients'),
  getClientDetail: (id) => API.get(`/therapist/clients/${id}`),
  getSessions: () => API.get('/therapist/sessions'),
  createSessionNote: (id, data) => API.post(`/therapist/sessions/${id}/notes`, data),
  getAlerts: () => API.get('/therapist/alerts'),
  getEarnings: () => API.get('/therapist/earnings'),
  setAvailability: (data) => API.put('/therapist/availability', data),
};

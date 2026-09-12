import fs from 'fs';
import path from 'path';

const files = {
  'src/api/axios.js': `import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Request interceptor: attach token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('mindwell_token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Response interceptor: handle 401, try refresh
API.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const { data } = await axios.get('http://localhost:5000/api/auth/refresh', { withCredentials: true });
        localStorage.setItem('mindwell_token', data.token);
        error.config.headers.Authorization = \`Bearer \${data.token}\`;
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

export default API;`,

  'src/api/endpoints.js': `import API from './axios';

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
  getById: (id) => API.get(\`/assessments/\${id}\`),
  submit: (data) => API.post('/assessments/submit', data),
  getResults: () => API.get('/assessments/results'),
  getSnapshot: () => API.get('/assessments/snapshot'),
};

export const planAPI = {
  generate: () => API.post('/plans/generate'),
  getCurrent: () => API.get('/plans/current'),
  completeTask: (planId, taskIndex) => API.put(\`/plans/\${planId}/task/\${taskIndex}\`),
};

export const moodAPI = {
  log: (data) => API.post('/mood', data),
  getAll: (params) => API.get('/mood', { params }),
  getTrends: () => API.get('/mood/trends'),
};

export const journalAPI = {
  create: (data) => API.post('/journal', data),
  getAll: (params) => API.get('/journal', { params }),
  getById: (id) => API.get(\`/journal/\${id}\`),
  update: (id, data) => API.put(\`/journal/\${id}\`, data),
  delete: (id) => API.delete(\`/journal/\${id}\`),
};

export const aiCoachAPI = {
  chat: (data) => API.post('/ai/coach/chat', data),
  getSessions: () => API.get('/ai/coach/sessions'),
  getSession: (id) => API.get(\`/ai/coach/sessions/\${id}\`),
  createSession: () => API.post('/ai/coach/sessions'),
};

export const supportCircleAPI = {
  get: () => API.get('/support-circle'),
  addMember: (data) => API.post('/support-circle/members', data),
  updateMember: (id, data) => API.put(\`/support-circle/members/\${id}\`, data),
  removeMember: (id) => API.delete(\`/support-circle/members/\${id}\`),
};

export const professionalAPI = {
  getAll: (params) => API.get('/professionals', { params }),
  getById: (id) => API.get(\`/professionals/\${id}\`),
};

export const bookingAPI = {
  create: (data) => API.post('/bookings', data),
  getAll: () => API.get('/bookings'),
  cancel: (id) => API.put(\`/bookings/\${id}/cancel\`),
};

export const messageAPI = {
  getConversations: () => API.get('/messages/conversations'),
  getMessages: (id) => API.get(\`/messages/\${id}\`),
  send: (data) => API.post('/messages', data),
};

export const notificationAPI = {
  getAll: () => API.get('/notifications'),
  markRead: (id) => API.put(\`/notifications/\${id}/read\`),
  markAllRead: () => API.put('/notifications/read-all'),
};

export const progressAPI = {
  getSummary: () => API.get('/progress/summary'),
  getWeekly: () => API.get('/progress/weekly'),
};

export const therapistAPI = {
  apply: (data) => API.post('/therapist/apply', data),
  getAppStatus: () => API.get('/therapist/application/status'),
  getDashboard: () => API.get('/therapist/dashboard'),
  getClients: () => API.get('/therapist/clients'),
  getClient: (id) => API.get(\`/therapist/clients/\${id}\`),
  getClientAssessments: (id) => API.get(\`/therapist/clients/\${id}/assessments\`),
  getClientMood: (id) => API.get(\`/therapist/clients/\${id}/mood\`),
  getClientPlan: (id) => API.get(\`/therapist/clients/\${id}/plan\`),
  getClientSummary: (id) => API.get(\`/therapist/clients/\${id}/summary\`),
  getSessions: () => API.get('/therapist/sessions'),
  createSessionNote: (id, data) => API.post(\`/therapist/sessions/\${id}/notes\`, data),
  getAlerts: () => API.get('/therapist/alerts'),
  getEarnings: () => API.get('/therapist/earnings'),
  setAvailability: (data) => API.put('/therapist/availability', data),
};

export const adminAPI = {
  login: (data) => API.post('/admin/login', data),
  getDashboard: () => API.get('/admin/dashboard'),
  getUsers: () => API.get('/admin/users'),
  updateUserStatus: (id, data) => API.put(\`/admin/users/\${id}/status\`, data),
  getTherapists: () => API.get('/admin/therapists'),
  reviewTherapist: (id, data) => API.put(\`/admin/therapists/\${id}/review\`, data),
  getContent: () => API.get('/admin/content'),
  createContent: (data) => API.post('/admin/content', data),
  updateContent: (id, data) => API.put(\`/admin/content/\${id}\`, data),
  deleteContent: (id) => API.delete(\`/admin/content/\${id}\`),
  getSafety: () => API.get('/admin/safety'),
  getAudit: () => API.get('/admin/audit'),
  getAnalytics: () => API.get('/admin/analytics'),
  getPayments: () => API.get('/admin/payments'),
};`,

  'src/context/AuthContext.jsx': `import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../api/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('mindwell_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authAPI.me();
          setUser(res.data.user);
        } catch (err) {
          console.error('Failed to load user', err);
          localStorage.removeItem('mindwell_token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (data) => {
    const res = await authAPI.login(data);
    localStorage.setItem('mindwell_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (data) => {
    const res = await authAPI.register(data);
    localStorage.setItem('mindwell_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {}
    localStorage.removeItem('mindwell_token');
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);`,

  'src/components/ui/Button.jsx': `import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ 
  children, className, variant = 'primary', size = 'md', loading, disabled, ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-teal text-white hover:bg-teal-dark focus:ring-teal',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary-light focus:ring-primary',
    danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
});`,

  'src/components/ui/Input.jsx': `import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Input = React.forwardRef(({ label, error, helperText, className, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all",
          "disabled:opacity-50 disabled:bg-gray-50",
          error && "border-danger focus:ring-danger focus:border-danger",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger mt-1">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500 mt-1">{helperText}</span>}
    </div>
  );
});`,

  'src/components/ui/Card.jsx': `import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, variant = 'default', padding = 'md', className, ...props }) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-100',
    flat: 'bg-gray-50',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={twMerge(clsx('rounded-xl overflow-hidden', variants[variant], paddings[padding], className))} {...props}>
      {children}
    </div>
  );
};`,
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 1 complete');

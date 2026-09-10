import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/Placeholder.jsx': `import React from 'react';
import { Card } from '../components/ui/Card';
export const Placeholder = ({ title }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">{title}</h1>
    <Card>
      <p className="text-gray-500">This page is currently under construction.</p>
    </Card>
  </div>
);`,

  'src/App.jsx': `import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { UserLayout } from './layouts/UserLayout';
import { TherapistLayout } from './layouts/TherapistLayout';
import { AdminLayout } from './layouts/AdminLayout';

import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';

import { Dashboard as UserDashboard } from './pages/user/Dashboard';
import { Onboarding } from './pages/user/Onboarding';
import { Assessments } from './pages/user/Assessments';
import { Progress } from './pages/user/Progress';
import { MyPlan } from './pages/user/MyPlan';
import { Journal } from './pages/user/Journal';
import { AICoach } from './pages/user/AICoach';

import { TherapistDashboard } from './pages/therapist/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';

import { Placeholder } from './pages/Placeholder';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    if (user.role === 'therapist') return <Navigate to="/therapist/dashboard" />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/app/dashboard" />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/professionals" element={<Placeholder title="Professionals Directory" />} />
      </Route>

      <Route path="/app" element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="progress" element={<Progress />} />
        <Route path="my-plan" element={<MyPlan />} />
        <Route path="journal" element={<Journal />} />
        <Route path="ai-coach" element={<AICoach />} />
        <Route path="professionals" element={<Placeholder title="Professionals" />} />
        <Route path="appointments" element={<Placeholder title="Appointments" />} />
        <Route path="support-circle" element={<Placeholder title="Support Circle" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        <Route path="help" element={<Placeholder title="Help & Safety" />} />
        <Route path="*" element={<Navigate to="/app/dashboard" />} />
      </Route>

      <Route path="/therapist" element={<ProtectedRoute role="therapist"><TherapistLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/therapist/dashboard" />} />
        <Route path="dashboard" element={<TherapistDashboard />} />
        <Route path="clients" element={<Placeholder title="Clients" />} />
        <Route path="sessions" element={<Placeholder title="Sessions" />} />
        <Route path="messages" element={<Placeholder title="Messages" />} />
        <Route path="alerts" element={<Placeholder title="Alerts" />} />
        <Route path="*" element={<Navigate to="/therapist/dashboard" />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Placeholder title="Users" />} />
        <Route path="therapists" element={<Placeholder title="Therapists" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 8 complete');

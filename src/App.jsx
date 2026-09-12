import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';

import { PublicLayout } from './layouts/PublicLayout';
import { UserLayout } from './layouts/UserLayout';
import { TherapistLayout } from './layouts/TherapistLayout';
import { AdminLayout } from './layouts/AdminLayout';

import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';
import { LandingChatbot } from './components/landing/LandingChatbot';

import { Dashboard as UserDashboard } from './pages/user/Dashboard';
import { Onboarding } from './pages/user/Onboarding';
import { AssessmentFlow } from './pages/user/AssessmentFlow';
import { Assessments } from './pages/user/Assessments';
import { WellbeingSnapshot } from './pages/user/WellbeingSnapshot';
import { Progress } from './pages/user/Progress';
import { MyPlan } from './pages/user/MyPlan';
import { Journal } from './pages/user/Journal';
import { AICoach } from './pages/user/AICoach';
import { SupportCircle } from './pages/user/SupportCircle';
import { Professionals } from './pages/user/Professionals';
import { ProfessionalProfile } from './pages/user/ProfessionalProfile';
import { Appointments } from './pages/user/Appointments';
import { Profile as UserProfile } from './pages/user/Profile';
import { Help } from './pages/user/Help';
import { CheckIns } from './pages/user/CheckIns';
import { Resources } from './pages/user/Resources';


import { TherapistDashboard } from './pages/therapist/Dashboard';
import { Application } from './pages/therapist/Application';
import { AppStatus } from './pages/therapist/AppStatus';
import { Clients } from './pages/therapist/Clients';
import { ClientDetail } from './pages/therapist/ClientDetail';
import { Sessions } from './pages/therapist/Sessions';
import { TherapistMessages } from './pages/therapist/Messages';
import { Alerts } from './pages/therapist/Alerts';
import { Earnings } from './pages/therapist/Earnings';

import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminUsers } from './pages/admin/Users';
import { AdminTherapists } from './pages/admin/Therapists';
import { AdminVerification } from './pages/admin/Verification';
import { AdminContent } from './pages/admin/Content';
import { AdminSafety } from './pages/admin/Safety';
import { AdminAudit } from './pages/admin/Audit';
import { AdminAnalytics } from './pages/admin/Analytics';
import { AdminPayments } from './pages/admin/Payments';

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
        <Route path="/" element={<><Landing /><LandingChatbot /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/professionals" element={<Professionals />} />
      </Route>

      <Route path="/app" element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="assessments/:id" element={<AssessmentFlow />} />
        <Route path="snapshot" element={<WellbeingSnapshot />} />
        <Route path="progress" element={<Progress />} />
        <Route path="check-ins" element={<CheckIns />} />
        <Route path="resources" element={<Resources />} />

        <Route path="wellness-plan" element={<MyPlan />} />
        <Route path="journal" element={<Journal />} />
        <Route path="support/companion" element={<AICoach />} />
        <Route path="support/circle" element={<SupportCircle />} />
        <Route path="professionals" element={<Professionals />} />
        <Route path="professionals/:id" element={<ProfessionalProfile />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate to="/app/dashboard" />} />
      </Route>

      <Route path="/therapist" element={<ProtectedRoute role="therapist"><TherapistLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/therapist/dashboard" />} />
        <Route path="dashboard" element={<TherapistDashboard />} />
        <Route path="application" element={<Application />} />
        <Route path="application/status" element={<AppStatus />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<ClientDetail />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="messages" element={<TherapistMessages />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="*" element={<Navigate to="/therapist/dashboard" />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="therapists" element={<AdminTherapists />} />
        <Route path="verification" element={<AdminVerification />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="safety" element={<AdminSafety />} />
        <Route path="audit" element={<AdminAudit />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="payments" element={<AdminPayments />} />
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
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
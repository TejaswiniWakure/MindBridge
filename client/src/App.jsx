import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { ToastProvider } from './context/ToastContext';
import Loader from './components/ui/Loader';

// Lazy Loaded Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const ChooseRole = lazy(() => import('./pages/ChooseRole'));
const RegisterTeen = lazy(() => import('./pages/RegisterTeen'));
const RegisterParent = lazy(() => import('./pages/RegisterParent'));
const RegisterTherapist = lazy(() => import('./pages/RegisterTherapist'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const WelcomeOnboarding = lazy(() => import('./pages/WelcomeOnboarding'));
const ProfileSetup = lazy(() => import('./pages/ProfileSetup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                <Loader size="lg" />
              </div>
            }
          >
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/choose-role" element={<ChooseRole />} />
              
              {/* Role-specific Registrations */}
              <Route path="/register/teen" element={<RegisterTeen />} />
              <Route path="/register/parent" element={<RegisterParent />} />
              <Route path="/register/therapist" element={<RegisterTherapist />} />

              {/* OTP Validation */}
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Password Recovery */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Onboarding slideshow */}
              <Route path="/onboarding" element={<WelcomeOnboarding />} />
              
              {/* Profile configuration */}
              <Route path="/profile-setup" element={<ProfileSetup />} />

              {/* Teen Dashboard Preview Route */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Fallback to Landing Page */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;

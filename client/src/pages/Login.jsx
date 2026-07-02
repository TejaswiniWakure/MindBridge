import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, KeyRound, ArrowLeft, HeartHandshake } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PasswordInput from '../components/ui/PasswordInput';
import Checkbox from '../components/ui/Checkbox';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Logged in successfully! Welcome to MindBridge.', 'success');
      
      // Setup mock local session item so that we simulate authentication
      localStorage.setItem('mindwell_token', 'mock-token-jwt');
      
      // Determine navigation based on mock role or default to teen
      const mockRole = data.email.includes('parent') 
        ? 'parent' 
        : data.email.includes('therapist') 
        ? 'therapist' 
        : 'teen';
        
      navigate('/');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Successfully authenticated via Google!', 'success');
      localStorage.setItem('mindwell_token', 'mock-token-jwt');
      navigate('/');
    }, 1200);
  };

  const handleQuickLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Quick access: Welcome, ${role.toUpperCase()}!`, 'success');
      localStorage.setItem('mindwell_token', 'mock-token-jwt');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-12 px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Professional UI Illustration */}
        <div className="hidden lg:flex lg:col-span-6 flex-col gap-6 p-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-650 to-teal-500 flex items-center justify-center text-white">
              <HeartHandshake size={20} />
            </div>
            <span className="font-heading font-extrabold text-xl text-slate-950 dark:text-white">MindBridge</span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
              A Secure Space for <br />
              <span className="bg-gradient-to-r from-indigo-650 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Family Mental Growth.
              </span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Track wellbeing trends, log mood parameters, write journal reflections, and connect with counselors.
            </p>
          </div>

          {/* Mini Mock Dashboard Widget for premium UI aesthetic */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col gap-3.5 max-w-sm mt-4 select-none">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Parent Summary</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                📈
              </div>
              <div className="flex-grow">
                <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200">Alex's Wellness Score</h4>
                <p className="text-[9px] text-slate-400 mt-0.5">85% positive mood indices (last 7 days)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Box */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col gap-6">
            
            {/* Header Title */}
            <div className="text-center flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-850 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Log into your securely encrypted family portal.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Email */}
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="alex@example.com"
                icon={Mail}
                error={errors.email}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              {/* Password */}
              <div className="flex flex-col gap-1">
                <PasswordInput
                  label="Password"
                  id="password"
                  placeholder="••••••••"
                  error={errors.password}
                  {...register('password', { required: 'Password is required' })}
                />
              </div>

              {/* Remember Me & Forgot Password row */}
              <div className="flex items-center justify-between text-xs mt-1">
                <Checkbox
                  id="rememberMe"
                  label="Remember Me"
                  {...register('rememberMe')}
                />
                <Link
                  to="/forgot-password"
                  className="text-primary-650 hover:underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full py-3 rounded-xl mt-2 font-semibold text-sm"
                isLoading={loading}
              >
                Sign In
              </Button>

              {/* Google login bypass option */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-slate-200 dark:border-slate-750 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl py-2.5 text-xs text-slate-750 dark:text-slate-250 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 active:scale-98"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.486 0-6.313-2.827-6.313-6.314s2.827-6.313 6.313-6.313c1.528 0 2.928.547 4.025 1.458l3.15-3.15C19.06 2.215 15.823 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.866-4.258 10.866-11.24 0-.768-.078-1.523-.223-2.25H12.24z"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>

            {/* Quick Demo select logins */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase text-center tracking-wider">
                Quick Access Demo Portals
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('teen')}
                  className="px-2 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold cursor-pointer text-center select-none"
                >
                  Teen Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('parent')}
                  className="px-2 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-[10px] font-bold cursor-pointer text-center select-none"
                >
                  Parent Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('therapist')}
                  className="px-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold cursor-pointer text-center select-none"
                >
                  Therapist Demo
                </button>
              </div>
            </div>

            {/* Register redirection links */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4 text-center flex flex-col gap-2.5">
              <span className="text-xs text-slate-450">
                Don't have an account?{' '}
                <Link to="/choose-role" className="text-primary-600 hover:underline font-bold">
                  Sign Up Free
                </Link>
              </span>
              <Link to="/" className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:underline mt-1">
                <ArrowLeft size={12} />
                Back to Home Page
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;

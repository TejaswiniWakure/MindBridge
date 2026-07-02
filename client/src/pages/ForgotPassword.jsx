import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { KeyRound, Mail, ArrowLeft, HeartHandshake, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useToast } from '../context/ToastContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      showToast('Password reset link sent to your email!', 'success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
          
          {/* Logo link */}
          <div className="flex flex-col items-center text-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-650 to-teal-500 flex items-center justify-center text-white">
                <HeartHandshake size={18} />
              </div>
              <span className="font-heading font-extrabold text-base text-slate-900 dark:text-white">MindBridge</span>
            </Link>
            
            {!isSent ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center mb-1">
                  <KeyRound size={28} />
                </div>
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Forgot Password?
                </h2>
                <p className="text-xs text-slate-450 dark:text-slate-400 max-w-xs leading-relaxed">
                  Enter your email address and we'll send you an OTP link to reset your account password.
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-655 flex items-center justify-center mb-1">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Check Your Inbox
                </h2>
                <p className="text-xs text-slate-450 dark:text-slate-400 max-w-xs leading-relaxed">
                  We sent instructions to your email to help you recover your password credentials.
                </p>
              </>
            )}
          </div>

          {!isSent ? (
            /* Form input */
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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

              <Button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm"
                isLoading={loading}
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              <Button
                className="w-full py-3 rounded-xl font-semibold text-xs"
                onClick={() => navigate('/reset-password')}
              >
                Go to Reset Password (Demo Bypass)
              </Button>
              <button
                onClick={() => setIsSent(false)}
                className="text-center text-xs text-slate-400 hover:text-slate-600 hover:underline cursor-pointer py-1 font-semibold"
              >
                Didn't receive code? Try again
              </button>
            </div>
          )}

          {/* Back button */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:underline">
              <ArrowLeft size={12} />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

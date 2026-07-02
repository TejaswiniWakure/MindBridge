import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ShieldAlert, ArrowLeft, HeartHandshake, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import PasswordInput from '../components/ui/PasswordInput';
import { useToast } from '../context/ToastContext';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const password = watch('password', '');

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      showToast('Password reset successfully!', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
            
            {!isSuccess ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center mb-1">
                  <ShieldAlert size={28} />
                </div>
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Reset Password
                </h2>
                <p className="text-xs text-slate-450 dark:text-slate-400 max-w-xs leading-relaxed">
                  Enter your new password below. Make sure it matches our safety rules.
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center mb-1">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Password Updated!
                </h2>
                <p className="text-xs text-slate-450 dark:text-slate-400 max-w-xs leading-relaxed">
                  Your new password has been successfully configured. Returning to sign in screen...
                </p>
              </>
            )}
          </div>

          {!isSuccess ? (
            /* Reset Form */
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <PasswordInput
                label="New Password"
                id="password"
                placeholder="••••••••"
                showStrengthMeter
                error={errors.password}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />

              <PasswordInput
                label="Confirm New Password"
                id="confirmPassword"
                placeholder="••••••••"
                error={errors.confirmPassword}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === password || 'Passwords do not match'
                })}
              />

              <Button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm mt-2"
                isLoading={loading}
              >
                Reset Password
              </Button>
            </form>
          ) : (
            <div className="w-8 h-8 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin self-center mt-2" />
          )}

          {/* Back button */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 hover:underline">
              <ArrowLeft size={12} />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

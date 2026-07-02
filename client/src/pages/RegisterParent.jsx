import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Shield, Mail, Lock, User, Phone, Briefcase, HeartHandshake } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PasswordInput from '../components/ui/PasswordInput';
import Dropdown from '../components/ui/Dropdown';
import Checkbox from '../components/ui/Checkbox';
import { useToast } from '../context/ToastContext';

const RegisterParent = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const password = watch('password', '');

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Registration details saved! Please verify your email.', 'success');
      localStorage.setItem('mindbridge_onboarding_role', 'parent');
      navigate('/verify-email');
    }, 1500);
  };

  const relationshipOptions = [
    { label: 'Mother', value: 'mother' },
    { label: 'Father', value: 'father' },
    { label: 'Legal Guardian', value: 'legal-guardian' },
    { label: 'Other', value: 'other' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-650 to-teal-500 flex items-center justify-center text-white">
                <HeartHandshake size={18} />
              </div>
              <span className="font-heading font-extrabold text-base text-slate-900 dark:text-white">MindBridge</span>
            </Link>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-650 dark:text-teal-400 text-[10px] font-bold uppercase tracking-wide">
              <Shield size={10} className="animate-pulse" />
              Parent registration
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-850 dark:text-white mt-1">
              Create Parent Account
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Get wellbeing summaries while protecting your teen's private logs.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            {/* Full Name */}
            <Input
              label="Full Name"
              id="name"
              placeholder="e.g. Robert Johnson"
              icon={User}
              error={errors.name}
              {...register('name', {
                required: 'Full name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' }
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="robert@example.com"
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

              {/* Phone */}
              <Input
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                icon={Phone}
                error={errors.phone}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Please enter a valid international phone number'
                  }
                })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Relationship */}
              <Dropdown
                label="Relationship to Teen"
                id="relationship"
                placeholder="Choose relationship"
                options={relationshipOptions}
                error={errors.relationship}
                {...register('relationship', {
                  required: 'Please select your relationship'
                })}
              />

              {/* Occupation */}
              <Input
                label="Occupation"
                id="occupation"
                placeholder="e.g. Software Engineer"
                icon={Briefcase}
                error={errors.occupation}
                {...register('occupation', {
                  required: 'Occupation is required'
                })}
              />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordInput
                label="Password"
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
                label="Confirm Password"
                id="confirmPassword"
                placeholder="••••••••"
                error={errors.confirmPassword}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === password || 'Passwords do not match'
                })}
              />
            </div>

            {/* Terms Checkbox */}
            <Checkbox
              id="terms"
              label={
                <span>
                  I accept the{' '}
                  <a href="#terms" className="text-primary-600 hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
                </span>
              }
              error={errors.terms}
              {...register('terms', {
                required: 'You must accept the terms and conditions to continue'
              })}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="secondary"
              className="w-full py-3 rounded-xl mt-2 font-semibold text-sm"
              isLoading={loading}
            >
              Register & Continue
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-center flex flex-col gap-2">
            <span className="text-xs text-slate-450">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:underline font-bold">
                Sign In
              </Link>
            </span>
            <span className="text-xs text-slate-450">
              Selected wrong role?{' '}
              <Link to="/choose-role" className="text-indigo-650 hover:underline font-bold">
                Go back to Role Selection
              </Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterParent;

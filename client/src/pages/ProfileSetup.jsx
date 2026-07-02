import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Camera, Save, Globe, Clock, ShieldAlert, Sun, Moon, Bell, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Dropdown from '../components/ui/Dropdown';
import Checkbox from '../components/ui/Checkbox';
import Radio from '../components/ui/Radio';
import { useToast } from '../context/ToastContext';
import ProgressStepper from '../components/ui/ProgressStepper';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish (Español)', value: 'es' },
    { label: 'French (Français)', value: 'fr' },
    { label: 'German (Deutsch)', value: 'de' }
  ];

  const timezoneOptions = [
    { label: 'Eastern Standard Time (EST)', value: 'EST' },
    { label: 'Pacific Standard Time (PST)', value: 'PST' },
    { label: 'Greenwich Mean Time (GMT)', value: 'GMT' },
    { label: 'Central European Time (CET)', value: 'CET' },
    { label: 'Indian Standard Time (IST)', value: 'IST' },
    { label: 'Japan Standard Time (JST)', value: 'JST' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        showToast('Profile picture uploaded!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      showToast('Profile setup complete!', 'success');
      
      // Update system theme class if user selected dark
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 sm:p-10 shadow-xl flex flex-col gap-8 relative overflow-hidden">
          
          {/* Success screen overlay */}
          {isSuccess && (
            <div className="absolute inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-8 gap-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 size={40} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold font-heading text-slate-850 dark:text-white">
                  All Set! Onboarding Complete
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed max-w-sm">
                  Your profile preferences are saved. Redirecting to the Login portal to start your journey...
                </p>
              </div>
              <div className="w-8 h-8 border-4 border-slate-150 border-t-primary-650 rounded-full animate-spin mt-2" />
            </div>
          )}

          {/* Stepper progress indicator */}
          <ProgressStepper
            steps={['Choose Role', 'Account Setup', 'Email Verified', 'Profile Onboarding']}
            currentStep={3}
          />

          {/* Title block */}
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl font-bold font-heading text-slate-850 dark:text-white">
              Setup Your Profile
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Customize your wellness account preferences to customize your dashboard layout.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Avatar upload wrapper */}
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center sm:justify-start">
              <div className="relative group w-24 h-24 rounded-full border border-slate-200 dark:border-slate-850 overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-850">
                {previewImage ? (
                  <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl text-slate-300 dark:text-slate-650">👤</span>
                )}
                {/* Hover overlay trigger */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <Camera size={20} />
                </button>
              </div>
              <div className="text-center sm:text-left flex flex-col gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl px-4 py-2 text-xs font-semibold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Profile Photo
                </Button>
                <span className="text-[10px] text-slate-400">
                  Recommended size: Square JPEG/PNG (Max 2MB)
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Bio info */}
            <Textarea
              label="Tell us about yourself (Bio)"
              id="bio"
              placeholder="e.g. Excited to start my wellness path, learn breathing checks, and share summaries with my therapist."
              error={errors.bio}
              {...register('bio', {
                maxLength: { value: 200, message: 'Bio cannot exceed 200 characters' }
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Language Selector */}
              <Dropdown
                label="Preferred Language"
                id="language"
                options={languageOptions}
                error={errors.language}
                placeholder="Choose Language"
                {...register('language', { required: 'Please select a language preference' })}
              />

              {/* Timezone Selector */}
              <Dropdown
                label="Timezone Settings"
                id="timezone"
                options={timezoneOptions}
                error={errors.timezone}
                placeholder="Choose Timezone"
                {...register('timezone', { required: 'Please configure your timezone' })}
              />
            </div>

            {/* Theme Choice Segment */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                Theme Interface Preference
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Light preview card */}
                <div
                  onClick={() => setTheme('light')}
                  className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 select-none
                    ${theme === 'light'
                      ? 'border-primary-600 bg-primary-50/20'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      <Sun size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-250">Light UI</span>
                  </div>
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === 'light'}
                    onChange={() => setTheme('light')}
                    className="w-4 h-4 text-primary-600 cursor-pointer"
                  />
                </div>

                {/* Dark preview card */}
                <div
                  onClick={() => setTheme('dark')}
                  className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 select-none
                    ${theme === 'dark'
                      ? 'border-primary-600 bg-indigo-950/20'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400">
                      <Moon size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-250">Dark UI</span>
                  </div>
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === 'dark'}
                    onChange={() => setTheme('dark')}
                    className="w-4 h-4 text-primary-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Notification Checkbox settings */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase flex items-center gap-1.5">
                <Bell size={14} /> Notification preferences
              </label>
              <div className="flex flex-col gap-2">
                <Checkbox
                  id="notif_email"
                  label="Email summaries of wellness logs"
                  {...register('notif_email')}
                />
                <Checkbox
                  id="notif_counselor"
                  label="Alert when counseling slot requests open"
                  {...register('notif_counselor')}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-t border-slate-100 dark:border-slate-800/60 pt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert size={14} /> Emergency contact details
                </h4>
                <p className="text-[10px] text-slate-400">
                  Required safety protocol for counselor connectivity triggers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Contact Name"
                  id="emergencyName"
                  placeholder="e.g. Jane Johnson"
                  error={errors.emergencyName}
                  {...register('emergencyName', { required: 'Emergency contact name is required' })}
                />
                <Input
                  label="Relationship"
                  id="emergencyRelation"
                  placeholder="e.g. Aunt"
                  error={errors.emergencyRelation}
                  {...register('emergencyRelation', { required: 'Relationship detail is required' })}
                />
                <Input
                  label="Phone Number"
                  id="emergencyPhone"
                  placeholder="+1 (555) 000-0000"
                  error={errors.emergencyPhone}
                  {...register('emergencyPhone', { required: 'Phone connection is required' })}
                />
              </div>
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mt-4"
              isLoading={loading}
            >
              <Save size={16} />
              Save preferences & finish setup
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;

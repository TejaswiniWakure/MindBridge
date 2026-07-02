import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, UserCheck, HeartHandshake } from 'lucide-react';
import Button from '../components/ui/Button';

const ChooseRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'teen',
      title: 'Teen / Youth',
      description: 'Your safe, private space to track mood, write journals, and get guided AI wellness support.',
      icon: Sparkles,
      color: 'from-indigo-500 to-indigo-650',
      badgeColor: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400',
      illustration: (
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-indigo-500">
          <circle cx="60" cy="60" r="45" fill="currentColor" fillOpacity="0.08" />
          <path d="M60 25 C75 25, 85 35, 85 50 C85 68, 60 90, 60 90 C60 90, 35 68, 35 50 C35 35, 45 25, 60 25 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="50" r="8" fill="currentColor" />
          <circle cx="80" cy="35" r="3" className="animate-ping" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'parent',
      title: 'Parent / Guardian',
      description: 'Understand high-level wellness trends, get updates, and connect with licensed counselors securely.',
      icon: Shield,
      color: 'from-teal-500 to-teal-600',
      badgeColor: 'bg-teal-50 dark:bg-teal-950/40 text-teal-650 dark:text-teal-400',
      illustration: (
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-teal-500">
          <circle cx="60" cy="60" r="45" fill="currentColor" fillOpacity="0.08" />
          <path d="M60 25 L85 38 L85 70 C85 85, 60 95, 60 95 C60 95, 35 85, 35 70 L35 38 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 58 L57 65 L70 50" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'therapist',
      title: 'Licensed Therapist',
      description: 'Manage client schedules, log clinical records, and support family communication in a secure environment.',
      icon: UserCheck,
      color: 'from-amber-500 to-amber-600',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/40 text-amber-650 dark:text-amber-400',
      illustration: (
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-amber-500">
          <circle cx="60" cy="60" r="45" fill="currentColor" fillOpacity="0.08" />
          <rect x="40" y="40" width="40" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="60" cy="55" r="6" fill="currentColor" />
          <path d="M48 72 C48 66, 72 66, 72 72" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const handleContinue = (roleId) => {
    navigate(`/register/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-6">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white">
              <HeartHandshake size={20} />
            </div>
            <span className="font-heading font-extrabold text-lg text-slate-950 dark:text-white">MindBridge</span>
          </Link>
          <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Choose Your Role
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
            To start your journey with MindBridge, please select the portal that matches your purpose.
          </p>
        </div>

        {/* Roles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <motion.div
                key={role.id}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedRole(role.id)}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between items-center gap-6 text-center cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden select-none
                  ${isSelected
                    ? 'border-primary-600 ring-2 ring-primary-500/20'
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md'
                  }
                `}
              >
                {/* Glow Backdrop */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary-500/10 blur-xl pointer-events-none" />
                )}

                {/* Illustration Area */}
                <div className="py-4">
                  {role.illustration}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider self-center ${role.badgeColor}`}>
                    {role.id}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-heading">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                    {role.description}
                  </p>
                </div>

                {/* Continue button for role card */}
                <Button
                  variant={isSelected ? 'primary' : 'outline'}
                  className="w-full mt-2 rounded-xl flex items-center justify-center gap-2 group text-xs py-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContinue(role.id);
                  }}
                >
                  Continue
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Back navigation links */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:underline font-semibold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;

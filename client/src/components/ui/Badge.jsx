import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350',
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-350',
    secondary: 'bg-secondary-50 text-secondary-700 dark:bg-secondary-950/30 dark:text-secondary-350',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-350',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-350',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-350',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

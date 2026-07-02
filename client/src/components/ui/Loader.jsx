import React from 'react';

const Loader = ({ type = 'spinner', size = 'md', className = '' }) => {
  const spinnerSizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse flex flex-col gap-3 w-full ${className}`}>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-1/3" />
        <div className="h-10 bg-slate-250 dark:bg-slate-750 rounded-xl w-full" />
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl w-full" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${spinnerSizes[size]} border-slate-200 dark:border-slate-700 border-t-primary-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;

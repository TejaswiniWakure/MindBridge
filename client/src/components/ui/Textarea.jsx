import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  id,
  className = '',
  rows = 4,
  helperText,
  ...props
}, ref) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl text-sm focus:outline-none transition-all duration-200 resize-y
          ${error 
            ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50' 
            : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
          }
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

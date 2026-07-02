import React, { forwardRef } from 'react';

const Checkbox = forwardRef(({
  label,
  id,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="inline-flex items-start gap-2.5 cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="sr-only peer"
          {...props}
        />
        <div className="w-5 h-5 rounded-lg border border-slate-250 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 peer-checked:bg-primary-600 peer-checked:border-primary-600 transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-100 dark:peer-focus-visible:ring-primary-900/30">
          <svg
            className="w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform duration-150"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {label && (
          <span className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
            {label}
          </span>
        )}
      </label>
      {error && (
        <span className="text-xs text-red-500 font-medium ml-7">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

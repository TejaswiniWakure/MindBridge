import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  error,
  id,
  className = '',
  placeholder,
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
      <select
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-sm focus:outline-none transition-all duration-200 cursor-pointer appearance-none
          ${error 
            ? 'border-red-500 text-red-900 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50' 
            : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
          }
        `}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

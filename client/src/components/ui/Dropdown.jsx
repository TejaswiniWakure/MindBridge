import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = forwardRef(({
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
          className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          ref={ref}
          id={id}
          className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-sm focus:outline-none transition-all duration-200 cursor-pointer appearance-none pr-10
            ${error 
              ? 'border-red-500 text-red-900 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50' 
              : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
            }
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="dark:bg-slate-800">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 text-slate-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-550 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;

import React, { forwardRef } from 'react';

const Radio = forwardRef(({
  label,
  id,
  name,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="inline-flex items-center gap-2.5 cursor-pointer select-none">
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          className="sr-only peer"
          {...props}
        />
        <div className="w-5 h-5 rounded-full border border-slate-250 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 peer-checked:border-primary-600 transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-100 dark:peer-focus-visible:ring-primary-900/30">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-150" />
        </div>
        {label && (
          <span className="text-xs text-slate-650 dark:text-slate-350 leading-snug">
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

Radio.displayName = 'Radio';

export default Radio;

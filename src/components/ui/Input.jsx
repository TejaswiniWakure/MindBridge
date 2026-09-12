import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Input = React.forwardRef(({ label, error, helperText, className, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all",
          "disabled:opacity-50 disabled:bg-gray-50",
          error && "border-danger focus:ring-danger focus:border-danger",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger mt-1">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500 mt-1">{helperText}</span>}
    </div>
  );
});
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, variant = 'default', padding = 'md', className, ...props }) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-100',
    flat: 'bg-gray-50',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={twMerge(clsx('rounded-xl overflow-hidden', variants[variant], paddings[padding], className))} {...props}>
      {children}
    </div>
  );
};
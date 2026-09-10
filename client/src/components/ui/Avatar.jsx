import React from 'react';
import { clsx } from 'clsx';

export const Avatar = ({ name, src, size = 'md', className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl'
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';

  return (
    <div className={clsx("rounded-full flex items-center justify-center bg-sage-light text-primary-dark font-semibold shrink-0 overflow-hidden", sizes[size], className)}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  );
};
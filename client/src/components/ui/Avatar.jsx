import React from 'react';

const Avatar = ({ src, name = '', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative flex-shrink-0 rounded-full overflow-hidden select-none ${sizes[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : null}
      {/* Fallback Initials UI (shown if no src, or if image fails to load) */}
      <div className="absolute inset-0 flex items-center justify-center bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-350 font-medium">
        {getInitials(name) || '?'}
      </div>
    </div>
  );
};

export default Avatar;

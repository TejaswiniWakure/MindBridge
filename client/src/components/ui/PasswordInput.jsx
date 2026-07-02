import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const PasswordInput = forwardRef(({
  label,
  error,
  id,
  className = '',
  showStrengthMeter = false,
  onChange,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');

  const toggleVisibility = () => setShowPassword(!showPassword);

  const getStrength = (val) => {
    let score = 0;
    if (!val) return { score: 0, text: 'Very Weak', color: 'bg-red-500' };
    if (val.length >= 6) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    switch (score) {
      case 0:
      case 1:
        return { score: 25, text: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
      case 2:
        return { score: 50, text: 'Fair', color: 'bg-orange-500', textColor: 'text-orange-500' };
      case 3:
        return { score: 75, text: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
      case 4:
        return { score: 100, text: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
      default:
        return { score: 0, text: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
    }
  };

  const handleTextChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  const strength = getStrength(value);

  // Requirements checklist
  const requirements = [
    { label: 'At least 6 characters', valid: value.length >= 6 },
    { label: 'At least one number', valid: /[0-9]/.test(value) },
    { label: 'At least one uppercase letter', valid: /[A-Z]/.test(value) },
    { label: 'At least one special character', valid: /[^A-Za-z0-9]/.test(value) }
  ];

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
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          id={id}
          onChange={handleTextChange}
          className={`w-full pl-4 pr-11 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-sm focus:outline-none transition-all duration-200
            ${error 
              ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50' 
              : 'border-slate-200 dark:border-slate-750 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
            }
          `}
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}

      {showStrengthMeter && value && (
        <div className="mt-2 flex flex-col gap-2 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
            <span className="text-slate-400 dark:text-slate-550">Password Strength</span>
            <span className={strength.textColor}>{strength.text}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-750 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} transition-all duration-300`}
              style={{ width: `${strength.score}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-450">
                {req.valid ? (
                  <Check size={10} className="text-emerald-500" />
                ) : (
                  <X size={10} className="text-slate-300 dark:text-slate-700" />
                )}
                <span className={req.valid ? 'text-slate-700 dark:text-slate-250 font-medium' : ''}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

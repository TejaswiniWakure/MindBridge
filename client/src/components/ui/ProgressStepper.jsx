import React from 'react';
import { Check } from 'lucide-react';

const ProgressStepper = ({ steps = [], currentStep = 0, className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-between relative ${className}`}>
      {/* Background Line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 dark:bg-slate-800 z-0" />
      
      {/* Active Fill Line */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary-600 transition-all duration-500 ease-in-out z-0"
        style={{ width: `${(currentStep / Math.max(steps.length - 1, 1)) * 100}%` }}
      />

      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex flex-col items-center gap-1.5 relative z-10">
            {/* Step Bubble */}
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-heading text-xs font-bold transition-all duration-300
                ${isCompleted
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                  : isActive
                  ? 'bg-white dark:bg-slate-800 border-primary-600 text-primary-650 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-400 dark:text-slate-650'
                }
              `}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : index + 1}
            </div>
            {/* Step Label */}
            <span
              className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block
                ${isActive
                  ? 'text-primary-650 dark:text-primary-400 font-extrabold'
                  : isCompleted
                  ? 'text-slate-700 dark:text-slate-300'
                  : 'text-slate-400 dark:text-slate-600'
                }
              `}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;

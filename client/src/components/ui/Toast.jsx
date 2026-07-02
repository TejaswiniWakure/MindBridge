import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const Toast = ({
  message,
  type = 'info', // 'success', 'warning', 'error', 'info'
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const borderColors = {
    success: 'border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20',
    warning: 'border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20',
    error: 'border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20',
    info: 'border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      className={`flex items-center gap-3.5 px-4.5 py-3.5 rounded-xl border shadow-lg max-w-sm backdrop-blur-md ${borderColors[type]} border-slate-100 dark:border-slate-800`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-250 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default Toast;

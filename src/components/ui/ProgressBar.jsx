import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const ProgressBar = ({ progress, className, colorClass = 'bg-teal' }) => {
  return (
    <div className={clsx("h-2 w-full bg-gray-100 rounded-full overflow-hidden", className)}>
      <motion.div 
        className={clsx("h-full rounded-full", colorClass)}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const Tabs = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={clsx("flex overflow-x-auto hide-scrollbar border-b border-gray-200", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative",
            activeTab === tab.id ? "text-teal-dark" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal"
              initial={false}
            />
          )}
        </button>
      ))}
    </div>
  );
};
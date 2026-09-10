import React from 'react';
import { Button } from './Button';
export const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-dashed border-gray-300">
    {Icon && <div className="bg-gray-50 p-4 rounded-full mb-4 text-gray-400"><Icon size={32} /></div>}
    <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
    {actionText && <Button onClick={onAction}>{actionText}</Button>}
  </div>
);
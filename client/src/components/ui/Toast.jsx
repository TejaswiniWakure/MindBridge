import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-success" size={20} />,
    error: <XCircle className="text-danger" size={20} />,
    warning: <AlertTriangle className="text-warning" size={20} />,
    info: <Info className="text-teal" size={20} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100 flex items-start gap-3 min-w-[300px]"
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm font-medium text-gray-800">{message}</div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
    </motion.div>
  );
};
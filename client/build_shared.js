import fs from 'fs';
import path from 'path';

const files = {
  'src/components/ui/Modal.jsx': `import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="font-semibold text-lg text-primary">{title}</h3>
                <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};`,

  'src/components/ui/Toast.jsx': `import React, { createContext, useContext, useState } from 'react';
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
};`,

  'src/components/ui/Tabs.jsx': `import React from 'react';
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
};`,

  'src/components/ui/ProgressBar.jsx': `import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const ProgressBar = ({ progress, className, colorClass = 'bg-teal' }) => {
  return (
    <div className={clsx("h-2 w-full bg-gray-100 rounded-full overflow-hidden", className)}>
      <motion.div 
        className={clsx("h-full rounded-full", colorClass)}
        initial={{ width: 0 }}
        animate={{ width: \`\${Math.min(100, Math.max(0, progress))}%\` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};`,

  'src/components/ui/Avatar.jsx': `import React from 'react';
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
};`,

  'src/components/charts/MoodChart.jsx': `import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MoodChart = ({ data }) => {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">No mood data available</div>;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: '#888', marginBottom: '4px' }}
          />
          <Line type="monotone" dataKey="score" stroke="#5b8e7d" strokeWidth={3} dot={{ r: 4, fill: '#5b8e7d', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#3d6b5a' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};`,

  'src/components/charts/ProgressChart.jsx': `import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ProgressChart = ({ data }) => {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">No progress data available</div>;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <Tooltip cursor={{ fill: '#f8f6f3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={\`cell-\${index}\`} fill={entry.value > 70 ? '#5b8e7d' : entry.value > 40 ? '#9cb4a5' : '#d4e4db'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};`,

  'src/components/charts/AssessmentChart.jsx': `import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const AssessmentChart = ({ data }) => {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">No assessment data available</div>;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Score" dataKey="A" stroke="#5b8e7d" fill="#5b8e7d" fillOpacity={0.4} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};`,

  'src/components/landing/LandingChatbot.jsx': `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot } from 'lucide-react';
import { Button } from '../ui/Button';

export const LandingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Hi! I am the Mindwell Assistant. How can I help you learn about our platform?' }]);
  const [isTyping, setIsTyping] = useState(false);

  const faqs = [
    { q: 'How does Mindwell work?', a: 'Mindwell uses initial assessments to understand your wellbeing, then creates a personalized daily plan with tasks, journaling, and AI coaching.' },
    { q: 'How do I get started?', a: 'You can get started by clicking "Sign Up" and creating an account. We will guide you through a brief onboarding process to set up your profile.' },
    { q: 'Can I talk to a therapist?', a: 'Yes! Mindwell offers a directory of verified mental health professionals you can connect and book sessions with directly through the platform.' },
    { q: 'How does privacy work?', a: 'Your privacy is our priority. We use end-to-end encryption and you explicitly control what data is shared with AI or your therapist.' }
  ];

  const handleAsk = (faq) => {
    setMessages(prev => [...prev, { role: 'user', content: faq.q }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: faq.a }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={\`fixed bottom-6 right-6 p-4 rounded-full bg-teal text-white shadow-lg hover:bg-teal-dark transition-transform hover:scale-105 z-40 \${isOpen ? 'hidden' : 'block'}\`}
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-medium">Mindwell Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                  <div className={\`max-w-[85%] p-3 rounded-2xl text-sm \${msg.role === 'user' ? 'bg-teal text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}\`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-white border-t border-gray-100 flex flex-wrap gap-2">
              {faqs.map((faq, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAsk(faq)}
                  className="text-xs px-3 py-1.5 bg-sage-light text-primary-dark hover:bg-sage transition-colors rounded-full text-left"
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build shared complete');

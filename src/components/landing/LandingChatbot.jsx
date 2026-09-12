import React, { useState } from 'react';
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
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-teal text-white shadow-lg hover:bg-teal-dark transition-transform hover:scale-105 z-40 ${isOpen ? 'hidden' : 'block'}`}
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
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-teal text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
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
};
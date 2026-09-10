import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Bot, Send, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AICoach = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: "Hello. I'm your wellness companion. How can I support you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, role: 'assistant', text: "I hear you. Let's talk it through and find a small next step together." }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Your Wellness Companion</h1>
        <p className="text-[#555555] max-w-lg mx-auto">A space to talk things through, reflect, and find a small next step.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['Talk it through', 'Help me make a plan', 'Try a quick reset', 'Just listen'].map(btn => (
          <button key={btn} className="bg-white border border-[#DCDCDC] text-[#555555] font-medium px-4 py-2 rounded-full hover:border-[#202020] hover:text-[#181818] transition-colors text-sm">
            {btn}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white border border-[#DCDCDC] rounded-3xl flex flex-col overflow-hidden shadow-sm relative">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(m => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'assistant' ? 'bg-[#202020] text-white' : 'bg-[#EEEEEC] text-[#202020]'}`}>
                {m.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] rounded-2xl p-4 text-sm ${m.role === 'user' ? 'bg-[#EEEEEC] text-[#181818] rounded-tr-sm' : 'bg-white border border-[#DCDCDC] text-[#555555] rounded-tl-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-[#EEEEEC]">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-[#F6F6F4] border border-[#DCDCDC] rounded-full pl-5 pr-12 py-3 focus:outline-none focus:border-[#202020] transition-colors"
            />
            <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#202020] text-white rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

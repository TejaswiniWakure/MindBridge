import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/user/Journal.jsx': `import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { BookHeart, Plus, Search } from 'lucide-react';

export const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const newEntry = { id: Date.now(), title, content, date: new Date().toISOString() };
    setEntries([newEntry, ...entries]);
    setIsNew(false);
    setTitle('');
    setContent('');
  };

  if (isNew) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-primary">New Entry</h2>
          <Button variant="ghost" onClick={() => setIsNew(false)}>Cancel</Button>
        </div>
        <Card className="space-y-4">
          <Input placeholder="Entry Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:outline-none resize-none"
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!title || !content}>Save Entry</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-primary">Journal</h1>
        <Button onClick={() => setIsNew(true)} className="gap-2"><Plus size={18} /> New Entry</Button>
      </div>
      
      {entries.length === 0 ? (
        <EmptyState 
          icon={BookHeart} 
          title="No journal entries yet" 
          description="Start documenting your thoughts, feelings, and progress."
          actionText="Write your first entry"
          onAction={() => setIsNew(true)}
        />
      ) : (
        <div className="grid gap-4">
          {entries.map(entry => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-lg">{entry.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{new Date(entry.date).toLocaleDateString()}</p>
              <p className="text-gray-700 line-clamp-2">{entry.content}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};`,

  'src/pages/user/AICoach.jsx': `import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Send, Bot, User } from 'lucide-react';

export const AICoach = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your Mindwell AI Coach. I can help you reflect on your day, guide you through a breathing exercise, or discuss concepts from your plan. How can I support you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'I hear you. Could you tell me a bit more about how that is making you feel?' }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="bg-sage-light text-primary-dark p-3 rounded-t-xl text-sm flex items-center justify-center gap-2">
        <span className="font-medium">Disclaimer:</span> AI support is informational and does not replace professional care.
      </div>
      <Card className="flex-1 rounded-t-none flex flex-col overflow-hidden p-0 border-t-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={\`flex gap-3 \${msg.role === 'user' ? 'flex-row-reverse' : ''}\`}>
              <div className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${msg.role === 'user' ? 'bg-teal text-white' : 'bg-primary text-white'}\`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={\`px-4 py-2 rounded-2xl max-w-[80%] \${msg.role === 'user' ? 'bg-teal text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}\`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
          <Input 
            placeholder="Type your message..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            className="flex-1 mb-0"
          />
          <Button onClick={handleSend}><Send size={18} /></Button>
        </div>
      </Card>
    </div>
  );
};`,

  'src/pages/user/MyPlan.jsx': `import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { CheckCircle2, Circle, Clock, Target } from 'lucide-react';

export const MyPlan = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Check-in', type: 'Journal', duration: '5 min', done: true },
    { id: 2, title: 'Understanding Anxiety Cycle', type: 'Learn', duration: '10 min', done: false },
    { id: 3, title: 'Box Breathing Exercise', type: 'Practice', duration: '5 min', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const progress = Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary mb-2">My Plan</h1>
        <p className="text-gray-600">Week 2: Building Awareness</p>
      </div>

      <Card className="bg-gradient-to-r from-primary to-primary-dark text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Weekly Progress</h2>
            <p className="text-primary-light text-sm opacity-80">{tasks.filter(t => t.done).length} of {tasks.length} tasks completed</p>
          </div>
          <div className="text-3xl font-bold text-teal">{progress}%</div>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-teal transition-all duration-500" style={{ width: \`\${progress}%\` }}></div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <Target className="text-teal" size={20} /> Today's Modules
        </h3>
        
        {tasks.map(task => (
          <Card key={task.id} className={\`transition-all \${task.done ? 'bg-gray-50 border-gray-200' : 'hover:shadow-md border-teal-light'}\`}>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
              {task.done ? (
                <CheckCircle2 className="text-teal w-8 h-8 shrink-0" />
              ) : (
                <Circle className="text-gray-300 w-8 h-8 shrink-0 hover:text-teal transition-colors" />
              )}
              <div className="flex-1">
                <h4 className={\`font-semibold text-lg \${task.done ? 'text-gray-500 line-through' : 'text-gray-900'}\`}>{task.title}</h4>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{task.type}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12}/> {task.duration}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 5 complete');

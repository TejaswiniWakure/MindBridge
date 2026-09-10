import React, { useState } from 'react';
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
};
import React, { useState } from 'react';
import { PlayCircle, Headphones, BookOpen, PenTool } from 'lucide-react';

const mockResources = [
  { title: '5-Minute Stress Reset', desc: 'A short guided exercise for moments when everything feels overwhelming.', type: 'Audio', duration: '5 min', topic: 'Stress', icon: Headphones },
  { title: 'Sleep Wind-Down', desc: 'Prepare your mind and body for deep rest.', type: 'Activity', duration: '8 min', topic: 'Sleep', icon: PlayCircle },
  { title: 'Evening Reflection', desc: 'Process the day before bed.', type: 'Journal', duration: '5 min', topic: 'Sleep', icon: PenTool },
];

export const Resources = () => {
  const [tab, setTab] = useState('for-you');

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="mb-6 border-b border-[#DCDCDC] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Resources</h1>
          <p className="text-[#555555]">Explore personalized wellness content.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setTab('for-you')} className={`pb-2 px-2 text-sm font-bold tracking-widest uppercase transition-colors ${tab === 'for-you' ? 'border-b-2 border-[#202020] text-[#181818]' : 'text-[#858585] border-b-2 border-transparent hover:text-[#555555]'}`}>For You</button>
          <button onClick={() => setTab('explore')} className={`pb-2 px-2 text-sm font-bold tracking-widest uppercase transition-colors ${tab === 'explore' ? 'border-b-2 border-[#202020] text-[#181818]' : 'text-[#858585] border-b-2 border-transparent hover:text-[#555555]'}`}>Explore</button>
        </div>
      </div>

      {tab === 'for-you' ? (
        <div className="space-y-6">
          <div className="bg-[#EEEEEC] p-6 rounded-2xl border border-[#DCDCDC]">
            <p className="text-[#555555]">Because you're currently focusing on <strong className="text-[#181818]">Stress + Sleep</strong>:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResources.map((rec, i) => (
              <div key={i} className="bg-white border border-[#DCDCDC] p-6 rounded-3xl shadow-sm flex flex-col cursor-pointer hover:border-[#202020] transition-colors group">
                <div className="bg-[#F6F6F4] p-3 rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-[#202020] group-hover:text-white transition-colors text-[#555555] mb-6">
                  <rec.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#181818] text-lg mb-2">{rec.title}</h4>
                <p className="text-sm text-[#555555] mb-6 flex-1">{rec.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#EEEEEC]">
                  <span className="text-xs font-bold text-[#858585] uppercase tracking-widest">{rec.type} · {rec.duration}</span>
                  <button className="text-sm font-bold text-[#181818]">Start</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            {['All', 'Stress', 'Anxiety', 'Mood', 'Sleep', 'Focus', 'Relationships', 'Wellbeing'].map(cat => (
              <button key={cat} className="px-5 py-2 rounded-full border border-[#DCDCDC] bg-white text-[#555555] text-sm font-medium hover:border-[#202020] hover:text-[#181818] transition-colors">
                {cat}
              </button>
            ))}
          </div>
          {/* Mock explore list */}
          <p className="text-[#858585] italic">Select a category to explore available resources.</p>
        </div>
      )}
    </div>
  );
};

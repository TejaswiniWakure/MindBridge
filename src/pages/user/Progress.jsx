import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockTrendData = [
  { name: 'Mon', stress: 5, sleep: 2, mood: 3, energy: 3 },
  { name: 'Tue', stress: 4, sleep: 2, mood: 3, energy: 4 },
  { name: 'Wed', stress: 4, sleep: 3, mood: 4, energy: 3 },
  { name: 'Thu', stress: 3, sleep: 4, mood: 4, energy: 4 },
  { name: 'Fri', stress: 2, sleep: 5, mood: 5, energy: 5 },
];

export const Progress = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
      
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Your Progress</h1>
        <p className="text-[#555555]">Track your wellbeing journey over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Assessment Progress */}
        <div className="md:col-span-1 space-y-6">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4">Assessment Progress</h2>
          <div className="bg-white p-6 rounded-3xl border border-[#DCDCDC] shadow-sm space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#181818]">PHQ-9</span>
                <span className="text-[#555555] font-medium text-sm">11 <span className="mx-1 text-[#DCDCDC]">→</span> <span className="text-[#202020]">7</span></span>
              </div>
              <p className="text-xs text-[#858585]">Mood & Depression</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#181818]">GAD-7</span>
                <span className="text-[#555555] font-medium text-sm">6 <span className="mx-1 text-[#DCDCDC]">→</span> <span className="text-[#202020]">4</span></span>
              </div>
              <p className="text-xs text-[#858585]">Anxiety & Worry</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#181818]">WHO-5</span>
                <span className="text-[#555555] font-medium text-sm">52 <span className="mx-1 text-[#DCDCDC]">→</span> <span className="text-[#202020]">64</span></span>
              </div>
              <p className="text-xs text-[#858585]">General Wellbeing</p>
            </div>
          </div>

          <h2 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4 mt-10">Journey Activity</h2>
          <div className="bg-[#202020] text-white p-6 rounded-3xl shadow-lg space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[#EEEEEC] text-sm">CHECK-INS</span>
              <span className="font-bold">18 completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#EEEEEC] text-sm">RESOURCES</span>
              <span className="font-bold">12 completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#EEEEEC] text-sm">PLAN</span>
              <span className="font-bold">74% completed</span>
            </div>
          </div>
        </div>

        {/* Daily Trends */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4">Daily Trends</h2>
          
          <div className="space-y-6">
            
            {/* Stress Chart */}
            <div className="bg-white p-6 rounded-3xl border border-[#DCDCDC] shadow-sm">
              <h3 className="font-bold text-[#181818] mb-6">Stress Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEEEC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#858585', fontSize: 12}} dy={10} />
                    <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} axisLine={false} tickLine={false} tick={{fill: '#858585', fontSize: 12}} dx={-10} />
                    <Tooltip cursor={{stroke: '#DCDCDC'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="stress" stroke="#202020" strokeWidth={3} dot={{r: 4, fill: '#202020', strokeWidth: 0}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sleep Chart */}
            <div className="bg-white p-6 rounded-3xl border border-[#DCDCDC] shadow-sm">
              <h3 className="font-bold text-[#181818] mb-6">Sleep Quality</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEEEC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#858585', fontSize: 12}} dy={10} />
                    <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} axisLine={false} tickLine={false} tick={{fill: '#858585', fontSize: 12}} dx={-10} />
                    <Tooltip cursor={{stroke: '#DCDCDC'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="sleep" stroke="#202020" strokeWidth={3} dot={{r: 4, fill: '#202020', strokeWidth: 0}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Reassessment Notification */}
      <div className="bg-[#EEEEEC] p-8 rounded-3xl text-center border border-[#DCDCDC] mt-12">
        <h3 className="text-xl font-serif font-bold text-[#181818] mb-2">A DEEPER CHECK-IN IS READY</h3>
        <p className="text-[#555555] mb-6 max-w-md mx-auto">You've been on this journey for a while. Would you like to check in more deeply?</p>
        <button className="bg-[#202020] text-white px-8 py-3 rounded-full font-bold hover:bg-[#333333] transition-colors shadow-sm">
          Start Reassessment
        </button>
      </div>

    </div>
  );
};

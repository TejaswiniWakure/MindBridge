import React from 'react';

const mockCheckins = [
  { date: 'Today', mood: 4, stress: 3, energy: 4, sleep: 2, note: '' },
  { date: 'Yesterday', mood: 3, stress: 4, energy: 3, sleep: 2, note: 'Had a long meeting, felt drained.' },
  { date: 'Sep 12', mood: 5, stress: 2, energy: 4, sleep: 3, note: 'Relaxing weekend.' },
];

export const CheckIns = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Your Check-ins</h1>
        <p className="text-[#555555]">A history of how you've been feeling.</p>
      </div>

      <div className="space-y-6">
        {mockCheckins.map((item, idx) => (
          <div key={idx} className="bg-white border border-[#DCDCDC] p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-bold text-[#181818] border-b border-[#EEEEEC] pb-3">{item.date}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-xs tracking-widest text-[#858585] uppercase mb-1">Mood</div>
                <div className="font-medium text-[#202020] text-lg">{item.mood}/5</div>
              </div>
              <div>
                <div className="text-xs tracking-widest text-[#858585] uppercase mb-1">Stress</div>
                <div className="font-medium text-[#202020] text-lg">{item.stress}/5</div>
              </div>
              <div>
                <div className="text-xs tracking-widest text-[#858585] uppercase mb-1">Energy</div>
                <div className="font-medium text-[#202020] text-lg">{item.energy}/5</div>
              </div>
              <div>
                <div className="text-xs tracking-widest text-[#858585] uppercase mb-1">Sleep</div>
                <div className="font-medium text-[#202020] text-lg">{item.sleep}/5</div>
              </div>
            </div>
            {item.note && (
              <div className="bg-[#F6F6F4] p-4 rounded-xl text-sm text-[#555555] border border-[#EEEEEC]">
                <span className="font-bold text-[#181818]">Note:</span> {item.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

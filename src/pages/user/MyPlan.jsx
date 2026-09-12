import React from 'react';
import { Card } from '../../components/ui/Card';
import { Check, Circle } from 'lucide-react';

export const MyPlan = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Your Wellness Plan</h1>
        <p className="text-[#555555]">Designed around your goals, patterns, and progress.</p>
      </div>

      {/* Overview Card */}
      <div className="bg-[#202020] text-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-serif font-bold mb-1">14-Day Stress + Sleep Plan</h2>
        <p className="text-[#EEEEEC] opacity-90 mb-8">Day 6 of 14</p>
        
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span className="text-[#EEEEEC]">Progress</span>
          <span className="text-white">4 / 6 activities completed</span>
        </div>
        <div className="h-2 w-full bg-[#333333] rounded-full overflow-hidden">
          <div className="h-full bg-white w-2/3 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Meta info) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#DCDCDC] shadow-sm">
            <h3 className="text-[10px] font-bold text-[#858585] tracking-widest uppercase mb-3">Primary Focus</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#F6F6F4] text-[#181818] text-sm font-medium rounded-md border border-[#EEEEEC]">Stress</span>
              <span className="px-3 py-1 bg-[#F6F6F4] text-[#181818] text-sm font-medium rounded-md border border-[#EEEEEC]">Sleep</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#DCDCDC] shadow-sm">
            <h3 className="text-[10px] font-bold text-[#858585] tracking-widest uppercase mb-3">Current Phase</h3>
            <div className="font-bold text-[#181818] mb-1">PHASE 02 — BUILD</div>
            <div className="text-sm text-[#555555]">Days 4–10</div>
          </div>

          <div className="bg-[#F6F6F4] p-6 rounded-2xl border border-[#DCDCDC]">
            <h3 className="text-[10px] font-bold text-[#858585] tracking-widest uppercase mb-3">Why This Plan</h3>
            <p className="text-sm text-[#555555] leading-relaxed">
              Your recent responses and check-ins suggest that stress and sleep are useful areas to focus on. 
              This structured path builds daily resilience while promoting deeper rest.
            </p>
          </div>
        </div>

        {/* Right Column (Activities) */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-[10px] font-bold text-[#858585] tracking-widest uppercase mb-4 pl-2">Today's Activities</h3>
          
          <div className="space-y-3">
            {/* Completed Task */}
            <div className="bg-white p-5 rounded-2xl border border-[#DCDCDC] flex items-center gap-4 opacity-75">
              <div className="w-6 h-6 rounded-full bg-[#202020] text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <div>
                <h4 className="font-semibold text-[#858585] line-through">Morning check-in</h4>
                <p className="text-xs text-[#858585]">Completed at 09:00 AM</p>
              </div>
            </div>

            {/* Pending Task */}
            <div className="bg-white p-5 rounded-2xl border border-[#DCDCDC] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#202020] transition-colors group">
              <div className="w-6 h-6 rounded-full border-2 border-[#DCDCDC] bg-white group-hover:border-[#202020] shrink-0 transition-colors"></div>
              <div>
                <h4 className="font-semibold text-[#181818]">5-minute stress reset</h4>
                <p className="text-xs text-[#555555] mt-0.5">Audio · 5 min</p>
              </div>
            </div>

            {/* Pending Task */}
            <div className="bg-white p-5 rounded-2xl border border-[#DCDCDC] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#202020] transition-colors group">
              <div className="w-6 h-6 rounded-full border-2 border-[#DCDCDC] bg-white group-hover:border-[#202020] shrink-0 transition-colors"></div>
              <div>
                <h4 className="font-semibold text-[#181818]">Sleep wind-down</h4>
                <p className="text-xs text-[#555555] mt-0.5">Activity · 8 min</p>
              </div>
            </div>

            {/* Pending Task */}
            <div className="bg-white p-5 rounded-2xl border border-[#DCDCDC] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#202020] transition-colors group">
              <div className="w-6 h-6 rounded-full border-2 border-[#DCDCDC] bg-white group-hover:border-[#202020] shrink-0 transition-colors"></div>
              <div>
                <h4 className="font-semibold text-[#181818]">Evening reflection</h4>
                <p className="text-xs text-[#555555] mt-0.5">Journal · 5 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

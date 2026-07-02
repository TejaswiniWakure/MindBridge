import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Heart, Bell, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('parent');

  const moodData = [
    { label: 'Mon', val: 70 },
    { label: 'Tue', val: 75 },
    { label: 'Wed', val: 62 },
    { label: 'Thu', val: 80 },
    { label: 'Fri', val: 85 },
    { label: 'Sat', val: 90 },
    { label: 'Sun', val: 88 },
  ];

  return (
    <section id="resources" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold text-indigo-650 uppercase tracking-widest">
            Product Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            See the Platform in Action
          </h2>
          <p className="text-sm text-slate-500">
            A beautiful, clean interface that provides real-time wellness guidance without compromising user privacy.
          </p>

          {/* Toggle buttons between Parent and Teen view */}
          <div className="inline-flex p-1 bg-slate-200/50 border border-slate-200 rounded-xl self-center mt-4">
            <button
              onClick={() => setActiveTab('parent')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                activeTab === 'parent'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parent Dashboard
            </button>
            <button
              onClick={() => setActiveTab('teen')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                activeTab === 'teen'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teen Dashboard
            </button>
          </div>
        </div>

        {/* Laptop Mockup Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Laptop Screen Frame */}
          <div className="relative rounded-[20px] bg-slate-900 border-[8px] border-slate-950 p-2 sm:p-3 shadow-2xl overflow-hidden aspect-[16/10]">
            {/* Screen Notch/Camera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-b-md z-25 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>

            {/* Screen Content Wrapper */}
            <div className="w-full h-full bg-slate-50 rounded-md overflow-hidden flex flex-col text-slate-800 relative text-[11px] sm:text-xs">
              {/* Header inside Mock Dashboard */}
              <div className="h-10 sm:h-12 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs select-none">
                    M
                  </span>
                  <span className="font-heading font-extrabold text-[11px] sm:text-xs text-slate-850">
                    MindBridge
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] text-slate-400 font-medium hidden sm:inline-block">
                    Live Session Active
                  </span>
                  <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center">
                    <Shield size={12} className="text-indigo-600" />
                  </div>
                </div>
              </div>

              {/* Dashboard Layout Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar Mockup */}
                <div className="w-32 sm:w-40 border-r border-slate-150/40 bg-white/40 p-3 flex flex-col justify-between hidden sm:flex">
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">
                      Main Portal
                    </span>
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-indigo-50 text-indigo-600 font-semibold rounded-lg">
                      <LineChart size={12} />
                      Dashboard
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-slate-550 hover:bg-slate-100 rounded-lg cursor-pointer">
                      <Heart size={12} />
                      Wellness Reports
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-slate-550 hover:bg-slate-100 rounded-lg cursor-pointer">
                      <Bell size={12} />
                      Activity Alerts
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 rounded-xl flex flex-col gap-1 border border-slate-150/40">
                    <span className="font-bold text-[9px] text-slate-800">Need Guidance?</span>
                    <button className="text-[8px] bg-indigo-600 text-white font-semibold py-1 rounded-md cursor-pointer text-center">
                      Chat Counselor
                    </button>
                  </div>
                </div>

                {/* Dashboard Core Content Area */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-white">
                  {activeTab === 'parent' ? (
                    <>
                      {/* Parent Dashboard Mock Content */}
                      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <h4 className="font-bold text-slate-800">Family Wellbeing Insights</h4>
                          <p className="text-[10px] text-slate-450 mt-0.5">Overview of aggregated analytics</p>
                        </div>
                        <BadgeIcon text="Calm" color="bg-teal-50 border-teal-100 text-teal-600" />
                      </div>

                      {/* Stat Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                          <span className="text-[9px] text-slate-400 font-semibold">Mood Balance</span>
                          <h5 className="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5">85% Stability</h5>
                        </div>
                        <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                          <span className="text-[9px] text-slate-400 font-semibold">Self-Reflections</span>
                          <h5 className="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5">6/7 days logged</h5>
                        </div>
                        <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                          <span className="text-[9px] text-slate-400 font-semibold">Sleep Index</span>
                          <h5 className="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5">8.1 Hours avg</h5>
                        </div>
                      </div>

                      {/* Chart Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        {/* Line Chart */}
                        <div className="p-3 border border-slate-100 rounded-xl flex flex-col gap-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Historical Mood Trend</span>
                          <svg viewBox="0 0 200 80" className="w-full h-24 overflow-visible">
                            <line x1="0" y1="60" x2="200" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="40" x2="200" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="20" x2="200" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                            {/* Area path */}
                            <path d="M 0 50 L 33 45 L 66 55 L 99 35 L 132 25 L 165 20 L 200 22 L 200 80 L 0 80 Z" fill="rgba(79, 70, 229, 0.08)" />
                            {/* Line path */}
                            <path d="M 0 50 L 33 45 L 66 55 L 99 35 L 132 25 L 165 20 L 200 22" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {/* Progress Rings Mock */}
                        <div className="p-3 border border-slate-100 rounded-xl flex flex-col gap-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Emotions Composition</span>
                          <div className="flex items-center justify-around flex-1 py-1">
                            {/* Ring 1 */}
                            <div className="flex flex-col items-center gap-1.5">
                              <svg width="40" height="40" className="transform -rotate-90">
                                <circle cx="20" cy="20" r="16" stroke="#f1f5f9" strokeWidth="3" fill="none" />
                                <circle cx="20" cy="20" r="16" stroke="#14b8a6" strokeWidth="3" fill="none" strokeDasharray="100.5" strokeDashoffset="25" />
                              </svg>
                              <span className="text-[8px] font-bold text-slate-700">75% Calm</span>
                            </div>
                            {/* Ring 2 */}
                            <div className="flex flex-col items-center gap-1.5">
                              <svg width="40" height="40" className="transform -rotate-90">
                                <circle cx="20" cy="20" r="16" stroke="#f1f5f9" strokeWidth="3" fill="none" />
                                <circle cx="20" cy="20" r="16" stroke="#4f46e5" strokeWidth="3" fill="none" strokeDasharray="100.5" strokeDashoffset="45" />
                              </svg>
                              <span className="text-[8px] font-bold text-slate-700">55% Happy</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Teen Dashboard Mock Content */}
                      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <h4 className="font-bold text-slate-800 font-heading">My Emotional Healing Space</h4>
                          <p className="text-[10px] text-slate-450 mt-0.5">Private journals and check-ins</p>
                        </div>
                        <BadgeIcon text="Locked" color="bg-rose-50 border-rose-100 text-rose-600" />
                      </div>

                      {/* Interactive Journal Log Box */}
                      <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/20 flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Recent Guided Journal Log</span>
                        <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-xs flex flex-col gap-1.5">
                          <span className="font-bold text-slate-850">"I had a stressful day at school but breathing exercises helped..."</span>
                          <span className="text-[9px] text-slate-400">Locked and encrypted. No raw journal entries are shared with third parties.</span>
                        </div>
                        <div className="flex gap-2 self-start mt-1">
                          <button className="px-3 py-1 bg-indigo-50 hover:bg-indigo-150 text-indigo-650 rounded-lg text-[9px] font-bold cursor-pointer transition-colors">
                            Write New Entry
                          </button>
                        </div>
                      </div>

                      {/* Coping exercises list */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex items-center gap-3">
                          <span className="text-xl">🧘</span>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">Box Breathing</span>
                            <span className="text-[9px] text-slate-400">4 min session</span>
                          </div>
                        </div>
                        <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex items-center gap-3">
                          <span className="text-xl">🎶</span>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">Calming Waves</span>
                            <span className="text-[9px] text-slate-400">Ambient soundscapes</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Laptop keyboard base */}
          <div className="relative w-[108%] h-3 bg-slate-900 rounded-b-xl -ml-[4%] border-b border-slate-950 shadow-md flex justify-center items-center">
            <div className="w-16 h-1 bg-slate-950 rounded-b-md" />
          </div>
          <div className="relative w-[28%] h-1 bg-slate-400 opacity-60 rounded-b-md mx-auto shadow-sm" />
        </motion.div>
      </div>
    </section>
  );
};

const BadgeIcon = ({ text, color }) => (
  <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold tracking-wide uppercase ${color}`}>
    {text}
  </span>
);

export default DashboardPreview;

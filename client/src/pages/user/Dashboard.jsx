import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Check, PlayCircle, Headphones, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const [checkInState, setCheckInState] = useState({ mood: 0, stress: 0, energy: 0, sleep: 0, note: '' });
  const [checkInSaved, setCheckInSaved] = useState(false);

  const handleCheckInSubmit = () => {
    // In real implementation: save to backend
    setCheckInSaved(true);
  };

  const renderScale = (field) => (
    <div className="flex justify-between max-w-xs mt-2">
      {[1, 2, 3, 4, 5].map((val) => (
        <button
          key={val}
          onClick={() => setCheckInState({ ...checkInState, [field]: val })}
          className={`w-10 h-10 rounded-full font-medium transition-colors ${
            checkInState[field] === val
              ? 'bg-[#202020] text-white'
              : 'bg-[#F6F6F4] text-[#555555] hover:bg-[#EEEEEC]'
          }`}
        >
          {val}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-1">
          Good morning, {user?.preferredName || user?.name?.split(' ')[0] || 'there'}.
        </h1>
        <p className="text-[#555555]">Here's your wellbeing snapshot.</p>
      </div>

      {/* Wellbeing Snapshot - Compact Overview */}
      <div className="bg-white border border-[#DCDCDC] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4">Your Wellbeing</h3>
          <div className="grid grid-cols-2 md:flex gap-6 md:gap-10">
            <div>
              <div className="text-sm text-[#858585] mb-1">Mood</div>
              <div className="font-semibold text-[#202020]">Steady</div>
            </div>
            <div>
              <div className="text-sm text-[#858585] mb-1">Stress</div>
              <div className="font-semibold text-[#202020]">Moderate</div>
            </div>
            <div>
              <div className="text-sm text-[#858585] mb-1">Sleep</div>
              <div className="font-semibold text-[#202020]">Needs attention</div>
            </div>
            <div>
              <div className="text-sm text-[#858585] mb-1">Energy</div>
              <div className="font-semibold text-[#202020]">Good</div>
            </div>
          </div>
        </div>
        <div className="bg-[#F6F6F4] p-4 rounded-xl border border-[#EEEEEC] min-w-[150px]">
          <div className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-1">Primary Focus</div>
          <div className="font-semibold text-[#181818]">Stress + Sleep</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Today's Focus */}
          <div className="bg-[#202020] text-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-2">Today's Focus</h3>
            <div className="text-2xl font-serif font-bold mb-1">Stress + Sleep</div>
            <p className="text-[#EEEEEC] opacity-90">One small step is enough for today.</p>
          </div>

          {/* Today's Plan */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4">Today's Plan</h3>
            <div className="bg-white border border-[#DCDCDC] rounded-2xl p-6 shadow-sm relative">
              {/* Vertical line */}
              <div className="absolute left-[39px] top-8 bottom-8 w-px bg-[#EEEEEC] z-0"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="text-sm font-medium text-[#555555] w-12 pt-0.5">09:00</div>
                  <div className="w-6 h-6 rounded-full bg-[#202020] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="text-[#858585] line-through">Morning check-in</div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-sm font-medium text-[#555555] w-12 pt-0.5">12:30</div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#DCDCDC] bg-white shrink-0"></div>
                  <div className="text-[#181818] font-medium">5-minute Stress Reset</div>
                </div>

                <div className="flex gap-4">
                  <div className="text-sm font-medium text-[#555555] w-12 pt-0.5">20:00</div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#DCDCDC] bg-white shrink-0"></div>
                  <div className="text-[#181818] font-medium">Evening Wind-down</div>
                </div>

                <div className="flex gap-4">
                  <div className="text-sm font-medium text-[#555555] w-12 pt-0.5">20:15</div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#DCDCDC] bg-white shrink-0"></div>
                  <div className="text-[#181818] font-medium">Short Reflection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Today's Check-in */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4">Today's Check-in</h3>
            <div className="bg-white border border-[#DCDCDC] rounded-2xl p-6 shadow-sm">
              {!checkInSaved ? (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-[#181818]">How are you feeling today?</label>
                    {renderScale('mood')}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#181818]">How stressed do you feel?</label>
                    {renderScale('stress')}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#181818]">How's your energy?</label>
                    {renderScale('energy')}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#181818]">How did you sleep?</label>
                    {renderScale('sleep')}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#181818]">Anything else you'd like to note?</label>
                    <textarea 
                      className="w-full mt-2 border border-[#DCDCDC] rounded-lg p-3 text-sm focus:outline-none focus:border-[#202020] bg-[#F6F6F4]"
                      rows={2}
                      value={checkInState.note}
                      onChange={e => setCheckInState({...checkInState, note: e.target.value})}
                    />
                  </div>
                  <button onClick={handleCheckInSubmit} className="w-full bg-[#292929] text-white py-3 rounded-xl font-bold hover:bg-[#333333] transition-colors">
                    Save Check-in
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center text-[#555555]">
                  <Check className="w-10 h-10 text-[#202020] mx-auto mb-3" />
                  <p className="font-medium text-[#181818]">Check-in complete</p>
                  <p className="text-sm mt-1">Your wellness plan has been updated.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recommended for You */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#858585] mb-4 flex items-center justify-between">
              Recommended for You
              <Link to="/app/resources" className="text-[10px] text-[#202020] hover:underline flex items-center">View All <ChevronRight className="w-3 h-3"/></Link>
            </h3>
            <div className="space-y-3">
              {[
                { title: '5-Minute Stress Reset', type: 'Audio', duration: '5 min', topic: 'Stress', icon: Headphones },
                { title: 'Sleep Wind-Down', type: 'Activity', duration: '8 min', topic: 'Sleep', icon: PlayCircle },
                { title: '3-Minute Breathing', type: 'Audio', duration: '3 min', topic: 'Stress', icon: Headphones }
              ].map((rec, i) => (
                <div key={i} className="bg-white border border-[#DCDCDC] p-4 rounded-xl shadow-sm flex items-start gap-4 hover:border-[#202020] cursor-pointer transition-colors group">
                  <div className="bg-[#F6F6F4] p-2 rounded-lg group-hover:bg-[#202020] group-hover:text-white transition-colors text-[#555555]">
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#181818]">{rec.title}</h4>
                    <p className="text-xs text-[#858585] mt-1">{rec.type} · {rec.duration} · {rec.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
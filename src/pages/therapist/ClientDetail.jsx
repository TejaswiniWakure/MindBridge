import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Video, FileText, Activity, Calendar, AlertCircle } from 'lucide-react';

export const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');

  // Mock data for UI layout
  const client = {
    name: 'Emma Thompson',
    preferredName: 'Emma',
    age: 24,
    gender: 'Female',
    riskStatus: 'moderate',
    goals: ['Manage Anxiety', 'Better Sleep'],
    phone: '+1 234 567 8900',
    email: 'emma.t@example.com'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/therapist/clients')} className="w-10 h-10 flex items-center justify-center bg-white border border-[#DCDCDC] rounded-full text-[#555555] hover:text-[#181818] hover:border-[#202020] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-bold text-[#181818]">{client.name}</h1>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                    ${client.riskStatus === 'high' ? 'bg-red-50 text-red-700 border border-red-100' : 
                      client.riskStatus === 'moderate' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                      'bg-green-50 text-green-700 border border-green-100'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${client.riskStatus === 'high' ? 'bg-red-500' : client.riskStatus === 'moderate' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
              {client.riskStatus} Risk
            </div>
          </div>
          <p className="text-[#555555] text-sm mt-1">{client.age} yrs · {client.gender} · Prefers "{client.preferredName}"</p>
        </div>
        
        <div className="ml-auto flex gap-3">
          <button className="px-4 py-2 bg-white border border-[#DCDCDC] text-[#181818] rounded-full font-bold text-sm hover:bg-[#F6F6F4] transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Message
          </button>
          <button className="px-4 py-2 bg-[#202020] text-white rounded-full font-bold text-sm hover:bg-[#333333] transition-colors flex items-center gap-2">
            <Video className="w-4 h-4" /> Start Session
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#DCDCDC]">
        {['overview', 'assessments', 'treatment plan', 'session notes'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${tab === t ? 'border-b-2 border-[#202020] text-[#181818]' : 'text-[#858585] border-b-2 border-transparent hover:text-[#555555]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {tab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white border border-[#DCDCDC] rounded-3xl p-6 shadow-sm">
                <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-4">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {client.goals.map((g, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#F6F6F4] border border-[#EEEEEC] rounded-lg text-sm text-[#555555] font-medium">{g}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#DCDCDC] rounded-3xl p-6 shadow-sm">
                <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-4">Recent Activity (Last 7 Days)</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="mt-1"><Activity className="w-5 h-5 text-[#858585]" /></div>
                    <div>
                      <p className="font-medium text-[#181818] text-sm">Completed Daily Check-in</p>
                      <p className="text-xs text-[#858585] mt-0.5">Today, 08:30 AM · Mood: 3/5, Stress: 4/5</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1"><FileText className="w-5 h-5 text-[#858585]" /></div>
                    <div>
                      <p className="font-medium text-[#181818] text-sm">New Journal Entry Logged</p>
                      <p className="text-xs text-[#858585] mt-0.5">Yesterday, 09:15 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1"><AlertCircle className="w-5 h-5 text-amber-500" /></div>
                    <div>
                      <p className="font-medium text-amber-700 text-sm">Elevated Anxiety Score (GAD-7)</p>
                      <p className="text-xs text-[#858585] mt-0.5">2 days ago · Score: 12 (Moderate)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'assessments' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white border border-[#DCDCDC] rounded-3xl p-6 shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#181818] text-lg">GAD-7: Anxiety</h4>
                  <p className="text-sm text-[#555555]">Completed 2 days ago</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold text-[#181818]">12<span className="text-sm text-[#858585] font-sans font-normal">/21</span></div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">Moderate</div>
                </div>
              </div>

              <div className="bg-white border border-[#DCDCDC] rounded-3xl p-6 shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#181818] text-lg">PHQ-9: Depression</h4>
                  <p className="text-sm text-[#555555]">Completed 2 weeks ago</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold text-[#181818]">4<span className="text-sm text-[#858585] font-sans font-normal">/27</span></div>
                  <div className="text-xs font-bold text-green-600 uppercase tracking-widest mt-1">Minimal</div>
                </div>
              </div>
            </div>
          )}

          {tab === 'treatment plan' && (
            <div className="bg-white border border-[#DCDCDC] rounded-3xl p-6 shadow-sm animate-in fade-in">
              <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-4">Active Plan: Anxiety Relief (Phase 2)</h3>
              <p className="text-[#555555] text-sm leading-relaxed mb-6">
                Client is currently in Phase 2 of the AI-generated Anxiety Relief track, focusing on cognitive restructuring and somatic calming techniques. Adherence to daily activities is 85%.
              </p>
              <button className="px-6 py-2.5 bg-[#202020] text-white rounded-full font-bold text-sm hover:bg-[#333333] transition-colors">
                Adjust Plan Parameters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-[#EEEEEC] border border-[#DCDCDC] rounded-3xl p-6">
            <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[#858585] text-xs">Email</p>
                <p className="font-medium text-[#181818]">{client.email}</p>
              </div>
              <div>
                <p className="text-[#858585] text-xs">Phone</p>
                <p className="font-medium text-[#181818]">{client.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DCDCDC] rounded-3xl p-6 shadow-sm">
            <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-4">Next Session</h3>
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-[#202020] shrink-0" />
              <div>
                <p className="font-bold text-[#181818] text-sm">Today, 09:00 AM</p>
                <p className="text-xs text-[#555555] mt-1">45 Min Video Session</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

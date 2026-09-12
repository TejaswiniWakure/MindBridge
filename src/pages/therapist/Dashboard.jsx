import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { therapistAPI } from '../../api/endpoints';
import { Users, Calendar, Clock, Video, Loader2 } from 'lucide-react';

export const TherapistDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await therapistAPI.getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#858585]" /></div>;
  }

  const stats = data?.stats || { activeClients: 0, sessionsThisWeek: 0, pendingReviews: 0 };
  const schedule = data?.schedule || [];
  const activity = data?.recentActivity || [];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#181818] mb-1">
            Good morning, Dr. {user?.name?.split(' ')[1] || user?.name || 'Therapist'}.
          </h1>
          <p className="text-[#555555]">Here's an overview of your practice today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-[#DCDCDC] text-[#181818] rounded-full font-bold text-sm hover:bg-[#F6F6F4] transition-colors">
            Manage Availability
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#DCDCDC] p-6 rounded-3xl shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#EEEEEC] text-[#202020] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#181818]">{stats.activeClients}</div>
            <div className="text-sm font-bold tracking-widest uppercase text-[#858585] mt-1">Active Clients</div>
          </div>
        </div>
        
        <div className="bg-white border border-[#DCDCDC] p-6 rounded-3xl shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#EEEEEC] text-[#202020] flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#181818]">{stats.sessionsThisWeek}</div>
            <div className="text-sm font-bold tracking-widest uppercase text-[#858585] mt-1">Sessions this week</div>
          </div>
        </div>

        <div className="bg-[#202020] text-white p-6 rounded-3xl shadow-lg flex items-center gap-6 relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-[#333333] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold">{stats.pendingReviews}</div>
            <div className="text-sm font-bold tracking-widest uppercase text-[#EEEEEC] mt-1">Pending Reviews</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase">Today's Schedule</h3>
            <button className="text-sm font-bold text-[#181818] hover:text-[#555555]">View Calendar</button>
          </div>
          
          <div className="space-y-4">
            {schedule.length === 0 ? (
              <div className="bg-white border border-[#DCDCDC] p-8 rounded-3xl text-center shadow-sm">
                <p className="text-[#858585]">No sessions scheduled for today.</p>
              </div>
            ) : (
              schedule.map((session, i) => (
                <div key={i} className="bg-white border border-[#DCDCDC] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#202020] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-6">
                    <div className="text-center md:text-right min-w-[80px]">
                      <div className="font-bold text-[#181818] text-lg">{session.time}</div>
                      <div className="text-xs text-[#858585] uppercase tracking-widest mt-1">{session.duration} Min</div>
                    </div>
                    <div className="w-1 h-12 bg-[#EEEEEC] group-hover:bg-[#202020] transition-colors rounded-full hidden md:block"></div>
                    <div>
                      <h4 className="font-bold text-[#181818] text-lg">{session.clientName}</h4>
                      <p className="text-sm text-[#555555] mt-1">{session.type} · Focus: {session.focus}</p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333] transition-colors">
                    <Video className="w-4 h-4" /> Join
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column - Client Updates */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase">Recent Client Activity</h3>
            <button className="text-sm font-bold text-[#181818] hover:text-[#555555]">All Clients</button>
          </div>
          
          <div className="bg-white border border-[#DCDCDC] rounded-3xl shadow-sm overflow-hidden">
            {activity.length === 0 ? (
              <div className="p-8 text-center text-[#858585] text-sm">No recent activity.</div>
            ) : (
              activity.map((act, i) => (
                <div key={i} className="p-5 border-b border-[#EEEEEC] last:border-0 hover:bg-[#F6F6F4] transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-[#181818] text-sm">{act.name}</span>
                    <span className="text-xs text-[#858585]">{act.time}</span>
                  </div>
                  <p className="text-sm text-[#555555] flex items-center gap-2">
                    {act.action}
                    {act.alert && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

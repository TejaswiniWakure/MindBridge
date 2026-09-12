import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { adminAPI } from '../../api/endpoints';
import { Loader2 } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await adminAPI.getDashboardStats();
      setStats(data.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#858585]" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Admin Dashboard</h1>
        <p className="text-[#555555]">Overview of the Mindwell platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#DCDCDC] p-6 rounded-3xl shadow-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-1">Total Users</h3>
          <p className="text-3xl font-serif font-bold text-[#181818]">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-white border border-[#DCDCDC] p-6 rounded-3xl shadow-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-1">Active Therapists</h3>
          <p className="text-3xl font-serif font-bold text-[#181818]">{stats?.totalTherapists || 0}</p>
        </div>
        <div className="bg-[#202020] p-6 rounded-3xl shadow-lg text-white">
          <h3 className="text-[10px] font-bold tracking-widest text-[#EEEEEC] uppercase mb-1">Pending Reviews</h3>
          <p className="text-3xl font-serif font-bold">{stats?.pendingReviews || 0}</p>
        </div>
      </div>
    </div>
  );
};

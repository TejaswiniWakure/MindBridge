import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, User, ArrowRight, Loader2 } from 'lucide-react';
import { therapistAPI } from '../../api/endpoints';

export const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await therapistAPI.getClients();
      setClients(data.clients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = clients.filter(c => c.client?.name?.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#858585]" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">My Clients</h1>
          <p className="text-[#555555]">Manage and monitor your active caseload.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858585]" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-[#DCDCDC] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#202020] transition-colors"
            />
          </div>
          <button className="p-2 border border-[#DCDCDC] text-[#555555] rounded-full hover:bg-[#EEEEEC] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#DCDCDC] rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EEEEEC]">
              <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#858585] uppercase">Client</th>
              <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#858585] uppercase hidden md:table-cell">Focus Areas</th>
              <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#858585] uppercase">Risk Level</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(rel => {
              const client = rel.client;
              if (!client) return null;
              
              return (
                <tr key={rel._id} onClick={() => navigate(`/therapist/clients/${client._id}`)} className="border-b border-[#EEEEEC] last:border-0 hover:bg-[#F6F6F4] cursor-pointer transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#EEEEEC] rounded-full flex items-center justify-center text-[#555555] font-bold text-sm">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#181818]">{client.name}</div>
                        <div className="text-xs text-[#858585]">{client.age} yrs · {client.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {client.goals?.length > 0 ? client.goals.map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-[#DCDCDC] rounded-md text-xs text-[#555555]">{g}</span>
                      )) : <span className="text-xs text-[#858585]">Not set</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${client.riskStatus === 'high' ? 'bg-red-50 text-red-700 border border-red-100' : 
                        client.riskStatus === 'moderate' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                        'bg-green-50 text-green-700 border border-green-100'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${client.riskStatus === 'high' ? 'bg-red-500' : client.riskStatus === 'moderate' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                      {client.riskStatus || 'low'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-[#858585] hover:text-[#181818] group-hover:bg-[#EEEEEC] rounded-full transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
        {filtered.length === 0 && (
          <div className="p-16 text-center text-[#858585]">
            <User className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No clients found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

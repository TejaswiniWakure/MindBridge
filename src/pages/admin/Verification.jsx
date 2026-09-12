import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../api/endpoints';
import { Check, X, FileText, Download, Loader2 } from 'lucide-react';

export const AdminVerification = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const { data } = await adminAPI.getPendingTherapists();
      setPending(data.pending || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    setActionLoading(id);
    try {
      await adminAPI.updateTherapistStatus(id, { status });
      setPending(pending.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Therapist Verification</h1>
        <p className="text-[#555555]">Review and approve professional applications.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#858585]" /></div>
      ) : pending.length === 0 ? (
        <div className="bg-white border border-[#DCDCDC] rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-[#EEEEEC] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#858585]" />
          </div>
          <h3 className="text-xl font-bold text-[#181818]">All Caught Up</h3>
          <p className="text-[#555555] mt-2">There are no pending therapist applications to review.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.map(profile => (
            <div key={profile._id} className="bg-white border border-[#DCDCDC] rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#181818]">{profile.user?.name || 'Unknown User'}</h3>
                  <p className="text-[#555555]">{profile.professionalTitle} · {profile.qualification}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-1">Experience</h4>
                    <p className="text-[#181818] font-medium">{profile.yearsOfExperience} Years</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-1">Email</h4>
                    <p className="text-[#181818] font-medium">{profile.user?.email}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties?.map((spec, i) => (
                      <span key={i} className="px-3 py-1 bg-[#EEEEEC] rounded-full text-xs font-bold text-[#555555]">{spec}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2">Bio</h4>
                  <p className="text-[#555555] text-sm leading-relaxed">{profile.bio}</p>
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-[#EEEEEC] pt-6 md:pt-0 md:pl-8">
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-3">Verification Documents</h4>
                  {profile.documents?.length > 0 ? profile.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-[#DCDCDC] rounded-xl bg-[#F6F6F4]">
                      <FileText className="w-5 h-5 text-[#858585]" />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-[#181818] truncate">{doc.filename}</p>
                      </div>
                      <button className="text-[#555555] hover:text-[#181818]"><Download className="w-4 h-4" /></button>
                    </div>
                  )) : (
                    <p className="text-sm text-[#858585]">No documents uploaded.</p>
                  )}
                </div>

                <div className="mt-auto space-y-3">
                  <button 
                    disabled={actionLoading === profile._id}
                    onClick={() => handleAction(profile._id, 'APPROVED')}
                    className="w-full py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                  >
                    {actionLoading === profile._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Approve Application
                  </button>
                  <button 
                    disabled={actionLoading === profile._id}
                    onClick={() => handleAction(profile._id, 'CHANGES_REQUESTED')}
                    className="w-full py-3 bg-white border border-[#DCDCDC] text-[#555555] rounded-full font-bold hover:bg-[#F6F6F4] hover:text-[#181818] transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> Request Changes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

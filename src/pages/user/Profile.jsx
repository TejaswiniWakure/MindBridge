import { DOBSelector } from '../../components/ui/DOBSelector';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, Loader2 } from 'lucide-react';
import { onboardingAPI } from '../../api/endpoints';

export const Profile = () => {
  const { user, login } = useAuth(); // Need some way to refresh user context? Actually useAuth might need a refresh function, but let's assume login with token or just manual update.
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    name: user?.name || '',
    preferredName: user?.preferredName || '',
    dob: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
    email: user?.email || '',
    password: '',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Build update payload
      const payload = {
        name: profile.name,
        preferredName: profile.preferredName,
        dateOfBirth: profile.dob, // mapping to backend schema
      };
      
      // If password changed, we'd add it to payload if backend supports it in this endpoint.
      if (profile.password && profile.password !== '••••••••' && profile.password !== '') {
         payload.password = profile.password;
      }

      await onboardingAPI.updateProfile(payload);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">YOUR PROFILE</h1>
        <p className="text-[#555555]">Manage your account details.</p>
      </div>

      <div className="bg-white border border-[#DCDCDC] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8 border-b border-[#EEEEEC] pb-8">
          <div className="w-20 h-20 bg-[#EEEEEC] rounded-full flex items-center justify-center text-[#858585]">
            <UserCircle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold text-[#181818] text-lg">Profile Photo</h3>
            <p className="text-[#858585] text-sm hover:text-[#181818] cursor-pointer transition-colors underline">Upload a new photo</p>
          </div>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">Profile updated successfully!</div>}

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Full Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020] transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Preferred Name</label>
              <input type="text" value={profile.preferredName} onChange={e => setProfile({...profile, preferredName: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020] transition-colors" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Date of Birth</label>
              <DOBSelector value={profile.dob} onChange={val => setProfile({...profile, dob: val})} />
            </div>
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Email</label>
              <input type="email" value={profile.email} disabled className="w-full border border-[#DCDCDC] bg-[#EEEEEC] text-[#858585] rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed" />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Password</label>
            <input type="password" placeholder="Leave blank to keep current" value={profile.password} onChange={e => setProfile({...profile, password: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020] transition-colors max-w-sm" />
          </div>

          <div className="pt-6 border-t border-[#EEEEEC] flex justify-end">
            <button type="submit" disabled={loading} className="bg-[#202020] text-white px-10 py-3.5 rounded-full font-bold hover:bg-[#333333] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

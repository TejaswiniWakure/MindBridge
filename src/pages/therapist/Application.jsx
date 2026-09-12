import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { therapistAPI } from '../../api/endpoints';
import { Check, Upload, FileText, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Application = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    professionalTitle: '',
    qualification: '',
    specializations: [],
    experienceYears: '',
    bio: '',
    sessionTypes: [],
    pricing: '',
  });

  const [documents, setDocuments] = useState([]);

  const handleSpecToggle = (spec) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };

  const handleSessionToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      sessionTypes: prev.sessionTypes.includes(type)
        ? prev.sessionTypes.filter(t => t !== type)
        : [...prev.sessionTypes, type]
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setDocuments([...documents, { type: 'License', filename: file.name }]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await therapistAPI.apply({
        ...formData,
        documents
      });
      navigate('/therapist/application/status');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex flex-col items-center py-12 px-4 selection:bg-[#EEEEEC] selection:text-[#202020]">
      <div className="w-full max-w-3xl bg-white border border-[#DCDCDC] shadow-xl rounded-[2.5rem] p-8 md:p-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Professional Application</h1>
          <p className="text-[#555555]">Join the Mindwell professional network.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase mb-4">Step 1 — Professional Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Professional Title</label>
                <input type="text" placeholder="e.g. Clinical Psychologist" value={formData.professionalTitle} onChange={e => setFormData({...formData, professionalTitle: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Years of Experience</label>
                <input type="number" placeholder="e.g. 5" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Primary Qualification</label>
              <input type="text" placeholder="e.g. Psy.D, MSW" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Professional Bio</label>
              <textarea rows={4} placeholder="Tell us about your approach..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]"></textarea>
            </div>

            <button className="w-full mt-4 bg-[#202020] text-white py-3.5 rounded-full font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2" onClick={() => setStep(2)}>
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in">
            <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase mb-4">Step 2 — Practice Details</h3>
            
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-3">Specializations (Select all that apply)</label>
              <div className="flex flex-wrap gap-3">
                {['Anxiety', 'Depression', 'Trauma', 'Relationships', 'Stress Management', 'Life Transitions'].map(spec => (
                  <button key={spec} onClick={() => handleSpecToggle(spec)} className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${formData.specializations.includes(spec) ? 'border-[#202020] bg-[#EEEEEC] text-[#181818]' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-3">Session Types</label>
              <div className="flex flex-wrap gap-3">
                {['Video', 'Voice', 'Chat'].map(type => (
                  <button key={type} onClick={() => handleSessionToggle(type)} className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${formData.sessionTypes.includes(type) ? 'border-[#202020] bg-[#EEEEEC] text-[#181818]' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Standard Session Rate ($)</label>
              <input type="number" placeholder="e.g. 150" value={formData.pricing} onChange={e => setFormData({...formData, pricing: e.target.value})} className="w-full max-w-xs border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 border border-[#DCDCDC] text-[#555555] rounded-full font-bold hover:bg-[#F6F6F4]" onClick={() => setStep(1)}>Back</button>
              <button className="flex-1 bg-[#202020] text-white py-3.5 rounded-full font-bold hover:bg-[#333333] transition-colors" onClick={() => setStep(3)}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in">
            <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase mb-4">Step 3 — Verification Documents</h3>
            
            <p className="text-[#555555] text-sm">Please upload a valid copy of your primary clinical license or credential. This is required for our verification team.</p>

            <div className="border-2 border-dashed border-[#DCDCDC] bg-[#F6F6F4] rounded-2xl p-10 text-center relative hover:border-[#858585] transition-colors">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
              <Upload className="w-8 h-8 text-[#858585] mx-auto mb-3" />
              <p className="font-bold text-[#181818]">Click to upload or drag and drop</p>
              <p className="text-[#858585] text-sm mt-1">PDF, JPG, or PNG (Max 5MB)</p>
            </div>

            {documents.length > 0 && (
              <div className="space-y-3 mt-6">
                <h4 className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2">Uploaded Documents</h4>
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white border border-[#DCDCDC] p-4 rounded-xl shadow-sm">
                    <FileText className="w-5 h-5 text-[#555555]" />
                    <div className="flex-1">
                      <p className="font-bold text-[#181818] text-sm">{doc.filename}</p>
                      <p className="text-xs text-[#858585]">{doc.type}</p>
                    </div>
                    <Check className="w-5 h-5 text-[#202020]" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-[#EEEEEC]">
              <button className="px-6 py-3 border border-[#DCDCDC] text-[#555555] rounded-full font-bold hover:bg-[#F6F6F4]" onClick={() => setStep(2)}>Back</button>
              <button disabled={loading || documents.length === 0} className="flex-1 bg-[#202020] text-white py-3.5 rounded-full font-bold hover:bg-[#333333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2" onClick={handleSubmit}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Submit Application
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

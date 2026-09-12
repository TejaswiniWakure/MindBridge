import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { therapistAPI } from '../../api/endpoints';
import { Clock, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const AppStatus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const { data } = await therapistAPI.getAppStatus();
      if (data.status === 'NOT_STARTED') {
        navigate('/therapist/application');
      } else if (data.status === 'ACTIVE') {
        navigate('/therapist/dashboard');
      } else {
        setStatus(data.status); // PENDING_REVIEW, CHANGES_REQUESTED, APPROVED
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#DCDCDC] shadow-xl rounded-[2.5rem] p-10 text-center">
        {status === 'PENDING_REVIEW' && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-[#EEEEEC] rounded-full flex items-center justify-center mx-auto mb-6 text-[#555555]">
              <Clock className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#181818] mb-3">Application Under Review</h2>
            <p className="text-[#555555] mb-8 leading-relaxed">
              Our team is currently verifying your credentials. This usually takes 1-2 business days. We will notify you via email once complete.
            </p>
            <button onClick={fetchStatus} className="inline-flex items-center gap-2 text-sm font-bold text-[#181818] hover:text-[#555555] transition-colors">
              <RefreshCcw className="w-4 h-4" /> Check Status
            </button>
          </div>
        )}
        
        {status === 'APPROVED' && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-[#202020] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#181818] mb-3">You're Approved!</h2>
            <p className="text-[#555555] mb-8 leading-relaxed">
              Welcome to the Mindwell professional network. Please complete your subscription setup to activate your dashboard.
            </p>
            <button onClick={() => alert('Payment flow mock')} className="bg-[#202020] text-white px-8 py-3 rounded-full font-bold hover:bg-[#333333] w-full transition-colors">
              Set Up Subscription
            </button>
          </div>
        )}

        {status === 'CHANGES_REQUESTED' && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#181818] mb-3">Action Required</h2>
            <p className="text-[#555555] mb-8 leading-relaxed">
              We need a bit more information to verify your account. Please check your email for details.
            </p>
            <button onClick={() => navigate('/therapist/application')} className="bg-[#202020] text-white px-8 py-3 rounded-full font-bold hover:bg-[#333333] w-full transition-colors">
              Update Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

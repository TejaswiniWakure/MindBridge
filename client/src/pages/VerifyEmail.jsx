import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import Button from '../components/ui/Button';
import OtpInput from '../components/ui/OtpInput';
import { useToast } from '../context/ToastContext';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Demo validation bypass: any code works, but let's say "123456" or similar is good
      setIsSuccess(true);
      showToast('Email verified successfully!', 'success');
      
      setTimeout(() => {
        // Retrieve temporary role for onboarding custom slide details
        const savedRole = localStorage.getItem('mindbridge_onboarding_role') || 'teen';
        navigate('/onboarding');
      }, 2000);
    }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setOtp('');
    setTimer(60);
    showToast('A new 6-digit OTP code has been sent to your email.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="verification-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Header */}
                <div className="text-center flex flex-col items-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center mb-1">
                    <ShieldCheck size={28} />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    Verify Your Email
                  </h2>
                  <p className="text-xs text-slate-550 dark:text-slate-400 max-w-xs leading-relaxed">
                    We sent a 6-digit verification OTP code to your email. Enter it below to secure your account.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                  <OtpInput
                    value={otp}
                    onChange={(val) => {
                      setOtp(val);
                      if (error) setError('');
                    }}
                    error={error}
                  />

                  {/* Timer & Resend */}
                  <div className="text-center text-xs">
                    {timer > 0 ? (
                      <span className="text-slate-400 dark:text-slate-500 font-medium">
                        Resend code in <strong className="text-slate-700 dark:text-slate-350">{timer}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-primary-650 hover:underline font-bold cursor-pointer"
                      >
                        Resend Verification Code
                      </button>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm"
                    isLoading={loading}
                  >
                    Verify & Continue
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6 gap-5"
              >
                {/* Large Check Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold font-heading text-slate-850 dark:text-white">
                    Verification Complete!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed max-w-xs">
                    Your email address has been successfully verified. Moving to onboarding slides...
                  </p>
                </div>

                <div className="w-10 h-10 border-4 border-slate-100 border-t-primary-650 rounded-full animate-spin mt-2" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

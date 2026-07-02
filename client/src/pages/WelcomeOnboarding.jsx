import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const WelcomeOnboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Daily Mood Tracking',
      description: 'Log your daily feelings with customized mood tags. Review your emotional wellness scores over time inside a safe, responsive dashboard.',
      icon: Heart,
      color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50',
      illustration: (
        <svg viewBox="0 0 200 200" className="w-40 h-40 text-indigo-500">
          <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.05" />
          <path d="M100 60 C120 40, 150 40, 150 75 C150 115, 100 155, 100 155 C100 155, 50 115, 50 75 C50 40, 80 40, 100 60 Z" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="85" cy="70" r="3" fill="currentColor" />
          <circle cx="115" cy="70" r="3" fill="currentColor" />
          <path d="M85 95 Q100 110 115 95" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'AI Reflection Partner',
      description: 'Write freely in your secure digital journal. Our empathetic AI reviews your entries to suggest grounding exercises, breathing check-ins, and coping guides.',
      icon: Sparkles,
      color: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/50',
      illustration: (
        <svg viewBox="0 0 200 200" className="w-40 h-40 text-teal-500">
          <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.05" />
          <rect x="60" y="50" width="80" height="100" rx="10" fill="none" stroke="currentColor" strokeWidth="4.5" />
          <line x1="75" y1="75" x2="125" y2="75" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="75" y1="100" x2="125" y2="100" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="75" y1="125" x2="105" y2="125" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="150" cy="50" r="6" className="animate-pulse" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Safe Parent Summary & Consults',
      description: 'Your privacy is locked. Parents only see general mood scores and sleep durations, keeping your logs hidden. Request counseling slots directly if needed.',
      icon: ShieldCheck,
      color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-650 dark:text-purple-400 border-purple-100 dark:border-purple-900/50',
      illustration: (
        <svg viewBox="0 0 200 200" className="w-40 h-40 text-purple-500">
          <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.05" />
          <path d="M100 45 L150 67 L150 120 C150 150, 100 165, 100 165 C100 165, 50 150, 50 120 L50 67 Z" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="100" cy="95" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
          <key d="M100 109 L100 125 L108 125" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/profile-setup');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    navigate('/profile-setup');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-6">
      <div className="max-w-xl w-full mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-8 sm:p-12 shadow-xl flex flex-col justify-between min-h-[520px] relative overflow-hidden">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Welcome to MindBridge
          </span>
          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 font-semibold cursor-pointer hover:underline"
          >
            Skip Onboarding
          </button>
        </div>

        {/* Slide Carousel Area with AnimatePresence */}
        <div className="my-8 flex-1 flex flex-col justify-center items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center gap-5 w-full"
            >
              {/* SVG Graphic */}
              <div className="py-2">
                {slide.illustration}
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-2.5 max-w-sm">
                <div className={`inline-flex items-center gap-1.5 self-center px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${slide.color}`}>
                  <Icon size={12} />
                  Slide {currentSlide + 1}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-850 dark:text-white mt-1">
                  {slide.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between w-full border-t border-slate-100 dark:border-slate-800/60 pt-6 mt-2">
          {/* Back button */}
          <button
            onClick={handleBack}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1 text-xs font-semibold select-none
              ${currentSlide === 0 
                ? 'text-slate-300 dark:text-slate-800 cursor-not-allowed' 
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-250 cursor-pointer'
              }
            `}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {/* Stepper Dots */}
          <div className="flex gap-2.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300
                  ${i === currentSlide 
                    ? 'w-6 bg-primary-600' 
                    : 'w-2 bg-slate-200 dark:bg-slate-800'
                  }
                `}
              />
            ))}
          </div>

          {/* Next/Finish button */}
          <Button
            onClick={handleNext}
            className="rounded-xl px-5 py-2.5 text-xs font-bold flex items-center gap-2 group"
          >
            {currentSlide === slides.length - 1 ? 'Start Setup' : 'Next'}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default WelcomeOnboarding;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Heart, Users, Sparkles } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const statItems = [
    { value: '50,000+', label: 'Mood Check-ins', icon: Heart, color: 'text-primary-600 bg-primary-50' },
    { value: '2,000+', label: 'Families Supported', icon: Users, color: 'text-secondary-600 bg-secondary-50' },
    { value: '98%', label: 'User Satisfaction', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-100 to-primary-50 opacity-40 blur-3xl pointer-events-none -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary-100 to-primary-50 opacity-45 blur-3xl pointer-events-none -ml-40 -mb-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold"
            >
              <Heart size={12} className="text-primary-600 fill-primary-600 animate-pulse" />
              Empathetic Connection Platform
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.1]"
            >
              Helping Parents Understand. <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Helping Teens Feel Better.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base text-slate-500 leading-relaxed max-w-lg"
            >
              MindBridge bridges the communication gap between parents and teenagers. Track emotional well-being securely, discover helpful trends, and grow together as a family.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                to="/choose-role"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6.5 py-3.5 rounded-xl shadow-lg shadow-primary-600/10 hover:shadow-primary-600/20 active:scale-98 transition-all flex items-center gap-2 group cursor-pointer text-sm"
              >
                Get Started Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#about"
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-semibold px-6.5 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors active:scale-98 text-sm"
              >
                <Play size={14} className="fill-slate-750 text-slate-750" />
                Learn More
              </a>
            </motion.div>

            {/* Stats Cards Section */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-200/50"
            >
              {statItems.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <Icon size={14} />
                      </div>
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-450 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Product Preview Illustration (Browser Mockup) */}
          <motion.div
            className="lg:col-span-6 relative flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Browser Wrapper */}
            <div className="w-full max-w-[500px] rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col">
              {/* Browser Header Bar */}
              <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
                {/* Window controls */}
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 block" />
                </div>
                {/* Mock Address Bar */}
                <div className="flex-1 max-w-[220px] mx-auto bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-md px-2.5 py-0.5 text-[9px] text-slate-400 select-none text-center truncate">
                  mindbridge.app/parent-portal
                </div>
              </div>

              {/* Browser Window Body */}
              <div className="p-5 flex flex-col gap-4.5 bg-slate-50/40 dark:bg-slate-950/20">
                {/* Portal Section Header */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200">Parent Summary</h4>
                    <p className="text-[9px] text-slate-400">Weekly wellbeing index & trends</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 text-[9px] font-bold">
                    Updates Live
                  </span>
                </div>

                {/* Grid Layout inside mockup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Column Widget: Line Chart */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between gap-3 shadow-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Wellbeing Score</span>
                      <h5 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">85% Stable</h5>
                    </div>
                    {/* Clean SVG Line Graph */}
                    <svg viewBox="0 0 120 50" className="w-full h-14 overflow-visible">
                      <defs>
                        <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 Q 20 15 40 28 T 80 18 T 120 10 L 120 50 L 0 50 Z" fill="url(#gradient-blue)" />
                      <path d="M 0 35 Q 20 15 40 28 T 80 18 T 120 10" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="120" cy="10" r="3" fill="#2563eb" />
                    </svg>
                  </div>

                  {/* Right Column Widget: Analytics Metrics */}
                  <div className="flex flex-col gap-3">
                    {/* Stat Card 1 */}
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Daily Mood Check-ins</span>
                        <h6 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">24 Logs Completed</h6>
                      </div>
                      <span className="text-xs">✅</span>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Rest Tracker</span>
                        <h6 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">8.2 hrs Sleep Avg</h6>
                      </div>
                      <span className="text-xs">💤</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Wide Card: Counselor Slot */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <h6 className="text-xs font-bold text-slate-800 dark:text-slate-200">Recommended Guidance</h6>
                    <p className="text-[10px] text-slate-450 dark:text-slate-550">Consult details or connect with licensed counselors in-app.</p>
                  </div>
                  <button className="px-3.5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-[9px] font-bold cursor-pointer transition-colors whitespace-nowrap">
                    Schedule Slot
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

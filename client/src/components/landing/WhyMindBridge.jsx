import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Moon, Wind, LineChart, MessagesSquare } from 'lucide-react';

const WhyMindBridge = () => {
  const features = [
    {
      icon: Heart,
      title: 'Daily Mood Tracking',
      description: 'Quick, interactive mood logs that allow teenagers to track how their emotional states shift over time in a secure dashboard.',
      color: 'text-indigo-600 bg-indigo-50/70 border-indigo-100',
    },
    {
      icon: Sparkles,
      title: 'AI Companion Journal',
      description: 'An AI-guided journal that asks reflective questions and parses thoughts, offering teenagers supportive coping skills.',
      color: 'text-purple-600 bg-purple-50/70 border-purple-100',
    },
    {
      icon: Moon,
      title: 'Sleep Tracking',
      description: 'Simple log analysis connecting sleep duration and quality to daily emotional stability, noting trends over time.',
      color: 'text-blue-600 bg-blue-50/70 border-blue-100',
    },
    {
      icon: Wind,
      title: 'Guided Meditation',
      description: 'A curated library of breathing sequences and audio exercises designed to reduce anxiety and stress patterns.',
      color: 'text-teal-600 bg-teal-50/70 border-teal-100',
    },
    {
      icon: LineChart,
      title: 'Private Parent Insights',
      description: 'Aggregated progress insights shared with parents to verify healthy development, preserving teenagers private writings.',
      color: 'text-emerald-600 bg-emerald-50/70 border-emerald-100',
    },
    {
      icon: MessagesSquare,
      title: 'Professional Counseling',
      description: 'Seamless appointment setups connecting families with licensed therapists directly inside the platform.',
      color: 'text-rose-600 bg-rose-50/70 border-rose-100',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="features" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Designed for Both Parent and Teen
          </h2>
          <p className="text-sm text-slate-500">
            A comprehensive, secure system helping teenagers express their feelings and giving parents clarity on progress.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
              >
                {/* Glow Backdrop */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-slate-50 group-hover:scale-150 group-hover:bg-indigo-50/20 transition-all duration-300 -mr-6 -mt-6 pointer-events-none" />

                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl ${feat.color} border flex items-center justify-center`}>
                  <Icon size={22} />
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2 relative">
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMindBridge;

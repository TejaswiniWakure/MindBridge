import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Heart, LineChart, Smile } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Setup separate, secure portals for parents and teenagers. Links accounts with end-to-end encryption.',
      icon: UserPlus,
      color: 'bg-indigo-50 border-indigo-100 text-indigo-650',
    },
    {
      number: '02',
      title: 'Track Wellness',
      description: 'Teenagers log daily journals, mood records, and take part in wellness breathing exercises.',
      icon: Heart,
      color: 'bg-teal-50 border-teal-100 text-teal-600',
    },
    {
      number: '03',
      title: 'Receive Insights',
      description: 'Parents see high-level aggregates and notifications, identifying stress trends without invading private logs.',
      icon: LineChart,
      color: 'bg-indigo-50 border-indigo-100 text-indigo-650',
    },
    {
      number: '04',
      title: 'Build Healthier Habits',
      description: 'Utilize customized AI coaching and simple check-ins to build healthier parent-teen communication paths.',
      icon: Smile,
      color: 'bg-teal-50 border-teal-100 text-teal-600',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
            Onboarding Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            How MindBridge Works
          </h2>
          <p className="text-sm text-slate-500">
            A simple, non-intrusive setup path designed to build security and trust.
          </p>
        </div>

        {/* Desktop timeline horizontal line */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[68px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-indigo-100 via-teal-150 to-indigo-100 pointer-events-none" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center gap-4 group"
                >
                  {/* Step bubble */}
                  <div className="relative flex items-center justify-center">
                    {/* Ring glow */}
                    <div className="absolute inset-0 rounded-full bg-slate-50 scale-125 group-hover:scale-150 group-hover:bg-indigo-50/40 transition-all duration-300 pointer-events-none" />
                    
                    {/* Icon card */}
                    <div className={`relative w-16 h-16 rounded-full border-2 ${step.color} flex items-center justify-center shadow-sm z-10 bg-white`}>
                      <Icon size={24} />
                    </div>

                    {/* Step indicator */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center z-20 border border-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-2 mt-2 px-3">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

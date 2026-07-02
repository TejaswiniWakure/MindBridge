import React from 'react';
import { motion } from 'framer-motion';
import { Star, HeartHandshake } from 'lucide-react';
import Avatar from '../ui/Avatar';

const Testimonials = () => {
  const reviews = [
    {
      quote: "MindBridge gives me a safe space to write how I feel. My parents know I am doing okay, but they don't read my diary. It's the perfect balance of support and independence.",
      name: 'Maya K.',
      role: 'High School Teen, 16',
      avatarName: 'Maya K',
    },
    {
      quote: "It gives me peace of mind. I can spot wellness trends and understand when my teen is stressed, allowing me to check in appropriately without feeling like an intruder.",
      name: 'David M.',
      role: 'Parent of 15-year old',
      avatarName: 'David M',
    },
    {
      quote: "I love that MindBridge integrates clinical safety nets. The platform allows families to build authentic trust, bridge communication gaps, and spot warning trends early.",
      name: 'Dr. Sarah Jenkins',
      role: 'Adolescent Psychologist',
      avatarName: 'Sarah Jenkins',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold text-indigo-650 uppercase tracking-widest">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Loved by Teens, Trusted by Parents
          </h2>
          <p className="text-sm text-slate-500">
            Hear from families and professionals who are improving communication and mental wellness.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between gap-6 cursor-pointer"
            >
              {/* Rating stars */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-450 text-amber-450" />
                  ))}
                </div>
                <p className="text-xs text-slate-650 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 border-t border-slate-200/50 pt-4.5">
                <Avatar name={rev.avatarName} size="sm" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{rev.name}</span>
                  <span className="text-[10px] text-slate-450 font-medium">{rev.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

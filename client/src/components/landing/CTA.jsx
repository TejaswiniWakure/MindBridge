import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const CTA = () => {
  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-tr from-indigo-700 via-indigo-650 to-teal-650 rounded-[32px] px-8 py-12 sm:p-16 text-center text-white overflow-hidden shadow-xl shadow-indigo-950/10 flex flex-col items-center gap-6"
        >
          {/* Decorative Orbs */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none -ml-40 -mt-40" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none -mr-40 -mb-40" />

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight max-w-2xl leading-tight">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-sm text-indigo-100 max-w-lg leading-relaxed">
            Join thousands of families building healthier emotional check-ins, tracking sleep, and growing closer together.
          </p>

          <Link
            to="/choose-role"
            className="bg-white hover:bg-slate-50 text-indigo-750 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center gap-2.5 mt-2 cursor-pointer text-sm"
          >
            Create Free Account
            <ArrowRight size={16} className="text-indigo-650" />
          </Link>

          {/* Core benefit markers */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-white/10 w-full max-w-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-50">
              <CheckCircle2 size={14} className="text-teal-400" />
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-50">
              <CheckCircle2 size={14} className="text-teal-400" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-50">
              <CheckCircle2 size={14} className="text-teal-400" />
              Encrypted & Privacy-first
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

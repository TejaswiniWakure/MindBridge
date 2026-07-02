import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does MindBridge protect my teenager's privacy?",
      a: "All raw logs, diaries, and journal check-ins written by teenagers are fully encrypted and private. Parents only see aggregated statistical charts (such as overall mood balance or sleep indices) and high-level summaries. MindBridge never leaks specific personal text."
    },
    {
      q: "What kind of information can parents actually see?",
      a: "Parents have access to a dashboard displaying general wellbeing indicators: weekly mood trajectories, completion of breathing exercises, hours of sleep logs, and general trends. They will also receive alerts if the AI logs show sustained signs of exhaustion."
    },
    {
      q: "How does the AI Companion Journal work?",
      a: "The AI acts as an empathetic assistant. When a teen writes, the AI helps guide reflection, suggests breathing techniques, and logs general mood scores. It does not critique or evaluate the teen; it is designed to encourage self-reflection."
    },
    {
      q: "Can we connect multiple children to one parent account?",
      a: "Yes. The parent portal allows you to link multiple teenage member accounts securely, so you can manage family insights from a single dashboard."
    },
    {
      q: "What happens if the platform detects severe distress or self-harm?",
      a: "MindBridge has built-in safety triggers. If a user logs severe distress, the AI immediately displays hotlines and resources. The system also flags the trend in the parent portal while gently prompting the teen to reach out to their connected therapist."
    },
    {
      q: "Can we invite our family therapist to review data?",
      a: "Yes. You can invite your licensed counselor or clinical therapist to create a portal. Once invited, you can choose to securely share permitted wellness logs and sleep charts to support therapy sessions."
    },
    {
      q: "Is MindBridge a replacement for clinical therapy?",
      a: "No. MindBridge is a supporting tool designed to facilitate mindfulness, self-reflection, and family communication. It works best alongside clinical guidance and is not a medical diagnostic utility."
    },
    {
      q: "How do we get started as a school or organization?",
      a: "We offer tailored partnerships for educators and organizations. You can request a demo by contacting our support team or filling out the enterprise partnership form under our contact details."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 relative">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold text-indigo-650 uppercase tracking-widest">
            F.A.Q.
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-slate-905 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Have questions about privacy or integrations? We have answers.
          </p>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={16} className="text-indigo-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-550 border-t border-slate-50 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

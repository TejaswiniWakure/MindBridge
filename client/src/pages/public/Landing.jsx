import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="bg-[#F6F6F4] text-[#181818] selection:bg-[#EEEEEC] selection:text-[#202020]">
      
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 min-h-[85vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <h1 className="text-5xl lg:text-7xl font-bold font-serif text-[#202020] leading-[1.1]">
            Your mental wellbeing deserves attention.
          </h1>
          <p className="text-xl text-[#555555] max-w-lg leading-relaxed">
            Understand how you're feeling, identify what may be affecting your wellbeing, and build a more personalized path forward.
          </p>
          <div className="pt-4">
            <a href="#how-it-works" className="inline-flex items-center gap-2 bg-[#292929] text-[#FFFFFF] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#333333] transition-all shadow-md">
              See How It Works <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-6 text-sm font-medium tracking-wide text-[#555555] uppercase">
              Private by design. Personalized around you.
            </p>
          </div>
        </motion.div>
        
        {/* Right Conceptual UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-[#DCDCDC] max-w-md mx-auto relative z-10">
            <h3 className="text-xs font-bold text-[#555555] tracking-widest uppercase mb-8">
              Your Wellbeing Journey
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-[#202020]">Stress</span>
                  <span className="text-[#292929]">Balanced</span>
                </div>
                <div className="h-2 w-full bg-[#F6F6F4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#858585] w-2/3 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-[#202020]">Sleep</span>
                  <span className="text-[#292929]">Improving</span>
                </div>
                <div className="h-2 w-full bg-[#F6F6F4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#858585] w-4/5 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-[#202020]">Mood</span>
                  <span className="text-[#292929]">Steady</span>
                </div>
                <div className="h-2 w-full bg-[#F6F6F4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#858585] w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#F6F6F4] p-6 rounded-2xl border border-[#DCDCDC]">
              <h4 className="text-[10px] font-bold text-[#555555] tracking-widest uppercase mb-2">Personalized Next Step</h4>
              <p className="text-[#202020] font-medium text-lg flex items-center justify-between">
                Evening wind-down
                <span className="w-6 h-6 rounded-full border-2 border-[#292929] flex items-center justify-center"></span>
              </p>
            </div>
          </div>
          
          <div className="absolute top-12 -right-8 bg-[#202020] text-white px-4 py-2 rounded-xl shadow-lg border border-[#202020] text-sm font-medium z-20 hidden md:block">
            Priority Areas
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white border-y border-[#DCDCDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-bold font-serif text-[#202020] mb-6">
              A clearer way to understand your wellbeing.
            </h2>
            <p className="text-xl text-[#555555]">
              Mindwell takes you through a simple journey — from understanding where you are to making meaningful progress.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-[#F6F6F4] z-0"></div>
            
            {[
              { num: '01', title: 'Discover', desc: "Share how you've been feeling, what's been affecting you, and what you'd like to improve." },
              { num: '02', title: 'Assess', desc: 'Complete relevant validated wellbeing assessments based on your goals and responses.' },
              { num: '03', title: 'Personalize', desc: 'Your information is used to identify priority areas and shape a personalized wellness plan.' },
              { num: '04', title: 'Progress', desc: 'Check in over time, follow your plan, understand changes, and adapt your next steps.' }
            ].map((step, i) => (
              <div key={i} className="flex-1 relative z-10 bg-white pr-6">
                <span className="text-xl font-serif font-bold text-[#292929] mb-4 block bg-white inline-block pr-4">{step.num} — {step.title}</span>
                <p className="text-[#555555]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENTS */}
      <section id="assessments" className="py-24 bg-[#202020] text-[#F6F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Understand what's been affecting you.</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto mb-16">
            Mindwell uses established wellbeing screening instruments to help you better understand areas that may need attention.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { label: 'Mood & Depression', code: 'PHQ-9' },
              { label: 'Anxiety & Worry', code: 'GAD-7' },
              { label: 'Stress', code: 'PSS-10' },
              { label: 'Sleep', code: 'ISI' },
              { label: 'General Wellbeing', code: 'WHO-5' }
            ].map((item, i) => (
              <div key={i} className="bg-[#202020] border border-white/10 px-6 py-4 rounded-xl text-left">
                <div className="text-sm text-[#858585] mb-1">{item.label}</div>
                <div className="text-xl font-bold text-white">{item.code}</div>
              </div>
            ))}
          </div>
          <p className="text-sm opacity-60 max-w-2xl mx-auto">
            Screening tools are intended to support self-understanding and are not medical diagnoses.
          </p>
        </div>
      </section>

      {/* PERSONALIZED WELLNESS */}
      <section className="py-24 bg-[#F6F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif text-[#202020] mb-6">A path shaped around you.</h2>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto mb-16">
            Your goals, assessment results, check-ins, and progress come together to create a wellness journey that can evolve over time.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 font-bold text-[#202020] tracking-wide uppercase text-sm md:text-base">
            <span>Goals</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Assessment</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Priority Areas</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Wellness Plan</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Check-ins</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Progress</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Reassessment</span> <ArrowRight className="w-4 h-4 text-[#292929]" />
            <span>Updated Plan</span>
          </div>
          
          <p className="mt-12 text-[#555555] italic">As your needs change, your wellness journey can change with you.</p>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="py-24 bg-white border-y border-[#DCDCDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif text-[#202020] mb-6">Support that meets you where you are.</h2>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto mb-16">
            Not everyone needs the same kind of support. Mindwell gives you three ways to move forward.
          </p>

          {/* Tree Visualization */}
          <div className="flex flex-col items-center mb-16 text-[#202020]">
            <div className="font-bold tracking-widest uppercase mb-4">Support</div>
            <div className="w-0.5 h-8 bg-[#DCDCDC]"></div>
            <div className="w-full max-w-3xl h-0.5 bg-[#DCDCDC] flex justify-between relative">
              <div className="w-0.5 h-8 bg-[#DCDCDC] absolute left-0 top-0"></div>
              <div className="w-0.5 h-8 bg-[#DCDCDC] absolute left-1/2 top-0 -ml-[1px]"></div>
              <div className="w-0.5 h-8 bg-[#DCDCDC] absolute right-0 top-0"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-[#202020]">01 — AI Companion</h3>
              <p className="text-[#555555]">A private space to talk things through, reflect, organize your thoughts, and find a practical next step.</p>
              <Link to="/login" className="text-[#292929] font-bold hover:text-[#333333] inline-flex items-center gap-2">Talk it through <ArrowRight className="w-4 h-4"/></Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-[#202020]">02 — Support Circle</h3>
              <p className="text-[#555555]">Stay connected with people you trust and reach out when you need someone close.</p>
              <Link to="/login" className="text-[#292929] font-bold hover:text-[#333333] inline-flex items-center gap-2">Build your support circle <ArrowRight className="w-4 h-4"/></Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-[#202020]">03 — Professionals</h3>
              <p className="text-[#555555]">Find verified mental-health professionals, explore their expertise and availability, and connect when you're ready for professional support.</p>
              <Link to="/login" className="text-[#292929] font-bold hover:text-[#333333] inline-flex items-center gap-2">Find a professional <ArrowRight className="w-4 h-4"/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONALS */}
      <section id="professionals" className="py-24 bg-[#F6F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold font-serif text-[#202020]">For professionals who want to make a difference.</h2>
            <p className="text-xl text-[#555555]">
              Mindwell connects people seeking support with verified mental-health professionals.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-[#DCDCDC] inline-block mt-4">
              <ul className="space-y-3 text-[#202020] font-medium">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#292929] rounded-full"></span> Create a professional profile</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#292929] rounded-full"></span> Submit credentials for verification</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#292929] rounded-full"></span> Set availability & session types</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#292929] rounded-full"></span> Connect with clients & manage appointments</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Link to="/login" className="bg-[#202020] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#202020] transition-colors inline-flex items-center gap-2 shadow-lg">
              Join as a Professional <ArrowRight className="w-5 h-5"/>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white border-y border-[#DCDCDC]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif text-[#202020] mb-4">Get in touch.</h2>
          <p className="text-[#555555] mb-10">Have a question or want to reach the Mindwell team?</p>
          
          <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-1">Name</label>
              <input type="text" placeholder="Enter your name" className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-1">Email</label>
              <input type="email" placeholder="Enter your email" className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-1">Subject</label>
              <input type="text" placeholder="What is this regarding?" className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-1">Message</label>
              <textarea placeholder="Write your message..." rows={4} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]"></textarea>
            </div>
            <button className="w-full bg-[#292929] text-[#FFFFFF] font-bold py-4 rounded-lg hover:bg-[#333333] transition-colors inline-flex items-center justify-center gap-2">
              Send Message <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-sm text-[#555555] mt-4">We'll get back to you as soon as possible.</p>
          </form>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="py-24 bg-[#F6F6F4] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-serif text-[#202020] mb-6">Your wellbeing is personal.</h2>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto mb-16">
            Mindwell is designed around privacy, control, and secure access to your information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="font-bold tracking-widest uppercase text-[#202020]">Private</div>
              <p className="text-[#555555]">Your personal wellbeing information is treated as private.</p>
            </div>
            <div className="space-y-3">
              <div className="font-bold tracking-widest uppercase text-[#202020]">Controlled</div>
              <p className="text-[#555555]">You decide what information you share and who you share it with.</p>
            </div>
            <div className="space-y-3">
              <div className="font-bold tracking-widest uppercase text-[#202020]">Secure</div>
              <p className="text-[#555555]">Your account and wellbeing information are protected through secure access controls.</p>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center items-center gap-6 text-[#202020] font-bold tracking-widest uppercase text-sm">
            <span className="flex items-center gap-2"><EyeOff className="w-4 h-4 text-[#292929]" /> Private</span>
            <span className="text-[#DCDCDC]">|</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#292929]" /> Controlled</span>
            <span className="text-[#DCDCDC]">|</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#292929]" /> Secure</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-[#202020] text-[#F6F6F4] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight">
            Start understanding your wellbeing.
          </h2>
          <p className="text-xl text-[#858585] mb-12">
            Take the first step toward a more personalized approach to your mental wellbeing.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-[#292929] text-[#FFFFFF] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#333333] transition-all shadow-lg hover:-translate-y-0.5">
            Begin Your Journey <ArrowRight className="w-5 h-5"/>
          </Link>
          <p className="mt-8 text-sm tracking-widest uppercase text-[#858585]">Your journey starts with understanding.</p>
        </div>
      </section>

    </div>
  );
};
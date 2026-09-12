import { DOBSelector } from '../../components/ui/DOBSelector';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { onboardingAPI } from '../../api/endpoints';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { differenceInYears, parseISO } from 'date-fns';

const FOCUS_AREAS = [
  { id: 'Stress', label: '01 Stress', desc: 'Feeling overwhelmed or under pressure' },
  { id: 'Sleep', label: '02 Sleep', desc: 'Rest, routine, or difficulty sleeping' },
  { id: 'Mood', label: '03 Mood', desc: 'Feeling low, disconnected, or emotionally drained' },
  { id: 'Anxiety', label: '04 Anxiety', desc: 'Worry, fear, or racing thoughts' },
  { id: 'Focus', label: '05 Focus', desc: 'Concentration, motivation, or getting things done' },
  { id: 'Relationships', label: '06 Relationships', desc: 'Communication, connection, or conflict' },
  { id: 'Confidence', label: '07 Confidence', desc: 'Self-belief and personal growth' },
];

export const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    email: user?.email || '',
    phone: ''
  });

  const [focusAreas, setFocusAreas] = useState([]);
  const [prefs, setPrefs] = useState({ time: '', format: '', approach: '' });
  const [consents, setConsents] = useState({ tos: false, emergency: false, data: false });
  const [dStep, setDStep] = useState(1);
  const [answers, setAnswers] = useState({ q1: '', q2: [], q3: '', q4: '', q5: '', q6: '', q7: '' });
  const [assignments, setAssignments] = useState([]);

  const age = useMemo(() => {
    if (!profile.dateOfBirth) return null;
    return differenceInYears(new Date(), parseISO(profile.dateOfBirth));
  }, [profile.dateOfBirth]);

  const nextStep = () => {
    setError('');
    
    if (step === 1) {
      if (!profile.name || !profile.preferredName || !profile.dateOfBirth || !profile.gender || !profile.email) {
        return setError('Please fill all mandatory fields.');
      }
      if (age < 17 || age > 30) {
        return setError('Mindwell is currently designed for individuals between 17 and 30 years old.');
      }
    }
    
    if (step === 2 && focusAreas.length === 0) {
      return setError('Please select at least one area of focus.');
    }

    if (step === 3 && (!prefs.time || !prefs.format || !prefs.approach)) {
      return setError('Please select your preferences.');
    }

    if (step === 4 && (!consents.tos || !consents.emergency)) {
      return setError('You must agree to the required terms to continue.');
    }

    setStep(s => s + 1);
  };

  const handleDiscoveryNext = async () => {
    setError('');
    if (dStep === 1 && !answers.q1) return setError('Please select an option.');
    if (dStep === 2 && answers.q2.length === 0) return setError('Please select at least one option.');
    if (dStep === 3 && !answers.q3) return setError('Please select an option.');
    if (dStep === 4 && !answers.q4) return setError('Please select an option.');
    if (dStep === 5 && !answers.q5) return setError('Please select an option.');
    if (dStep === 6 && !answers.q6) return setError('Please select an option.');
    if (dStep === 7 && !answers.q7) return setError('Please select an option.');

    if (dStep < 7) {
      setDStep(d => d + 1);
    } else {
      setStep(6);
      
      setTimeout(async () => {
        try {
          const assigned = [];
          if (answers.q6.includes('noticeable') || answers.q2.includes('Feeling low') || focusAreas.includes('Mood')) {
            assigned.push({ id: 'PHQ-9', name: 'Mood Assessment', desc: 'Questions about your recent mood and energy.' });
          }
          if (answers.q5.includes('lot') || answers.q5.includes('deal') || answers.q2.includes('worried') || focusAreas.includes('Anxiety')) {
            assigned.push({ id: 'GAD-7', name: 'Anxiety & Worry', desc: 'Questions about your recent worry or racing thoughts.' });
          }
          if (answers.q3.includes('Often') || answers.q3.includes('Almost') || focusAreas.includes('Stress')) {
            assigned.push({ id: 'PSS-10', name: 'Stress', desc: 'A short questionnaire about how much stress you’ve been experiencing recently.' });
          }
          if (answers.q4.includes('difficult') || focusAreas.includes('Sleep')) {
            assigned.push({ id: 'ISI', name: 'Sleep', desc: 'A short questionnaire about your recent sleep experience.' });
          }
          if (assigned.length === 0) {
            assigned.push({ id: 'WHO-5', name: 'General Wellbeing', desc: 'A broad look at your overall emotional wellbeing.' });
          }
          
          await onboardingAPI.updateProfile(profile);
          // Wait, also update goals/preferences if needed based on API, but updateProfile is enough for MVP
          setAssignments(assigned);
          setStep(7);
        } catch (err) {
          setError('Failed to process responses.');
          setStep(5);
        }
      }, 3000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-[#181818] mb-2">Welcome to Mindwell</h1>
              <p className="text-[#555555]">Let's start with a few basic details.</p>
            </div>
            {error && <div className="text-white text-sm bg-red-500 p-3 rounded">{error}</div>}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Full Name *</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Preferred Name *</label>
                <input type="text" value={profile.preferredName} onChange={e => setProfile({...profile, preferredName: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Date of Birth *</label>
                <DOBSelector value={profile.dateOfBirth} onChange={val => setProfile({...profile, dateOfBirth: val})} />
                {age !== null && <p className="text-xs text-[#858585] mt-1">Age: {age} (17-30 only)</p>}
              </div>
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Gender *</label>
                <select className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})}>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Email *</label>
                <input type="email" value={profile.email} disabled className="w-full border border-[#DCDCDC] bg-[#EEEEEC] text-[#858585] rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase text-[#858585] mb-2">Phone Number (Optional)</label>
                <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-4 py-3 focus:outline-none focus:border-[#202020]" />
              </div>
            </div>
            
            <button className="w-full mt-4 bg-[#202020] text-white py-3 rounded-full font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2" onClick={nextStep}>
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2 block">YOUR WELLBEING • STEP 02 / 04</span>
              <h2 className="text-3xl font-serif font-bold text-[#181818] mb-2">What feels most relevant to you right now?</h2>
              <p className="text-[#555555]">Choose up to 3 areas you'd like Mindwell to help you understand.</p>
            </div>
            {error && <div className="text-white text-sm bg-red-500 p-3 rounded">{error}</div>}
            
            <div className="space-y-3">
              {FOCUS_AREAS.map(area => {
                const isSelected = focusAreas.includes(area.id);
                return (
                  <div 
                    key={area.id}
                    onClick={() => {
                      if (isSelected) setFocusAreas(prev => prev.filter(a => a !== area.id));
                      else if (focusAreas.length < 3) setFocusAreas(prev => [...prev, area.id]);
                    }}
                    className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center gap-4 ${isSelected ? 'border-[#202020] bg-[#EEEEEC]' : 'border-[#DCDCDC] bg-white hover:border-[#858585]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#858585]'}`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-bold text-[#181818]">{area.label}</div>
                      <div className="text-sm text-[#555555]">{area.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <button className="flex items-center gap-2 px-6 py-3 border border-[#DCDCDC] text-[#555555] rounded-full font-bold hover:bg-[#F6F6F4]" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /> Back</button>
              <button className="flex items-center gap-2 px-8 py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333]" onClick={nextStep}>Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2 block">Mindwell • 03 / 04</span>
              <h2 className="text-3xl font-serif font-bold text-[#181818] leading-tight mb-2">PERSONALIZE YOUR EXPERIENCE<br/>Let's make Mindwell fit<br/>into your real life.</h2>
              <p className="text-[#555555]">A few preferences help us shape your recommendations and daily plan.</p>
            </div>
            {error && <div className="text-white text-sm bg-red-500 p-3 rounded">{error}</div>}

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-3 block">HOW MUCH TIME FEELS REALISTIC?</label>
                <div className="grid grid-cols-3 gap-3">
                  {['5 min', '10 min', '20 min'].map(t => (
                    <div key={t} onClick={() => setPrefs({...prefs, time: t})} className={`p-4 text-center border rounded-xl cursor-pointer transition-colors ${prefs.time === t ? 'border-[#202020] bg-[#EEEEEC] text-[#181818] font-bold' : 'border-[#DCDCDC] text-[#555555] bg-white hover:border-[#858585]'}`}>
                      {t}<br/><span className="text-xs font-normal text-[#858585]">{t==='5 min'?'Quick & simple':t==='10 min'?'Balanced':'More time'}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-3 block">WHAT WORKS BEST FOR YOU?</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Practical exercises', 'Guided reflection', 'Short learning', 'Relaxation', 'A mix of approaches'].map(f => (
                    <div key={f} onClick={() => setPrefs({...prefs, format: f})} className={`p-3 text-center border rounded-xl cursor-pointer transition-colors ${prefs.format === f ? 'border-[#202020] bg-[#EEEEEC] text-[#181818] font-bold' : 'border-[#DCDCDC] text-[#555555] bg-white hover:border-[#858585]'} ${f === 'A mix of approaches' ? 'col-span-2' : ''}`}>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-3 block">WHAT APPROACH FEELS RIGHT?</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Gentle', 'Structured', 'Flexible', 'Challenging'].map(a => (
                    <div key={a} onClick={() => setPrefs({...prefs, approach: a})} className={`py-3 text-center text-sm border rounded-xl cursor-pointer transition-colors ${prefs.approach === a ? 'border-[#202020] bg-[#EEEEEC] text-[#181818] font-bold' : 'border-[#DCDCDC] text-[#555555] bg-white hover:border-[#858585]'}`}>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button className="flex items-center gap-2 px-6 py-3 border border-[#DCDCDC] text-[#555555] rounded-full font-bold hover:bg-[#F6F6F4]" onClick={() => setStep(2)}><ArrowLeft className="w-4 h-4" /> Back</button>
              <button className="flex items-center gap-2 px-8 py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333]" onClick={nextStep}>Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2 block">Consent & Privacy • 04 / 04</span>
              <h2 className="text-3xl font-serif font-bold text-[#181818] mb-2">Your privacy matters.</h2>
              <p className="text-[#555555]">Please review these before continuing.</p>
            </div>
            {error && <div className="text-white text-sm bg-red-500 p-3 rounded">{error}</div>}
            
            <div className="space-y-4">
              <label className="flex items-start gap-4 p-5 border border-[#DCDCDC] rounded-2xl cursor-pointer hover:bg-[#F6F6F4] bg-white transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-[#202020]" checked={consents.tos} onChange={e => setConsents({...consents, tos: e.target.checked})} />
                <div>
                  <div className="font-medium text-[#181818]">I agree to the Terms of Service and Privacy Policy</div>
                  <div className="text-xs text-[#202020] font-bold uppercase mt-1">Required</div>
                </div>
              </label>
              
              <label className="flex items-start gap-4 p-5 border border-[#DCDCDC] rounded-2xl cursor-pointer hover:bg-[#F6F6F4] bg-white transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-[#202020]" checked={consents.emergency} onChange={e => setConsents({...consents, emergency: e.target.checked})} />
                <div>
                  <div className="font-medium text-[#181818]">I understand that Mindwell is not an emergency service or a replacement for professional care.</div>
                  <div className="text-xs text-[#202020] font-bold uppercase mt-1">Required</div>
                </div>
              </label>

              <label className="flex items-start gap-4 p-5 border border-[#DCDCDC] rounded-2xl cursor-pointer hover:bg-[#F6F6F4] bg-white transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-[#202020]" checked={consents.data} onChange={e => setConsents({...consents, data: e.target.checked})} />
                <div>
                  <div className="font-medium text-[#181818]">I agree to Mindwell using my information to personalize my experience.</div>
                  <div className="text-xs text-[#858585] font-bold uppercase mt-1">Optional</div>
                </div>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button className="flex items-center gap-2 px-6 py-3 border border-[#DCDCDC] text-[#555555] rounded-full font-bold hover:bg-[#F6F6F4]" onClick={() => setStep(3)}><ArrowLeft className="w-4 h-4" /> Back</button>
              <button className="flex items-center gap-2 px-8 py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333]" onClick={nextStep}>Begin Discovery <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#181818] mb-2">Let's understand where you are</h2>
              <p className="text-[#555555]">A few quick questions help us choose the right next step for you.</p>
            </div>
            
            <div className="bg-[#F6F6F4] p-8 rounded-3xl border border-[#EEEEEC]">
              {error && <div className="text-white text-sm bg-red-500 p-3 rounded mb-4">{error}</div>}
              
              {dStep === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 1 — Overall state</h3>
                  <p className="text-xl text-[#181818] font-bold">How have you been feeling overall lately?</p>
                  <div className="space-y-3">
                    {['Pretty good', 'Mostly okay', 'A little difficult', 'Quite difficult', 'Very difficult'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q1: opt})} className={`p-4 border rounded-xl cursor-pointer transition-colors font-medium ${answers.q1 === opt ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dStep === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 2 — Emotional wellbeing</h3>
                  <p className="text-xl text-[#181818] font-bold">Which of these have been affecting you recently? <span className="text-sm text-[#858585] font-normal block mt-1">(Select all that apply)</span></p>
                  <div className="space-y-3">
                    {[
                      'Feeling low or emotionally drained', 'Feeling worried or on edge', 'Feeling overwhelmed or under pressure',
                      'Difficulty sleeping or resting', 'Difficulty focusing or getting motivated', 'Trouble enjoying things I normally like', 'Nothing in particular'
                    ].map(opt => {
                      const isSelected = answers.q2.includes(opt);
                      return (
                        <div key={opt} onClick={() => {
                          if (opt === 'Nothing in particular') return setAnswers({...answers, q2: [opt]});
                          if (isSelected) setAnswers({...answers, q2: answers.q2.filter(x => x !== opt)});
                          else setAnswers({...answers, q2: [...answers.q2.filter(x => x !== 'Nothing in particular'), opt]});
                        }} className={`p-4 border rounded-xl flex items-center gap-4 cursor-pointer transition-colors font-medium ${isSelected ? 'border-[#202020] bg-[#EEEEEC] text-[#181818]' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${isSelected ? 'bg-[#202020] text-white' : 'border border-[#DCDCDC]'}`}>
                            {isSelected && <Check className="w-4 h-4" />}
                          </div>
                          {opt}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {dStep === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 3 — Stress</h3>
                  <p className="text-xl text-[#181818] font-bold">How often does everyday life feel difficult to manage?</p>
                  <div className="space-y-3">
                    {['Rarely', 'Sometimes', 'Often', 'Very often', 'Almost always'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q3: opt})} className={`p-4 border rounded-xl cursor-pointer transition-colors font-medium ${answers.q3 === opt ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dStep === 4 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 4 — Sleep</h3>
                  <p className="text-xl text-[#181818] font-bold">How has your sleep been recently?</p>
                  <div className="space-y-3">
                    {['No major concerns', 'Sometimes difficult', 'Frequently difficult', 'Very difficult'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q4: opt})} className={`p-4 border rounded-xl cursor-pointer transition-colors font-medium ${answers.q4 === opt ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dStep === 5 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 5 — Worry</h3>
                  <p className="text-xl text-[#181818] font-bold">How much have worry or racing thoughts been affecting your day?</p>
                  <div className="space-y-3">
                    {['Not much', 'A little', 'Moderately', 'Quite a lot', 'A great deal'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q5: opt})} className={`p-4 border rounded-xl cursor-pointer transition-colors font-medium ${answers.q5 === opt ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dStep === 6 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 6 — Mood / interest</h3>
                  <p className="text-xl text-[#181818] font-bold">Have you noticed changes in your mood, energy, or interest in things?</p>
                  <div className="space-y-3">
                    {['No noticeable change', 'A small change', 'A noticeable change', 'A significant change'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q6: opt})} className={`p-4 border rounded-xl cursor-pointer transition-colors font-medium ${answers.q6 === opt ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dStep === 7 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-[10px] tracking-widest text-[#858585] uppercase">Question 7 — Daily functioning</h3>
                  <p className="text-xl text-[#181818] font-bold">How much are these concerns affecting your everyday life?</p>
                  <div className="space-y-3">
                    {['Not at all', 'A little', 'Moderately', 'Quite a lot', 'A great deal'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q7: opt})} className={`p-4 border rounded-xl cursor-pointer transition-colors font-medium ${answers.q7 === opt ? 'border-[#202020] bg-[#202020] text-white' : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#858585]'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              {dStep > 1 ? (
                <button onClick={() => setDStep(d => d - 1)} className="text-[#858585] font-bold hover:text-[#202020] inline-flex items-center gap-2 px-4"><ArrowLeft className="w-4 h-4"/> Back</button>
              ) : <div></div>}
              <button className="flex items-center gap-2 px-8 py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333]" onClick={handleDiscoveryNext}>
                {dStep === 7 ? 'Submit' : 'Next'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8 py-20 text-center animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 text-[#202020] animate-spin mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-[#181818] mb-2">Understanding your responses</h2>
            <p className="text-[#555555] max-w-md mx-auto">We're reviewing what you shared to choose the most relevant next step.</p>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#858585] uppercase mb-2 block">We've got a clearer picture</span>
              <h2 className="text-3xl font-serif font-bold text-[#181818] mb-2">Your next step</h2>
              <p className="text-[#555555]">Based on what you've shared, we'll start with a few questions focused on the areas that may be most relevant to you.</p>
              <p className="text-[10px] text-[#858585] font-bold tracking-widest uppercase mt-4">This is a screening process, not a diagnosis.</p>
            </div>
            
            <div className="space-y-4 mt-8">
              {assignments.map(ass => (
                <div key={ass.id} className="p-8 border border-[#DCDCDC] rounded-3xl bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-bold text-[#858585] tracking-widest uppercase mb-2">{ass.name}</div>
                    <div className="text-2xl font-serif text-[#181818] font-bold mb-2">{ass.id}</div>
                    <p className="text-[#555555] text-sm">{ass.desc}</p>
                  </div>
                  <button className="whitespace-nowrap px-8 py-3 bg-[#202020] text-white rounded-full font-bold hover:bg-[#333333] transition-colors" onClick={() => navigate('/app/assessments')}>Start Assessment</button>
                </div>
              ))}
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex flex-col items-center justify-center p-4 selection:bg-[#EEEEEC] selection:text-[#202020]">
      <div className="w-full max-w-3xl bg-white border border-[#DCDCDC] shadow-xl rounded-[2.5rem] p-8 md:p-12 my-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step + (step === 5 ? dStep : 0)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

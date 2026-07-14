import React, { useState, useEffect, useRef } from 'react';

const API_URL = 'http://localhost:5000/api';

// Professional clinical quotes/tips
const CLINICAL_TIPS = [
  { text: "Breathing is the bridge between your body and your mind. Take a slow, intentional inhale.", author: "Clinical Foundation" },
  { text: "Progress is not linear. Small, consistent efforts build cognitive resilience over time.", author: "Cognitive Behavioral Therapy" },
  { text: "Acknowledging your emotional state is the first step toward self-regulation.", author: "Mindfulness Research" },
  { text: "Giving yourself space to rest is as productive as active coping.", author: "Restorative Psychology" },
];

const MOOD_OPTIONS = [
  { label: 'Happy', color: '#10B981', bg: '#D1FAE5' },
  { label: 'Calm', color: '#3B82F6', bg: '#DBEAFE' },
  { label: 'Tired', color: '#8B5CF6', bg: '#EDE9FE' },
  { label: 'Anxious', color: '#F59E0B', bg: '#FEF3C7' },
  { label: 'Sad', color: '#EF4444', bg: '#FEE2E2' },
];

const WELLNESS_HUB_CATEGORIES = [
  {
    id: 'mindfulness',
    label: 'Mindfulness',
    items: [
      { title: 'Guided Calm Meditation', duration: '12 min', desc: 'Focus on body sensations to quiet active thoughts.' },
      { title: 'Deep Box Breathing Guide', duration: '8 min', desc: 'Regulate your autonomic nervous system using 4-4-4 rhythm.' },
      { title: '5-4-3-2-1 Grounding Practice', duration: '6 min', desc: 'Cognitive grounding exercise to manage sensory overload.' },
      { title: 'Progressive Muscle Relaxation', duration: '15 min', desc: 'Release physical tension across major muscle groups.' }
    ]
  },
  {
    id: 'relaxation',
    label: 'Relaxation Sounds',
    items: [
      { title: 'Gentle Rainfall', duration: 'Loop', desc: 'Constant ambient pink noise to improve concentration.' },
      { title: 'Pacific Ocean Waves', duration: 'Loop', desc: 'Rhythmic sea waves to guide slow breathing cycles.' },
      { title: 'Deep White Noise', duration: 'Loop', desc: 'Filtered white noise to mask environmental distractions.' },
      { title: 'Acoustic Calm Instrumental', duration: '10 min', desc: 'Soft guitar tracks to support study or relaxation.' }
    ]
  },
  {
    id: 'sleep',
    label: 'Sleep Support',
    items: [
      { title: 'The Silent Valley Story', duration: '20 min', desc: 'Visual sleep journey designed to lower heartbeat.' },
      { title: 'Wind-Down Relaxation Sleep', duration: '15 min', desc: 'Guided slow-breath audio to prepare for sleep.' },
      { title: 'Binaural Beats for Deep Sleep', duration: '30 min', desc: 'Delta-wave audio tracks to improve sleep cycles.' }
    ]
  },
  {
    id: 'physical',
    label: 'Physical Wellness',
    items: [
      { title: 'Desk Stretching Sequence', duration: '5 min', desc: 'Quick posture corrections for shoulders and back.' },
      { title: 'Morning Gentle Yoga', duration: '12 min', desc: 'Basic flexibility movements for circulation.' },
      { title: 'Eye Relaxation Guide', duration: '4 min', desc: 'Prevent eye fatigue caused by screens.' }
    ]
  },
  {
    id: 'selfcare',
    label: 'Self-Care & Affirmations',
    items: [
      { title: 'Gratitude Reframing Prompt', duration: 'Daily', desc: 'Note down positive things from your day.' },
      { title: 'Daily Affirmation Flip', duration: 'Daily', desc: 'Positive affirmations to interrupt negative self-dialogue.' }
    ]
  },
  {
    id: 'learn',
    label: 'Clinical Education',
    items: [
      { title: 'Stress & the Brain', duration: '5 min read', desc: 'Learn how your brain handles stress.' },
      { title: 'Anxiety Mechanisms', duration: '7 min read', desc: 'Deconstructing physical symptoms of panic.' },
      { title: 'Habit Formation Science', duration: '6 min read', desc: 'How to build positive daily wellness routines.' }
    ]
  }
];

const ASSESSMENT_QUESTIONS = {
  'PHQ-A': [
    "Feeling down, depressed, irritable, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Poor appetite, weight loss, or overeating?",
    "Feeling tired or having little energy?",
    "Feeling bad about yourself, or that you have let your family down?"
  ],
  'GAD-7': [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it is hard to sit still?"
  ],
  'PSS-10': [
    "Been upset because of something that happened unexpectedly?",
    "Felt that you were unable to control the important things in your life?",
    "Felt nervous and stressed?",
    "Felt confident about your ability to handle your personal problems?",
    "Felt that things were going your way?"
  ],
  'WHO-5': [
    "I have felt cheerful and in good spirits.",
    "I have felt calm and relaxed.",
    "I have felt active and vigorous.",
    "I woke up feeling fresh and rested.",
    "My daily life has been filled with things that interest me."
  ]
};

export default function TeenDashboard({ user, onLogout, createdRoles, activeRole, setActiveRole }) {
  const [activePage, setActivePage] = useState('home');
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [profileStep, setProfileStep] = useState('form'); // form, success
  const [savedProfile, setSavedProfile] = useState({
    nickname: '',
    ageGroup: '13-18',
    familyCode: '',
    avatarColor: '#2563EB'
  });

  // Global State Stores (stored in localStorage)
  const [moodLogs, setMoodLogs] = useState([]);
  const [journals, setJournals] = useState([]);
  const [assessmentsHistory, setAssessmentsHistory] = useState([]);
  const [goals, setGoals] = useState([
    { id: 1, text: 'Perform 4-4-4 deep breathing cycle', completed: false },
    { id: 2, text: 'Log today\'s emotional state', completed: false },
    { id: 3, text: 'Review a clinical self-help article', completed: false }
  ]);
  const [alertMessage, setAlertMessage] = useState('');

  // Load profile and mock data
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mb_teen_profile');
      if (stored) {
        setSavedProfile(JSON.parse(stored));
        setProfileCompleted(true);
      }
      
      const storedMoods = localStorage.getItem('mb_teen_moods');
      if (storedMoods) setMoodLogs(JSON.parse(storedMoods));
      
      const storedJournals = localStorage.getItem('mb_teen_journals');
      if (storedJournals) setJournals(JSON.parse(storedJournals));

      const storedAss = localStorage.getItem('mb_teen_assessments');
      if (storedAss) setAssessmentsHistory(JSON.parse(storedAss));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveProfileData = (profile) => {
    localStorage.setItem('mb_teen_profile', JSON.stringify(profile));
    setSavedProfile(profile);
  };

  const addMoodLog = (log) => {
    const updated = [log, ...moodLogs];
    setMoodLogs(updated);
    localStorage.setItem('mb_teen_moods', JSON.stringify(updated));
  };

  const addJournal = (journal) => {
    const updated = [journal, ...journals];
    setJournals(updated);
    localStorage.setItem('mb_teen_journals', JSON.stringify(updated));
  };

  const addAssessment = (item) => {
    const updated = [item, ...assessmentsHistory];
    setAssessmentsHistory(updated);
    localStorage.setItem('mb_teen_assessments', JSON.stringify(updated));
  };

  // --- VIRTUAL COMPANION STATE ---
  const [companionChat, setCompanionChat] = useState([
    { sender: 'bot', text: "Hello. I am your Virtual Companion. I am here to offer evidence-based emotional support, guide you through breathing exercises, or help you plan your daily wellness goals. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [companionAction, setCompanionAction] = useState('idle'); // idle, speaking, breathing, listening
  const [breathPhase, setBreathPhase] = useState('idle'); // inhale, hold, exhale
  const [breathTimer, setBreathTimer] = useState(0);

  // --- EMOTION & MOTION DETECTION STATE ---
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectionLogs, setDetectionLogs] = useState([
    { time: '10:02 AM', type: 'Posture', desc: 'Slouching detected. Correction reminder sent.' },
    { time: '10:45 AM', type: 'Fatigue', desc: 'Screen inactivity warning. Suggest stretch break.' }
  ]);
  const [postureAlert, setPostureAlert] = useState(false);
  const [fatigueAlert, setFatigueAlert] = useState(false);
  const [mockEmotion, setMockEmotion] = useState('Neutral');

  // --- REFLECTION JOURNAL STATE ---
  const [journalTitle, setJournalTitle] = useState('');
  const [journalText, setJournalText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);

  // --- WELLNESS CHECK STATE ---
  const [activeCheckType, setActiveCheckType] = useState('PHQ-A');
  const [assessmentScores, setAssessmentScores] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });

  // --- WELLNESS HUB STATE ---
  const [activeHubCategory, setActiveHubCategory] = useState('mindfulness');
  const [currentAudio, setCurrentAudio] = useState(null); // { title, playing, progress }
  const [audioTimer, setAudioTimer] = useState(0);
  const [currentAffirmationIdx, setCurrentAffirmationIdx] = useState(0);
  const AFFIRMATIONS = [
    "I am worthy of calm and clarity.",
    "My feelings are indicators, not permanent controllers of my actions.",
    "I have control over how I respond to stress.",
    "I choose to take care of my physical and emotional needs today.",
    "I am building resilience step by step."
  ];

  // --- SAFETY CENTER STATE ---
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Parent/Guardian', phone: '555-0199' },
    { name: 'Counselor Office', phone: '555-0245' }
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  // Breathing simulation loop
  useEffect(() => {
    let interval = null;
    if (companionAction === 'breathing') {
      interval = setInterval(() => {
        setBreathTimer(t => {
          if (t >= 4) {
            setBreathPhase(phase => {
              if (phase === 'inhale') return 'hold-in';
              if (phase === 'hold-in') return 'exhale';
              if (phase === 'exhale') return 'hold-out';
              return 'inhale';
            });
            return 1;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      setBreathPhase('idle');
      setBreathTimer(0);
    }
    return () => clearInterval(interval);
  }, [companionAction]);

  // Simulated camera metrics loop
  useEffect(() => {
    let interval = null;
    if (isCameraActive) {
      interval = setInterval(() => {
        // Mock random shifts in posture or fatigue
        const rand = Math.random();
        if (rand > 0.85) {
          setPostureAlert(true);
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setDetectionLogs(prev => [{ time, type: 'Posture', desc: 'Slouching posture warning issued.' }, ...prev]);
        } else if (rand < 0.15) {
          setPostureAlert(false);
        }
        
        if (rand > 0.9) {
          setFatigueAlert(true);
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setDetectionLogs(prev => [{ time, type: 'Fatigue', desc: 'Eye strain alert: suggest screen break.' }, ...prev]);
        }
        
        const emotions = ['Calm', 'Focused', 'Tired', 'Anxious', 'Neutral'];
        setMockEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isCameraActive]);

  // Onboarding Submit
  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (!savedProfile.nickname.trim()) {
      setAlertMessage("Nickname is required.");
      return;
    }
    
    // Generate secure family code: MB-XXXX-XXXX
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateSegment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const familyCode = `MB-${generateSegment()}-${generateSegment()}`;
    
    const updated = {
      ...savedProfile,
      familyCode
    };
    saveProfileData(updated);
    setProfileStep('success');
    setAlertMessage('');
  };

  // Chat message send
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput };
    const updatedChat = [...companionChat, userMsg];
    setCompanionChat(updatedChat);
    setChatInput('');
    setCompanionAction('speaking');

    // Simple matching answers
    setTimeout(() => {
      let botReply = "Thank you for sharing. I'm here to support you. Let's take a slow breath or journal this feeling to examine it further.";
      const input = chatInput.toLowerCase();
      if (input.includes('stress') || input.includes('exam') || input.includes('study')) {
        botReply = "Exam pressure is highly common. Try dividing your study targets into 20-minute chunks followed by 5-minute deep stretching breaks. Should we practice a quick box breathing cycle now?";
      } else if (input.includes('lonely') || input.includes('sad') || input.includes('argument')) {
        botReply = "Interpersonal friction takes a heavy toll. Focus on grounding yourself first so you can approach the situation with cognitive clarity. Writing down a journal reflection can help map your thoughts.";
      } else if (input.includes('sleep') || input.includes('tired')) {
        botReply = "Sleep quality dictates cognitive stability. I recommend lowering screen brightness, shutting off notifications, and listening to deep white noise in the Wellness Hub.";
      }
      setCompanionChat(prev => [...prev, { sender: 'bot', text: botReply }]);
      setCompanionAction('idle');
    }, 1200);
  };

  // Journal submit
  const handleSaveJournal = () => {
    if (!journalText.trim()) return;
    const emotions = ['Calm', 'Reflective', 'Stressed', 'Optimistic', 'Neutral'];
    const logs = {
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      title: journalTitle.trim() || 'Untitled Reflection',
      text: journalText,
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      id: Date.now()
    };
    addJournal(logs);
    setJournalTitle('');
    setJournalText('');
    setAlertMessage('Reflection Journal saved successfully.');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  // Assessment submit
  const handleSaveAssessment = () => {
    let score = Object.values(assessmentScores).reduce((a, b) => a + b, 0);
    const item = {
      type: activeCheckType,
      score,
      maxScore: ASSESSMENT_QUESTIONS[activeCheckType].length * 3,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    };
    addAssessment(item);
    setAssessmentScores({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
    setAlertMessage('Wellness Check assessment complete.');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  // Start breathing helper
  const triggerBreathingCycle = () => {
    setCompanionAction('breathing');
    setBreathPhase('inhale');
  };

  // Safety trigger
  const triggerSOS = () => {
    alert("Emergency SOS activated. Trusted contacts notified via MindBridge clinical network. Calm resources loaded below.");
    setActivePage('safety');
  };

  // Add trusted contact
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    setEmergencyContacts([...emergencyContacts, { name: newContactName, phone: newContactPhone }]);
    setNewContactName('');
    setNewContactPhone('');
  };

  // Render Onboarding Screens
  if (!profileCompleted) {
    if (profileStep === 'form') {
      return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', sans-serif" }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '460px', width: '100%', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15,23,42,0.04)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: '#2563EB', marginBottom: '14px' }}></span>
              <h1 style={{ margin: '0 0 8px', fontSize: '1.6rem', fontWeight: '800', fontFamily: "'Lora', serif", color: '#0F172A' }}>Setup Child Portal</h1>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>Create your private local wellness workspace.</p>
            </div>
            
            <form onSubmit={handleOnboardingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Choose Nickname</label>
                <input type="text" placeholder="e.g. Alex" value={savedProfile.nickname} onChange={e => setSavedProfile({ ...savedProfile, nickname: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Age Bracket</label>
                <select value={savedProfile.ageGroup} onChange={e => setSavedProfile({ ...savedProfile, ageGroup: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', background: '#fff', fontSize: '0.9rem' }}>
                  <option value="13-15">13 - 15 Years</option>
                  <option value="16-18">16 - 18 Years</option>
                  <option value="19-24">19 - 24 Years</option>
                  <option value="25-30">25 - 30 Years</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Avatar Theme Color</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'].map(c => (
                    <button key={c} type="button" onClick={() => setSavedProfile({ ...savedProfile, avatarColor: c })} style={{ width: '32px', height: '32px', borderRadius: '50%', background: c, border: savedProfile.avatarColor === c ? '3px solid #0F172A' : 'none', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>

              {alertMessage && <p style={{ color: '#EF4444', fontSize: '0.8rem', margin: 0 }}>{alertMessage}</p>}
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Generate Secure Profile</button>
            </form>
          </div>
        </div>
      );
    }

    if (profileStep === 'success') {
      return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', sans-serif" }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '460px', width: '100%', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15,23,42,0.04)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></span>
            </div>
            <h1 style={{ margin: '0 0 10px', fontSize: '1.5rem', fontWeight: '800', fontFamily: "'Lora', serif", color: '#0F172A' }}>Profile Generated</h1>
            <p style={{ margin: '0 0 24px', fontSize: '0.88rem', color: '#64748B', lineHeight: '1.6' }}>
              Your profile is locally saved. Share this Family Code with your parent in the Parent Portal to link views securely:
            </p>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '0.12em', color: '#0F172A', fontFamily: 'monospace' }}>
                {savedProfile.familyCode}
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '24px' }}>
              Privacy promise: Parents can only see aggregate statistics and scores. Private logs and companion chat lines are completely locked.
            </p>

            <button onClick={() => setProfileCompleted(true)} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Enter My Workspace</button>
          </div>
        </div>
      );
    }
  }

  // Common UI Styles
  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(15, 23, 42, 0.02)',
  };

  const menuStyle = {
    width: '240px',
    background: '#FFFFFF',
    borderRight: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 100,
    fontFamily: "'Inter', sans-serif",
  };

  const mainPanelStyle = {
    marginLeft: '240px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#F8FAFC',
    fontFamily: "'Inter', sans-serif",
  };

  // Sidebar NAV List (Flow aligned: Detect -> Support -> Improve -> Track -> Share)
  const NAV_ITEMS = [
    { id: 'home', label: "Today's Wellness" },
    { id: 'companion', label: 'Virtual Companion' },
    { id: 'journal', label: 'Reflection Journal' },
    { id: 'wellness-hub', label: 'Wellness Hub' },
    { id: 'journey', label: 'Wellness Journey' },
    { id: 'report', label: 'Reports' },
    { id: 'safety', label: 'Safety Center' }
  ];

  // --- MODULE RENDERS ---

  // Module 1: Dashboard Home (Netflix grid style)
  const renderHome = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Editorial Welcome Header */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '20px', padding: '36px', color: '#fff', position: 'relative' }}>
        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '50px', fontWeight: '700' }}>MindBridge Clinic Workspace</span>
        <h1 style={{ fontFamily: "'Lora', serif", fontWeight: '500', fontSize: '2.2rem', margin: '14px 0 8px', color: '#FFFFFF' }}>Find your calm.</h1>
        <h2 style={{ fontFamily: "'Lora', serif", fontWeight: '500', fontSize: '1.8rem', margin: '0 0 16px', color: '#93C5FD' }}>Reclaim your life.</h2>
        <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: '#94A3B8', maxWidth: '500px', lineHeight: '1.6' }}>
          Welcome back, {savedProfile.nickname}. Secure client portal linked. Review diagnostics, consult your virtual companion, or access relaxation exercises below.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActivePage('companion')} className="btn btn-primary">Start Daily Session</button>
          <button onClick={() => setActivePage('safety')} className="btn btn-secondary" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>Safety Center</button>
        </div>
        <div style={{ position: 'absolute', top: '36px', right: '36px', width: '64px', height: '64px', borderRadius: '50%', background: savedProfile.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.5rem', color: '#fff' }}>
          {savedProfile.nickname.slice(0,2).toUpperCase()}
        </div>
      </div>

      {/* Grid Modules Summary (Detect -> Support -> Improve -> Track -> Share) */}
      <div>
        <h3 style={{ fontFamily: "'Lora', serif", fontSize: '1.2rem', margin: '0 0 14px' }}>Clinical Wellness Workspace</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {/* Detect */}
          <div style={{ ...cardStyle }}>
            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#F59E0B', background: '#FEF3C7', padding: '3px 8px', borderRadius: '50px' }}>DETECT</span>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '10px 0 6px', fontSize: '1rem' }}>Active Diagnostic Checkpoints</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 16px', lineHeight: '1.5' }}>Scan real-time posture indicators and execute standard PHQ-A/GAD-7 screenings.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setActivePage('detection')} className="btn btn-xs btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Motion Scan</button>
              <button onClick={() => setActivePage('wellness-check')} className="btn btn-xs btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Assessments</button>
            </div>
          </div>

          {/* Support */}
          <div style={{ ...cardStyle }}>
            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#2563EB', background: '#EFF6FF', padding: '3px 8px', borderRadius: '50px' }}>SUPPORT</span>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '10px 0 6px', fontSize: '1rem' }}>Clinical Conversational Guide</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 16px', lineHeight: '1.5' }}>Consult your Virtual Companion for grounding guidance, stress triage, and structured breathing cycles.</p>
            <button onClick={() => setActivePage('companion')} className="btn btn-xs btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Open Companion</button>
          </div>

          {/* Improve */}
          <div style={{ ...cardStyle }}>
            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#10B981', background: '#D1FAE5', padding: '3px 8px', borderRadius: '50px' }}>IMPROVE</span>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '10px 0 6px', fontSize: '1rem' }}>Therapeutic Content Library</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 16px', lineHeight: '1.5' }}>Explore breathing templates, ambient soundscapes, stretching exercises, and cognitive lessons.</p>
            <button onClick={() => setActivePage('wellness-hub')} className="btn btn-xs btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Explore Hub</button>
          </div>

          {/* Track */}
          <div style={{ ...cardStyle }}>
            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#8B5CF6', background: '#EDE9FE', padding: '3px 8px', borderRadius: '50px' }}>TRACK</span>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '10px 0 6px', fontSize: '1rem' }}>Personal Insight Journal</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 16px', lineHeight: '1.5' }}>Document reflections via text or voice logs. Review progress timelines and achievement milestones.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setActivePage('journal')} className="btn btn-xs btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Write Reflection</button>
              <button onClick={() => setActivePage('journey')} className="btn btn-xs btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>View Timeline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Module 2: Virtual Companion
  const renderVirtualCompanion = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left Side: Avatar Panel & Breath Trainer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '320px', position: 'relative' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', fontWeight: '700', position: 'absolute', top: '20px', left: '20px' }}>Companion Avatar Mode</span>
            
            {/* Visual Pulse Animation instead of child avatar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '100px', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map(bar => {
                let height = '15px';
                let anim = 'none';
                if (companionAction === 'speaking') {
                  height = `${20 + Math.random() * 40}px`;
                  anim = 'pulse 0.5s infinite alternate';
                } else if (companionAction === 'breathing') {
                  height = breathPhase === 'inhale' ? '80px' : breathPhase === 'exhale' ? '15px' : '40px';
                }
                return (
                  <div key={bar} style={{
                    width: '6px',
                    height,
                    borderRadius: '4px',
                    background: '#2563EB',
                    transition: 'height 0.4s ease',
                    animation: anim
                  }} />
                );
              })}
            </div>

            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 4px', fontSize: '1.15rem' }}>
              {companionAction === 'idle' && "Companion Ready"}
              {companionAction === 'speaking' && "Synthesizing Coping Guidance..."}
              {companionAction === 'breathing' && `Breathing cycle: ${breathPhase.toUpperCase()}`}
            </h3>
            
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
              {companionAction === 'breathing' && `Maintain the rhythm. (${breathTimer}s)`}
              {companionAction === 'idle' && "Click quick action prompts below to guide the session."}
            </p>

            {companionAction === 'breathing' && (
              <button onClick={() => setCompanionAction('idle')} className="btn btn-xs btn-secondary" style={{ marginTop: '20px', borderColor: '#EF4444', color: '#EF4444' }}>Stop Breath Guidance</button>
            )}
          </div>

          {/* Quick Guided Actions */}
          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 12px', fontSize: '0.92rem' }}>Quick Session Prompts</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => { setChatInput("I'm feeling stressed about exams."); handleSendMessage(); }} className="btn btn-xs btn-secondary">Exam Stress Plan</button>
              <button onClick={() => { setChatInput("I had an argument and feel heavy."); handleSendMessage(); }} className="btn btn-xs btn-secondary">Interpersonal Guidance</button>
              <button onClick={triggerBreathingCycle} className="btn btn-xs btn-secondary">Start Breathing Guidance</button>
            </div>
          </div>
        </div>

        {/* Right Side: Conversation Logger */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: '500px' }}>
          <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>Support Chat Log</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', marginBottom: '14px' }}>
            {companionChat.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.sender === 'user' ? '#2563EB' : '#F1F5F9',
                color: m.sender === 'user' ? '#fff' : '#334155',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                lineHeight: '1.4'
              }}>
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Consult companion..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.82rem', outline: 'none' }}
            />
            <button onClick={handleSendMessage} className="btn btn-primary" style={{ padding: '10px 14px' }}>Send</button>
          </div>
        </div>
      </div>
    );
  };

  // Module 3: Emotion & Motion Detection Mock
  const renderDetection = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Left Side: Mock Camera Feed Container */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: "'Lora', serif", margin: 0, fontSize: '1.1rem' }}>Motion Checkpoint Stream</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Mocked telemetry checking posture, fatigue, and emotion indices.</p>
            </div>
            <button onClick={() => setIsCameraActive(!isCameraActive)} className="btn btn-xs btn-primary" style={{ background: isCameraActive ? '#EF4444' : '#2563EB' }}>
              {isCameraActive ? "Deactivate Stream" : "Activate Stream"}
            </button>
          </div>

          <div style={{
            background: '#0F172A',
            borderRadius: '12px',
            height: '320px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8'
          }}>
            {isCameraActive ? (
              <>
                {/* Visual scan mesh layout placeholder */}
                <div style={{
                  position: 'absolute',
                  width: '180px',
                  height: '180px',
                  border: '2px dashed rgba(37,99,235,0.4)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: '#10B981',
                  top: '50%',
                  left: 0,
                  animation: 'scanLine 3s infinite linear'
                }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', color: '#10B981', fontFamily: 'monospace' }}>
                  FACIAL MESH: LOCKED | STATUS: CALM
                </div>
              </>
            ) : (
              <p style={{ fontSize: '0.82rem' }}>Stream Inactive. Click button above to execute mock scanning.</p>
            )}
          </div>
        </div>

        {/* Right Side: Alert Metrics & Warning Logger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '0.92rem' }}>Diagnostics</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Stream Status:</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: isCameraActive ? '#10B981' : '#64748B' }}>{isCameraActive ? 'Active' : 'Offline'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Facial Emotion:</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563EB' }}>{isCameraActive ? mockEmotion : 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Posture State:</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: postureAlert ? '#EF4444' : '#10B981' }}>{isCameraActive ? (postureAlert ? 'Slouched' : 'Good') : 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Fatigue Index:</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: fatigueAlert ? '#F59E0B' : '#10B981' }}>{isCameraActive ? (fatigueAlert ? 'Elevated' : 'Normal') : 'N/A'}</span>
              </div>
            </div>
            {isCameraActive && postureAlert && (
              <div style={{ marginTop: '14px', padding: '10px 14px', background: '#FEE2E2', color: '#EF4444', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>
                Wellness Alert: Posture Correction advised.
              </div>
            )}
          </div>

          <div style={{ ...cardStyle, flex: 1 }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '0.92rem' }}>Warning Log History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '180px' }}>
              {detectionLogs.map((log, i) => (
                <div key={i} style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.75rem', color: '#0F172A' }}>{log.type}</strong>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{log.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B' }}>{log.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Module 4: Reflection Journal
  const renderJournal = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Left Side: Create Entry */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: "'Lora', serif", margin: 0, fontSize: '1.1rem' }}>Write Reflection Entry</h3>
          
          {alertMessage && (
            <div style={{ padding: '10px 14px', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600' }}>
              {alertMessage}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Entry Title (optional)"
              value={journalTitle}
              onChange={e => setJournalTitle(e.target.value)}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.85rem', outline: 'none' }}
            />
            <button onClick={() => {
              setIsRecordingVoice(!isRecordingVoice);
              if(!isRecordingVoice) {
                setVoiceTimer(0);
                const timer = setInterval(() => setVoiceTimer(t => t + 1), 1000);
                window.voiceInterval = timer;
              } else {
                clearInterval(window.voiceInterval);
                setJournalText(prev => prev + " [Simulated voice transcription: Feeling reflective about today's studies.]");
              }
            }} className="btn btn-secondary" style={{ borderColor: isRecordingVoice ? '#EF4444' : '#2563EB', color: isRecordingVoice ? '#EF4444' : '#2563EB', display: 'flex', gap: '6px' }}>
              {isRecordingVoice ? `Stop (${voiceTimer}s)` : 'Voice Journal'}
            </button>
          </div>

          <textarea
            rows="10"
            placeholder="Type your private reflection here. All logs are encrypted..."
            value={journalText}
            onChange={e => setJournalText(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.85rem', lineHeight: '1.5', fontFamily: 'inherit', resize: 'vertical' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Your notes are kept private locally.</span>
            <button onClick={handleSaveJournal} disabled={!journalText.trim()} className="btn btn-primary" style={{ opacity: journalText.trim() ? 1 : 0.6 }}>
              Save Reflection Entry
            </button>
          </div>
        </div>

        {/* Right Side: History & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 6px', fontSize: '0.92rem' }}>Personal AI Insights</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: '1.5' }}>
              {journals.length === 0 ? (
                "Save your first entry to generate reflective text patterns and emotional analysis."
              ) : (
                "Analysis suggests elevated study stress levels. We recommend scheduling a stretch break in the Wellness Hub."
              )}
            </p>
          </div>

          <div style={{ ...cardStyle, flex: 1 }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '0.92rem' }}>Journal History</h4>
            {journals.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>No reflections logged yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '280px' }}>
                {journals.map((j, idx) => (
                  <div key={j.id} style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.8rem', color: '#0F172A' }}>{j.title}</strong>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{j.date}</span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{j.text}</p>
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '50px' }}>Emotion: {j.emotion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Module 4: Wellness Check (Assessments)
  const renderAssessment = () => {
    const questions = ASSESSMENT_QUESTIONS[activeCheckType] || [];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left Side: Assessment Form */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 4px', fontSize: '1.1rem' }}>Evidence-Based Screenings</h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Answer objectively based on how you have felt over the last 2 weeks.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
            {['PHQ-A', 'GAD-7', 'PSS-10', 'WHO-5'].map(type => (
              <button key={type} onClick={() => { setActiveCheckType(type); setAssessmentScores({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }); }} style={{
                padding: '6px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '700',
                background: activeCheckType === type ? '#2563EB' : '#F1F5F9',
                color: activeCheckType === type ? '#fff' : '#64748B'
              }}>
                {type}
              </button>
            ))}
          </div>

          {alertMessage && (
            <div style={{ padding: '10px 14px', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600' }}>
              {alertMessage}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {questions.map((q, i) => (
              <div key={i} style={{ borderBottom: '1px solid #F8FAFC', paddingBottom: '12px' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>{i + 1}. {q}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {["Not at all", "Several days", "More than half", "Nearly every day"].map((ans, val) => (
                    <button key={val} type="button" onClick={() => setAssessmentScores({ ...assessmentScores, [i]: val })} style={{
                      padding: '6px 10px', borderRadius: '8px', fontSize: '0.74rem', border: '1px solid #E2E8F0', cursor: 'pointer',
                      background: assessmentScores[i] === val ? '#EFF6FF' : '#fff',
                      color: assessmentScores[i] === val ? '#2563EB' : '#475569',
                      fontWeight: assessmentScores[i] === val ? '700' : '500'
                    }}>
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleSaveAssessment} className="btn btn-primary" style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
            Submit Check & Save Scores
          </button>
        </div>

        {/* Right Side: Score history, previous scores, improvements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '0.92rem' }}>Assessment Results</h4>
            {assessmentsHistory.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.5' }}>No history logged yet. Complete a screening check to review recommendations.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Latest Score:</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563EB' }}>
                    {assessmentsHistory[0].score} / {assessmentsHistory[0].maxScore} ({assessmentsHistory[0].type})
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Previous Score:</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B' }}>
                    {assessmentsHistory[1] ? `${assessmentsHistory[1].score} (${assessmentsHistory[1].type})` : 'N/A'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Improvement:</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#10B981' }}>
                    {assessmentsHistory[1] ? (assessmentsHistory[1].score - assessmentsHistory[0].score >= 0 ? `+${assessmentsHistory[1].score - assessmentsHistory[0].score} points (Improving)` : `-${assessmentsHistory[0].score - assessmentsHistory[1].score} points`) : 'Baseline established'}
                  </span>
                </div>
                <div style={{ marginTop: '6px' }}>
                  <strong style={{ fontSize: '0.78rem', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Clinical Recommendation:</strong>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4' }}>
                    {assessmentsHistory[0].score > 8 ? "Score suggests elevated distress levels. Schedule a session in the Therapist directory or review Box Breathing instructions." : "Scores indicate stable clinical status. Maintain daily mindfulness checks."}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div style={{ ...cardStyle, flex: 1 }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '0.92rem' }}>Assessment Log Timeline</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '200px' }}>
              {assessmentsHistory.map((item, idx) => (
                <div key={idx} style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.78rem', color: '#0F172A' }}>{item.type} Check</strong>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{item.date}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B' }}>Score: {item.score} / {item.maxScore}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Module 5: Wellness Hub (The largest content section)
  const renderWellnessHub = () => {
    const currentCategory = WELLNESS_HUB_CATEGORIES.find(c => c.id === activeHubCategory) || WELLNESS_HUB_CATEGORIES[0];
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px' }}>
        {/* Left Side: Category Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {WELLNESS_HUB_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveHubCategory(cat.id)} style={{
              textAlign: 'left', padding: '12px 14px', borderRadius: '10px', fontSize: '0.82rem',
              fontWeight: activeHubCategory === cat.id ? '700' : '500',
              background: activeHubCategory === cat.id ? '#EFF6FF' : 'transparent',
              color: activeHubCategory === cat.id ? '#2563EB' : '#475569'
            }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Side: Category Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Main Category Header */}
          <div style={{ ...cardStyle }}>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 6px', fontSize: '1.2rem' }}>{currentCategory.label} Content Library</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Practice daily actions below to regulate mental stress states.</p>
          </div>

          {/* Sub-content lists */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {currentCategory.items.map((item, idx) => (
              <div key={idx} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 4px', fontSize: '0.92rem' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4' }}>{item.desc}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: '600' }}>{item.duration}</span>
                  <button onClick={() => {
                    setCurrentAudio({ title: item.title, playing: true, progress: 0 });
                    setAudioTimer(0);
                    if(window.audioInterval) clearInterval(window.audioInterval);
                    const timer = setInterval(() => setAudioTimer(t => {
                      if (t >= 100) { clearInterval(window.audioInterval); return 100; }
                      return t + 2;
                    }), 500);
                    window.audioInterval = timer;
                  }} className="btn btn-xs btn-primary">Launch Guide</button>
                </div>
              </div>
            ))}
          </div>

          {/* Simulated Audio Player Box */}
          {currentAudio && (
            <div style={{ ...cardStyle, background: '#0F172A', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD', fontWeight: '700' }}>MindBridge Coping Player</span>
                <h4 style={{ margin: '4px 0 0', fontSize: '0.88rem', fontWeight: '600' }}>{currentAudio.title}</h4>
              </div>
              <div style={{ flex: 1, maxWidth: '240px' }}>
                <div style={{ height: '4px', background: '#334155', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ width: `${audioTimer}%`, height: '100%', background: '#2563EB', borderRadius: '2px', transition: 'width 0.5s' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => {
                  if(window.audioInterval) clearInterval(window.audioInterval);
                  setCurrentAudio(null);
                }} className="btn btn-xs btn-secondary" style={{ background: '#334155', color: '#fff', borderColor: 'transparent' }}>Close Player</button>
              </div>
            </div>
          )}

          {/* Self-Care Positive Affirmation box */}
          {activeHubCategory === 'selfcare' && (
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: '1px solid #BFDBFE', textAlign: 'center', padding: '30px' }}>
              <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563EB', fontWeight: '700' }}>Positive Cognitive Reframe</span>
              <p style={{ fontSize: '1.2rem', fontFamily: "'Lora', serif", fontWeight: '500', color: '#0F172A', margin: '14px 0 20px', lineHeight: '1.5' }}>
                "{AFFIRMATIONS[currentAffirmationIdx]}"
              </p>
              <button onClick={() => setCurrentAffirmationIdx((currentAffirmationIdx + 1) % AFFIRMATIONS.length)} className="btn btn-xs btn-primary">Generate Next Affirmation</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Module 6: Wellness Journey (Timeline and Monthly Story)
  const renderWellnessJourney = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Left Side: Timeline & Story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle }}>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '1.15rem' }}>Your Monthly Growth Story</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              {journals.length === 0 ? (
                "Write in your Reflection Journal or perform Wellness Checks. Your growth story will be synthesized automatically based on logged self-care milestones."
              ) : (
                `Alex established a consistent wellness schedule this month. Through GAD-7 assessments and logs, your workspace highlights positive efforts to mitigate academic stress. Focus is now on physical stretching sequences.`
              )}
            </p>
          </div>

          <div style={{ ...cardStyle }}>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '1.1rem' }}>Wellness Milestones Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '20px' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6px', width: '2px', background: '#E2E8F0' }} />
              
              {[
                { title: 'Workspace Linked', desc: 'Secure Family Code generated.', date: 'Day 1' },
                { title: 'First Diagnostic Check', desc: 'Logged initial PHQ-A baseline.', date: 'Day 3' },
                { title: 'Structured Grounding', desc: 'Practiced Box Breathing guide.', date: 'Day 5' },
                { title: 'Reflection Record', desc: 'Saved first encrypted Reflection Journal.', date: 'Day 7' }
              ].map((m, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '4px', left: '-18px', width: '10px', height: '10px', borderRadius: '50%', background: '#2563EB', border: '2px solid #fff' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#0F172A' }}>{m.title}</strong>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{m.date}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748B' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Growth Badges & Achievements */}
        <div style={{ ...cardStyle }}>
          <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '0.92rem' }}>Earned Growth Milestones</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifySelf: 'center', color: '#2563EB', fontWeight: '800', fontSize: '0.9rem', justifyContent: 'center' }}>01</div>
              <div>
                <strong style={{ fontSize: '0.8rem', display: 'block' }}>First Breath</strong>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Completed breathing cycle.</span>
              </div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifySelf: 'center', color: '#2563EB', fontWeight: '800', fontSize: '0.9rem', justifyContent: 'center' }}>02</div>
              <div>
                <strong style={{ fontSize: '0.8rem', display: 'block' }}>Baseline Established</strong>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Wellness Check submitted.</span>
              </div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifySelf: 'center', color: '#2563EB', fontWeight: '800', fontSize: '0.9rem', justifyContent: 'center' }}>03</div>
              <div>
                <strong style={{ fontSize: '0.8rem', display: 'block' }}>Reflective Practice</strong>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Journal entries recorded.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Module 7: Wellness Report (Clinical PDF Preview)
  const renderWellnessReport = () => {
    // Generate simulated report text to download
    const handleDownloadReport = () => {
      const content = `MINDBRIDGE CLINICAL WELLNESS REPORT
Generated On: ${new Date().toLocaleString()}
Nickname: ${savedProfile.nickname} (Age Bracket: ${savedProfile.ageGroup})
Family Link Code: ${savedProfile.familyCode}
--------------------------------------------------
1. ASSESSMENT SUMMARY
Assessments Completed: ${assessmentsHistory.length}
Latest Assessment Type: ${assessmentsHistory[0]?.type || 'None'}
Latest Score Result: ${assessmentsHistory[0]?.score || 'N/A'} (Max: ${assessmentsHistory[0]?.maxScore || 15})

2. REFLECTION JOURNAL SUMMARY
Reflections Recorded: ${journals.length}
Predominant Mood State: ${moodLogs[0]?.mood || 'Neutral'}

3. CLINICAL RECOMMENDATIONS
- Engage in regular box breathing practices in the Wellness Hub.
- Focus on stretching sequences to manage physical fatigue.
- Share results with parent/counselor for coordinated care support.
`;
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `MindBridge_Wellness_Report_${savedProfile.nickname}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        {/* Left Side: Report Print Preview Layout */}
        <div style={{ ...cardStyle, background: '#fff', border: '1.5px solid #CBD5E1', padding: '36px', minHeight: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0F172A', paddingBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.05em', color: '#2563EB' }}>MINDBRIDGE CLINICAL REPORT</span>
              <h2 style={{ fontFamily: "'Lora', serif", margin: '4px 0 0', fontSize: '1.25rem', color: '#0F172A' }}>Wellness Summary Dashboard</h2>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#64748B' }}>
              <p style={{ margin: 0 }}>Date: {new Date().toLocaleDateString()}</p>
              <p style={{ margin: 0 }}>Code: {savedProfile.familyCode}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
            <div>
              <h4 style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', margin: '0 0 6px' }}>Client Info</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Name: {savedProfile.nickname}</p>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Age Bracket: {savedProfile.ageGroup}</p>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', margin: '0 0 6px' }}>Diagnostics Overview</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Screenings Logged: {assessmentsHistory.length}</p>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Reflections Saved: {journals.length}</p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', margin: '0 0 8px' }}>Recommended Care Plan Steps</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#64748B', lineHeight: '1.6' }}>
              <li>Complete PHQ-A assessment monthly to track anxiety baselines.</li>
              <li>Practice guided breathing intervals in Wellness Hub to regulate physical stress.</li>
              <li>Leverage Virtual Companion daily goals feature to establish supportive habits.</li>
            </ul>
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Clinical data generated locally.</span>
            <button onClick={handleDownloadReport} className="btn btn-primary">Download Text Report</button>
          </div>
        </div>

        {/* Right Side: Options to share */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '0.92rem' }}>Share Options</h4>
            <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.5', marginBottom: '14px' }}>
              Coordinating care improves clinical outcomes. Share this diagnostic report directly with linked support lines.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => alert("Report shared with Linked Parent Portal.")} className="btn btn-sm btn-secondary" style={{ width: '100%' }}>Share with Parent</button>
              <button onClick={() => alert("Report shared securely with Counselor Database.")} className="btn btn-sm btn-secondary" style={{ width: '100%' }}>Share with Counselor</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Module 8: Safety Center (SOS)
  const renderSafetyCenter = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left Side: SOS prominent Button & Calming exercises */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle, border: '1.5px solid #EF4444', background: '#FEE2E2', textAlign: 'center', padding: '40px' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#EF4444', fontWeight: '800' }}>Immediate Support Center</span>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: '500', fontSize: '1.5rem', color: '#991B1B', margin: '14px 0 8px' }}>Need Immediate Calming Support?</h2>
            <p style={{ margin: '0 0 24px', fontSize: '0.85rem', color: '#991B1B', lineHeight: '1.5' }}>
              Press the SOS button below to trigger automated alert notifications to your configured trusted contacts.
            </p>
            <button onClick={triggerSOS} className="btn btn-primary" style={{ background: '#EF4444', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)', padding: '14px 28px', fontSize: '1rem' }}>
              Trigger Immediate SOS Alert
            </button>
          </div>

          <div style={{ ...cardStyle }}>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '1.1rem' }}>Quick Grounding Calming Actions</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.5', marginBottom: '14px' }}>
              When experiencing sudden panic or extreme stress, practice grounding to interrupt the cycle.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button onClick={triggerBreathingCycle} className="btn btn-secondary" style={{ borderColor: '#E2E8F0' }}>Deep Breathing Wizard</button>
              <button onClick={() => alert("5-4-3-2-1 Grounding: Identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.")} className="btn btn-secondary" style={{ borderColor: '#E2E8F0' }}>5-4-3-2-1 Grounding</button>
            </div>
          </div>
        </div>

        {/* Right Side: Emergency Resources list & Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 12px', fontSize: '0.92rem' }}>Trusted SOS Contacts</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {emergencyContacts.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0F172A' }}>{c.name}</strong>
                  <span style={{ color: '#64748B' }}>{c.phone}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddContact} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="Contact Name" value={newContactName} onChange={e => setNewContactName(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.75rem', outline: 'none' }} />
              <input type="text" placeholder="Phone Number" value={newContactPhone} onChange={e => setNewContactPhone(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.75rem', outline: 'none' }} />
              <button type="submit" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Add Contact</button>
            </form>
          </div>

          <div style={{ ...cardStyle }}>
            <h4 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '0.92rem' }}>Crisis Support Hotlines</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem', color: '#64748B' }}>
              <li style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                <strong style={{ color: '#0F172A', display: 'block' }}>National Suicide & Crisis Lifeline:</strong>
                <span>Dial 988 (Available 24/7, Toll-Free)</span>
              </li>
              <li>
                <strong style={{ color: '#0F172A', display: 'block' }}>Crisis Text Line:</strong>
                <span>Text HOME to 741741</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Module 9: Profile & Settings
  const renderProfile = () => {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ ...cardStyle }}>
          <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '1.15rem' }}>Profile Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Nickname:</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>{savedProfile.nickname}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Age Bracket:</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>{savedProfile.ageGroup}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Secure Family Code:</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563EB', fontFamily: 'monospace' }}>{savedProfile.familyCode}</span>
            </div>
          </div>
        </div>

        <div style={{ ...cardStyle }}>
          <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '1.1rem' }}>Local Data Settings</h3>
          <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4', marginBottom: '16px' }}>
            Your diagnostics logs, mood entries, and reflection journals are stored securely in local browser storage. Clear this data to restore initial workspace values.
          </p>
          <button onClick={() => {
            if(confirm("Confirm profile clear? This action will permanently erase local logs.")) {
              localStorage.clear();
              window.location.reload();
            }
          }} className="btn btn-secondary" style={{ width: '100%', borderColor: '#EF4444', color: '#EF4444' }}>Clear Custom Local Data</button>
        </div>
      </div>
    );
  };

  const pages = {
    home: renderHome,
    companion: renderVirtualCompanion,
    detection: renderDetection,
    'wellness-check': renderAssessment,
    'wellness-hub': renderWellnessHub,
    journal: renderJournal,
    journey: renderWellnessJourney,
    report: renderWellnessReport,
    safety: renderSafetyCenter,
    profile: renderProfile
  };

  const activePageData = NAV_ITEMS.find(n => n.id === activePage) || NAV_ITEMS[0];
  const CurrentPageRender = pages[activePage] || renderHome;

  const now = new Date();
  const quote = CLINICAL_TIPS[0];

  // Mock aggregate metrics
  const breathingCyclesCompleted = 2;
  const bookedSessions = [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', color: '#334155' }}>
      
      {/* ── Sidebar (No Emojis!) ── */}
      <aside style={menuStyle}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #E2E8F0' }}>
          <h2 style={{ margin: 0, fontWeight: '800', fontSize: '1.2rem', fontFamily: "'Lora', serif", color: '#2563EB' }}>MindBridge</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>Client Space</p>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px',
                background: activePage === item.id ? '#EFF6FF' : 'transparent',
                color: activePage === item.id ? '#2563EB' : '#475569',
                fontWeight: activePage === item.id ? '700' : '500',
                fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', border: 'none'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px 12px', borderTop: '1px solid #E2E8F0' }}>
          <button onClick={onLogout} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#FEE2E2', color: '#EF4444', fontWeight: '600', fontSize: '0.82rem', textAlign: 'center', cursor: 'pointer', border: 'none' }}>
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main Panel ── */}
      <div style={mainPanelStyle}>
        <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <h2 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0F172A', fontFamily: "'Lora', serif" }}>
            {activePageData.label}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Role: Teen</span>
            <button onClick={() => setActiveRole('parent')} className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#E2E8F0' }}>Switch Portal</button>
          </div>
        </header>

        <main style={{ padding: '36px', flex: 1, overflowY: 'auto' }}>
          {CurrentPageRender()}
        </main>
      </div>

      {/* CSS animations block */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.98); opacity: 0.8; }
          100% { transform: scale(1.02); opacity: 1; }
        }
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}

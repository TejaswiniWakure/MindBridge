import React, { useState, useEffect, useRef } from 'react';

const API_URL = 'http://localhost:5000/api';

// Motivational quotes pool
const QUOTES = [
  { text: "Every day is a fresh start. You've got this. ≡ƒÆÖ", author: "MindBridge Inspiration" },
  { text: "Small steps every day lead to big changes.", author: "Daily Wisdom" },
  { text: "Your feelings are valid. Take care of yourself first.", author: "Self-Care Practice" },
  { text: "Progress, not perfection. Keep going. ≡ƒî▒", author: "Growth Mindset" },
  { text: "You are stronger than you think. Breathe. Believe.", author: "Internal Resilience" },
];

// Moods list
const MOOD_OPTIONS = [
  { label: 'Happy',   emoji: '≡ƒÿè', color: '#10B981', bg: '#D1FAE5' },
  { label: 'Calm',    emoji: '≡ƒÿî', color: '#3B82F6', bg: '#DBEAFE' },
  { label: 'Tired',   emoji: '≡ƒÿ┤', color: '#8B5CF6', bg: '#EDE9FE' },
  { label: 'Anxious', emoji: '≡ƒÿ░', color: '#F59E0B', bg: '#FEF3C7' },
  { label: 'Sad',     emoji: '≡ƒÿó', color: '#EF4444', bg: '#FEE2E2' },
];

// 8 Guided Resource categories
const GUIDED_RESOURCES = [
  { id: 'meditation', title: 'Meditation Videos', duration: '12 min', icon: '≡ƒºÿ', desc: 'Guided visual meditations for deep focus and calm.' },
  { id: 'exercise', title: 'Breathing Exercises', duration: '8 min', icon: '≡ƒÆ¿', desc: 'Controlled breathing patterns to reduce stress.' },
  { id: 'calm-audio', title: 'Calm Audios', duration: '15 min', icon: '≡ƒÄº', desc: 'Soothing ambient sounds and binaural beats.' },
  { id: 'anxiety', title: 'Anxiety Therapy', duration: '10 min', icon: '≡ƒîè', desc: 'CBT-based exercises to manage anxious thoughts.' },
  { id: 'sleep', title: 'Sleep Aid Guides', duration: '20 min', icon: '≡ƒîÖ', desc: 'Wind-down routines for deeper, restful sleep.' },
  { id: 'mood-boost', title: 'Mood Booster Beats', duration: '10 min', icon: 'Γ£¿', desc: 'Upbeat lo-fi tracks to energize your mind.' },
  { id: 'mindfulness', title: 'Mindfulness Walks', duration: '7 min', icon: '≡ƒìâ', desc: 'Grounding techniques while staying active outdoors.' },
  { id: 'relaxation', title: 'Relaxation Music', duration: '18 min', icon: '≡ƒÄ╡', desc: 'Curated playlists for complete mental unwinding.' },
];

const THERAPIST_DIRECTORIES = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'Adolescent CBT & Coping', exp: '12 yrs', rating: 4.9, avatar: '≡ƒæ⌐ΓÇìΓÜò∩╕Å', cost: '$80/session', availability: 'Mon, Wed 2:00 PM - 6:00 PM' },
  { id: 2, name: 'Dr. Arjun Mehta', specialty: 'Teen Stress & Family Dynamics', exp: '8 yrs', rating: 4.7, avatar: '≡ƒæ¿ΓÇìΓÜò∩╕Å', cost: '$90/session', availability: 'Tue, Thu 10:00 AM - 4:00 PM' },
  { id: 3, name: 'Dr. Sarah Collins', specialty: 'Social Anxiety & Self-Esteem', exp: '15 yrs', rating: 4.8, avatar: '≡ƒæ⌐ΓÇìΓÜò∩╕Å', cost: '$110/session', availability: 'Fridays 9:00 AM - 3:00 PM' },
];

const AI_SUGGESTIONS = [
  "I'm feeling stressed about exams",
  "I had an argument with a friend",
  "I can't sleep at night",
  "I feel lonely sometimes",
  "How can I manage my anger?",
];

const NAV = [
  { id: 'home',        label: 'Dashboard',          icon: '≡ƒÅá' },
  { id: 'performance', label: 'Daily Performance',  icon: '≡ƒÅå' },
  { id: 'mood',        label: 'Mood Tracker',        icon: '≡ƒÿè' },
  { id: 'ai',          label: 'AI Companion',        icon: '≡ƒñû' },
  { id: 'journal',     label: 'Journal',              icon: '≡ƒôû' },
  { id: 'gratitude',   label: 'Gratitude Jar',        icon: '≡ƒì»' },
  { id: 'games',       label: 'Wellness Games',       icon: '≡ƒÄ«' },
  { id: 'assessment',  label: 'Assessment',           icon: '≡ƒôè' },
  { id: 'wellness',    label: 'Wellness Hub',         icon: '≡ƒºÿ' },
  { id: 'therapist',   label: 'Therapist',            icon: '≡ƒæ⌐ΓÇìΓÜò∩╕Å' },
  { id: 'profile',     label: 'Profile & Settings',   icon: 'ΓÜÖ∩╕Å' },
];

const breathLabel = { idle: 'Ready', inhale: 'InhaleΓÇª', 'hold-in': 'HoldΓÇª', exhale: 'ExhaleΓÇª', 'hold-out': 'HoldΓÇª' };
const breathColor = { idle: '#2563EB', inhale: '#10B981', 'hold-in': '#3B82F6', exhale: '#8B5CF6', 'hold-out': '#F59E0B' };

function getAICompanionReply(userInput) {
  const text = userInput.toLowerCase();
  if (text.includes('hello') || text.includes('hi') || text.includes('hey'))
    return "Hey there! ≡ƒæï Nice to meet you. I'm your AI Companion. How's your day going? I'm here to listen or just chat!";
  if (text.includes('anxious') || text.includes('anxiety') || text.includes('nervous') || text.includes('scared'))
    return "I hear you ΓÇö feeling anxious can feel really heavy. Let's take a slow breath. Inhale for 4 seconds, hold, then exhale. ≡ƒÆÖ Remember, you are safe here. What's causing this feeling right now?";
  if (text.includes('sad') || text.includes('depressed') || text.includes('bad') || text.includes('unhappy'))
    return "I'm really sorry to hear you're feeling down. ≡ƒÆ¢ Your feelings are valid, and it's okay not to be okay. If you want to talk about it, I'm here. Maybe try a simple 5-4-3-2-1 grounding exercise?";
  if (text.includes('stress') || text.includes('exam') || text.includes('school') || text.includes('study'))
    return "School stress is real! It can feel super overwhelming when tasks pile up. Try breaking things down: pick just one small task to focus on first, then take a short break. ≡ƒî▒";
  if (text.includes('sleep') || text.includes('tired') || text.includes('insomnia'))
    return "Sleep is key for recharging your mind. If your thoughts are racing, try shutting off screens 30 minutes before bed or listening to a calm audio track under our Wellness tab. ≡ƒîÖ";
  if (text.includes('happy') || text.includes('good') || text.includes('great') || text.includes('fun'))
    return "That's awesome! ≡ƒÄë I love hearing when things go well. What made today feel good for you? Storing these positive vibes is super helpful for rainy days.";
  if (text.includes('lonely') || text.includes('alone'))
    return "I understand ΓÇö feeling lonely is tough. But remember, reaching out like this takes courage. You're not alone, I'm right here. ≡ƒÆÖ Want to talk about what's been happening?";
  if (text.includes('angry') || text.includes('anger') || text.includes('mad') || text.includes('frustrated'))
    return "Anger is a natural emotion. Try the 5-second pause: breathe in, count to 5, breathe out. It gives your brain a moment to reset. What triggered this feeling? Let's work through it. ≡ƒöÑΓåÆ≡ƒîè";
  return "Thanks for sharing that with me. I'm always here to listen. Can you tell me more about how you're feeling? The more I understand, the better I can support you. ≡ƒÆÖ";
}

export default function TeenDashboard({ user, onLogout, createdRoles, activeRole, setActiveRole, parentRequestSent, parentForm, setParentRequestSent }) {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [showDailyQuote, setShowDailyQuote] = useState(() => {
    try { return !sessionStorage.getItem('mb_teen_quote_shown'); } catch { return true; }
  });
  const [now, setNow] = useState(new Date());

  // ΓöÇΓöÇΓöÇ FAMILY CODE GENERATOR ΓöÇΓöÇΓöÇ
  const generateFamilyCode = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const l1 = chars[Math.floor(Math.random() * chars.length)];
    const l2 = chars[Math.floor(Math.random() * chars.length)];
    return `MB-${num}-${l1}${l2}`;
  };

  // ΓöÇΓöÇΓöÇ PROFILE COMPLETION (persisted via localStorage) ΓöÇΓöÇΓöÇ
  // A profile is only "complete" if it contains a familyCode (new format).
  // Old profiles without familyCode ΓåÆ force re-setup so a code gets assigned.
  const [profileCompleted, setProfileCompleted] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem('mb_teen_profile'));
      return !!(p && p.familyCode);   // must have familyCode
    } catch { return false; }
  });
  const [profileStep, setProfileStep] = useState('form'); // 'form' | 'success'
  const [savedProfile, setSavedProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_teen_profile')) || {}; } catch { return {}; }
  });
  const [profileForm, setProfileForm] = useState({ nickname: '', ageGroup: '13-15', avatar: '\ud83e\udd8a' });
  const [profileError, setProfileError] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);

  const copyFamilyCode = () => {
    if (!savedProfile.familyCode) return;
    navigator.clipboard?.writeText(savedProfile.familyCode).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    });
  };

  const AVATARS = ['\ud83e\udd8a','\ud83d\udc3b','\ud83d\udc3c','\ud83e\udd81','\ud83d\udc2f','\ud83d\udc28','\ud83e\udd8b','\ud83d\udc2c','\ud83e\udd84','\ud83c\udf1f','\ud83c\udf08','\ud83c\udfaf'];

  const handleProfileComplete = () => {
    if (!profileForm.nickname.trim()) { setProfileError('Please enter a nickname to continue.'); return; }
    const code = generateFamilyCode();
    const profile = {
      nickname: profileForm.nickname.trim(),
      ageGroup: profileForm.ageGroup,
      avatar: profileForm.avatar,
      familyCode: code,
      createdAt: new Date().toLocaleDateString()
    };
    localStorage.setItem('mb_teen_profile', JSON.stringify(profile));
    setSavedProfile(profile);
    setProfileStep('success'); // show success/code screen first
  };

  // --- GRATITUDE JAR STATE ---
  const [gratitudeList, setGratitudeList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_teen_gratitude')) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('mb_teen_gratitude', JSON.stringify(gratitudeList));
  }, [gratitudeList]);

  // --- MENTAL GAMES STATE ---
  const [gamesPlayed, setGamesPlayed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_teen_games_played')) || { memory: 0, matching: 0, breathing: 0, tapping: 0 }; } catch { return { memory: 0, matching: 0, breathing: 0, tapping: 0 }; }
  });

  useEffect(() => {
    localStorage.setItem('mb_teen_games_played', JSON.stringify(gamesPlayed));
  }, [gamesPlayed]);

  const handleResetData = () => {
    if (window.confirm("ΓÜá∩╕Å Are you absolutely sure you want to clear all your self-care records (mood logs, journals, gratitude jar entries, breathing logs, and assessment histories)? This action is permanent and cannot be undone.")) {
      localStorage.removeItem('mb_teen_mood_logs');
      localStorage.removeItem('mb_teen_journals');
      localStorage.removeItem('mb_teen_assessments');
      localStorage.removeItem('mb_teen_breathing');
      localStorage.removeItem('mb_teen_gratitude');
      localStorage.removeItem('mb_teen_games_played');
      
      setMoodLogs([]);
      setJournals([]);
      setAssessmentsHistory([]);
      setBreathingCyclesCompleted(0);
      setGratitudeList([]);
      setGamesPlayed({ memory: 0, matching: 0, breathing: 0, tapping: 0 });
      
      alert("≡ƒº╣ All stored self-care records and progress histories have been successfully deleted from your device.");
    }
  };

  // ΓöÇΓöÇΓöÇ USER DATA STATE (persisted) ΓöÇΓöÇΓöÇ
  const [moodLogs, setMoodLogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_teen_mood_logs')) || []; } catch { return []; }
  });
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hey! ≡ƒæï I'm your AI Companion. Tell me how you're feeling today, or ask me anything. Let's talk!" }
  ]);
  const [journals, setJournals] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_teen_journals')) || []; } catch { return []; }
  });
  const [assessmentsHistory, setAssessmentsHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_teen_assessments')) || []; } catch { return []; }
  });
  const [bookedSessions, setBookedSessions] = useState([]);
  const [breathingCyclesCompleted, setBreathingCyclesCompleted] = useState(() => {
    try { return Number(localStorage.getItem('mb_teen_breathing')) || 0; } catch { return 0; }
  });

  useEffect(() => {
    localStorage.setItem('mb_teen_mood_logs', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    localStorage.setItem('mb_teen_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('mb_teen_assessments', JSON.stringify(assessmentsHistory));
  }, [assessmentsHistory]);

  useEffect(() => {
    localStorage.setItem('mb_teen_breathing', breathingCyclesCompleted.toString());
  }, [breathingCyclesCompleted]);

  // Active form inputs
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [loggedAlert, setLoggedAlert] = useState('');

  const [chatInput, setChatInput] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [journalBody, setJournalBody] = useState('');
  const [journalSearch, setJournalSearch] = useState('');
  const [journalTab, setJournalTab] = useState('new');

  // Assessment flow state
  const [activeAssessType, setActiveAssessType] = useState(null);
  const [assessQuestions, setAssessQuestions] = useState({});
  const [assessStep, setAssessStep] = useState('select');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);

  // Wellness breathing state
  const [breathPhase, setBreathPhase] = useState('idle');
  const [breathSec, setBreathSec] = useState(4);
  const [activeMedTrack, setActiveMedTrack] = useState(null);

  // Therapist booking modal
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingNotes, setBookingNotes] = useState('');

  const chatEndRef = useRef(null);

  // Clock tick
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Fetch assessments from backend
  useEffect(() => {
    fetch(`${API_URL}/assessment/questions`)
      .then(res => res.json())
      .then(data => { if (data && data.gad7) setAssessQuestions(data); })
      .catch(() => {});
  }, []);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Breathing interval
  useEffect(() => {
    if (breathPhase === 'idle') return;
    const cycle = { inhale: 'hold-in', 'hold-in': 'exhale', exhale: 'hold-out', 'hold-out': 'inhale' };
    const t = setInterval(() => {
      setBreathSec(prev => {
        if (prev <= 1) {
          const nextPhase = cycle[breathPhase];
          setBreathPhase(nextPhase);
          if (breathPhase === 'hold-out') setBreathingCyclesCompleted(c => c + 1);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [breathPhase]);

  // ΓöÇΓöÇΓöÇ HANDLERS ΓöÇΓöÇΓöÇ
  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const datestamp = new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    const entry = { mood: selectedMood.label, emoji: selectedMood.emoji, color: selectedMood.color, note: moodNote, date: `${datestamp} at ${timestamp}` };
    setMoodLogs(prev => [entry, ...prev]);
    setSelectedMood(null);
    setMoodNote('');
    setLoggedAlert(`Γ£à Mood "${entry.mood}" logged successfully!`);
    setTimeout(() => setLoggedAlert(''), 3000);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    const input = chatInput;
    setChatInput('');
    setTimeout(() => {
      const reply = getAICompanionReply(input);
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 850);
  };

  const handleSaveJournal = () => {
    if (!journalTitle.trim() || !journalBody.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const datestamp = new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    const entry = { id: Date.now(), title: journalTitle, body: journalBody, time: `${datestamp} at ${timestamp}` };
    setJournals(prev => [entry, ...prev]);
    setJournalTitle('');
    setJournalBody('');
    setJournalTab('history');
  };

  const startQuiz = (type) => {
    const group = assessQuestions[type] || getLocalAssessmentFallback(type);
    if (!group) return;
    setActiveAssessType(type);
    setAnswers([]);
    setQIndex(0);
    setAssessStep('quiz');
  };

  const submitAnswer = (score) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);
    const quizGroup = assessQuestions[activeAssessType] || getLocalAssessmentFallback(activeAssessType);
    if (qIndex + 1 >= quizGroup.questions.length) {
      const total = nextAnswers.reduce((s, a) => s + a, 0);
      const maxScore = quizGroup.questions.length * Math.max(...quizGroup.options.map(o => o.score));
      const percentage = Math.max(0, Math.min(100, Math.round((total / maxScore) * 100)));
      let level = 'Healthy';
      let desc = 'Wonderful news! Your screening indicates healthy, balanced levels. ≡ƒîƒ We recommend taking a 5-minute Box Breathing break in the Wellness Hub to keep your focus and energy high, or documenting a happy reflection in your Journal!';
      if (percentage > 70) {
        level = 'Elevated Support Needed';
        desc = 'It looks like you are carrying a lot of weight right now. That is completely okay. ≡ƒñù We recommend listening to a Deep Relaxation session in the Wellness Hub, and considering reaching out to one of our friendly counselors in the Therapist portal. You do not have to walk this path alone!';
      } else if (percentage > 35) {
        level = 'Moderate Range';
        desc = 'Your indicators are slightly elevated. ≡ƒÆ¢ Try performing a Box Breathing session to calm your nervous system, or listening to one of the Guided Calming Audios in the Wellness Hub. Jotting down your thoughts in the Journal can also help relieve stress!';
      }
      const reportEntry = { name: quizGroup.name, date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), score: total, max: maxScore, percentage, level, desc };
      setCurrentReport(reportEntry);
      setAssessmentsHistory(prev => [reportEntry, ...prev]);
      setAssessStep('report');
    } else {
      setQIndex(qIndex + 1);
    }
  };

  const confirmBooking = () => {
    if (!bookingDate) { alert('Please select a valid date.'); return; }
    const appt = { id: Date.now(), therapistName: selectedTherapist.name, specialty: selectedTherapist.specialty, avatar: selectedTherapist.avatar, date: bookingDate, time: bookingTime, notes: bookingNotes, status: 'Confirmed' };
    setBookedSessions(prev => [...prev, appt]);
    setSelectedTherapist(null);
    setBookingDate('');
    setBookingNotes('');
  };

  const getLocalAssessmentFallback = (type) => {
    const opts = [{ score: 0, label: 'Not at all' }, { score: 1, label: 'Several days' }, { score: 2, label: 'More than half the days' }, { score: 3, label: 'Nearly every day' }];
    const local = {
      phqa: {
        name: "Depression Screening (PHQ-A)",
        questions: [
          { id: 1, text: "Little interest or pleasure in doing things?" },
          { id: 2, text: "Feeling down, depressed, or hopeless?" },
          { id: 3, text: "Trouble falling or staying asleep, or sleeping too much?" },
          { id: 4, text: "Feeling tired or having little energy?" },
          { id: 5, text: "Poor appetite or overeating?" },
          { id: 6, text: "Feeling bad about yourself or that you are a failure?" },
          { id: 7, text: "Trouble concentrating on things like schoolwork?" },
          { id: 8, text: "Moving or speaking slowly, or being fidgety/restless?" },
          { id: 9, text: "Thoughts that you would be better off not being around?" }
        ],
        options: opts
      },
      gad7: {
        name: "Anxiety Screening (GAD-7)",
        questions: [
          { id: 1, text: "Feeling nervous, anxious, or on edge?" },
          { id: 2, text: "Not being able to stop or control worrying?" },
          { id: 3, text: "Worrying too much about different things?" },
          { id: 4, text: "Trouble relaxing?" },
          { id: 5, text: "Being so restless that it's hard to sit still?" },
          { id: 6, text: "Becoming easily annoyed or irritable?" },
          { id: 7, text: "Feeling afraid, as if something awful might happen?" }
        ],
        options: opts
      },
      pss10: {
        name: "Stress Screening (PSS-10)",
        questions: [
          { id: 1, text: "Been upset because of something that happened unexpectedly?" },
          { id: 2, text: "Felt unable to control the important things in your life?" },
          { id: 3, text: "Felt nervous and stressed?" },
          { id: 4, text: "Felt confident about handling personal problems?" },
          { id: 5, text: "Felt that things were going your way?" },
          { id: 6, text: "Found that you could not cope with all you had to do?" },
          { id: 7, text: "Been able to control irritations in your life?" },
          { id: 8, text: "Felt you were on top of things?" },
          { id: 9, text: "Been angered because of things outside your control?" },
          { id: 10, text: "Felt difficulties were piling up so high you couldn't overcome?" }
        ],
        options: opts
      },
      sdq: {
        name: "Behavior & Social (SDQ)",
        questions: [
          { id: 1, text: "I try to be nice to other people. I care about their feelings." },
          { id: 2, text: "I am restless, I cannot stay still for long." },
          { id: 3, text: "I get a lot of headaches, stomach-aches or sickness." },
          { id: 4, text: "I usually share with others (food, games, pens etc.)." },
          { id: 5, text: "I get very angry and often lose my temper." },
          { id: 6, text: "I am usually on my own. I generally play alone." },
          { id: 7, text: "I usually do as I am told." },
          { id: 8, text: "I worry a lot." },
          { id: 9, text: "I am helpful if someone is hurt, upset or feeling ill." },
          { id: 10, text: "I am constantly fidgeting or squirming." },
          { id: 11, text: "I have one good friend or more." },
          { id: 12, text: "I fight a lot. I can make other people do what I want." },
          { id: 13, text: "I am often unhappy, down-hearted or tearful." },
          { id: 14, text: "Other people my age generally like me." },
          { id: 15, text: "I am easily distracted, I find it difficult to concentrate." },
          { id: 16, text: "I am nervous in new situations. I easily lose confidence." },
          { id: 17, text: "I am kind to younger children." },
          { id: 18, text: "I am often accused of lying or cheating." },
          { id: 19, text: "Other children or young people pick on me or bully me." },
          { id: 20, text: "I often volunteer to help others (parents, teachers, children)." },
          { id: 21, text: "I think before I do things." },
          { id: 22, text: "I take things that are not mine from home, school or elsewhere." },
          { id: 23, text: "I get on better with adults than with people my own age." },
          { id: 24, text: "I have many fears, I am easily scared." },
          { id: 25, text: "I finish the work I'm doing. My attention is good." }
        ],
        options: [{ score: 0, label: 'Not true' }, { score: 1, label: 'Somewhat true' }, { score: 2, label: 'Certainly true' }]
      },
      who5: {
        name: "Overall Well-being (WHO-5)",
        questions: [
          { id: 1, text: "I have felt cheerful and in good spirits." },
          { id: 2, text: "I have felt calm and relaxed." },
          { id: 3, text: "I have felt active and vigorous." },
          { id: 4, text: "I woke up feeling fresh and rested." },
          { id: 5, text: "My daily life has been filled with things that interest me." }
        ],
        options: [{ score: 0, label: 'At no time' }, { score: 1, label: 'Some of the time' }, { score: 2, label: 'Less than half the time' }, { score: 3, label: 'More than half the time' }, { score: 4, label: 'Most of the time' }, { score: 5, label: 'All of the time' }]
      }
    };
    return local[type];
  };

  // ΓöÇΓöÇΓöÇ Theme Styles ΓöÇΓöÇΓöÇ
  const isDark = theme === 'dark';
  const themeColors = {
    bg: isDark ? '#0F172A' : '#F0F6FF',
    sidebar: isDark ? '#1E293B' : '#FFFFFF',
    card: isDark ? '#1E293B' : '#FFFFFF',
    text: isDark ? '#E2E8F0' : '#1E293B',
    subText: isDark ? '#94A3B8' : '#64748B',
    border: isDark ? '#334155' : '#E2E8F0',
    primary: '#2563EB',
    primaryHover: '#1D4ED8'
  };
  const cardStyle = {
    background: themeColors.card,
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${themeColors.border}`,
    boxShadow: '0 4px 16px rgba(37,99,235,0.04)'
  };
  const btnPrimary = { padding: '10px 22px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' };

  // ΓöÇΓöÇΓöÇ RENDER PAGES ΓöÇΓöÇΓöÇ

  // Page 1: Dashboard Home
  const renderHome = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Welcome Block */}
        <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)', borderRadius: '20px', padding: '30px', color: '#fff', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.82rem', opacity: 0.9 }}>
              {now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 style={{ margin: '0 0 8px', fontSize: '1.8rem', fontWeight: '800' }}>Hey, {savedProfile.nickname}! ≡ƒæï</h1>
            <p style={{ margin: '0 0 14px', fontSize: '0.92rem', opacity: 0.95, fontStyle: 'italic' }}>"{quote.text}" ΓÇö {quote.author}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '600' }}>Age {savedProfile.ageGroup}</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.05em', fontFamily: 'monospace, inherit' }}>≡ƒöæ {savedProfile.familyCode || 'No Code'}</span>
            </div>
          </div>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>{savedProfile.avatar}</div>
        </div>


        {/* Level 0 State Check */}
        {moodLogs.length === 0 && journals.length === 0 && assessmentsHistory.length === 0 && (
          <div style={{ ...cardStyle, background: '#EFF6FF', border: '1px dashed #3B82F6', padding: '28px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '1.8rem' }}>≡ƒî▒</span>
                <h3 style={{ margin: '8px 0 6px', color: '#1E40AF' }}>Welcome to Your Wellness Journey!</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#3B82F6', lineHeight: '1.5' }}>
                  Log your first mood, write a journal, or try a breathing exercise to get started.
                </p>
              </div>
              {savedProfile.familyCode && (
                <div style={{ background: 'linear-gradient(135deg, #1E40AF, #2563EB)', borderRadius: '12px', padding: '14px 18px', textAlign: 'center', minWidth: '160px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>Share with Parent</p>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', color: '#fff', fontFamily: 'monospace, inherit', letterSpacing: '0.1em' }}>{savedProfile.familyCode}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          {[
            { label: 'Mood Entries', val: moodLogs.length, icon: '≡ƒÿè', color: '#10B981' },
            { label: 'Journal Entries', val: journals.length, icon: '≡ƒôû', color: '#3B82F6' },
            { label: 'Assessments', val: assessmentsHistory.length, icon: '≡ƒôè', color: '#8B5CF6' },
            { label: 'Breathing Cycles', val: breathingCyclesCompleted, icon: '≡ƒî¼∩╕Å', color: '#F59E0B' },
            { label: 'Booked Sessions', val: bookedSessions.length, icon: '≡ƒæ⌐ΓÇìΓÜò∩╕Å', color: '#EF4444' },
            { label: 'Streak', val: moodLogs.length > 0 ? '1 Day' : '0 Days', icon: '≡ƒöÑ', color: '#F97316' },
          ].map((s, i) => (
            <div key={i} style={{ ...cardStyle, textAlign: 'center', padding: '20px 14px' }}>
              <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
              <h2 style={{ margin: '6px 0 2px', fontSize: '1.4rem', fontWeight: '800', color: s.color }}>{s.val}</h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: themeColors.subText }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {[
            { label: 'Log Your Mood', desc: 'Track how you feel right now', page: 'mood', icon: '≡ƒÿè' },
            { label: 'Talk to AI', desc: 'Chat with your companion', page: 'ai', icon: '≡ƒñû' },
            { label: 'Write Journal', desc: 'Express your thoughts privately', page: 'journal', icon: '≡ƒôû' },
            { label: 'Take Assessment', desc: 'Check your wellness levels', page: 'assessment', icon: '≡ƒôè' },
          ].map((a, i) => (
            <button key={i} onClick={() => setActivePage(a.page)} style={{ ...cardStyle, textAlign: 'left', cursor: 'pointer', display: 'flex', gap: '14px', alignItems: 'center', transition: 'all 0.2s' }}>
              <span style={{ fontSize: '1.8rem' }}>{a.icon}</span>
              <div>
                <h4 style={{ margin: '0 0 2px', fontSize: '0.9rem', color: themeColors.text }}>{a.label}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: themeColors.subText }}>{a.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Page 2: Mood Tracker
  const renderMoodTracker = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <h2>≡ƒÿè Daily Mood Check-In</h2>
        <p style={{ color: themeColors.subText, fontSize: '0.88rem', margin: '4px 0 20px' }}>
          Select how you feel right now. You can optionally add a note.
        </p>
        {loggedAlert && (
          <div style={{ padding: '12px', background: '#D1FAE5', color: '#065F46', borderRadius: '10px', fontWeight: '600', fontSize: '0.85rem', marginBottom: '14px' }}>
            {loggedAlert}
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {MOOD_OPTIONS.map(opt => (
            <button key={opt.label} onClick={() => setSelectedMood(opt)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '16px 20px',
              background: selectedMood?.label === opt.label ? opt.color : themeColors.bg,
              color: selectedMood?.label === opt.label ? '#fff' : themeColors.text,
              border: `2px solid ${selectedMood?.label === opt.label ? opt.color : themeColors.border}`,
              borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', minWidth: '90px'
            }}>
              <span style={{ fontSize: '1.8rem' }}>{opt.emoji}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{opt.label}</span>
            </button>
          ))}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>Optional: How do you feel? Describe it</label>
          <textarea rows="3" value={moodNote} onChange={e => setMoodNote(e.target.value)} placeholder="Add details about school, home, or general state..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1.5px solid ${themeColors.border}`, background: themeColors.bg, color: themeColors.text, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
        </div>
        <button onClick={handleMoodSubmit} disabled={!selectedMood} style={{
          ...btnPrimary, background: selectedMood ? '#2563EB' : '#E2E8F0', color: selectedMood ? '#fff' : '#94A3B8', cursor: selectedMood ? 'pointer' : 'not-allowed'
        }}>Save Mood Entry</button>
      </div>

      {/* History */}
      <div style={cardStyle}>
        <h3>≡ƒùô∩╕Å Mood History Log</h3>
        {moodLogs.length === 0 ? (
          <p style={{ color: themeColors.subText, fontSize: '0.85rem', margin: '14px 0 0' }}>No history logged yet. Log your first mood above.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            {moodLogs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: themeColors.bg, borderRadius: '10px' }}>
                <span style={{ fontSize: '1.6rem' }}>{log.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: '700', fontSize: '0.88rem' }}>{log.mood}</p>
                  {log.note && <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: themeColors.subText }}>{log.note}</p>}
                </div>
                <span style={{ fontSize: '0.72rem', color: themeColors.subText }}>{log.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Page 3: AI Companion
  const renderAI = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', minHeight: 'calc(100vh - 160px)' }}>
      <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ borderBottom: `1px solid ${themeColors.border}`, paddingBottom: '12px', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>≡ƒñû Companion Chat Session</h3>
          <p style={{ margin: 0, fontSize: '0.72rem', color: '#10B981' }}>ΓùÅ Active listener online</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', minHeight: '340px', paddingRight: '6px' }}>
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%', padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.sender === 'user' ? '#2563EB' : themeColors.bg,
                color: msg.sender === 'user' ? '#fff' : themeColors.text,
                fontSize: '0.88rem', lineHeight: '1.45'
              }}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendChat()} placeholder="Talk with AI companion about your day..." style={{ flex: 1, padding: '12px 16px', borderRadius: '50px', border: `1.5px solid ${themeColors.border}`, background: themeColors.bg, color: themeColors.text, outline: 'none', fontFamily: 'inherit' }} />
          <button onClick={handleSendChat} style={{ padding: '12px 22px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: '700', cursor: 'pointer' }}>Send</button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={cardStyle}>
          <h4 style={{ margin: '0 0 10px', fontSize: '0.82rem', color: themeColors.subText, textTransform: 'uppercase' }}>Suggested Topics</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {AI_SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => setChatInput(s)} style={{ textAlign: 'left', padding: '8px 12px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ ...cardStyle, background: '#EFF6FF', border: '1px solid #93C5FD' }}>
          <h4 style={{ margin: '0 0 6px', color: '#1E40AF', fontSize: '0.88rem' }}>≡ƒöÆ Strict Privacy Guard</h4>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#3B82F6', lineHeight: '1.4' }}>
            All AI conversations are fully encrypted. Parents can never review these chat dialogues.
          </p>
        </div>
      </div>
    </div>
  );

  // Page 4: Journal
  const renderJournal = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {['new', 'history'].map(tab => (
          <button key={tab} onClick={() => setJournalTab(tab)} style={{
            padding: '8px 18px', borderRadius: '50px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
            border: '1px solid ' + (journalTab === tab ? '#2563EB' : themeColors.border),
            background: journalTab === tab ? '#2563EB' : themeColors.card,
            color: journalTab === tab ? '#fff' : themeColors.subText, fontFamily: 'inherit'
          }}>
            {tab === 'new' ? 'Γ£Å∩╕Å New Journal' : '≡ƒôÜ My Journals'}
          </button>
        ))}
      </div>

      {journalTab === 'new' ? (
        <div style={cardStyle}>
          <h3>≡ƒôû Write a New Entry</h3>
          <p style={{ color: themeColors.subText, fontSize: '0.82rem', margin: '4px 0 16px' }}>
            Your private space to express thoughts. Never shared with anyone.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Entry Title (e.g. My thoughts today)" value={journalTitle} onChange={e => setJournalTitle(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: `1.5px solid ${themeColors.border}`, background: themeColors.bg, color: themeColors.text, fontWeight: '600', outline: 'none', fontFamily: 'inherit' }} />
            <textarea rows="8" placeholder="Start writing what is on your mind..." value={journalBody} onChange={e => setJournalBody(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: `1.5px solid ${themeColors.border}`, background: themeColors.bg, color: themeColors.text, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
            <button onClick={handleSaveJournal} style={{ ...btnPrimary, width: 'fit-content' }}>Save Secure Entry</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" placeholder="≡ƒöì Search saved entries..." value={journalSearch} onChange={e => setJournalSearch(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', border: `1.5px solid ${themeColors.border}`, background: themeColors.card, color: themeColors.text, outline: 'none', fontFamily: 'inherit' }} />
          {journals.length === 0 ? (
            <div style={cardStyle}>
              <p style={{ color: themeColors.subText, fontSize: '0.85rem' }}>No journals saved yet. Write your first entry to see records here.</p>
            </div>
          ) : (
            journals
              .filter(j => !journalSearch || j.title.toLowerCase().includes(journalSearch.toLowerCase()) || j.body.toLowerCase().includes(journalSearch.toLowerCase()))
              .map(j => (
                <div key={j.id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${themeColors.border}`, paddingBottom: '8px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontWeight: '700' }}>{j.title}</h4>
                    <span style={{ fontSize: '0.72rem', color: themeColors.subText }}>{j.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: themeColors.text, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{j.body}</p>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );

  // Page 4.1: Gratitude Jar
  const [gratitudeInput, setGratitudeInput] = useState('');
  
  const handleAddGratitude = () => {
    if (!gratitudeInput.trim()) return;
    const entry = {
      text: gratitudeInput.trim(),
      date: new Date().toLocaleDateString()
    };
    setGratitudeList(prev => [entry, ...prev]);
    setGratitudeInput('');
  };
  
  const renderGratitudeJar = () => {
    const defaultExamples = [
      "My friend helped me today.",
      "I finished my assignment.",
      "I enjoyed dinner with my family."
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.78rem', background: '#FEF3C7', color: '#B45309', padding: '3px 8px', borderRadius: '50px', fontWeight: '700' }}>Self-Care Exercise</span>
            <h2 style={{ margin: '8px 0 4px', fontSize: '1.45rem', fontWeight: '800' }}>≡ƒì» Gratitude Jar</h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: themeColors.subText }}>Add one positive memory each day to build resilience.</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px' }}>Capture Today's Memory</h3>
            <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '0 0 16px', lineHeight: '1.4' }}>
              What is one good thing that happened today? Even tiny moments count.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                placeholder="e.g. I enjoyed dinner with my family..."
                value={gratitudeInput}
                onChange={e => setGratitudeInput(e.target.value)}
                style={{ padding: '12px 14px', borderRadius: '10px', border: `1px solid ${themeColors.border}`, background: themeColors.bg, color: themeColors.text, fontFamily: 'inherit', fontSize: '0.88rem' }}
                onKeyDown={e => e.key === 'Enter' && handleAddGratitude()}
              />
              <button
                onClick={handleAddGratitude}
                style={{ ...btnPrimary, background: '#D97706', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}
              >
                Add to Gratitude Jar ≡ƒÆ¢
              </button>
            </div>
            
            <div style={{ marginTop: '20px', borderTop: `1px solid ${themeColors.border}`, paddingTop: '16px' }}>
              <strong style={{ fontSize: '0.78rem', color: themeColors.subText, display: 'block', marginBottom: '8px' }}>≡ƒÆí Need inspiration? Try these:</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {defaultExamples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setGratitudeInput(ex)}
                    style={{ textAlign: 'left', background: 'none', border: 'none', color: '#D97706', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline', width: 'fit-content', padding: 0 }}
                  >
                    "{ex}"
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ ...cardStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: 'none', color: '#78350F' }}>
            <div style={{ fontSize: '6rem', position: 'relative' }}>
              ≡ƒì»
              {gratitudeList.length > 0 && (
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#EF4444', color: 'white', borderRadius: '50px', padding: '4px 10px', fontSize: '0.85rem', fontWeight: '800' }}>
                  {gratitudeList.length}
                </span>
              )}
            </div>
            <h3 style={{ margin: '14px 0 6px', color: '#78350F' }}>Your Memories Jar</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>
              {gratitudeList.length === 0 ? "Your jar is empty! Add your first positive reflection." : "Look at all the positive memories you've collected!"}
            </p>
          </div>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 14px' }}>Γ£¿ Revisit Your Memories</h3>
          <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '0 0 16px' }}>On difficult days, revisit your positive reflections to lift your spirits.</p>
          {gratitudeList.length === 0 ? (
            <p style={{ color: themeColors.subText, fontSize: '0.82rem', textAlign: 'center', padding: '30px' }}>Your positive memories list is empty. Start adding some!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {gratitudeList.map((entry, idx) => (
                <div key={idx} style={{ background: themeColors.bg, border: `1px solid ${themeColors.border}`, borderRadius: '12px', padding: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ margin: '0 0 12px', fontSize: '0.85rem', fontWeight: '600', fontStyle: 'italic', color: themeColors.text }}>"{entry.text}"</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: themeColors.subText }}>{entry.date}</span>
                    <button
                      onClick={() => {
                        if(window.confirm("Delete this memory?")) {
                          setGratitudeList(prev => prev.filter((_, i) => i !== idx));
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Page 4.2: Interactive Wellness Games
  const [activeGame, setActiveGame] = useState(null); // null | 'breathing' | 'bubble' | 'memory' | 'color'
  
  const [bubbles, setBubbles] = useState([
    { id: 1, top: '20%', left: '30%', size: 60, popped: false },
    { id: 2, top: '40%', left: '70%', size: 50, popped: false },
    { id: 3, top: '65%', left: '20%', size: 70, popped: false },
    { id: 4, top: '70%', left: '55%', size: 55, popped: false },
    { id: 5, top: '15%', left: '75%', size: 65, popped: false },
  ]);
  const [bubblesPopped, setBubblesPopped] = useState(0);

  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  
  const colorWords = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'];
  const colorValues = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  const [colorQuestion, setColorQuestion] = useState({ text: 'RED', color: '#3B82F6', isMatch: false });
  const [colorScore, setColorScore] = useState(0);

  const startMemoryGame = () => {
    const items = ['≡ƒÿè', '≡ƒºÿ', '≡ƒì»', '≡ƒªè', '≡ƒÿè', '≡ƒºÿ', '≡ƒì»', '≡ƒªè'];
    const shuffled = items
      .map((val, idx) => ({ id: idx, value: val }))
      .sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
  };

  const handleCardClick = (idx) => {
    if (flippedIndices.length === 2 || matchedPairs.includes(idx) || flippedIndices.includes(idx)) return;
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);
    
    if (newFlipped.length === 2) {
      const idx1 = newFlipped[0];
      const idx2 = newFlipped[1];
      if (memoryCards[idx1].value === memoryCards[idx2].value) {
        setMatchedPairs(prev => [...prev, idx1, idx2]);
        setFlippedIndices([]);
        if (matchedPairs.length + 2 === memoryCards.length) {
          setGamesPlayed(prev => ({ ...prev, memory: prev.memory + 1 }));
          setTimeout(() => alert("≡ƒÄë Excellent! You matched all memory cards! Match count logged."), 300);
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const generateColorQuestion = () => {
    const textIdx = Math.floor(Math.random() * colorWords.length);
    const colorIdx = Math.floor(Math.random() * colorValues.length);
    const isMatch = Math.random() > 0.5;
    const actualColorIdx = isMatch ? textIdx : colorIdx;
    setColorQuestion({
      text: colorWords[textIdx],
      color: colorValues[actualColorIdx],
      isMatch: textIdx === actualColorIdx
    });
  };

  const handleColorAnswer = (userGuess) => {
    if (userGuess === colorQuestion.isMatch) {
      setColorScore(prev => prev + 1);
      if (colorScore + 1 >= 5) {
        setGamesPlayed(prev => ({ ...prev, matching: prev.matching + 1 }));
        alert("≡ƒÄë Awesome! You scored 5 correct in color matching!");
        setColorScore(0);
      }
    } else {
      setColorScore(0);
    }
    generateColorQuestion();
  };

  const resetBubbles = () => {
    setBubbles(prev => prev.map(b => ({ ...b, popped: false })));
  };

  const renderWellnessGames = () => {
    if (!activeGame) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', background: '#D1FAE5', color: '#065F46', padding: '3px 8px', borderRadius: '50px', fontWeight: '700' }}>Gamified Exercises</span>
            <h2 style={{ margin: '8px 0 4px', fontSize: '1.45rem', fontWeight: '800' }}>≡ƒÄ« Interactive Wellness Games</h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: themeColors.subText }}>Short stress-relief games and interactive deep focus habits.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={cardStyle}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>≡ƒÆ¿</div>
              <h3 style={{ margin: '0 0 6px' }}>Deep Breathing Animation</h3>
              <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: themeColors.subText }}>Paced diaphragmatic expanding circles for anxiety calming.</p>
              <button onClick={() => setActiveGame('breathing')} style={{ ...btnPrimary, padding: '8px 16px', fontSize: '0.8rem' }}>Play Breathing Game</button>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>≡ƒ½º</div>
              <h3 style={{ margin: '0 0 6px' }}>Stress Tapping Game</h3>
              <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: themeColors.subText }}>Satisfying sensory bubble popping to relieve pressure.</p>
              <button onClick={() => { setActiveGame('bubble'); resetBubbles(); setBubblesPopped(0); }} style={{ ...btnPrimary, padding: '8px 16px', fontSize: '0.8rem' }}>Play Pop Game</button>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>≡ƒâÅ</div>
              <h3 style={{ margin: '0 0 6px' }}>Memory Matching Game</h3>
              <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: themeColors.subText }}>Match pairs of happy wellness emojis to build concentration.</p>
              <button onClick={() => { setActiveGame('memory'); startMemoryGame(); }} style={{ ...btnPrimary, padding: '8px 16px', fontSize: '0.8rem' }}>Play Memory Game</button>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>≡ƒÄ¿</div>
              <h3 style={{ margin: '0 0 6px' }}>Color Matcher</h3>
              <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: themeColors.subText }}>Match color hues with names. Tests focus and cognitive flow.</p>
              <button onClick={() => { setActiveGame('color'); generateColorQuestion(); setColorScore(0); }} style={{ ...btnPrimary, padding: '8px 16px', fontSize: '0.8rem' }}>Play Color Game</button>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 10px' }}>≡ƒôè Your Gamified Self-Care Stats</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: themeColors.subText }}>
              Interactive games completed: <strong>{gamesPlayed.memory + gamesPlayed.matching + gamesPlayed.breathing + gamesPlayed.tapping} sessions</strong> (Memory: {gamesPlayed.memory}, Color: {gamesPlayed.matching}, Breathing: {gamesPlayed.breathing}, Pop Taps: {gamesPlayed.tapping}).
            </p>
          </div>
        </div>
      );
    }

    if (activeGame === 'breathing') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <button onClick={() => setActiveGame(null)} style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>ΓåÉ Back to Games list</button>
          </div>
          <div style={{ ...cardStyle, width: '100%', maxWidth: '500px', textAlign: 'center' }}>
            <h3>≡ƒÆ¿ Deep Breathing Animation</h3>
            <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '4px 0 20px' }}>Inhale as the circle expands, hold, exhale as it contracts.</p>
            
            <div style={{ display: 'flex', justifyCenter: 'center', justifyContent: 'center', margin: '40px 0' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #D1FAE5 0%, #10B981 100%)',
                boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                animation: 'pulseBreathing 8s infinite ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#065F46',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                Breathe
              </div>
            </div>

            <style>{`
              @keyframes pulseBreathing {
                0%, 100% { transform: scale(1); opacity: 0.7; }
                40% { transform: scale(1.6); opacity: 1; }
                60% { transform: scale(1.6); opacity: 1; }
              }
            `}</style>

            <button
              onClick={() => {
                setGamesPlayed(prev => ({ ...prev, breathing: prev.breathing + 1 }));
                setBreathingCyclesCompleted(prev => prev + 1);
                alert("≡ƒÄë Breathing game cycle complete! Daily breathing cycle logged.");
                setActiveGame(null);
              }}
              style={{ ...btnPrimary, background: '#10B981', border: 'none', padding: '10px 24px', cursor: 'pointer', margin: '10px 0' }}
            >
              Complete Breathing Cycle Γ£à
            </button>
          </div>
        </div>
      );
    }

    if (activeGame === 'bubble') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <button onClick={() => setActiveGame(null)} style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>ΓåÉ Back to Games list</button>
          </div>
          <div style={{ ...cardStyle, width: '100%', maxWidth: '550px', textAlign: 'center' }}>
            <h3>≡ƒ½º Bubble Tapping Pop Game</h3>
            <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '4px 0 16px' }}>Tap or click the satisfying bubble balloons to pop them and relieve stress!</p>
            
            <div style={{ height: '300px', background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '12px', position: 'relative', overflow: 'hidden', margin: '16px 0' }}>
              {bubbles.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    if (b.popped) return;
                    setBubbles(prev => prev.map(item => item.id === b.id ? { ...item, popped: true } : item));
                    setBubblesPopped(prev => {
                      const newCount = prev + 1;
                      if (newCount === bubbles.length) {
                        setGamesPlayed(g => ({ ...g, tapping: g.tapping + 1 }));
                        setTimeout(() => alert("≡ƒÄë Satisfying Pop! All bubbles popped! Pop score logged."), 300);
                      }
                      return newCount;
                    });
                  }}
                  style={{
                    position: 'absolute',
                    top: b.top,
                    left: b.left,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    borderRadius: '50%',
                    background: b.popped ? 'transparent' : 'radial-gradient(circle, #DBEAFE 0%, #3B82F6 100%)',
                    border: b.popped ? 'none' : '1px solid #93C5FD',
                    boxShadow: b.popped ? 'none' : '0 4px 10px rgba(59,130,246,0.2)',
                    cursor: b.popped ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    transition: 'transform 0.1s ease',
                    transform: b.popped ? 'scale(0)' : 'scale(1)',
                    padding: 0
                  }}
                >
                  {b.popped ? '≡ƒÆÑ' : '≡ƒ½º'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Popped: <strong>{bubblesPopped} / {bubbles.length}</strong></span>
              <button onClick={resetBubbles} style={{ ...btnPrimary, background: '#64748B', border: 'none', padding: '6px 14px', fontSize: '0.78rem' }}>Reset Bubbles</button>
            </div>
          </div>
        </div>
      );
    }

    if (activeGame === 'memory') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <button onClick={() => setActiveGame(null)} style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>ΓåÉ Back to Games list</button>
          </div>
          <div style={{ ...cardStyle, width: '100%', maxWidth: '450px', textAlign: 'center' }}>
            <h3>≡ƒâÅ Memory Match Pairs</h3>
            <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '4px 0 16px' }}>Click to flip cards and match mood companion items.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '20px 0' }}>
              {memoryCards.map((cardItem, index) => {
                const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(index);
                return (
                  <button
                    key={cardItem.id}
                    onClick={() => handleCardClick(index)}
                    style={{
                      height: '80px',
                      borderRadius: '10px',
                      border: '2px solid #2563EB',
                      background: isFlipped ? '#EFF6FF' : '#2563EB',
                      fontSize: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      padding: 0
                    }}
                  >
                    {isFlipped ? cardItem.value : 'Γ¥ô'}
                  </button>
                );
              })}
            </div>

            <button onClick={startMemoryGame} style={{ ...btnPrimary, background: '#64748B', border: 'none', padding: '8px 16px', fontSize: '0.8rem' }}>Restart Game</button>
          </div>
        </div>
      );
    }

    if (activeGame === 'color') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <button onClick={() => setActiveGame(null)} style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>ΓåÉ Back to Games list</button>
          </div>
          <div style={{ ...cardStyle, width: '100%', maxWidth: '450px', textAlign: 'center' }}>
            <h3>≡ƒÄ¿ Cognitive Color Matching</h3>
            <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '4px 0 20px' }}>Does the word name match the text color hue?</p>
            
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '30px', margin: '10px 0 20px' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: colorQuestion.color,
                letterSpacing: '2px'
              }}>
                {colorQuestion.text}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '16px' }}>Current Streak Score: <strong>{colorScore} / 5</strong></div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button onClick={() => handleColorAnswer(true)} style={{ ...btnPrimary, background: '#10B981', border: 'none', padding: '10px 24px' }}>Yes, Match! Γ£à</button>
              <button onClick={() => handleColorAnswer(false)} style={{ ...btnPrimary, background: '#EF4444', border: 'none', padding: '10px 24px' }}>No, Different Γ¥î</button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Page 5: Assessments
  const renderAssessment = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {assessStep === 'select' && (
          <div>
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', marginBottom: '20px' }}>
              <h2 style={{ color: '#1E40AF' }}>≡ƒôè Clinical Screening Assessments</h2>
              <p style={{ color: '#3B82F6', fontSize: '0.88rem', margin: '4px 0 0' }}>Select a diagnostic wellness scale below.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { type: 'phqa', name: '≡ƒÿö Depression (PHQ-A)', desc: '9 questions to screen adolescent depressive conditions.' },
                { type: 'gad7', name: '≡ƒÿ░ Anxiety (GAD-7)', desc: '7 questions assessing generalized anxiety patterns.' },
                { type: 'pss10', name: 'ΓÜí Stress (PSS-10)', desc: '10 questions calculating perceived stress levels.' },
                { type: 'sdq', name: '≡ƒºæΓÇì≡ƒñ¥ΓÇì≡ƒºæ Behavior & Social (SDQ)', desc: '25 items exploring behavioral traits and social relations.' },
                { type: 'who5', name: '≡ƒÆ¢ Overall Well-being (WHO-5)', desc: '5 questions measuring subjective psychological wellness.' }
              ].map(item => (
                <div key={item.type} style={cardStyle}>
                  <h4 style={{ margin: '0 0 8px', fontWeight: '700' }}>{item.name}</h4>
                  <p style={{ margin: '0 0 16px', fontSize: '0.8rem', color: themeColors.subText, lineHeight: '1.4' }}>{item.desc}</p>
                  <button onClick={() => startQuiz(item.type)} style={{ ...btnPrimary, padding: '8px 16px', fontSize: '0.8rem' }}>Start Diagnostic</button>
                </div>
              ))}
            </div>
            <div style={{ ...cardStyle, marginTop: '24px' }}>
              <h3>≡ƒòÉ Completed Screening Logs</h3>
              {assessmentsHistory.length === 0 ? (
                <p style={{ color: themeColors.subText, fontSize: '0.85rem', marginTop: '10px' }}>No screening histories yet. Take an assessment to see results.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                  {assessmentsHistory.map((report, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: themeColors.bg, borderRadius: '10px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.88rem' }}>{report.name}</h4>
                        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: themeColors.subText }}>Score: {report.score} / {report.max} ({report.percentage}%) ┬╖ {report.level}</p>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: themeColors.subText }}>{report.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {assessStep === 'quiz' && (() => {
          const quizGroup = assessQuestions[activeAssessType] || getLocalAssessmentFallback(activeAssessType);
          if (!quizGroup) return null;
          const question = quizGroup.questions[qIndex];
          return (
            <div style={{ ...cardStyle, maxWidth: '640px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563EB' }}>Question {qIndex + 1} of {quizGroup.questions.length}</span>
                <span style={{ fontSize: '0.8rem', color: themeColors.subText }}>{quizGroup.name}</span>
              </div>
              <div style={{ height: '6px', background: isDark ? '#334155' : '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ width: `${(qIndex / quizGroup.questions.length) * 100}%`, height: '100%', background: '#2563EB', transition: 'width 0.3s ease' }} />
              </div>
              <h3 style={{ margin: '0 0 24px', fontSize: '1.05rem', color: themeColors.text, lineHeight: '1.5' }}>"{question.text}"</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quizGroup.options.map(opt => (
                  <button key={opt.score} onClick={() => submitAnswer(opt.score)} style={{ padding: '12px 18px', textAlign: 'left', background: themeColors.bg, color: themeColors.text, border: `1.5px solid ${themeColors.border}`, borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem' }}>{opt.label}</button>
                ))}
              </div>
            </div>
          );
        })()}

        {assessStep === 'report' && currentReport && (
          <div style={{ ...cardStyle, maxWidth: '640px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>≡ƒôè</span>
            <h2 style={{ margin: '10px 0 6px' }}>Screening Complete</h2>
            <p style={{ margin: '0 0 20px', color: themeColors.subText, fontSize: '0.85rem' }}>{currentReport.name} ┬╖ Completed just now</p>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: themeColors.bg, padding: '20px 40px', borderRadius: '14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: '#2563EB' }}>{currentReport.score} / {currentReport.max}</span>
              <span style={{ fontSize: '0.8rem', color: themeColors.subText, marginTop: '4px' }}>Percentage: {currentReport.percentage}%</span>
            </div>
            <h3 style={{ margin: '0 0 8px', color: '#2563EB' }}>{currentReport.level}</h3>
            <p style={{ margin: '0 0 24px', fontSize: '0.88rem', color: themeColors.text, lineHeight: '1.45' }}>{currentReport.desc}</p>
            <button onClick={() => setAssessStep('select')} style={btnPrimary}>Back to Assessments</button>
          </div>
        )}
      </div>
    );
  };

  // Page 6: Wellness Hub (Box Breathing + 8 Guided Resources ONLY)
  const renderWellnessHub = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* BOX BREATHING */}
      <div style={{ ...cardStyle, textAlign: 'center' }}>
        <h3>≡ƒî¼∩╕Å Interactive Box Breathing</h3>
        <p style={{ color: themeColors.subText, fontSize: '0.82rem', margin: '4px 0 20px' }}>Calm your nervous system using clinical breathing patterns.</p>
        <div style={{ width: '130px', height: '130px', margin: '0 auto 16px', borderRadius: '50%', border: `3px solid ${breathColor[breathPhase]}`, background: `${breathColor[breathPhase]}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 1s ease' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: '800', color: breathColor[breathPhase] }}>{breathPhase === 'idle' ? '4' : breathSec}</span>
          <span style={{ fontSize: '0.72rem', color: breathColor[breathPhase] }}>{breathLabel[breathPhase]}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => setBreathPhase(p => p === 'idle' ? 'inhale' : 'idle')} style={{ padding: '8px 20px', background: breathPhase === 'idle' ? '#2563EB' : '#EF4444', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
            {breathPhase === 'idle' ? 'Γû╢ Start Breathing' : 'Γù╝ Stop'}
          </button>
          <span style={{ fontSize: '0.78rem', color: themeColors.subText }}>Cycles: {breathingCyclesCompleted}</span>
        </div>
      </div>

      {/* 8 GUIDED RESOURCES */}
      <div style={cardStyle}>
        <h3>≡ƒºÿ Guided Wellness Resources</h3>
        <p style={{ color: themeColors.subText, fontSize: '0.82rem', margin: '4px 0 16px' }}>Select a category to play calming guided content.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {GUIDED_RESOURCES.map(m => (
            <div key={m.id} onClick={() => setActiveMedTrack(m)} style={{ padding: '14px', borderRadius: '12px', border: `1.5px solid ${activeMedTrack?.id === m.id ? '#2563EB' : themeColors.border}`, background: activeMedTrack?.id === m.id ? '#EFF6FF' : themeColors.bg, cursor: 'pointer', transition: 'all 0.2s' }}>
              <span style={{ fontSize: '1.6rem' }}>{m.icon}</span>
              <h4 style={{ margin: '6px 0 2px', fontSize: '0.85rem' }}>{m.title}</h4>
              <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: themeColors.subText }}>{m.desc}</p>
              <span style={{ fontSize: '0.68rem', color: '#2563EB', fontWeight: '600' }}>{m.duration}</span>
            </div>
          ))}
        </div>
        {activeMedTrack && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#DBEAFE', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#1D4ED8' }}>Γû╢ Playing: <strong>{activeMedTrack.title}</strong> ({activeMedTrack.duration})</span>
            <button onClick={() => setActiveMedTrack(null)} style={{ padding: '4px 10px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Stop</button>
          </div>
        )}
      </div>
    </div>
  );

  // Page 7: Therapist (SEPARATE)
  const renderTherapist = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' }}>
        <h2 style={{ color: '#1E40AF', margin: '0 0 6px' }}>≡ƒæ⌐ΓÇìΓÜò∩╕Å Professional Support Directory</h2>
        <p style={{ color: '#3B82F6', fontSize: '0.88rem', margin: 0 }}>Connect with licensed adolescent specialists. Book real sessions with date and time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {THERAPIST_DIRECTORIES.map(t => (
          <div key={t.id} style={{ ...cardStyle }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.2rem' }}>{t.avatar}</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{t.name}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: themeColors.subText }}>{t.specialty}</p>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: themeColors.subText, marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>Γ¡É {t.rating} ┬╖ {t.exp} experience</span>
              <span>≡ƒÆ░ {t.cost}</span>
              <span>≡ƒòÉ {t.availability}</span>
            </div>
            <button onClick={() => setSelectedTherapist(t)} style={{ width: '100%', ...btnPrimary, padding: '10px' }}>Book Session</button>
          </div>
        ))}
      </div>

      {/* Booked Sessions */}
      <div style={cardStyle}>
        <h3>≡ƒôà Active Consultations</h3>
        {bookedSessions.length === 0 ? (
          <p style={{ color: themeColors.subText, fontSize: '0.85rem', marginTop: '10px' }}>No sessions booked yet. Select a therapist above to schedule.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
            {bookedSessions.map(appt => (
              <div key={appt.id} style={{ padding: '12px', background: '#D1FAE5', border: '1px solid #6EE7B7', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5 style={{ margin: 0, color: '#065F46' }}>Session with {appt.therapistName}</h5>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#047857' }}>Scheduled on {appt.date} at {appt.time}</p>
                </div>
                <span style={{ fontSize: '0.75rem', background: '#059669', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontWeight: '600' }}>{appt.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedTherapist && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ ...cardStyle, maxWidth: '500px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${themeColors.border}`, paddingBottom: '10px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Book Consultation</h3>
              <button onClick={() => setSelectedTherapist(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: themeColors.subText }}>├ù</button>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '2rem' }}>{selectedTherapist.avatar}</span>
              <div>
                <h4 style={{ margin: 0 }}>{selectedTherapist.name}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: themeColors.subText }}>{selectedTherapist.specialty} ┬╖ {selectedTherapist.exp}</p>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', background: themeColors.bg, padding: '12px', borderRadius: '8px', marginBottom: '14px' }}>
              <p style={{ margin: '0 0 4px' }}>Rate: <strong>{selectedTherapist.cost}</strong></p>
              <p style={{ margin: 0 }}>Availability: {selectedTherapist.availability}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', marginBottom: '4px' }}>Select Date</label>
                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${themeColors.border}`, outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', marginBottom: '4px' }}>Select Time Slot</label>
                <select value={bookingTime} onChange={e => setBookingTime(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${themeColors.border}`, outline: 'none', fontFamily: 'inherit' }}>
                  <option>10:00 AM</option><option>11:30 AM</option><option>01:00 PM</option><option>03:00 PM</option><option>04:30 PM</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', marginBottom: '4px' }}>Notes for Therapist</label>
                <textarea rows="2" value={bookingNotes} onChange={e => setBookingNotes(e.target.value)} placeholder="Any concerns or reasons for booking..." style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${themeColors.border}`, outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedTherapist(null)} style={{ padding: '8px 16px', background: '#F1F5F9', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={confirmBooking} style={btnPrimary}>Confirm & Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Page 8: Profile & Settings
  const renderProfile = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Profile Card */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px' }}>≡ƒæñ Your Profile</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>≡ƒªè</div>
          <div>
            <h3 style={{ margin: '0 0 2px', fontSize: '1.1rem' }}>{user?.name || 'Tejaswini'}</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: themeColors.subText }}>{user?.email || 'tejaswini@gmail.com'}</p>
            <span style={{ fontSize: '0.72rem', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '50px', fontWeight: '600', marginTop: '4px', display: 'inline-block' }}>Teen Account</span>
          </div>
        </div>
        <div style={{ padding: '14px', background: themeColors.bg, borderRadius: '10px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '0.82rem' }}><strong>Family Code:</strong> {parentForm?.familyCode || 'Not Set'}</p>
          <p style={{ margin: 0, fontSize: '0.82rem' }}><strong>Account Status:</strong> Active</p>
        </div>
      </div>

      {/* Privacy Settings */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 14px' }}>≡ƒöÆ Privacy & Sharing</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} /> Share aggregate mood trends with parent
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} /> Allow therapist matching alerts
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '18px', height: '18px' }} /> Enable push notifications
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 14px' }}>≡ƒÄ¿ Appearance</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setTheme('light')} style={{ padding: '10px 20px', borderRadius: '8px', border: `2px solid ${!isDark ? '#2563EB' : themeColors.border}`, background: !isDark ? '#EFF6FF' : themeColors.bg, color: themeColors.text, cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit' }}>ΓÿÇ∩╕Å Light Mode</button>
          <button onClick={() => setTheme('dark')} style={{ padding: '10px 20px', borderRadius: '8px', border: `2px solid ${isDark ? '#2563EB' : themeColors.border}`, background: isDark ? '#1E40AF' : themeColors.bg, color: isDark ? '#fff' : themeColors.text, cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit' }}>≡ƒîÖ Dark Mode</button>
        </div>
      </div>

      {/* Data Management & Resets */}
      <div style={{ ...cardStyle, border: '1px solid #FECACA', background: isDark ? '#451A1A' : '#FEF2F2' }}>
        <h3 style={{ margin: '0 0 8px', color: '#EF4444' }}>≡ƒº╣ Data Privacy Controls</h3>
        <p style={{ fontSize: '0.80rem', color: isDark ? '#FCA5A5' : '#7F1D1D', margin: '0 0 16px', lineHeight: '1.4' }}>
          Delete all stored local files, journals, mood checks, box breathing logs, gratitude entries, and diagnostic tests on this device.
        </p>
        <button 
          onClick={handleResetData} 
          style={{ padding: '10px 20px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}
        >
          ≡ƒùæ∩╕Å Clear All Stored Self-Care Data
        </button>
      </div>

      {/* Roles & Logout */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 14px' }}>≡ƒÜ¬ Account & Roles</h3>
        <p style={{ fontSize: '0.82rem', color: themeColors.subText, margin: '0 0 16px' }}>Switch to other portals or log out safely.</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={onLogout} style={{ padding: '10px 20px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}>Logout Account</button>
          {createdRoles?.filter(r => r !== 'teen' && r !== 'therapist').map(r => (
            <button key={r} onClick={() => setActiveRole(r)} style={{ padding: '10px 20px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}>Switch to {r.charAt(0).toUpperCase() + r.slice(1)}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => {
    const checkedInToday = moodLogs.length > 0;
    const journaledToday = journals.length > 0;
    const breatheCompleted = breathingCyclesCompleted > 0;
    const assessmentCompleted = assessmentsHistory.length > 0;
    
    let tasksCompleted = 0;
    if (checkedInToday) tasksCompleted += 1;
    if (journaledToday) tasksCompleted += 1;
    if (breatheCompleted) tasksCompleted += 1;
    if (assessmentCompleted) tasksCompleted += 1;
    
    const performancePercent = Math.round((tasksCompleted / 4) * 100);
    
    let encouragement = "Let's check in with a quick mood selection to kick off your day!";
    if (performancePercent === 25) encouragement = "Great start! Try sharing some thoughts in your private journal next.";
    if (performancePercent === 50) encouragement = "You are halfway checked-in! Try a slow box breathing session to refresh your focus.";
    if (performancePercent === 75) encouragement = "Almost fully completed! Take an assessment or complete a brief check-in to reach 100%.";
    if (performancePercent === 100) encouragement = "Incredible! You completed all daily wellness activities today! ≡ƒÅå Keep this healthy momentum going.";
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' }}>
          <h2 style={{ color: '#1E40AF', margin: 0 }}>≡ƒÅå Overall Performance of the Day</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#3B82F6' }}>Track and build your self-care habits day by day.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Progress Card */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 16px' }}>Daily Progress</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `6px solid ${performancePercent === 100 ? '#10B981' : '#2563EB'}` }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2563EB' }}>{performancePercent}%</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600', color: themeColors.text }}>{encouragement}</p>
                <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: themeColors.subText }}>Completed {tasksCompleted} of 4 wellness goals.</p>
              </div>
            </div>
          </div>

          {/* Activity Checklist */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 16px' }}>Activity Checklist</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Select Today\'s Mood', done: checkedInToday, icon: '≡ƒÿè' },
                { label: 'Write a Journal Reflection', done: journaledToday, icon: '≡ƒôû' },
                { label: 'Practice Box Breathing', done: breatheCompleted, icon: '≡ƒî¼∩╕Å' },
                { label: 'Take a Wellness Screening', done: assessmentCompleted, icon: '≡ƒôè' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: themeColors.bg, borderRadius: '8px', border: `1px solid ${themeColors.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.82rem', textDecoration: item.done ? 'line-through' : 'none', color: item.done ? themeColors.subText : themeColors.text }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: item.done ? '#10B981' : '#94A3B8' }}>{item.done ? 'Γ£ô Done' : 'Γùï Todo'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Summary Card */}
        <div style={{ ...cardStyle, background: isDark ? '#1E293B' : '#F8FAFC', border: `1px solid ${themeColors.border}`, textAlign: 'center', padding: '24px 16px' }}>
          <h3 style={{ margin: '0 0 8px' }}>≡ƒôä Need to share this with a doctor or therapist?</h3>
          <p style={{ margin: '0 0 18px', fontSize: '0.8rem', color: themeColors.subText, lineHeight: '1.4' }}>Download a clean, clinical summary report detailing your self-care adherence rate and screening scores.</p>
          <button 
            onClick={() => {
              let reportText = `==================================================\n`;
              reportText += `       MINDBRIDGE CLINICAL WELLNESS REPORT        \n`;
              reportText += `==================================================\n`;
              reportText += `Date Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
              reportText += `User Nickname:  ${savedProfile.nickname || 'Teen/Youth'}\n`;
              reportText += `Age Group:      ${savedProfile.ageGroup || '13-30'}\n`;
              reportText += `Family Code:    ${savedProfile.familyCode || 'N/A'}\n`;
              reportText += `--------------------------------------------------\n`;
              reportText += `DAILY SELF-CARE GOAL PROGRESS:\n`;
              reportText += `- Select Today's Mood:      [${checkedInToday ? 'X' : ' '}] Completed\n`;
              reportText += `- Write a Journal Entry:     [${journaledToday ? 'X' : ' '}] Completed\n`;
              reportText += `- Practice Box Breathing:   [${breatheCompleted ? 'X' : ' '}] Completed\n`;
              reportText += `- Add to Gratitude Jar:      [${gratitudeList.length > 0 ? 'X' : ' '}] Completed\n`;
              reportText += `- Take Screening Assessment: [${assessmentCompleted ? 'X' : ' '}] Completed\n`;
              reportText += `--------------------------------------------------\n`;
              reportText += `STRESS-RELIEF WELLNESS GAMES COMPLETED:\n`;
              reportText += `- Deep Breathing circles:    ${gamesPlayed.breathing || 0} sessions\n`;
              reportText += `- Sensory bubble pops:       ${gamesPlayed.tapping || 0} sessions\n`;
              reportText += `- Card memory matches:       ${gamesPlayed.memory || 0} sessions\n`;
              reportText += `- Stroop color matching:     ${gamesPlayed.matching || 0} sessions\n`;
              reportText += `--------------------------------------------------\n`;
              reportText += `GRATITUDE JAR REFLECTIONS:\n`;
              if (gratitudeList.length === 0) {
                reportText += `No gratitude memories recorded.\n`;
              } else {
                gratitudeList.forEach((g, idx) => {
                  reportText += `${idx + 1}. [${g.date}] "${g.text}"\n`;
                });
              }
              reportText += `--------------------------------------------------\n`;
              reportText += `CLINICAL SCREENING HISTORIES:\n`;
              if (assessmentsHistory.length === 0) {
                reportText += `No diagnostic screening logs completed yet.\n`;
              } else {
                assessmentsHistory.forEach((item, index) => {
                  reportText += `${index + 1}. ${item.name}\n`;
                  reportText += `   Score:      ${item.score} / ${item.max} (${item.percentage}%)\n`;
                  reportText += `   Level:      ${item.level}\n`;
                  reportText += `   Timestamp:  ${item.date}\n`;
                  reportText += `   Suggestion: ${item.desc}\n\n`;
                });
              }
              reportText += `==================================================\n`;
              reportText += `MindBridge aggregates clinical screening metrics and self-care data.\n`;
              reportText += `Keep this report for documentation during counseling sessions.\n`;
              
              const reportLines = reportText.split('\n');
              let pdfContent = `%PDF-1.4\n`;
              pdfContent += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
              pdfContent += `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
              pdfContent += `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Courier >> >> >> /MediaBox [0 0 595.28 841.89] /Contents 4 0 R >>\nendobj\n`;
              
              let streamText = `BT\n/F1 9 Tf\n12 TL\n45 800 Td\n`;
              reportLines.forEach(line => {
                const esc = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
                streamText += `(${esc}) Tj T*\n`;
              });
              streamText += `ET\n`;
              
              pdfContent += `4 0 obj\n<< /Length ${streamText.length} >>\nstream\n${streamText}endstream\nendobj\n`;
              
              const startXref = pdfContent.length;
              pdfContent += `xref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000056 00000 n \n0000000111 00000 n \n0000000250 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;
              
              const bytesArray = new Uint8Array(pdfContent.length);
              for (let idx = 0; idx < pdfContent.length; idx++) {
                bytesArray[idx] = pdfContent.charCodeAt(idx);
              }
              
              const blob = new Blob([bytesArray], { type: 'application/pdf' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `MindBridge_Teen_Wellness_Report_${new Date().toISOString().slice(0,10)}.pdf`;
              link.click();
              URL.revokeObjectURL(url);
            }} 
            style={{ ...btnPrimary, background: '#059669', color: '#fff', border: 'none', padding: '10px 24px', fontSize: '0.85rem' }}
          >
            ≡ƒôÑ Download Wellness Report (.pdf)
          </button>
        </div>
      </div>
    );
  };

  const pages = {
    home: renderHome,
    performance: renderPerformance,
    mood: renderMoodTracker,
    ai: renderAI,
    journal: renderJournal,
    gratitude: renderGratitudeJar,
    games: renderWellnessGames,
    assessment: renderAssessment,
    wellness: renderWellnessHub,
    therapist: renderTherapist,
    profile: renderProfile
  };

  const activePageData = NAV.find(n => n.id === activePage) || NAV[0];
  const CurrentPageRender = pages[activePage] || renderHome;

  // ΓöÇΓöÇΓöÇ PROFILE SCREENS (shown before dashboard) ΓöÇΓöÇΓöÇ
  if (!profileCompleted) {
    // ΓöÇΓöÇ STEP 1: Form ΓöÇΓöÇ
    if (profileStep === 'form') {
      return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EBF2FF 0%, #DBEAFE 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Poppins', 'Inter', sans-serif" }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 60px rgba(37,99,235,0.12)' }}>

            {/* Progress indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '4px', borderRadius: '4px', background: '#2563EB' }} />
              <div style={{ width: '32px', height: '4px', borderRadius: '4px', background: '#E2E8F0' }} />
            </div>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{profileForm.avatar}</div>
              <h1 style={{ margin: '0 0 6px', fontSize: '1.45rem', fontWeight: '800', color: '#1E40AF' }}>Create Your Profile</h1>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>Quick setup ΓÇö takes under 30 seconds. Youth &amp; Young Adults (Ages 13ΓÇô30).</p>
            </div>

            {/* Avatar Picker */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '10px' }}>Pick Your Avatar</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AVATARS.map(av => (
                  <button key={av} onClick={() => setProfileForm(p => ({ ...p, avatar: av }))} style={{ width: '44px', height: '44px', fontSize: '1.4rem', borderRadius: '10px', border: `2px solid ${profileForm.avatar === av ? '#2563EB' : '#E2E8F0'}`, background: profileForm.avatar === av ? '#EFF6FF' : '#F8FAFC', cursor: 'pointer', transition: 'all 0.15s' }}>{av}</button>
                ))}
              </div>
            </div>

            {/* Nickname */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Your Nickname <span style={{ color: '#EF4444' }}>*</span></label>
              <input
                type="text"
                placeholder="e.g. Alex, Jay, Priya..."
                value={profileForm.nickname}
                onChange={e => { setProfileForm(p => ({ ...p, nickname: e.target.value })); setProfileError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleProfileComplete()}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1.5px solid ${profileError ? '#EF4444' : '#E2E8F0'}`, fontSize: '0.92rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
              {profileError && <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#EF4444' }}>{profileError}</p>}
            </div>

            {/* Age Group */}
            <div style={{ marginBottom: '26px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Age Group</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['13ΓÇô17', '18ΓÇô24', '25ΓÇô30'].map(ag => (
                  <button key={ag} onClick={() => setProfileForm(p => ({ ...p, ageGroup: ag }))} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${profileForm.ageGroup === ag ? '#2563EB' : '#E2E8F0'}`, background: profileForm.ageGroup === ag ? '#2563EB' : '#F8FAFC', color: profileForm.ageGroup === ag ? '#fff' : '#374151', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}>{ag}</button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button onClick={handleProfileComplete} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
              Continue ΓÇö Get My Family Code ΓåÆ
            </button>

            <p style={{ textAlign: 'center', margin: '14px 0 0', fontSize: '0.72rem', color: '#94A3B8' }}>A unique Family Code will be generated for you so your parents can connect securely.</p>
          </div>
        </div>
      );
    }

    // ΓöÇΓöÇ STEP 2: Success ΓÇö Show Family Code ΓöÇΓöÇ
    if (profileStep === 'success') {
      return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EBF2FF 0%, #DBEAFE 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Poppins', 'Inter', sans-serif" }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 60px rgba(37,99,235,0.12)' }}>

            {/* Progress indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '4px', borderRadius: '4px', background: '#10B981' }} />
              <div style={{ width: '32px', height: '4px', borderRadius: '4px', background: '#2563EB' }} />
            </div>

            {/* Celebration header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{savedProfile.avatar} ≡ƒÄë</div>
              <h1 style={{ margin: '0 0 6px', fontSize: '1.45rem', fontWeight: '800', color: '#065F46' }}>Profile Created!</h1>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>
                Welcome to MindBridge, <strong>{savedProfile.nickname}</strong>! Your unique Family Code is ready.
              </p>
            </div>

            {/* Family Code Display ΓÇö prominent */}
            <div style={{ background: 'linear-gradient(135deg, #1E40AF, #2563EB)', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Family Code</p>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#fff', letterSpacing: '0.12em', fontFamily: 'monospace, inherit', marginBottom: '12px' }}>
                {savedProfile.familyCode}
              </div>
              <button onClick={copyFamilyCode} style={{ background: codeCopied ? '#10B981' : 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: '600', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {codeCopied ? 'Γ£à Copied!' : '≡ƒôï Copy Code'}
              </button>
            </div>

            {/* How to use */}
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#065F46', fontWeight: '700' }}>≡ƒô▓ How to share with your parent:</h4>
              <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#047857', lineHeight: '1.8' }}>
                <li>Your parent opens the Parent Portal on MindBridge</li>
                <li>They click <strong>Child Wellness Check</strong></li>
                <li>They enter this code: <strong style={{ letterSpacing: '0.08em', fontFamily: 'monospace' }}>{savedProfile.familyCode}</strong></li>
                <li>They'll see your wellness overview (private content stays private!)</li>
              </ol>
            </div>

            {/* Privacy note */}
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '10px', padding: '12px', marginBottom: '22px', fontSize: '0.78rem', color: '#92400E', lineHeight: '1.5' }}>
              ≡ƒöÆ <strong>Privacy Promise:</strong> Parents can only see <em>summary stats</em> ΓÇö never your journals, AI chats, or personal notes.
            </div>

            {/* Enter Dashboard */}
            <button onClick={() => setProfileCompleted(true)} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
              Enter My Dashboard ≡ƒÜÇ
            </button>

            <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: '0.72rem', color: '#94A3B8' }}>Your Family Code is saved to your profile. Find it anytime in Profile & Settings.</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: themeColors.bg, color: themeColors.text, fontFamily: "'Poppins', 'Inter', sans-serif" }}>

      {/* ΓöÇΓöÇ Quote of the Day Popup Modal ΓöÇΓöÇ */}
      {showDailyQuote && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: themeColors.card, borderRadius: '24px', padding: '36px', maxWidth: '460px', width: '90%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: `1px solid ${themeColors.border}` }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '14px' }}>Γ£¿</span>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563EB', fontWeight: '800', background: '#EFF6FF', padding: '4px 12px', borderRadius: '50px' }}>Quote of the Day</span>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.6', margin: '20px 0 16px', color: themeColors.text }}>
              "{quote.text}"
            </p>
            <p style={{ fontSize: '0.8rem', color: themeColors.subText, margin: '0 0 28px', fontWeight: '700' }}>
              ΓÇö {quote.author}
            </p>
            <button onClick={() => { setShowDailyQuote(false); try { sessionStorage.setItem('mb_teen_quote_shown', 'true'); } catch(e){} }} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#2563EB,#3B82F6)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(37,99,235,0.25)' }}>
              Awesome, Let's Go! ≡ƒÜÇ
            </button>
          </div>
        </div>
      )}

      {/* ΓöÇΓöÇ Sidebar ΓöÇΓöÇ */}
      <aside style={{ width: '240px', background: themeColors.sidebar, borderRight: `1px solid ${themeColors.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100 }}>
        <div style={{ padding: '20px', borderBottom: `1px solid ${themeColors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#2563EB' }}>MindBridge</span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: themeColors.subText }}>Teen Space</p>
        </div>

        <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px',
                background: activePage === item.id ? '#EFF6FF' : 'none',
                color: activePage === item.id ? '#2563EB' : themeColors.subText,
                border: 'none', cursor: 'pointer', fontWeight: activePage === item.id ? '700' : '500',
                fontSize: '0.83rem', textAlign: 'left', fontFamily: 'inherit',
                borderLeft: activePage === item.id ? '3px solid #2563EB' : '3px solid transparent'
              }}
            >
              <span style={{ fontSize: '1.05rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '14px 10px', borderTop: `1px solid ${themeColors.border}` }}>
          <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', background: '#FEE2E2', color: '#EF4444', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem', fontFamily: 'inherit' }}>
            ≡ƒÜ¬ Log Out
          </button>
        </div>
      </aside>

      {/* ΓöÇΓöÇ Main Panel ΓöÇΓöÇ */}
      <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header style={{ background: themeColors.card, borderBottom: `1px solid ${themeColors.border}`, padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>
            {activePageData.icon} {activePageData.label}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} style={{ padding: '6px 12px', background: isDark ? '#334155' : '#F1F5F9', border: `1px solid ${themeColors.border}`, borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'inherit' }}>
              {isDark ? 'ΓÿÇ∩╕Å Light' : '≡ƒîÖ Dark'}
            </button>
          </div>
        </header>

        <main style={{ padding: '24px', flex: 1 }}>
          {CurrentPageRender()}
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import TeenDashboard from './TeenDashboard';
import ParentDashboard from './ParentDashboard';
import { Brain, Mic, Activity, BarChart2, Users, ShieldCheck, Sparkles, BadgeCheck, HeartHandshake, Check, UserRound } from 'lucide-react';



// API Configuration (points to Node/Express server)
const API_URL = 'http://localhost:5000/api';

export default function App() {
    // --- STATE MANAGEMENT ---
    const [currentView, setCurrentView] = useState('home'); // home, features, about, resources, faqs, contact, auth, role, portal-teen, portal-parent, portal-therapist
    const [user, setUser] = useState(null); // { name, token, role }
    const [previewTab, setPreviewTab] = useState('parent'); // parent, teen
    const [homeCheckInMood, setHomeCheckInMood] = useState(null); // Happy, Calm, Tired, Anxious, Sad
    
    // Auth Form State
    const [authTab, setAuthTab] = useState('login'); // login, signup
    const [authName, setAuthName] = useState('');
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Resources Search & Filters State
    const [resourceSearch, setResourceSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeModalKey, setActiveModalKey] = useState(null);

    // FAQ Accordion Open Index State
    const [faqOpenIndex, setFaqOpenIndex] = useState(null);

    // Contact & Feedback Form State
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [contactRating, setContactRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formSuccess, setFormSuccess] = useState(false);
    const [contactErrors, setContactErrors] = useState({});

    // --- SINGLE ACCOUNT ROLE MANAGEMENT STATES ---
    const [createdRoles, setCreatedRoles] = useState(['teen', 'parent', 'therapist']); // all portals open by default
    const [activeRole, setActiveRole] = useState('teen');
    const [roleMenuOpen, setRoleMenuOpen] = useState(false);
    const [parentActiveTab, setParentActiveTab] = useState('my-wellness');




    // --- QUICK ONBOARDING FLOW STATES & VALIDATION ---
    const [onboardingErrors, setOnboardingErrors] = useState({});
    const [generatedFamilyCode, setGeneratedFamilyCode] = useState('');
    const [showTeenCodeScreen, setShowTeenCodeScreen] = useState(false);
    const [parentRequestSent, setParentRequestSent] = useState(false);

    // --- FEELFREE ONBOARDING SESSION STATES ---
    const [sessionCompleted, setSessionCompleted] = useState(() => {
        try { return localStorage.getItem('mc_session_done') === 'true'; } catch { return false; }
    });
    const [ffStep, setFfStep] = useState(0); // 0=welcome, 1-6=steps, 7=profile complete
    const [ffStepVisible, setFfStepVisible] = useState(true);
    const [ffProfile, setFfProfile] = useState({ name: '', age: '', gender: '', school: '' });
    const [ffMood, setFfMood] = useState('');
    const [ffSleepHours, setFfSleepHours] = useState('');
    const [ffStressLevel, setFfStressLevel] = useState('');
    const [ffSocialComfort, setFfSocialComfort] = useState('');
    const [ffExercise, setFfExercise] = useState('');
    const [ffEnjoyActivities, setFfEnjoyActivities] = useState([]);
    const [ffAiMessages, setFfAiMessages] = useState([
        { sender: 'bot', text: "Hi! I'm your MindCare AI Companion. Tell me how you're feeling today and I'll be here to support you! 💙" }
    ]);
    const [ffAiInput, setFfAiInput] = useState('');
    const [ffAssessAnswers, setFfAssessAnswers] = useState({0:0,1:0,2:0,3:0,4:0});
    const [ffWellnessScore, setFfWellnessScore] = useState(null);
    const [ffCompletedDate, setFfCompletedDate] = useState('');

    // Teen Quick Form State
    const [teenForm, setTeenForm] = useState({
        profilePic: '🦊',
        fullName: '',
        age: '',
        gender: '',
        parentEmail: '',
        emergencyContact: ''
    });

    // Parent Quick Form State
    const [parentForm, setParentForm] = useState({
        profilePic: '👨‍👩‍👧',
        fullName: '',
        relationship: 'Mother',
        familyCode: '',
        childEmail: ''
    });

    // Therapist Quick Form State
    const [therapistForm, setTherapistForm] = useState({
        profilePic: '👩‍⚕️',
        fullName: '',
        specialization: '',
        experience: ''
    });

    // Teen Onboarding Finish
    const handleTeenQuickFinish = () => {
        const errors = {};
        if (!teenForm.fullName.trim()) errors.fullName = 'Full Name is required';
        if (!teenForm.age) errors.age = 'Age is required';
        if (!teenForm.gender) errors.gender = 'Gender is required';

        if (Object.keys(errors).length > 0) {
            setOnboardingErrors(errors);
        } else {
            setOnboardingErrors({});
            // Generate secure Family Code: MB-XXXX-XXXX
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const part1 = Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
            const part2 = Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
            const code = `MB-${part1}-${part2}`;
            setGeneratedFamilyCode(code);
            setShowTeenCodeScreen(true);
            setCreatedRoles(prev => prev.includes('teen') ? prev : [...prev, 'teen']);
            setActiveRole('teen');
        }
    };

    // Parent Onboarding Finish
    const handleParentQuickFinish = () => {
        const errors = {};
        if (!parentForm.fullName.trim()) errors.fullName = 'Full Name is required';
        if (!parentForm.relationship) errors.relationship = 'Relationship is required';

        if (Object.keys(errors).length > 0) {
            setOnboardingErrors(errors);
        } else {
            setOnboardingErrors({});
            setCreatedRoles(prev => prev.includes('parent') ? prev : [...prev, 'parent']);
            setActiveRole('parent');
            navigateTo('portal-parent');
        }
    };

    // Therapist Onboarding Finish
    const handleTherapistQuickFinish = () => {
        const errors = {};
        if (!therapistForm.fullName.trim()) errors.fullName = 'Full Name is required';
        if (!therapistForm.specialization.trim()) errors.specialization = 'Specialization is required';
        if (!therapistForm.experience) errors.experience = 'Years of Experience is required';

        if (Object.keys(errors).length > 0) {
            setOnboardingErrors(errors);
        } else {
            setOnboardingErrors({});
            setCreatedRoles(prev => prev.includes('therapist') ? prev : [...prev, 'therapist']);
            setActiveRole('therapist');
            navigateTo('portal-therapist');
        }
    };

    // --- TEEN DASHBOARD EXTENSIVE STATES ---
    const [teenActiveTab, setTeenActiveTab] = useState('home'); // home, mood, ai-companion, journal, assessment, wellness, therapist, progress, profile, settings
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [loggedMoodMessage, setLoggedMoodMessage] = useState('');
    
    // Mood Tracker Tab State
    const [selectedCheckinMood, setSelectedCheckinMood] = useState('Calm');
    const [currentMoodNote, setCurrentMoodNote] = useState('');
    const [moodLogs, setMoodLogs] = useState([
        { date: 'July 01, 2026', mood: 'Calm', note: 'Feeling balanced after school.' },
        { date: 'June 30, 2026', mood: 'Happy', note: 'Had a fun dinner with friends!' },
        { date: 'June 29, 2026', mood: 'Tired', note: 'Exams prep is keeping me up.' },
        { date: 'June 28, 2026', mood: 'Anxious', note: 'Felt a bit nervous about presentation.' }
    ]);
    
    // AI Companion Tab State
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { sender: 'bot', text: "Hello! I'm your AI Companion. I'm here to offer listening support and daily wellness suggestions. Just a reminder: I am not a replacement for professional clinical therapy." }
    ]);
    const [prevAIConversations, setPrevAIConversations] = useState([
        { id: 1, title: 'Managing exam nervousness', summary: 'Focused on box-breathing coping exercises.' },
        { id: 2, title: 'Sleep improvement patterns', summary: 'Discussed wind-down routines.' }
    ]);

    // Journal Tab State
    const [journalText, setJournalText] = useState('');
    const [journalAnalysisAlert, setJournalAnalysisAlert] = useState('');
    const [journalsList, setJournalsList] = useState([
        { id: 1, date: 'July 02, 2026', title: 'Deep Summer Reflection', text: 'Today I spent some time walking outside. The fresh air helped clear my mind. Realized I need to take regular screen breaks.', type: 'General' },
        { id: 2, date: 'June 30, 2026', title: 'Things I am grateful for', text: '1. A warm cup of coffee\n2. Quiet study desk space\n3. Supportive family discussions.', type: 'Gratitude' }
    ]);
    const [journalTitle, setJournalTitle] = useState('');
    const [journalBody, setJournalBody] = useState('');
    const [journalSearch, setJournalSearch] = useState('');
    const [journalType, setJournalType] = useState('General'); // General or Gratitude
    const [gratitudeNotes, setGratitudeNotes] = useState({ focus: '', blessing: '', thank: '' });
    
    // Assessment Tab State
    const [assessmentStep, setAssessmentStep] = useState(0); // 0 = start, 1 = in progress, 2 = report
    const [assessmentQuestions, setAssessmentQuestions] = useState([
        { id: 1, text: "Feeling nervous, anxious, or on edge?" },
        { id: 2, text: "Not being able to stop or control worrying?" },
        { id: 3, text: "Worrying too much about different things?" },
        { id: 4, text: "Trouble relaxing?" },
        { id: 5, text: "Being so restless that it is hard to sit still?" },
        { id: 6, text: "Becoming easily annoyed or irritable?" },
        { id: 7, text: "Feeling afraid, as if something awful might happen?" }
    ]);
    const [assessmentOptions, setAssessmentOptions] = useState([
        { score: 0, label: "Not at all" },
        { score: 1, label: "Several days" },
        { score: 2, label: "More than half the days" },
        { score: 3, label: "Nearly every day" }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [assessmentAnswers, setAssessmentAnswers] = useState([]);
    const [wellnessReport, setWellnessReport] = useState(null);
    const [assessmentHistory, setAssessmentHistory] = useState([
        { date: 'June 18, 2026', score: 85, anxiety: 'Minimal', status: 'Healthy' }
    ]);

    // Wellness Tab State
    const [breathingState, setBreathingState] = useState('idle'); // idle, inhale, hold-in, exhale, hold-out
    const [breathingSeconds, setBreathingSeconds] = useState(4);
    const [playingAudio, setPlayingAudio] = useState(null);

    // Profile Tab State
    const [sharingSettings, setSharingSettings] = useState({
        wellnessScore: true,
        moodTrends: true,
        meditationStreak: true,
        assessments: false
    });

    // Fetch dynamic GAD-7 questions from external Express API endpoint
    useEffect(() => {
        fetch(`${API_URL}/assessment/questions`)
            .then(res => res.json())
            .then(data => {
                if (data && data.questions) {
                    setAssessmentQuestions(data.questions);
                    if (data.options) setAssessmentOptions(data.options);
                }
            })
            .catch(err => console.warn('Could not fetch assessment questions from Express, using local GAD-7 fallback.'));
    }, []);

    // Box Breathing automatic cycle timer
    useEffect(() => {
        let interval = null;
        if (breathingState !== 'idle') {
            interval = setInterval(() => {
                setBreathingSeconds((prev) => {
                    if (prev <= 1) {
                        if (breathingState === 'inhale') {
                            setBreathingState('hold-in');
                            return 4;
                        } else if (breathingState === 'hold-in') {
                            setBreathingState('exhale');
                            return 4;
                        } else if (breathingState === 'exhale') {
                            setBreathingState('hold-out');
                            return 4;
                        } else if (breathingState === 'hold-out') {
                            setBreathingState('inhale');
                            return 4;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setBreathingSeconds(4);
        }
        return () => clearInterval(interval);
    }, [breathingState]);

    // Parent Dashboard State (loaded from Express)
    const [parentMetrics, setParentMetrics] = useState({
        moodStability: '85%',
        moodComposition: { Calm: 75, Happy: 15, Anxious: 10 },
        reflectionsLogged: '6/7 days',
        sleepHoursAverage: 8.1,
        alerts: [
            { text: 'Teen logged a meditation session.', time: 'Today, 9:00 AM' },
            { text: 'Sleep tracking logged 8 hours of stable sleep.', time: 'Yesterday' }
        ]
    });

    // Therapist Dashboard State
    const [clientDecryptKey, setClientDecryptKey] = useState('');
    const [decryptMsg, setDecryptMsg] = useState('');

    // Newsletter State
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

    // --- SPA BROWSER BACK BUTTON SUPPORT ---
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state && event.state.currentView) {
                setCurrentView(event.state.currentView);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // --- SPA VIEW SWITCHER ---
    const navigateTo = (view) => {
        setCurrentView(view);
        window.history.pushState({ currentView: view, parentPortalView: null }, '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- SCROLL TO SECTION (for single-page nav) ---
    const scrollToSection = (sectionId) => {
        if (currentView !== 'home') {
            setCurrentView('home');
            window.history.pushState({ currentView: 'home' }, '');
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };



    // Logout Helper
    const handleLogout = () => {
        setUser(null);
        navigateTo('home');
    };

    // --- FORM SUBMIT HANDLERS ---

    // Login / Signup Auth API Call
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        const endpoint = authTab === 'login' ? '/auth/login' : '/auth/signup';
        const body = authTab === 'login' 
            ? { email: authEmail, password: authPassword }
            : { name: authName, email: authEmail, password: authPassword };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();

            if (!response.ok) {
                setAuthError(data.error || 'Authentication failed. Make sure the server is running.');
                return;
            }

            // Save session
            setUser({
                name: data.name || 'Tejaswini',
                email: data.email || authEmail || 'tejaswini@gmail.com',
                token: data.token || 'mock-jwt-token-xyz'
            });

            // Default roles configuration on login
            setCreatedRoles(['teen']);
            setActiveRole('teen');

            // Redirect to Role Selection
            navigateTo('role');

            // Reset inputs
            setAuthName('');
            setAuthEmail('');
            setAuthPassword('');

        } catch (err) {
            // Fallback for demo when backend is offline
            console.warn('Backend server connection issue. Performing mock session login.');
            setUser({
                name: authTab === 'signup' ? authName : 'Tejaswini',
                email: authEmail || 'tejaswini@gmail.com',
                token: 'mock-jwt-token-xyz'
            });
            setCreatedRoles(['teen']);
            setActiveRole('teen');
            navigateTo('role');
            setAuthName('');
            setAuthEmail('');
            setAuthPassword('');
        }
    };

    // Contact Feedback Submission API Call
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        const errors = {};
        if (!contactName.trim()) errors.name = 'Please enter your name';
        if (!contactEmail.trim() || !contactEmail.includes('@')) errors.email = 'Please enter a valid email';
        if (!contactSubject.trim()) errors.subject = 'Please enter a subject';
        if (!contactMessage.trim()) errors.message = 'Please enter your message';
        if (contactRating === 0) errors.rating = 'Please select a star rating';

        if (Object.keys(errors).length > 0) {
            setContactErrors(errors);
            return;
        }

        setContactErrors({});

        try {
            const response = await fetch(`${API_URL}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    subject: contactSubject,
                    message: contactMessage,
                    rating: contactRating
                })
            });

            if (response.ok) {
                setFormSuccess(true);
            } else {
                console.warn('API returned non-200 state, loading success notification locally.');
                setFormSuccess(true);
            }
        } catch (err) {
            console.warn('Could not contact server, rendering success response locally.');
            setFormSuccess(true);
        }
    };

    // Reset Feedback Form
    const handleFeedbackReset = () => {
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
        setContactRating(0);
        setFormSuccess(false);
    };

    // Teen Dashboard: Log Mood API Call
    const handleMoodLog = async (mood) => {
        setLoggedMoodMessage(`😊 Logging "${mood}"...`);
        try {
            await fetch(`${API_URL}/wellness/mood`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({ mood })
            });
            setLoggedMoodMessage(`😊 Emotion "${mood}" logged successfully in wellness trend.`);
        } catch (err) {
            setLoggedMoodMessage(`😊 Emotion "${mood}" logged locally (offline mode).`);
        }
        setTimeout(() => setLoggedMoodMessage(''), 4000);
    };

    // Teen Dashboard: Save Journal API Call
    const handleJournalSubmit = async () => {
        if (!journalText.trim()) return;
        setJournalAnalysisAlert('Analysing thoughts...');
        
        try {
            const response = await fetch(`${API_URL}/wellness/journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({ text: journalText })
            });
            const data = await response.json();
            setJournalAnalysisAlert(`📖 Journal logged securely! AI recommendation: ${data.suggestion}`);
        } catch (err) {
            // Local fallback logic
            const textLower = journalText.toLowerCase();
            let suggestion = 'Journal logged securely! (Offline)';
            if (textLower.includes('stress') || textLower.includes('exam')) {
                suggestion = 'Journal logged. Suggested coping skill: Box Breathing Grounding.';
            } else if (textLower.includes('sad') || textLower.includes('alone')) {
                suggestion = 'Journal logged. Suggested coping skill: 5-4-3-2-1 Grounding Method.';
            }
            setJournalAnalysisAlert(`📖 ${suggestion}`);
        }
        setJournalText('');
        setTimeout(() => setJournalAnalysisAlert(''), 6000);
    };

    // Teen Dashboard: AI Chat Send action
    const handleChatSend = () => {
        if (!chatInput.trim()) return;
        
        const newMsg = { sender: 'user', text: chatInput };
        setChatMessages(prev => [...prev, newMsg]);
        setChatInput('');

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                sender: 'bot',
                text: "Thank you for sharing that with me. It takes courage to open up. Remember, you're not alone, and we can explore simple breathing patterns or grounding tools if you're feeling overwhelmed."
            }]);
        }, 800);
    };

    // Therapist Dashboard: Decrypt client search action
    const handleClientDecrypt = () => {
        if (!clientDecryptKey.trim()) return;
        setDecryptMsg(`🔑 Client metrics decrypted. Patient: Maya K. (Aggregated mood stability: 88%)`);
        setClientDecryptKey('');
        setTimeout(() => setDecryptMsg(''), 5000);
    };

    // --- STATIC RESOURCE DATABASE ---
    const resourcesList = [
        { key: 'art', category: 'articles', icon: '🧠', title: 'Mental Health Articles', desc: 'Expert-written articles on stress, anxiety, depression, emotional well-being, and self-care.', badge: 'Article', badgeClass: 'res-articles' },
        { key: 'gui', category: 'guides', icon: '📖', title: 'Self-Help Guides', desc: 'Step-by-step guides to build healthy habits, improve emotional resilience, and manage everyday challenges.', badge: 'Self-Help Guide', badgeClass: 'res-guides' },
        { key: 'med', category: 'meditation', icon: '🧘', title: 'Meditation & Breathing Exercises', desc: 'Guided mindfulness sessions, breathing techniques, and relaxation exercises.', badge: 'Mindfulness', badgeClass: 'res-meditation' },
        { key: 'vid', category: 'videos', icon: '🎥', title: 'Educational Videos', desc: 'Informative videos from mental health professionals covering wellness tips and coping strategies.', badge: 'Video', badgeClass: 'res-videos' },
        { key: 'dow', category: 'downloads', icon: '📄', title: 'Downloadable Wellness Resources', desc: 'Mood trackers, gratitude journals, self-reflection worksheets, and wellness planners.', badge: 'Downloadable PDF', badgeClass: 'res-downloads' },
        { key: 'org', category: 'orgs', icon: '🔗', title: 'Trusted Mental Health Organizations', desc: 'Verified organizations, support services, helplines, and useful external resources.', badge: 'Trusted Link', badgeClass: 'res-orgs' }
    ];

    const modalData = {
        art: {
            title: "🧠 Clinical Mental Health Articles",
            desc: "Access our rich library of articles validated by child psychologists. Learn key strategies to address adolescent stress, chemical anxiety states, and digital depression patterns.",
            bullets: ["Understanding Teen Anxiety Cycles", "Navigating Emotional Swings in High School", "Recognizing Severe Distress warning signs", "Techniques for Mindful Parenting Conversations"]
        },
        gui: {
            title: "📖 Step-by-Step Self-Help Guides",
            desc: "Empowering booklets structured with clinical evidence to construct daily resilience routines, manage emotional fluctuations, and create solid check-in channels.",
            bullets: ["The 7-Day Mental Resilience Planner", "Habits Builder: Creating Screen-Free Sleep Schedules", "Self-Discovery Journals for Teenagers", "Assertive Communication Scripts for Families"]
        },
        med: {
            title: "🧘 Guided Meditation & Breathing Exercises",
            desc: "Scientific relaxation methods to quickly deactivate acute panic modes. Includes deep belly logs, square breathing sequences, and audio guides.",
            bullets: ["Box Breathing (4-4-4-4 Technique) to reduce adrenaline", "Guided Grounding (5-4-3-2-1 Sensory Method)", "Aggregated Sleep Initiation Audios", "10-Minute Stress Relief Meditation Series"]
        },
        vid: {
            title: "🎥 Informative Educational Videos",
            desc: "Expert-curated short lessons featuring adolescent therapists, exploring clinical subjects, and offering functional tips on home interactions.",
            bullets: ["How Parent-Teen Conflict Shapes Development", "Setting Safe digital boundaries without spying", "A Teenager's Guide to Emotional Expression"]
        },
        dow: {
            title: "📄 Downloadable Worksheets & Planners",
            desc: "Printable planners designed to help students outline gratitude indexes, journal daily struggles, and organize healthy communication routines.",
            bullets: ["Weekly Teen Mood Log & Sleep Diary (PDF)", "MindBridge Gratitude Circle Worksheets", "Personal Stress Plan Checklist"]
        },
        org: {
            title: "🔗 Verified Support Helplines",
            desc: "Instant connection to national support organizations, crisis hotlines, and counseling platforms available 24/7.",
            bullets: ["National Suicide Prevention Lifeline (Call/Text 988)", "Crisis Text Line (Text HOME to 741741)", "The Trevor Project (LGBTQ Youth: 1-866-488-7386)"]
        }
    };

    // Filter Resources list
    const filteredResources = resourcesList.filter(item => {
        const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
        const searchMatch = item.title.toLowerCase().includes(resourceSearch.toLowerCase()) || 
                            item.desc.toLowerCase().includes(resourceSearch.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div>
            {/* Mesh Gradient Background */}
            <div className="mesh-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* Navigation Header */}
            {!['portal-teen', 'portal-parent', 'portal-therapist'].includes(currentView) && (
            <header className="navbar">
                <div className="navbar-container">
                    {/* Logo & Brand — MindCare with Heart */}
                    <button onClick={() => navigateTo('home')} className="nav-logo" style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', outline: 'none' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: '800', fontSize: '1.1rem', color: '#0F172A', letterSpacing: '-0.02em' }}>MindCare</span>
                    </button>

                    {/* Navigation Menu Links — all scroll on same page */}
                    <nav className="nav-menu">
                        <ul className="nav-list">
                            <li>
                                <button 
                                    className="nav-link"
                                    onClick={() => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="nav-link"
                                    onClick={() => scrollToSection('section-features')}
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="nav-link"
                                    onClick={() => scrollToSection('section-how-it-works')}
                                >
                                    How It Works
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="nav-link"
                                    onClick={() => scrollToSection('section-about')}
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="nav-link"
                                    onClick={() => scrollToSection('section-therapist')}
                                >
                                    Therapist
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="nav-link"
                                    onClick={() => scrollToSection('section-contact')}
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* CTA Button */}
                    <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {user ? (
                            <div className="profile-switcher-dropdown" style={{ position: 'relative' }}>
                                <button 
                                    className="btn btn-secondary btn-sm" 
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px' }}
                                    onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                                >
                                    <span>{activeRole === 'teen' ? '🦊' : activeRole === 'parent' ? '👨‍👩‍👧' : '👩‍⚕️'}</span>
                                    <strong>{user.name}</strong> 
                                    <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>({activeRole === 'teen' ? 'Teen' : activeRole === 'parent' ? 'Parent' : 'Therapist'})</span>
                                    <span style={{ fontSize: '0.65rem' }}>▼</span>
                                </button>
                                
                                {roleMenuOpen && (
                                    <div className="dropdown-menu-panel" style={{ position: 'absolute', right: 0, top: '100%', marginTop: '6px', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-soft)', width: '220px', zIndex: 1000, padding: '8px 0', animation: 'slideUpFade 0.2s ease' }}>
                                        <div style={{ padding: '6px 16px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-light)', borderBottom: '1px solid var(--color-border)', marginBottom: '4px' }}>
                                            CURRENT ROLE
                                        </div>
                                        <div style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>{activeRole === 'teen' ? '🦊 Teen' : activeRole === 'parent' ? '👨‍👩‍👧 Parent' : '👩‍⚕️ Therapist'}</span>
                                            <span style={{ fontSize: '0.7rem', background: '#EFF6FF', color: 'var(--color-primary)', padding: '2px 6px', borderRadius: '50px' }}>Active</span>
                                        </div>
                                        
                                        <div style={{ padding: '6px 16px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-light)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', margin: '4px 0' }}>
                                            SWITCH ROLE
                                        </div>
                                        
                                        {activeRole !== 'teen' && (
                                            <button className="dropdown-item" onClick={() => { setActiveRole('teen'); navigateTo('portal-teen'); setRoleMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '0.82rem', color: 'var(--color-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span>🦊 Teen / Adults</span>
                                            </button>
                                        )}
                                        {activeRole !== 'parent' && (
                                            <button className="dropdown-item" onClick={() => { setActiveRole('parent'); navigateTo('portal-parent'); setRoleMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '0.82rem', color: 'var(--color-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span>👨‍👩‍👧 Parents</span>
                                            </button>
                                        )}
                                        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '8px', paddingTop: '4px' }}>
                                            <button className="dropdown-item" onClick={() => { handleLogout(); setRoleMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '0.82rem', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span>🚪 Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="btn btn-primary btn-sm get-started-btn" onClick={() => navigateTo('auth')}>Get started</button>
                        )}
                    </div>
                </div>
            </header>
            )}


            {/* Main Content Area */}
            <main id="app-content" style={{ minHeight: '70vh' }}>

                {/* ================= VIEW: HOME ================= */}
                {currentView === 'home' && (
                    <section className="app-view">
                        <div className="hero-container" style={{ textAlign: 'center', padding: '60px 24px', position: 'relative' }}>
                            {/* Main Title */}
                            <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.25', margin: '0 auto 16px auto', maxWidth: '840px', letterSpacing: '-0.02em' }}>
                                Helping Children Feel Heard, <br />
                                <span style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Understood & Supported</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="hero-subtitle" style={{ fontSize: '1rem', color: '#64748B', maxWidth: '640px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                                Personalized conversations, wellness assessments, and daily activities designed to build healthy emotional habits for every child.
                            </p>

                            {/* Top Badge (Moved Down) */}
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', color: '#1D4ED8', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '40px', boxShadow: '0 4px 12px rgba(29, 78, 216, 0.1)' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB', animation: 'pulse 2s infinite' }}></span>
                                A Safe Space for Young Minds
                            </div>

                            {/* Bottom Feature Chips */}
                            <div className="feature-chips-container" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', maxWidth: '780px', margin: '0 auto' }}>
                                <span className="feature-chip"><Sparkles size={16} /> Personalized Wellness</span>
                                <span className="feature-chip"><ShieldCheck size={16} /> Secure & Confidential</span>
                                <span className="feature-chip"><BadgeCheck size={16} /> Evidence-Based</span>
                                <span className="feature-chip"><HeartHandshake size={16} /> Daily Support</span>
                            </div>
                        </div>

                        {/* ===== 6 CORE FEATURES ===== */}
                        <div id="section-features" className="section-container" style={{ paddingTop: '60px', marginTop: '20px', scrollMarginTop: '80px' }}>
                            <div className="section-header">
                                <span className="section-tag">CORE FEATURES</span>
                                <h2 className="section-title">Designed for Parental Clarity &amp; Teen Independence</h2>
                                <p className="section-subtitle">Empowering tools that bridge communication gaps while preserving private boundaries.</p>
                            </div>
                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper"><Brain size={22} color="#2563EB" /></div>
                                    <h3>MindCare Companion</h3>
                                    <p>AI-powered emotional support and personalized guidance available anytime.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper"><Mic size={22} color="#2563EB" /></div>
                                    <h3>Voice Companion</h3>
                                    <p>Talk through your feelings naturally with interactive voice journaling.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper"><Activity size={22} color="#2563EB" /></div>
                                    <h3>Mental Health Assessment</h3>
                                    <p>Take scientifically validated mental wellness tests to track progress.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper"><BarChart2 size={22} color="#2563EB" /></div>
                                    <h3>Personalized Wellness Profile</h3>
                                    <p>A comprehensive, data-driven dashboard of your emotional journey.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper"><Users size={22} color="#2563EB" /></div>
                                    <h3>Parent Support Dashboard</h3>
                                    <p>Coordinated care, clinical insights, and safety nets for families.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper"><ShieldCheck size={22} color="#2563EB" /></div>
                                    <h3>Privacy &amp; Security</h3>
                                    <p>Clinical-grade data protection ensuring complete confidentiality.</p>
                                </div>
                            </div>
                        </div>

                        {/* ===== HOW MINDCARE WORKS — 5-step flow ===== */}
                        <div id="section-how-it-works" className="section-container" style={{ paddingTop: '60px', marginTop: '0', scrollMarginTop: '80px' }}>
                            <div className="section-header text-center" style={{ marginBottom: '40px' }}>
                                <span className="section-tag" style={{ background: '#F0FDF4', color: '#16A34A', padding: '4px 14px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block' }}>⚡ PERSONALIZED WELLNESS JOURNEY</span>
                                <h2 className="section-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '2rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>How MindCare Works</h2>
                                <p className="section-subtitle" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#64748B', maxWidth: '520px', margin: '0 auto', lineHeight: '1.4' }}>Follow a simple, guided wellness journey—from creating your profile and sharing your thoughts to receiving personalized insights and accessing tools that support your emotional well-being every day.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', width: '100%', maxWidth: '860px', margin: '0 auto 40px auto', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '16px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #14B8A6)', zIndex: 0 }}></div>
                                {[
                                    { step: '1', title: 'Create Account', desc: 'Register securely in seconds.' },
                                    { step: '2', title: 'Choose Portal', desc: 'Tailored interface for you.' },
                                    { step: '3', title: 'Wellness Session', desc: 'Guided interactive onboarding.' },
                                    { step: '4', title: 'Wellness Profile', desc: 'Your comprehensive health index.' },
                                    { step: '5', title: 'Access Dashboard', desc: 'Emotional support and tracking.' }
                                ].map((item, index) => (
                                    <div key={index} className="journey-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1, animationDelay: `${index * 0.15}s` }}>
                                        <div className="step-circle" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', border: '2px solid #3B82F6', marginBottom: '16px', transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(37,99,235,0.15)' }}>
                                            {item.step}
                                        </div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>{item.title}</h4>
                                        <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.5' }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ===== ABOUT SECTION ===== */}
                        <div id="section-about" className="section-container" style={{ paddingTop: '60px', scrollMarginTop: '80px' }}>
                            <div className="section-header">
                                <span className="section-tag">Our Identity</span>
                                <h2 className="section-title">Empowering Family Mental Wellness</h2>
                                <p className="section-subtitle">Combining clinical foundations with interactive, privacy-first technology.</p>
                            </div>
                            <div className="about-content-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', alignItems: 'start' }}>
                                <div className="about-main-card" style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '10px' }}>Bridging Communication Gaps</h3>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '12px', lineHeight: '1.55' }}>At MindCare, we construct a secure, supportive digital space where teens, parents, and adolescent therapists connect and work in alignment.</p>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '20px', lineHeight: '1.55' }}>We believe emotional awareness and early intervention should not feel like surveillance. Our system uses advanced, clinical-grade check-ins to build healthy communications.</p>
                                    <ul className="group-list" style={{ gap: '10px', listStyle: 'none', paddingLeft: '0' }}>
                                        <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.82rem' }}><span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>&#10003;</span><div><strong>End-to-End Privacy:</strong> Teenagers express themselves without parental monitoring.</div></li>
                                        <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.82rem' }}><span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>&#10003;</span><div><strong>Evidence-Based Prompts:</strong> Guided coping skills parsed dynamically by our journal model.</div></li>
                                        <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.82rem' }}><span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>&#10003;</span><div><strong>Integrated Safety Net:</strong> Instant counselor routing when elevated distress signals are tracked.</div></li>
                                    </ul>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="about-card" style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>&#128065;</div><h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-dark)', margin: 0 }}>Our Vision</h3></div>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>Fostering a world where everyone enjoys instant, destigmatized access to mental wellness support, strengthening family connections and community wellbeing.</p>
                                    </div>
                                    <div className="about-card" style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>&#127919;</div><h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-dark)', margin: 0 }}>Our Mission</h3></div>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>Delivering innovative, AI-powered emotional wellness tracking tools that encourage self-reflection, facilitate early detection, and seamlessly bridge clinical care.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===== THERAPIST SECTION ===== */}
                        <div id="section-therapist" className="section-container" style={{ paddingTop: '60px', scrollMarginTop: '80px' }}>
                            <div className="section-header">
                                <span className="section-tag">Professional Support</span>
                                <h2 className="section-title">Connect with Certified Therapists</h2>
                                <p className="section-subtitle">Licensed adolescent mental health professionals available to guide your wellness journey.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                {[
                                    { photo: 'https://randomuser.me/api/portraits/women/68.jpg', name: 'Dr. Priya Sharma', spec: 'Child & Adolescent Psychiatry', exp: '12 years', rating: '4.9' },
                                    { photo: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Dr. Arjun Mehta', spec: 'Cognitive Behavioral Therapy', exp: '9 years', rating: '4.8' },
                                    { photo: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Dr. Neha Patil', spec: 'Family & Teen Counseling', exp: '7 years', rating: '5.0' }
                                ].map((t, i) => (
                                    <div key={i} className="about-card therapist-card" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={t.photo} alt={t.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '3px solid #EFF6FF', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                                        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', margin: '0 0 6px' }}>{t.name}</h3>
                                        <p style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: '600', margin: '0 0 12px' }}>{t.spec}</p>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.75rem', color: '#64748B', marginBottom: '20px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>&#9200; {t.exp}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>&#11088; {t.rating}</span>
                                        </div>
                                        <button className="btn btn-secondary" onClick={() => navigateTo('auth')} style={{ padding: '8px 20px', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', width: '100%' }}>Book Session</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ===== CONTACT SECTION ===== */}
                        <div id="section-contact" className="section-container" style={{ paddingTop: '60px', scrollMarginTop: '80px', paddingBottom: '60px' }}>
                            <div className="section-header">
                                <span className="section-tag">Get in Touch</span>
                                <h2 className="section-title">We Would Love to Hear From You</h2>
                                <p className="section-subtitle">Have questions, feedback, or suggestions? Reach out anytime!</p>
                            </div>
                            <div className="contact-layout">
                                <div className="contact-info-panel">
                                    <h3>Contact Information</h3>
                                    <div className="contact-detail-item"><span className="detail-icon">&#128231;</span><div className="detail-text"><span className="label">Email Us</span><a href="mailto:tejaswiniwakure542@gmail.com">tejaswiniwakure542@gmail.com</a></div></div>
                                    <div className="contact-detail-item"><span className="detail-icon">&#127760;</span><div className="detail-text"><span className="label">GitHub Profile</span><a href="https://github.com" target="_blank" rel="noreferrer">GitHub Project Link</a></div></div>
                                    <div className="contact-detail-item"><span className="detail-icon">&#128188;</span><div className="detail-text"><span className="label">LinkedIn</span><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn Connection</a></div></div>
                                </div>
                                <div className="contact-form-panel">
                                    {!formSuccess ? (
                                        <form onSubmit={handleContactSubmit}>
                                            <div className="form-row">
                                                <div className={`form-group ${contactErrors.name ? 'invalid' : ''}`}><label>Full Name</label><input type="text" placeholder="John Doe" value={contactName} onChange={(e) => setContactName(e.target.value)} />{contactErrors.name && <span className="error-msg">{contactErrors.name}</span>}</div>
                                                <div className={`form-group ${contactErrors.email ? 'invalid' : ''}`}><label>Email Address</label><input type="email" placeholder="john@example.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />{contactErrors.email && <span className="error-msg">{contactErrors.email}</span>}</div>
                                            </div>
                                            <div className={`form-group ${contactErrors.subject ? 'invalid' : ''}`}><label>Subject</label><input type="text" placeholder="Feedback" value={contactSubject} onChange={(e) => setContactSubject(e.target.value)} />{contactErrors.subject && <span className="error-msg">{contactErrors.subject}</span>}</div>
                                            <div className={`form-group ${contactErrors.message ? 'invalid' : ''}`}><label>Message</label><textarea rows="4" placeholder="Share your thoughts..." value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}></textarea>{contactErrors.message && <span className="error-msg">{contactErrors.message}</span>}</div>
                                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '10px', fontWeight: '700' }}>Send Message</button>
                                        </form>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>&#9989;</div>
                                            <h3 style={{ color: '#16A34A', marginBottom: '8px' }}>Message Sent!</h3>
                                            <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '20px' }}>Thank you for reaching out. We will get back to you soon.</p>
                                            <button onClick={handleFeedbackReset} className="btn btn-secondary" style={{ padding: '10px 24px', borderRadius: '10px' }}>Send Another</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </section>
                )}



                {/* ================= VIEW: FEATURES ================= */}


                {/* ================= VIEW: FEATURES ================= */}
                {currentView === 'features' && (
                    <section className="app-view section-container">
                        <div className="section-header">
                            <span className="section-tag">Core Features</span>
                            <h2 className="section-title">Designed for Parental Clarity &amp; Teen Independence</h2>
                            <p className="section-subtitle">Empowering tools that bridge communication gaps while preserving private boundaries.</p>
                        </div>

                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon-wrapper"><Brain size={22} color="#2563EB" /></div>
                                <h3>MindCare Companion</h3>
                                <p>AI-powered emotional support and personalized guidance available anytime.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper"><Mic size={22} color="#2563EB" /></div>
                                <h3>Voice Companion</h3>
                                <p>Talk through your feelings naturally with interactive voice journaling.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper"><Activity size={22} color="#2563EB" /></div>
                                <h3>Mental Health Assessment</h3>
                                <p>Take scientifically validated mental wellness tests to track progress.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper"><BarChart2 size={22} color="#2563EB" /></div>
                                <h3>Personalized Wellness Profile</h3>
                                <p>A comprehensive, data-driven dashboard of your emotional journey.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper"><Users size={22} color="#2563EB" /></div>
                                <h3>Parent Support Dashboard</h3>
                                <p>Coordinated care, clinical insights, and safety nets for families.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper"><ShieldCheck size={22} color="#2563EB" /></div>
                                <h3>Privacy &amp; Security</h3>
                                <p>Clinical-grade data protection ensuring complete confidentiality.</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= VIEW: HOW IT WORKS ================= */}
                {currentView === 'how-it-works' && (
                    <section className="app-view section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px' }}>
                        <div className="section-header text-center" style={{ marginBottom: '40px' }}>
                            <span className="section-tag" style={{ background: '#F0FDF4', color: '#16A34A', padding: '4px 14px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block' }}>⚡ PERSONALIZED WELLNESS JOURNEY</span>
                            <h2 className="section-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '2rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>How MindCare Works</h2>
                            <p className="section-subtitle" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#64748B', maxWidth: '520px', margin: '0 auto', lineHeight: '1.4' }}>Follow a simple, guided wellness journey—from creating your profile and sharing your thoughts to receiving personalized insights and accessing tools that support your emotional well-being every day.</p>
                        </div>

                        {/* Interactive Timeline Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', width: '100%', maxWidth: '820px', margin: '0 auto 40px auto', position: 'relative' }}>
                            {/* Connector line behind steps */}
                            <div style={{ position: 'absolute', top: '16px', left: '10%', right: '10%', height: '2px', background: '#E2E8F0', zIndex: 0 }}></div>

                            {[
                                { step: '1', title: 'Create Account', desc: 'Register securely in seconds.' },
                                { step: '2', title: 'Choose Portal', desc: 'Tailored interface for you.' },
                                { step: '3', title: 'Wellness Session', desc: 'Guided interactive onboarding.' },
                                { step: '4', title: 'Wellness Profile', desc: 'Your comprehensive health index.' },
                                { step: '5', title: 'Access Dashboard', desc: 'Emotional support and tracking.' }
                            ].map((item, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1 }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifycontent: 'center', fontWeight: '700', fontSize: '0.85rem', border: '2px solid #3B82F6', marginBottom: '12px', justifyContent: 'center' }}>
                                        {item.step}
                                    </div>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: '1.4' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= VIEW: ABOUT ================= */}
                {currentView === 'about' && (
                    <section className="app-view section-container">
                        <div className="section-header">
                            <span className="section-tag">Our Identity</span>
                            <h2 className="section-title">Empowering Family Mental Wellness</h2>
                            <p className="section-subtitle">Combining clinical foundations with interactive, privacy-first technology.</p>
                        </div>

                        {/* Redesigned 2-Column layout for About Us */}
                        <div className="about-content-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', alignItems: 'start' }}>
                            {/* Column 1: Core Principles */}
                            <div className="about-main-card" style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '10px' }}>Bridging Communication Gaps</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '12px', lineHeight: '1.55' }}>
                                    At MindBridge, we construct a secure, supportive digital space where teens, parents, and adolescent therapists connect and work in alignment. 
                                </p>
                                <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '20px', lineHeight: '1.55' }}>
                                    We believe emotional awareness and early intervention shouldn't feel like surveillance. Our system uses advanced, clinical-grade check-ins to build healthy communications.
                                </p>

                                <ul className="group-list" style={{ gap: '10px', listStyle: 'none', paddingLeft: '0' }}>
                                    <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                                        <div>
                                            <strong>End-to-End Privacy:</strong> Teenagers express themselves without parental monitoring.
                                        </div>
                                    </li>
                                    <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                                        <div>
                                            <strong>Evidence-Based Prompts:</strong> Guided coping skills parsed dynamically by our journal model.
                                        </div>
                                    </li>
                                    <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                                        <div>
                                            <strong>Integrated Safety Net:</strong> Instant counselor routing when elevated distress signals are tracked.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2: Mission & Stats Infographic */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div className="about-card" style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>👁️</div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-dark)', margin: 0 }}>Our Vision</h3>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
                                        Fostering a world where everyone enjoys instant, destigmatized access to mental wellness support, strengthening family connections and community wellbeing.
                                    </p>
                                </div>

                                <div className="about-card" style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>🎯</div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-dark)', margin: 0 }}>Our Mission</h3>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
                                        Delivering innovative, AI-powered emotional wellness tracking tools that encourage self-reflection, facilitate early detection, and seamlessly bridge clinical care.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}



                {/* ================= VIEW: FAQS ================= */}
                {currentView === 'faqs' && (
                    <section className="app-view section-container">
                        <div className="section-header">
                            <span className="section-tag">FAQ</span>
                            <h2 className="section-title">Frequently Asked Questions</h2>
                        </div>

                        <div className="faq-accordion">
                            {[
                                { q: "What is this platform?", a: "MindBridge is a secure, AI-powered mental wellness ecosystem designed specifically for parents and teenagers. It fosters open communication, tracks mood trends, and provides interactive coping skills while fully respecting and preserving teenager privacy boundaries." },
                                { q: "How does the AI Mental Health Assistant work?", a: "Our AI Companion Journal utilizes advanced, clinical-grade natural language models to parse reflective journal entries. It does not diagnose clinical diseases but highlights healthy communication paths, suggestions, and coping tools for stress and anxiety." },
                                { q: "Is my personal data secure and private?", a: "Yes. All journals and mood records are protected with industry-standard end-to-end encryption. Teenagers' writings remain strictly private. Parents only see aggregated, high-level wellness summaries and safety alert notifications if distress thresholds are met." },
                                { q: "Can parents monitor their teenager's well-being?", a: "Parents access a specialized dashboard showing high-level aggregates (e.g., sleep patterns, average mood indexes, and meditation streak durations) rather than reading daily diaries directly. This builds functional trust and bridges communication gaps." },
                                { q: "How can I book a therapist consultation?", a: "Through our Therapist Support portal, parents or teens can browse list directories of licensed adolescent counselors, schedule direct sessions, and securely grant temporary access to wellness reports with encryption keys." },
                                { q: "Is this platform free to use?", a: "MindBridge offers a 14-day free trial containing full access to both teenager and parent dashboards. Following the trial, families can select transparent pricing tiers or connect through partnered educational or community organizations." }
                            ].map((faq, index) => {
                                const isOpen = faqOpenIndex === index;
                                return (
                                    <div key={index} className={`faq-item ${isOpen ? 'active-faq' : ''}`}>
                                        <button className="faq-question" onClick={() => setFaqOpenIndex(isOpen ? null : index)}>
                                            <span>{faq.q}</span>
                                            <span style={{ fontSize: '1.2rem', transform: isOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: '0.3s' }}>▼</span>
                                        </button>
                                        <div className="faq-answer" style={{ maxHeight: isOpen ? '200px' : '0' }}>
                                            <div className="faq-answer-inner">
                                                <p>{faq.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ================= VIEW: CONTACT ================= */}
                {currentView === 'contact' && (
                    <section className="app-view section-container">
                        <div className="section-header">
                            <span className="section-tag">Get in Touch</span>
                            <h2 className="section-title">We'd Love to Hear From You</h2>
                            <p className="contact-top-msg">Have questions, feedback, or suggestions? We'd love to hear from you. Feel free to reach out anytime!</p>
                        </div>

                        <div className="contact-layout">
                            <div className="contact-info-panel">
                                <h3>Contact Information</h3>
                                <div className="contact-detail-item">
                                    <span className="detail-icon">📧</span>
                                    <div className="detail-text">
                                        <span className="label">Email Us</span>
                                        <a href="mailto:tejaswiniwakure542@gmail.com">tejaswiniwakure542@gmail.com</a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <span className="detail-icon">🌐</span>
                                    <div className="detail-text">
                                        <span className="label">GitHub Profile</span>
                                        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub Project Link</a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <span class="detail-icon">💼</span>
                                    <div className="detail-text">
                                        <span class="label">LinkedIn</span>
                                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn Connection</a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form-panel">
                                {!formSuccess ? (
                                    <form onSubmit={handleContactSubmit}>
                                        <div className="form-row">
                                            <div className={`form-group ${contactErrors.name ? 'invalid' : ''}`}>
                                                <label>Full Name</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="John Doe"
                                                    value={contactName}
                                                    onChange={(e) => setContactName(e.target.value)}
                                                />
                                                {contactErrors.name && <span className="error-msg">{contactErrors.name}</span>}
                                            </div>
                                            <div className={`form-group ${contactErrors.email ? 'invalid' : ''}`}>
                                                <label>Email Address</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="john@example.com"
                                                    value={contactEmail}
                                                    onChange={(e) => setContactEmail(e.target.value)}
                                                />
                                                {contactErrors.email && <span className="error-msg">{contactErrors.email}</span>}
                                            </div>
                                        </div>

                                        <div className={`form-group ${contactErrors.subject ? 'invalid' : ''}`}>
                                            <label>Subject</label>
                                            <input 
                                                type="text" 
                                                placeholder="Feedback"
                                                value={contactSubject}
                                                onChange={(e) => setContactSubject(e.target.value)}
                                            />
                                            {contactErrors.subject && <span className="error-msg">{contactErrors.subject}</span>}
                                        </div>

                                        <div className={`form-group ${contactErrors.message ? 'invalid' : ''}`}>
                                            <label>Message / Feedback</label>
                                            <textarea 
                                                rows="4" 
                                                placeholder="Share your thoughts..."
                                                value={contactMessage}
                                                onChange={(e) => setContactMessage(e.target.value)}
                                            ></textarea>
                                            {contactErrors.message && <span className="error-msg">{contactErrors.message}</span>}
                                        </div>

                                        <div className={`form-group ${contactErrors.rating ? 'invalid' : ''}`}>
                                            <label>Overall Rating</label>
                                            <div className="star-rating-container">
                                                <div className="star-rating" onMouseLeave={() => setHoverRating(0)}>
                                                    {[1, 2, 3, 4, 5].map(val => (
                                                        <button
                                                            key={val}
                                                            type="button"
                                                            className={`star-btn ${
                                                                (hoverRating || contactRating) >= val ? 'selected' : ''
                                                            }`}
                                                            onMouseEnter={() => setHoverRating(val)}
                                                            onClick={() => setContactRating(val)}
                                                        >
                                                            ★
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="rating-label">
                                                    {contactRating > 0 ? `Selected: ${contactRating} Stars` : 'Select a rating'}
                                                </span>
                                            </div>
                                            {contactErrors.rating && <span className="error-msg">{contactErrors.rating}</span>}
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                                    </form>
                                ) : (
                                    <div className="form-success-card">
                                        <div className="success-icon">✓</div>
                                        <h3>Thank You!</h3>
                                        <p>Thank you for contacting us! We appreciate your feedback and will get back to you as soon as possible.</p>
                                        <button className="btn btn-secondary mt-4" onClick={handleFeedbackReset}>Send Another Message</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= VIEW: AUTH ================= */}
                {currentView === 'auth' && (
                    <section className="app-view auth-wrapper">
                        <div className="auth-card">
                            <div className="auth-tabs">
                                <button 
                                    className={`auth-tab-btn ${authTab === 'login' ? 'active' : ''}`}
                                    onClick={() => setAuthTab('login')}
                                >
                                    Login
                                </button>
                                <button 
                                    className={`auth-tab-btn ${authTab === 'signup' ? 'active' : ''}`}
                                    onClick={() => setAuthTab('signup')}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {authError && <div className="auth-error-alert">{authError}</div>}

                            <form onSubmit={handleAuthSubmit}>
                                <h2>{authTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                                <p className="auth-sub">
                                    {authTab === 'login' ? 'Enter credentials to access your dashboard' : 'Setup secure, E2E portals for family care'}
                                </p>

                                {authTab === 'signup' && (
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John Doe" 
                                            value={authName}
                                            onChange={(e) => setAuthName(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="you@example.com" 
                                        value={authEmail}
                                        onChange={(e) => setAuthEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={authPassword}
                                        onChange={(e) => setAuthPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">
                                    {authTab === 'login' ? 'Log In' : 'Sign Up'}
                                </button>
                            </form>
                        </div>
                    </section>
                )}

                {/* ================= VIEW: SELECT WORKSPACE ================= */}
                {currentView === 'role' && (
                    <section className="app-view section-container">
                        <div className="section-header text-center">
                            <span className="section-tag" style={{ background: '#EFF6FF', color: '#2563EB', padding: '4px 14px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block' }}>⚡ FEELFREE WORKSPACES</span>
                            <h2 className="section-title">Select Your Workspace</h2>
                            <p className="section-subtitle">Select the portal that best matches your role to continue securely.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', maxWidth: '760px', margin: '0 auto' }}>

                            {/* Child Portal Card */}
                            <div className="role-card-premium">
                                <div style={{ width: '100%' }}>
                                    <div className="role-icon-group">
                                        <div className="role-icon-wrapper-circle">
                                            <UserRound size={22} />
                                        </div>
                                        <div className="role-icon-wrapper-circle">
                                            <Brain size={22} />
                                        </div>
                                        <div className="role-icon-wrapper-circle">
                                            <Sparkles size={22} />
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px', textAlign: 'center' }}>Child Portal</h3>
                                    <div style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>
                                        <span style={{ display: 'inline-block', background: '#EFF6FF', color: '#2563EB', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '50px' }}>Ages 13 – 30</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' }}>
                                        Track your mood, log reflections, take science-backed checks, chat with an AI companion, and build healthy daily habits.
                                    </p>
                                </div>
                                <div style={{ width: '100%' }}>
                                    {createdRoles.includes('teen') ? (
                                        <button className="btn btn-primary" style={{ width: '100%', borderRadius: '100px' }} onClick={() => { setActiveRole('teen'); navigateTo('portal-teen'); }}>Enter Portal →</button>
                                    ) : (
                                        <button className="btn btn-primary" style={{ width: '100%', borderRadius: '100px' }} onClick={() => {
                                            setActiveRole('teen');
                                            if (sessionCompleted) { navigateTo('portal-teen'); }
                                            else { setFfStep(0); setFfStepVisible(true); navigateTo('onboarding-teen'); }
                                        }}>Get Started →</button>
                                    )}
                                </div>
                            </div>

                            {/* Parent Portal Card */}
                            <div className="role-card-premium">
                                <div style={{ width: '100%' }}>
                                    <div className="role-icon-group">
                                        <div className="role-icon-wrapper-circle">
                                            <Users size={22} />
                                        </div>
                                        <div className="role-icon-wrapper-circle">
                                            <ShieldCheck size={22} />
                                        </div>
                                        <div className="role-icon-wrapper-circle">
                                            <HeartHandshake size={22} />
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px', textAlign: 'center' }}>Parent Portal</h3>
                                    <div style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>
                                        <span style={{ display: 'inline-block', background: '#F0FDF4', color: '#059669', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '50px' }}>Ages 30+</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' }}>
                                        Check wellness trend charts, secure connection status, and explore clinical parenting guidelines in a dedicated family dashboard.
                                    </p>
                                </div>
                                <div style={{ width: '100%' }}>
                                    {createdRoles.includes('parent') ? (
                                        <button className="btn btn-primary" style={{ width: '100%', borderRadius: '100px' }} onClick={() => { setActiveRole('parent'); navigateTo('portal-parent'); }}>Enter Portal →</button>
                                    ) : (
                                        <button className="btn btn-primary" style={{ width: '100%', borderRadius: '100px' }} onClick={() => { setActiveRole('parent'); navigateTo('portal-parent'); }}>Get Started →</button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </section>
                )}


                {/* ================= ONBOARDING: TEEN ================= */}
                {currentView === 'onboarding-teen' && (() => {
                    const FF_STEPS = [
                        { tag: 'STEP 1 OF 6', title: 'Your Basic Profile', desc: 'Help us personalise your journey.' },
                        { tag: 'STEP 2 OF 6', title: 'How Are You Feeling?', desc: 'Share your current emotional state.' },
                        { tag: 'STEP 3 OF 6', title: 'Daily Habits & Lifestyle', desc: 'Tell us about your daily routine.' },
                        { tag: 'STEP 4 OF 6', title: 'AI Companion Chat', desc: 'Have a short conversation with your MindCare companion.' },
                        { tag: 'STEP 5 OF 6', title: 'Wellness Assessment', desc: 'Answer a quick mental wellness check.' },
                        { tag: 'STEP 6 OF 6', title: 'Your Wellness Profile', desc: 'Review your personalised profile.' },
                    ];
                    const MOODS = ['😊 Happy','😌 Calm','😴 Tired','😰 Anxious','😢 Sad','😡 Frustrated'];
                    const ACTIVITIES = ['Reading','Music','Sports','Art','Gaming','Cooking','Nature walks','Journaling'];
                    const ASSESS_Q = [
                        'Feeling nervous, anxious, or on edge?',
                        'Not being able to stop worrying?',
                        'Feeling down, depressed, or hopeless?',
                        'Trouble falling or staying asleep?',
                        'Feeling tired or having little energy?'
                    ];

                    const goToStep = (next) => {
                        setFfStepVisible(false);
                        setTimeout(() => { setFfStep(next); setFfStepVisible(true); }, 300);
                    };

                    const handleFfAiSend = () => {
                        if (!ffAiInput.trim()) return;
                        const userMsg = { sender: 'user', text: ffAiInput };
                        setFfAiMessages(prev => [...prev, userMsg]);
                        setFfAiInput('');
                        setTimeout(() => {
                            const replies = [
                                "That's really helpful to know! 💙 Remember, your feelings are completely valid.",
                                "Thank you for sharing that with me. I'm always here to listen and support you! 🌿",
                                "I hear you. Let's work together on your wellness journey step by step. 🌟",
                            ];
                            setFfAiMessages(prev => [...prev, { sender: 'bot', text: replies[Math.floor(Math.random()*replies.length)] }]);
                        }, 900);
                    };

                    const handleCompleteSession = () => {
                        const score = Math.round(70 + (Object.values(ffAssessAnswers).reduce((a,b)=>a+b,0) / 15) * -20 + Math.random()*10);
                        const clamped = Math.max(40, Math.min(95, score));
                        setFfWellnessScore(clamped);
                        const date = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
                        setFfCompletedDate(date);
                        try { localStorage.setItem('mc_session_done', 'true'); localStorage.setItem('mc_wellness_score', clamped); } catch(e){}
                        setSessionCompleted(true);
                        goToStep(7);
                    };

                    const stepFill = ffStep === 0 ? 0 : Math.round(((ffStep) / 6) * 100);

                    // STEP 7: Session Complete card
                    if (ffStep === 7) return (
                        <section style={{ minHeight:'100vh', background:'linear-gradient(135deg,#F8FAFC,#EFF6FF)', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', fontFamily:"'Inter',sans-serif" }}>
                            <div style={{ background:'#fff', borderRadius:'28px', padding:'48px 40px', maxWidth:'520px', width:'100%', border:'1px solid #E2E8F0', boxShadow:'0 12px 40px rgba(15,23,42,0.06)', textAlign:'center' }}>
                                <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#10B981,#059669)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'2rem' }}>✓</div>
                                <span style={{ display:'inline-block', background:'#F0FDF4', color:'#16A34A', fontSize:'0.72rem', fontWeight:'800', padding:'4px 14px', borderRadius:'50px', letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:'12px' }}>SESSION COMPLETED</span>
                                <h2 style={{ fontFamily:"'Lora',serif", fontSize:'1.8rem', fontWeight:'700', color:'#0F172A', margin:'0 0 8px' }}>Your Wellness Profile is Ready!</h2>
                                <p style={{ fontSize:'0.88rem', color:'#64748B', marginBottom:'28px', lineHeight:'1.6' }}>Completed on {ffCompletedDate}. Your personalised MindCare dashboard is now active.</p>
                                <div style={{ background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'16px', padding:'20px', marginBottom:'28px' }}>
                                    <div style={{ fontSize:'0.75rem', color:'#64748B', fontWeight:'700', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Overall Wellness Score</div>
                                    <div style={{ fontSize:'3.5rem', fontWeight:'900', color: ffWellnessScore >= 70 ? '#10B981' : ffWellnessScore >= 50 ? '#F59E0B' : '#EF4444', lineHeight:1 }}>{ffWellnessScore}<span style={{ fontSize:'1.2rem', color:'#94A3B8' }}>/100</span></div>
                                    <div style={{ fontSize:'0.8rem', color:'#64748B', marginTop:'6px' }}>{ffWellnessScore >= 70 ? '🌟 Good — Keep going!' : ffWellnessScore >= 50 ? '💛 Fair — Let us improve together' : '💙 Needs attention — We are here for you'}</div>
                                </div>
                                <div style={{ display:'flex', gap:'12px' }}>
                                    <button className="btn btn-primary" style={{ flex:1 }} onClick={() => navigateTo('portal-teen')}>Go to Dashboard →</button>
                                    <button className="btn btn-secondary" style={{ flex:1 }} onClick={() => { goToStep(5); }}>Start Reassessment</button>
                                </div>
                            </div>
                        </section>
                    );

                    return (
                        <section style={{ minHeight:'100vh', background:'linear-gradient(135deg,#F8FAFC 0%,#EFF6FF 50%,#F0FDF4 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', fontFamily:"'Inter',sans-serif" }}>
                            {/* WELCOME SCREEN */}
                            {ffStep === 0 ? (
                                <div style={{ background:'#fff', borderRadius:'28px', padding:'56px 44px', maxWidth:'560px', width:'100%', border:'1px solid #E2E8F0', boxShadow:'0 12px 40px rgba(15,23,42,0.05)', textAlign:'center' }}>
                                    <div style={{ width:'72px', height:'72px', borderRadius:'20px', background:'linear-gradient(135deg,#10B981,#059669)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', fontWeight:'900', color:'#fff', margin:'0 auto 24px', boxShadow:'0 8px 30px rgba(16,185,129,0.3)' }}>M</div>
                                    <h1 style={{ fontFamily:"'Lora',serif", fontSize:'2rem', fontWeight:'700', color:'#0F172A', margin:'0 0 10px' }}>Welcome to MindCare</h1>
                                    <p style={{ fontStyle:'italic', color:'#64748B', fontSize:'1rem', marginBottom:'6px' }}>"Your wellness journey starts here"</p>
                                    <p style={{ color:'#94A3B8', fontSize:'0.84rem', marginBottom:'20px' }}>A safe, private space designed just for you.</p>
                                    <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#F1F5F9', padding:'8px 18px', borderRadius:'50px', fontSize:'0.82rem', color:'#475569', fontWeight:'600', marginBottom:'32px' }}>⏱ Takes about 5 minutes</div>
                                    <br/>
                                    <button style={{ padding:'14px 48px', borderRadius:'14px', border:'none', background:'linear-gradient(135deg,#10B981,#059669)', color:'#fff', fontSize:'1rem', fontWeight:'700', cursor:'pointer', boxShadow:'0 4px 20px rgba(16,185,129,0.3)', fontFamily:"'Inter',sans-serif" }} onClick={() => goToStep(1)}>Begin Your Session →</button>
                                </div>
                            ) : (
                                <div style={{ background:'#fff', borderRadius:'28px', padding:'36px 40px', maxWidth:'780px', width:'100%', border:'1px solid #E2E8F0', boxShadow:'0 12px 40px rgba(15,23,42,0.04)' }}>

                                    {/* STEPPER */}
                                    <div style={{ background:'#0F172A', borderRadius:'16px', padding:'20px 24px', marginBottom:'32px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' }}>
                                        <div style={{ position:'absolute', top:'30px', left:'60px', right:'60px', height:'2px', background:'#1E293B', zIndex:1 }}></div>
                                        <div style={{ position:'absolute', top:'30px', left:'60px', width:`${stepFill}%`, maxWidth:'calc(100% - 120px)', height:'2px', background:'linear-gradient(90deg,#10B981,#34D399)', zIndex:2, transition:'width 0.5s ease', boxShadow:'0 0 8px rgba(16,185,129,0.4)' }}></div>
                                        {FF_STEPS.map((s, i) => (
                                            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:3 }}>
                                                <div style={{ width:'38px', height:'38px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize:'0.78rem', border: i < ffStep ? 'none' : i === ffStep-1 ? '2.5px solid #10B981' : '2px solid #334155', background: i < ffStep ? '#10B981' : i === ffStep-1 ? '#020617' : '#1E293B', color: i < ffStep ? '#fff' : i === ffStep-1 ? '#10B981' : '#64748B', transition:'all 0.4s ease', boxShadow: i === ffStep-1 ? '0 0 20px rgba(16,185,129,0.35)' : 'none' }}>
                                                    {i < ffStep-1 ? '✓' : i+1}
                                                </div>
                                                <div style={{ marginTop:'8px', fontSize:'0.6rem', fontWeight: i===ffStep-1?'800':'600', color: i<ffStep?'#94A3B8': i===ffStep-1?'#10B981':'#475569', letterSpacing:'0.02em', textAlign:'center', maxWidth:'60px' }}>{['Profile','Mood','Habits','AI Chat','Assessment','Profile'][i]}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* STEP CONTENT */}
                                    <div style={{ opacity: ffStepVisible?1:0, transform: ffStepVisible?'translateX(0)':'translateX(30px)', transition:'all 0.3s ease', minHeight:'320px', display:'flex', flexDirection:'column' }}>
                                        <div style={{ marginBottom:'20px' }}>
                                            <span style={{ fontSize:'0.72rem', color:'#2563EB', fontWeight:'800', letterSpacing:'0.06em', textTransform:'uppercase' }}>{FF_STEPS[ffStep-1]?.tag}</span>
                                            <h2 style={{ fontFamily:"'Lora',serif", fontSize:'1.3rem', color:'#0F172A', margin:'6px 0 4px', fontWeight:'600' }}>{FF_STEPS[ffStep-1]?.title}</h2>
                                            <p style={{ fontSize:'0.82rem', color:'#64748B', margin:0 }}>{FF_STEPS[ffStep-1]?.desc}</p>
                                        </div>

                                        {/* STEP 1: Basic Profile */}
                                        {ffStep === 1 && (
                                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', flex:1 }}>
                                                <div style={{ display:'flex', flexDirection:'column' }}>
                                                    <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', marginBottom:'6px' }}>Full Name</label>
                                                    <input value={ffProfile.name} onChange={e=>setFfProfile(p=>({...p,name:e.target.value}))} placeholder="Your name" style={{ padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.85rem', fontFamily:"'Inter',sans-serif" }} />
                                                </div>
                                                <div style={{ display:'flex', flexDirection:'column' }}>
                                                    <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', marginBottom:'6px' }}>Age</label>
                                                    <input value={ffProfile.age} onChange={e=>setFfProfile(p=>({...p,age:e.target.value}))} placeholder="e.g. 16" type="number" style={{ padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.85rem', fontFamily:"'Inter',sans-serif" }} />
                                                </div>
                                                <div style={{ display:'flex', flexDirection:'column' }}>
                                                    <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', marginBottom:'6px' }}>Gender</label>
                                                    <select value={ffProfile.gender} onChange={e=>setFfProfile(p=>({...p,gender:e.target.value}))} style={{ padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.85rem', background:'#fff', fontFamily:"'Inter',sans-serif" }}>
                                                        <option value="">Select</option>
                                                        <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                                                    </select>
                                                </div>
                                                <div style={{ display:'flex', flexDirection:'column' }}>
                                                    <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', marginBottom:'6px' }}>School / College</label>
                                                    <input value={ffProfile.school} onChange={e=>setFfProfile(p=>({...p,school:e.target.value}))} placeholder="Your institution" style={{ padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.85rem', fontFamily:"'Inter',sans-serif" }} />
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2: Mood Check */}
                                        {ffStep === 2 && (
                                            <div style={{ flex:1 }}>
                                                <p style={{ fontSize:'0.85rem', color:'#64748B', marginBottom:'16px' }}>Select the emoji that best describes how you feel right now:</p>
                                                <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'20px' }}>
                                                    {MOODS.map(m => (
                                                        <button key={m} onClick={()=>setFfMood(m)} style={{ padding:'10px 18px', borderRadius:'50px', border: ffMood===m?'2px solid #2563EB':'1.5px solid #E2E8F0', background: ffMood===m?'#2563EB':'#fff', color: ffMood===m?'#fff':'#64748B', fontSize:'0.88rem', fontWeight:'600', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s' }}>{m}</button>
                                                    ))}
                                                </div>
                                                <div style={{ background:'#F8FAFC', borderRadius:'12px', padding:'16px', border:'1px solid #E2E8F0' }}>
                                                    <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', display:'block', marginBottom:'8px' }}>Stress level today (1 = Low, 5 = High)</label>
                                                    <div style={{ display:'flex', gap:'10px' }}>
                                                        {[1,2,3,4,5].map(n => (
                                                            <button key={n} onClick={()=>setFfStressLevel(n)} style={{ width:'40px', height:'40px', borderRadius:'50%', border: ffStressLevel===n?'2px solid #2563EB':'1.5px solid #E2E8F0', background: ffStressLevel===n?'#2563EB':'#fff', color: ffStressLevel===n?'#fff':'#475569', fontWeight:'700', cursor:'pointer', fontSize:'0.9rem' }}>{n}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3: Daily Habits */}
                                        {ffStep === 3 && (
                                            <div style={{ flex:1 }}>
                                                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
                                                    <div>
                                                        <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', display:'block', marginBottom:'6px' }}>Hours of sleep last night</label>
                                                        <select value={ffSleepHours} onChange={e=>setFfSleepHours(e.target.value)} style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.85rem', background:'#fff', fontFamily:"'Inter',sans-serif" }}>
                                                            <option value="">Select</option>
                                                            {['Less than 4','4–5 hrs','6–7 hrs','8+ hrs'].map(o=><option key={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', display:'block', marginBottom:'6px' }}>Do you exercise regularly?</label>
                                                        <select value={ffExercise} onChange={e=>setFfExercise(e.target.value)} style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.85rem', background:'#fff', fontFamily:"'Inter',sans-serif" }}>
                                                            <option value="">Select</option>
                                                            {['Daily','3–4x/week','1–2x/week','Rarely','Never'].map(o=><option key={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <label style={{ fontSize:'0.78rem', fontWeight:'600', color:'#475569', display:'block', marginBottom:'8px' }}>Activities you enjoy (select all that apply)</label>
                                                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                                                    {ACTIVITIES.map(a => (
                                                        <button key={a} onClick={()=>setFfEnjoyActivities(prev=>prev.includes(a)?prev.filter(x=>x!==a):[...prev,a])} style={{ padding:'8px 16px', borderRadius:'50px', border: ffEnjoyActivities.includes(a)?'2px solid #2563EB':'1.5px solid #E2E8F0', background: ffEnjoyActivities.includes(a)?'#2563EB':'#fff', color: ffEnjoyActivities.includes(a)?'#fff':'#64748B', fontSize:'0.78rem', fontWeight:'600', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s' }}>{a}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 4: AI Companion Chat */}
                                        {ffStep === 4 && (
                                            <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
                                                <div style={{ border:'1.5px solid #E2E8F0', borderRadius:'16px', background:'#F8FAFC', display:'flex', flexDirection:'column', height:'260px', overflow:'hidden' }}>
                                                    <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:'12px' }}>
                                                        {ffAiMessages.map((m, i) => (
                                                            <div key={i} style={{ maxWidth:'80%', alignSelf: m.sender==='bot'?'flex-start':'flex-end', background: m.sender==='bot'?'#fff':'#2563EB', color: m.sender==='bot'?'#0F172A':'#fff', padding:'10px 14px', borderRadius: m.sender==='bot'?'4px 16px 16px 16px':'16px 4px 16px 16px', fontSize:'0.84rem', lineHeight:'1.5', border: m.sender==='bot'?'1px solid #E2E8F0':'none', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>{m.text}</div>
                                                        ))}
                                                    </div>
                                                    <div style={{ padding:'12px 16px', borderTop:'1px solid #E2E8F0', display:'flex', gap:'8px' }}>
                                                        <input value={ffAiInput} onChange={e=>setFfAiInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleFfAiSend()} placeholder="Type a message..." style={{ flex:1, padding:'8px 14px', borderRadius:'50px', border:'1.5px solid #E2E8F0', outline:'none', fontSize:'0.84rem', fontFamily:"'Inter',sans-serif" }} />
                                                        <button onClick={handleFfAiSend} style={{ padding:'8px 18px', borderRadius:'50px', border:'none', background:'#2563EB', color:'#fff', fontWeight:'700', cursor:'pointer', fontSize:'0.84rem' }}>Send</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 5: Wellness Assessment */}
                                        {ffStep === 5 && (
                                            <div style={{ flex:1 }}>
                                                <p style={{ fontSize:'0.82rem', color:'#64748B', marginBottom:'16px' }}>Rate each statement: 0 = Not at all &nbsp; 1 = Several days &nbsp; 2 = More than half &nbsp; 3 = Nearly every day</p>
                                                <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                                                    {ASSESS_Q.map((q, qi) => (
                                                        <div key={qi} style={{ background:'#F8FAFC', border:'1.5px solid #E2E8F0', borderRadius:'12px', padding:'14px 16px' }}>
                                                            <p style={{ fontSize:'0.85rem', fontWeight:'600', color:'#0F172A', margin:'0 0 10px' }}>{q}</p>
                                                            <div style={{ display:'flex', gap:'8px' }}>
                                                                {[0,1,2,3].map(v => (
                                                                    <button key={v} onClick={()=>setFfAssessAnswers(prev=>({...prev,[qi]:v}))} style={{ padding:'6px 14px', borderRadius:'50px', border: ffAssessAnswers[qi]===v?'2px solid #2563EB':'1.5px solid #E2E8F0', background: ffAssessAnswers[qi]===v?'#2563EB':'#fff', color: ffAssessAnswers[qi]===v?'#fff':'#64748B', fontSize:'0.78rem', fontWeight:'600', cursor:'pointer' }}>{v}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 6: Review Profile */}
                                        {ffStep === 6 && (
                                            <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                                                {[
                                                    { label:'Name', value: ffProfile.name || '—' },
                                                    { label:'Age', value: ffProfile.age || '—' },
                                                    { label:'Gender', value: ffProfile.gender || '—' },
                                                    { label:'School', value: ffProfile.school || '—' },
                                                    { label:'Mood Today', value: ffMood || '—' },
                                                    { label:'Stress Level', value: ffStressLevel ? `${ffStressLevel}/5` : '—' },
                                                    { label:'Sleep Hours', value: ffSleepHours || '—' },
                                                    { label:'Exercise', value: ffExercise || '—' },
                                                ].map(item => (
                                                    <div key={item.label} style={{ background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'12px', padding:'12px 16px' }}>
                                                        <div style={{ fontSize:'0.72rem', color:'#94A3B8', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:'4px' }}>{item.label}</div>
                                                        <div style={{ fontSize:'0.9rem', fontWeight:'700', color:'#0F172A' }}>{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* NAV BUTTONS */}
                                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:'28px', paddingTop:'20px', borderTop:'1px solid #F1F5F9' }}>
                                        <button onClick={() => goToStep(Math.max(1, ffStep-1))} style={{ padding:'10px 24px', borderRadius:'10px', border:'1.5px solid #E2E8F0', background:'#fff', color:'#475569', fontWeight:'600', cursor:'pointer', fontSize:'0.88rem' }} disabled={ffStep===1}>← Back</button>
                                        {ffStep < 6 ? (
                                            <button onClick={() => goToStep(ffStep+1)} style={{ padding:'10px 28px', borderRadius:'10px', border:'none', background:'linear-gradient(135deg,#2563EB,#1D4ED8)', color:'#fff', fontWeight:'700', cursor:'pointer', fontSize:'0.88rem' }}>Continue →</button>
                                        ) : (
                                            <button onClick={handleCompleteSession} style={{ padding:'10px 28px', borderRadius:'10px', border:'none', background:'linear-gradient(135deg,#10B981,#059669)', color:'#fff', fontWeight:'700', cursor:'pointer', fontSize:'0.88rem', boxShadow:'0 4px 16px rgba(16,185,129,0.3)' }}>Generate My Wellness Profile ✓</button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </section>
                    );
                })()}




                {/* ================= ONBOARDING: PARENT ================= */}
                {currentView === 'onboarding-parent' && (
                    <section className="onboarding-wrapper">
                        <div className="onboarding-card" style={{ maxWidth: '780px' }}>
                            <div className="onboarding-columns-grid">
                                <div>
                                    <h2 style={{ textAlign: 'left', fontSize: '1.5rem', marginBottom: '4px' }}>Welcome! Connect with your child securely. 👨‍👩‍👧</h2>
                                    <p className="onboarding-sub" style={{ textAlign: 'left', marginBottom: '20px', fontSize: '0.85rem' }}>Help us create a secure environment for you and your child.</p>
                                    
                                    {/* Validation Errors */}
                                    {Object.keys(onboardingErrors).length > 0 && (
                                        <div className="onboarding-error-box">
                                            <ul>
                                                {Object.values(onboardingErrors).map((err, i) => <li key={i}>• {err}</li>)}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Parent request feedback message */}
                                    {parentRequestSent && (
                                        <div style={{ background: '#EFF6FF', borderLeft: '3px solid var(--color-primary)', padding: '12px', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
                                            ✓ Connection request sent! Your teen will receive a secure email approval alert on their dashboard.
                                        </div>
                                    )}

                                    <div className="avatar-selector-container">
                                        <span className="avatar-selector-label" style={{ fontSize: '0.82rem' }}>Profile Picture (Optional)</span>
                                        <div className="avatar-grid" style={{ gap: '8px', marginBottom: '16px' }}>
                                            {['👨‍👩‍👧', '👨', '👩', '👴', '👵'].map(av => (
                                                <button 
                                                    key={av} 
                                                    type="button" 
                                                    className={`avatar-btn ${parentForm.profilePic === av ? 'selected' : ''}`}
                                                    onClick={() => setParentForm(prev => ({ ...prev, profilePic: av }))}
                                                    style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
                                                >
                                                    {av}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Sarah Carter" 
                                            value={parentForm.fullName}
                                            onChange={(e) => setParentForm(prev => ({ ...prev, fullName: e.target.value }))}
                                            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Relationship</label>
                                        <select 
                                            value={parentForm.relationship} 
                                            onChange={(e) => setParentForm(prev => ({ ...prev, relationship: e.target.value }))}
                                            style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem', color: 'var(--color-dark)', outline: 'none', height: '38px' }}
                                        >
                                            <option value="Mother">Mother</option>
                                            <option value="Father">Father</option>
                                            <option value="Guardian">Guardian</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label style={{ fontSize: '0.8rem' }}>Family Code</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. MB-8X7P-K2L9" 
                                                value={parentForm.familyCode}
                                                onChange={(e) => setParentForm(prev => ({ ...prev, familyCode: e.target.value }))}
                                                style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                            />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label style={{ fontSize: '0.8rem' }}>Or Child's Email</label>
                                            <input 
                                                type="email" 
                                                placeholder="teen@example.com" 
                                                value={parentForm.childEmail || ''}
                                                onChange={(e) => setParentForm(prev => ({ ...prev, childEmail: e.target.value }))}
                                                style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setParentRequestSent(true)}
                                            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                                        >
                                            🔗 Send Connection Request
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleParentQuickFinish}>Finish &amp; Continue</button>
                                        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigateTo('portal-parent')}>Skip for Now</button>
                                    </div>
                                </div>

                                {/* Privacy Info Card */}
                                <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>🔒</span>
                                        <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0 }}>Clinical Safety Shield</h3>
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text)', lineHeight: '1.45', marginBottom: '14px' }}>
                                        To maintain absolute clinical efficacy, data limits are set. You will view high-level wellness aggregates and safety nets only.
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ color: '#EF4444' }}>❌</span> No Private Journals
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ color: '#EF4444' }}>❌</span> No AI Chat Transcripts
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ color: '#EF4444' }}>❌</span> No Personal Notes
                                        </div>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '16px', paddingTop: '12px', fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
                                        Teenagers must approve the Family Code connection request before wellness summaries display in this dashboard.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= ONBOARDING: THERAPIST ================= */}
                {currentView === 'onboarding-therapist' && (
                    <section className="onboarding-wrapper">
                        <div className="onboarding-card" style={{ maxWidth: '780px' }}>
                            <div className="onboarding-columns-grid">
                                <div>
                                    <h2 style={{ textAlign: 'left', fontSize: '1.5rem', marginBottom: '4px' }}>Welcome! 👩‍⚕️</h2>
                                    <p className="onboarding-sub" style={{ textAlign: 'left', marginBottom: '20px', fontSize: '0.85rem' }}>Provide your professional details to start supporting families.</p>
                                    
                                    {/* Validation Errors */}
                                    {Object.keys(onboardingErrors).length > 0 && (
                                        <div className="onboarding-error-box">
                                            <ul>
                                                {Object.values(onboardingErrors).map((err, i) => <li key={i}>• {err}</li>)}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="avatar-selector-container">
                                        <span className="avatar-selector-label" style={{ fontSize: '0.82rem' }}>Workspace Icon (Optional)</span>
                                        <div className="avatar-grid" style={{ gap: '8px', marginBottom: '16px' }}>
                                            {['👩‍⚕️', '👨‍⚕️', '🩺', '🧠'].map(av => (
                                                <button 
                                                    key={av} 
                                                    type="button" 
                                                    className={`avatar-btn ${therapistForm.profilePic === av ? 'selected' : ''}`}
                                                    onClick={() => setTherapistForm(prev => ({ ...prev, profilePic: av }))}
                                                    style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
                                                >
                                                    {av}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Dr. Jordan Mitchell" 
                                            value={therapistForm.fullName}
                                            onChange={(e) => setTherapistForm(prev => ({ ...prev, fullName: e.target.value }))}
                                            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Specialization</label>
                                        <input 
                                            type="text" 
                                            placeholder="Adolescent CBT, Family Communication" 
                                            value={therapistForm.specialization}
                                            onChange={(e) => setTherapistForm(prev => ({ ...prev, specialization: e.target.value }))}
                                            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Years of Experience</label>
                                        <input 
                                            type="number" 
                                            placeholder="10" 
                                            value={therapistForm.experience}
                                            onChange={(e) => setTherapistForm(prev => ({ ...prev, experience: e.target.value }))}
                                            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleTherapistQuickFinish}>Finish &amp; Continue</button>
                                        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigateTo('portal-therapist')}>Skip for Now</button>
                                    </div>
                                </div>

                                {/* Privacy Info Card */}
                                <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>🔒</span>
                                        <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0 }}>Professional Boundaries</h3>
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text)', lineHeight: '1.45', marginBottom: '14px' }}>
                                        MindBridge complies with HIPAA guidelines and E2E privacy models.
                                    </p>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', lineHeight: '1.45' }}>
                                        You will only access client data aggregates when they explicitly grant key-based decryption access or book a telehealth consult.
                                    </p>
                                    <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '16px', paddingTop: '12px', fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
                                        Demo licenses are instantly activated upon completing quick onboarding profiles.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {/* ================= PORTAL: TEEN ================= */}
                {currentView === 'portal-teen' && (
                    <TeenDashboard
                        user={user}
                        onLogout={handleLogout}
                        createdRoles={createdRoles}
                        activeRole={activeRole}
                        setActiveRole={(role) => {
                            setActiveRole(role);
                            if (role === 'parent') navigateTo('portal-parent');
                            else if (role === 'therapist') navigateTo('portal-therapist');
                        }}
                        parentRequestSent={parentRequestSent}
                        parentForm={parentForm}
                        setParentRequestSent={setParentRequestSent}
                    />
                )}

                {/* ================= PORTAL: PARENT ================= */}
                {currentView === 'portal-parent' && (
                    <ParentDashboard
                        user={user}
                        onLogout={handleLogout}
                        activeRole={activeRole}
                        setActiveRole={(role) => {
                            setActiveRole(role);
                            if (role === 'teen') navigateTo('portal-teen');
                        }}
                        parentForm={parentForm}
                        parentRequestSent={parentRequestSent}
                    />
                )}





                {/* ================= PORTAL: THERAPIST ================= */}
                {currentView === 'portal-therapist' && (
                    <section className="app-view dashboard-container" style={{ paddingTop: '24px' }}>
                        <div className="dashboard-header">
                            <div>
                                <span className="dashboard-tag text-green">Clinical Workspace</span>
                                <h2>Adolescent Counselor Board</h2>
                            </div>
                            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                        </div>

                        <div className="dashboard-content-grid">
                            <div className="dash-card">
                                <h3>📅 Scheduled Consultations</h3>
                                <table className="therapist-table">
                                    <thead>
                                        <tr>
                                            <th>Client Name</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Clinical Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Maya K. (Guardian: David M.)</td>
                                            <td>July 04, 2026</td>
                                            <td>10:00 AM</td>
                                            <td><span className="badge badge-success">Confirmed</span></td>
                                        </tr>
                                        <tr>
                                            <td>Ethan R. (Guardian: Susan R.)</td>
                                            <td>July 06, 2026</td>
                                            <td>02:30 PM</td>
                                            <td><span className="badge badge-warning">Pending</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="dash-card">
                                <h3>🔑 Access Client Wellness Data</h3>
                                <p>Unlock clinical progress dashboards using decryption keys.</p>
                                <div className="search-bar-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder="Enter key (e.g. MB-902-E2E)" 
                                        value={clientDecryptKey}
                                        onChange={(e) => setClientDecryptKey(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleClientDecrypt()}
                                    />
                                    <button className="btn btn-primary" onClick={handleClientDecrypt}>Unlock</button>
                                </div>
                                {decryptMsg && <div className="selected-mood-alert">{decryptMsg}</div>}
                            </div>
                        </div>
                    </section>
                )}

            </main>

            {/* Footer — only on public pages */}
            {['home','features','about','faqs','contact'].includes(currentView) ? (
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-brand-section">
                        <div className="footer-logo">
                            <img src="/logo.jpg" alt="MindBridge Logo" style={{ width: '26px', height: '26px', borderRadius: '4px', objectFit: 'contain', marginRight: '6px' }} />
                            <span>MindBridge</span>
                        </div>
                        <p className="footer-tagline">AI-powered wellness insights and clinical safety nets designed for family growth.</p>
                    </div>
                    <div className="footer-links-grid">
                        <div className="footer-group">
                            <h4 className="group-title">Company</h4>
                            <ul className="group-list">
                                <li><button onClick={() => navigateTo('about')} className="footer-link">About Us</button></li>
                                <li><button className="footer-link">Careers</button></li>
                            </ul>
                        </div>
                        <div className="footer-group">
                            <h4 className="group-title">Resources</h4>
                            <ul className="group-list">
                                <li><button onClick={() => navigateTo('faqs')} className="footer-link">FAQs</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 MindBridge. All rights reserved. Designed with clinical care.</p>
                </div>
            </footer>
            ) : null}


            {/* Modal Detail Viewer overlay */}
            {activeModalKey && modalData[activeModalKey] && (
                <div className="modal-overlay" onClick={() => setActiveModalKey(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setActiveModalKey(null)}>&times;</button>
                        <h2>{modalData[activeModalKey].title}</h2>
                        <p>{modalData[activeModalKey].desc}</p>
                        <ul className="modal-bullet-list">
                            {modalData[activeModalKey].bullets.map((bullet, i) => (
                                <li key={i}>
                                    <span className="bullet-check">✓</span> <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-primary" onClick={() => setActiveModalKey(null)}>
                            Close Info
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

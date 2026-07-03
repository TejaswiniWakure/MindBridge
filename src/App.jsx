import React, { useState, useEffect } from 'react';
import TeenDashboard from './TeenDashboard';
import ParentDashboard from './ParentDashboard';

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
                    {/* Logo & Brand */}
                    <button onClick={() => navigateTo('home')} className="nav-logo" style={{ cursor: 'pointer' }}>
                        <div className="logo-icon" style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/logo.jpg" alt="MindBridge Logo" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain' }} />
                        </div>
                        <div className="brand-wrapper">
                            <span className="brand-short">MB</span>
                            <span className="brand-full">Mind Bridge</span>
                        </div>
                    </button>

                    {/* Navigation Menu Links */}
                    <nav className="nav-menu">
                        <ul className="nav-list">
                            <li>
                                <button 
                                    className={`nav-link ${currentView === 'home' ? 'active-nav' : ''}`}
                                    onClick={() => navigateTo('home')}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button 
                                    className={`nav-link ${currentView === 'features' ? 'active-nav' : ''}`}
                                    onClick={() => navigateTo('features')}
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                <button 
                                    className={`nav-link ${currentView === 'about' ? 'active-nav' : ''}`}
                                    onClick={() => navigateTo('about')}
                                >
                                    About
                                </button>
                            </li>

                            <li>
                                <button 
                                    className={`nav-link ${currentView === 'faqs' ? 'active-nav' : ''}`}
                                    onClick={() => navigateTo('faqs')}
                                >
                                    FAQs
                                </button>
                            </li>
                            <li>
                                <button 
                                    className={`nav-link ${currentView === 'contact' ? 'active-nav' : ''}`}
                                    onClick={() => navigateTo('contact')}
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
                                        
                                        {/* Teen Switcher */}
                                        {activeRole !== 'teen' && (
                                            <button className="dropdown-item" onClick={() => { setActiveRole('teen'); navigateTo('portal-teen'); setRoleMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '0.82rem', color: 'var(--color-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span>🦊 Teen / Adults</span>
                                            </button>
                                        )}

                                        {/* Parent Switcher */}
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
                        <div className="hero-container">
                            <span className="hero-tagline">Parent–Teen Care Platform</span>
                            <h1 className="hero-title">
                                Supporting Every Family's <span className="text-gradient">Mental Wellness</span>
                            </h1>
                            <p className="hero-subtitle">
                                MindBridge is an AI-powered platform that helps parents understand, teens express themselves, and families grow stronger through compassionate, personalized support.
                            </p>
                        </div>

                        {/* Interactive How it Works section to push footer below the fold */}
                        <div className="section-container" style={{ paddingTop: '20px', marginTop: '20px' }}>
                            <div className="section-header">
                                <span className="section-tag">How It Works</span>
                                <h2 className="section-title">Bridging the Gap with Compassion &amp; Privacy</h2>
                                <p className="section-subtitle">A secure digital environment where teenagers, parents, and therapists work together.</p>
                            </div>

                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper" style={{ fontSize: '1.3rem' }}>🔒</div>
                                    <h3>Privacy-First Dashboards</h3>
                                    <p>Teenagers write in complete confidence. All journals are fully encrypted. Parents access high-level wellness indexes without invading private logs.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper" style={{ fontSize: '1.3rem' }}>⚡</div>
                                    <h3>Real-Time Coping Skills</h3>
                                    <p>An AI-guided journal analyzes emotional text patterns to suggest box breathing, square breathing, and mindfulness prompts instantly when stress thresholds spike.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper" style={{ fontSize: '1.3rem' }}>🤝</div>
                                    <h3>Clinical Connections</h3>
                                    <p>Secure, integrated portals allow families to easily consult licensed adolescent counselor directories and safely share progress metrics with professionals.</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Wellness Check-in Widget (User Attraction) */}
                        <div className="section-container" style={{ paddingTop: '10px', marginTop: '0' }}>
                            <div className="section-header">
                                <span className="section-tag">Interactive Check-in</span>
                                <h2 className="section-title">How Are You Feeling Today?</h2>
                                <p className="section-subtitle">Click an emotion below to receive an instant, evidence-based coping tool.</p>
                            </div>

                            {/* Emoji Buttons Row */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                {[
                                    { mood: 'Happy', emoji: '😀' },
                                    { mood: 'Calm', emoji: '😌' },
                                    { mood: 'Tired', emoji: '😴' },
                                    { mood: 'Anxious', emoji: '😰' },
                                    { mood: 'Sad', emoji: '😢' }
                                ].map(item => (
                                    <button 
                                        key={item.mood}
                                        className={`btn ${homeCheckInMood === item.mood ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ padding: '10px 18px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.9rem', borderRadius: '50px' }}
                                        onClick={() => setHomeCheckInMood(homeCheckInMood === item.mood ? null : item.mood)}
                                    >
                                        <span>{item.emoji}</span>
                                        <span>{item.mood}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Render Coping Advice Card if mood is selected */}
                            {homeCheckInMood && (
                                <div className="feature-card" style={{ width: '100%', maxWidth: '700px', margin: '0 auto', padding: '24px', alignSelf: 'center', display: 'block', border: '1px solid var(--color-border)', background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9FF 100%)', animation: 'slideUpFade 0.3s ease' }}>
                                    {homeCheckInMood === 'Anxious' && (
                                        <div>
                                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>😰 Recommended: Box Breathing Grounding</h3>
                                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '14px', lineHeight: '1.5' }}>
                                                <strong>Instructions:</strong> Breathe in slowly through your nose for 4 seconds. Hold your breath for 4 seconds. Exhale gently through your mouth for 4 seconds. Hold empty for 4 seconds. Repeat 4 times.
                                            </p>
                                            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--color-text-light)', borderLeft: '3px solid var(--color-primary)' }}>
                                                💡 <em>Why it works:</em> Box breathing regulates autonomic nervous system responses, lowering your heart rate and easing panic signals.
                                            </div>
                                        </div>
                                    )}
                                    {homeCheckInMood === 'Sad' && (
                                        <div>
                                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>😢 Recommended: 5-4-3-2-1 Grounding Method</h3>
                                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '14px', lineHeight: '1.5' }}>
                                                <strong>Instructions:</strong> Acknowledge 5 things you see around you, 4 things you can touch, 3 things you hear, 2 things you can smell, and 1 thing you can taste.
                                            </p>
                                            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--color-text-light)', borderLeft: '3px solid var(--color-primary)' }}>
                                                💡 <em>Why it works:</em> Grounding shifts cognitive processing from heavy internal sadness back to your sensory surroundings.
                                            </div>
                                        </div>
                                    )}
                                    {homeCheckInMood === 'Tired' && (
                                        <div>
                                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>😴 Recommended: 10-Minute Screen-Free Reset</h3>
                                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '14px', lineHeight: '1.5' }}>
                                                <strong>Instructions:</strong> Lock your phone, close laptop screens, stand up, and gently stretch your shoulders and neck. Drink a glass of cold water.
                                            </p>
                                            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--color-text-light)', borderLeft: '3px solid var(--color-primary)' }}>
                                                💡 <em>Why it works:</em> Physical movements and taking visual breaks from blue light restores vascular circulation and relieves eye strain.
                                            </div>
                                        </div>
                                    )}
                                    {homeCheckInMood === 'Calm' && (
                                        <div>
                                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>😌 Recommended: Reflective Gratitude Journaling</h3>
                                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '14px', lineHeight: '1.5' }}>
                                                <strong>Instructions:</strong> Write down 2 things you are grateful for today, or record a small victory you achieved, no matter how minor it seems.
                                            </p>
                                            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--color-text-light)', borderLeft: '3px solid var(--color-primary)' }}>
                                                💡 <em>Why it works:</em> Documenting wins during calm states builds positive neural connections and strengthens resilience pathways.
                                            </div>
                                        </div>
                                    )}
                                    {homeCheckInMood === 'Happy' && (
                                        <div>
                                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>😀 Recommended: Share Your Positive Energy</h3>
                                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '14px', lineHeight: '1.5' }}>
                                                <strong>Instructions:</strong> Send a quick text to a family member, log this entry in your private journal, or reflect on what specifically triggered this joy.
                                            </p>
                                            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--color-text-light)', borderLeft: '3px solid var(--color-primary)' }}>
                                                💡 <em>Why it works:</em> Sharing positive moments extends their cognitive benefits and reinforces social support frameworks.
                                            </div>
                                        </div>
                                    )}
                                    
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        style={{ marginTop: '16px' }}
                                        onClick={() => navigateTo('auth')}
                                    >
                                        Log this privately in MindBridge
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Success Stories Testimonials */}
                        <div className="section-container" style={{ paddingTop: '10px', marginTop: '0' }}>
                            <div className="section-header">
                                <span className="section-tag">Success Stories</span>
                                <h2 className="section-title">Loved by Teens, Trusted by Parents</h2>
                                <p className="section-subtitle">Hear from families who are improving communication and wellness.</p>
                            </div>

                            <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
                                <div className="feature-card" style={{ padding: '24px' }}>
                                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '16px', color: 'var(--color-text)' }}>
                                        "MindBridge gives me a safe space to write how I feel. My parents know I am doing okay, but they don't read my diary. It's the perfect balance of support and independence."
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', color: 'var(--color-primary)' }}>MK</div>
                                        <div>
                                            <h4 style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-dark)' }}>Maya K.</h4>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>High School Teen, 16</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="feature-card" style={{ padding: '24px' }}>
                                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '16px', color: 'var(--color-text)' }}>
                                        "It gives me peace of mind. I can spot wellness trends and understand when my teen is stressed, allowing me to check in appropriately without feeling like an intruder."
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', color: 'var(--color-primary)' }}>DM</div>
                                        <div>
                                            <h4 style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-dark)' }}>David M.</h4>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Parent of 15-year old</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

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
                                <div className="feature-icon-wrapper">🧠</div>
                                <h3>🧠 AI Mental Health Assistant</h3>
                                <p>Get personalized emotional support and wellness guidance anytime.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">😊</div>
                                <h3>😊 Mood Tracker</h3>
                                <p>Log your daily emotions and visualize your mood trends.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">📊</div>
                                <h3>📊 Mental Health Assessment</h3>
                                <p>Take scientifically validated mental wellness tests.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">📖</div>
                                <h3>📖 Personal Journal</h3>
                                <p>Write your thoughts privately and track emotional growth.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">🧘</div>
                                <h3>🧘 Meditation &amp; Mindfulness</h3>
                                <p>Practice guided breathing and meditation exercises.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">😴</div>
                                <h3>😴 Sleep Insights</h3>
                                <p>Monitor sleep habits and receive improvement suggestions.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">🎯</div>
                                <h3>🎯 Goals &amp; Habits</h3>
                                <p>Build healthy routines with daily goals and reminders.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">👨‍👩‍👧</div>
                                <h3>👨‍👩‍👧 Parent Dashboard</h3>
                                <p>Allow parents to monitor overall wellness with privacy controls.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon-wrapper">👩‍⚕️</div>
                                <h3>👩‍⚕️ Therapist Support</h3>
                                <p>Book appointments and connect with mental health professionals.</p>
                            </div>
                            <div className="feature-card card-highlight">
                                <div className="feature-icon-wrapper">🚨</div>
                                <h3>🚨 Emergency Support</h3>
                                <p>Access instant help and emergency resources when needed.</p>
                            </div>
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

                {/* ================= VIEW: CHOOSE ROLE ================= */}
                {currentView === 'role' && (
                    <section className="app-view section-container">
                        <div className="section-header text-center">
                            <h2 className="section-title">Choose Your Portal</h2>
                            <p className="section-subtitle">Select the portal that best matches you and begin your wellness journey.</p>
                        </div>

                        <div className="role-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '720px', margin: '0 auto' }}>

                            {/* Teen / Adults Card */}
                            <div className="role-card" style={{ border: '2px solid #DBEAFE', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', background: '#fff', boxShadow: '0 8px 32px rgba(37,99,235,0.07)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧑</div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1E293B', margin: '0 0 8px' }}>Teen / Adults</h3>
                                <span style={{ display: 'inline-block', background: '#EFF6FF', color: '#2563EB', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '50px', marginBottom: '12px' }}>Ages 13 – 30</span>
                                <p style={{ fontSize: '0.83rem', color: '#64748B', lineHeight: '1.6', marginBottom: '20px' }}>
                                    Track your mood, write private journals, complete mental health assessments, chat with AI companion, and build wellness habits.
                                </p>
                                {createdRoles.includes('teen') ? (
                                    <button className="btn btn-primary role-continue-btn" style={{ width: '100%' }} onClick={() => { setActiveRole('teen'); navigateTo('portal-teen'); }}>Enter Portal →</button>
                                ) : (
                                    <button className="btn btn-secondary role-continue-btn" style={{ width: '100%' }} onClick={() => navigateTo('onboarding-teen')}>Get Started →</button>
                                )}
                            </div>

                            {/* Parents Card */}
                            <div className="role-card" style={{ border: '2px solid #D1FAE5', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', background: '#fff', boxShadow: '0 8px 32px rgba(16,185,129,0.07)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👨‍👩‍👧</div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1E293B', margin: '0 0 8px' }}>Parents</h3>
                                <span style={{ display: 'inline-block', background: '#F0FDF4', color: '#059669', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '50px', marginBottom: '12px' }}>Ages 30+</span>
                                <p style={{ fontSize: '0.83rem', color: '#64748B', lineHeight: '1.6', marginBottom: '20px' }}>
                                    Manage your own wellness and monitor your child's wellbeing securely using a Family Code. No private content is ever shared.
                                </p>
                                {createdRoles.includes('parent') ? (
                                    <button className="btn btn-primary role-continue-btn" style={{ width: '100%', background: 'linear-gradient(135deg,#059669,#10B981)', border: 'none' }} onClick={() => { setActiveRole('parent'); navigateTo('portal-parent'); }}>Enter Portal →</button>
                                ) : (
                                    <button className="btn btn-secondary role-continue-btn" style={{ width: '100%' }} onClick={() => { setActiveRole('parent'); navigateTo('portal-parent'); }}>Get Started →</button>
                                )}
                            </div>

                        </div>
                    </section>
                )}

                {/* ================= ONBOARDING: TEEN ================= */}
                {currentView === 'onboarding-teen' && (
                    <section className="onboarding-wrapper">
                        <div className="onboarding-card" style={{ maxWidth: '780px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                                {showTeenCodeScreen ? (
                                    <div style={{ textAlign: 'center', padding: '20px 10px', animation: 'slideUpFade 0.4s ease' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '8px' }}>Your Secure Family Code</h2>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '24px' }}>
                                            Share this Family Code with your parent to connect your accounts securely.
                                        </p>
                                        <div style={{ background: 'var(--bg-alt)', border: '2px dashed var(--color-primary-light)', padding: '16px 24px', borderRadius: 'var(--radius-md)', display: 'inline-block', fontSize: '1.6rem', fontWeight: '700', color: 'var(--color-primary)', letterSpacing: '2px', marginBottom: '24px', fontFamily: 'monospace' }}>
                                            {generatedFamilyCode}
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', maxWidth: '400px', margin: '0 auto 24px auto', lineHeight: '1.4' }}>
                                            Your parent will enter this code during onboarding to link profiles without accessing your private journals.
                                        </p>
                                        <button className="btn btn-primary" style={{ minWidth: '200px' }} onClick={() => navigateTo('portal-teen')}>
                                            Finish &amp; Continue
                                        </button>
                                    </div>
                                ) : (
                                    <div className="onboarding-columns-grid">
                                        <div>
                                            <h2 style={{ textAlign: 'left', fontSize: '1.5rem', marginBottom: '4px' }}>Welcome! Let's personalize your experience. 👋</h2>
                                            <p className="onboarding-sub" style={{ textAlign: 'left', marginBottom: '20px', fontSize: '0.85rem' }}>Complete your profile to personalize your mental wellness journey.</p>
                                            
                                            {/* Validation Errors */}
                                            {Object.keys(onboardingErrors).length > 0 && (
                                                <div className="onboarding-error-box">
                                                    <ul>
                                                        {Object.values(onboardingErrors).map((err, i) => <li key={i}>• {err}</li>)}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="avatar-selector-container">
                                                <span className="avatar-selector-label" style={{ fontSize: '0.82rem' }}>Profile Picture (Optional)</span>
                                                <div className="avatar-grid" style={{ gap: '8px', marginBottom: '16px' }}>
                                                    {['🦊', '🐯', '🐼', '🐨', '🦁'].map(av => (
                                                        <button 
                                                            key={av} 
                                                            type="button" 
                                                            className={`avatar-btn ${teenForm.profilePic === av ? 'selected' : ''}`}
                                                            onClick={() => setTeenForm(prev => ({ ...prev, profilePic: av }))}
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
                                                    placeholder="Alex Carter" 
                                                    value={teenForm.fullName}
                                                    onChange={(e) => setTeenForm(prev => ({ ...prev, fullName: e.target.value }))}
                                                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                                />
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                <div className="form-group">
                                                    <label style={{ fontSize: '0.8rem' }}>Age</label>
                                                    <input 
                                                        type="number" 
                                                        placeholder="16" 
                                                        value={teenForm.age}
                                                        onChange={(e) => setTeenForm(prev => ({ ...prev, age: e.target.value }))}
                                                        style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{ fontSize: '0.8rem' }}>Gender</label>
                                                    <select 
                                                        value={teenForm.gender} 
                                                        onChange={(e) => setTeenForm(prev => ({ ...prev, gender: e.target.value }))}
                                                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem', color: 'var(--color-dark)', outline: 'none', height: '38px' }}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Non-binary">Non-binary</option>
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label style={{ fontSize: '0.8rem' }}>Parent's Email (Optional)</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="parent@example.com" 
                                                    value={teenForm.parentEmail}
                                                    onChange={(e) => setTeenForm(prev => ({ ...prev, parentEmail: e.target.value }))}
                                                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label style={{ fontSize: '0.8rem' }}>Emergency Contact (Optional)</label>
                                                <input 
                                                    type="tel" 
                                                    placeholder="+1 (555) 000-0000" 
                                                    value={teenForm.emergencyContact}
                                                    onChange={(e) => setTeenForm(prev => ({ ...prev, emergencyContact: e.target.value }))}
                                                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleTeenQuickFinish}>Finish &amp; Continue</button>
                                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigateTo('portal-teen')}>Skip for Now</button>
                                            </div>
                                        </div>

                                        {/* Privacy Assurance Card */}
                                        <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>🔒</span>
                                                <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0 }}>Privacy Promise</h3>
                                            </div>
                                            <p style={{ fontSize: '0.78rem', color: 'var(--color-text)', lineHeight: '1.45', marginBottom: '14px' }}>
                                                Your mental wellness space is secure. Parents can only view high-level wellness summaries and safety alert signals.
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ color: '#EF4444' }}>❌</span> Private Journals
                                                </div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ color: '#EF4444' }}>❌</span> AI Journals &amp; Chats
                                                </div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ color: '#EF4444' }}>❌</span> Personal Notes &amp; Habits
                                                </div>
                                            </div>
                                            <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '16px', paddingTop: '12px', fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
                                                Therapists only see patients who explicitly book appointments or share wellness reports.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

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

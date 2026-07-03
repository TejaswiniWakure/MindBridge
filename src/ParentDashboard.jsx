import React, { useState } from 'react';

const PARENT_AVATARS = ['👩','👨','👩‍💼','👨‍💼','👵','👴','🧕','👩‍🦱','👨‍🦱','🌸'];
const PARENT_MOOD_OPTIONS = [
  { label: 'Happy', emoji: '😊', color: '#10B981' },
  { label: 'Calm', emoji: '😌', color: '#3B82F6' },
  { label: 'Stressed', emoji: '😤', color: '#F59E0B' },
  { label: 'Tired', emoji: '😴', color: '#8B5CF6' },
  { label: 'Overwhelmed', emoji: '😰', color: '#EF4444' },
];

export default function ParentDashboard({ user, onLogout, activeRole, setActiveRole, parentForm, parentRequestSent }) {
  // --- STATE DECLARATIONS ---
  const [parentPortalView, setParentPortalView] = useState(null); // null | 'my-wellness' | 'child-wellness'
  const [parentActiveSidebar, setParentActiveSidebar] = useState('dashboard');

  const [parentProfileCompleted, setParentProfileCompleted] = useState(() => {
    try { return !!JSON.parse(localStorage.getItem('mb_parent_profile')); } catch { return false; }
  });
  const [parentSavedProfile, setParentSavedProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mb_parent_profile')) || {}; } catch { return {}; }
  });
  const [parentProfileForm, setParentProfileForm] = useState({ name: '', role: 'Mother', avatar: '👩' });
  const [parentProfileError, setParentProfileError] = useState('');

  // Parent wellness data
  const [parentMoodLogs, setParentMoodLogs] = useState([]);
  const [parentSelectedMood, setParentSelectedMood] = useState(null);
  const [parentMoodNote, setParentMoodNote] = useState('');
  const [parentMoodAlert, setParentMoodAlert] = useState('');
  const [parentJournals, setParentJournals] = useState([]);
  const [parentJournalTitle, setParentJournalTitle] = useState('');
  const [parentJournalBody, setParentJournalBody] = useState('');
  const [parentJournalTab, setParentJournalTab] = useState('new');
  const [parentJournalSearch, setParentJournalSearch] = useState('');

  // Child wellness unlock
  const [childFamilyCodeInput, setChildFamilyCodeInput] = useState('');
  const [childWellnessUnlocked, setChildWellnessUnlocked] = useState(false);
  const [childCodeError, setChildCodeError] = useState('');

  // Weekly Goals for AI Coach
  const [parentWeeklyGoals, setParentWeeklyGoals] = useState([
    { id: 1, text: "💬 Have a 10-minute active listening check-in", completed: false },
    { id: 2, text: "📵 Set up a device-free dinner with your child", completed: false },
    { id: 3, text: "🚶 Go on a shared evening walk in nature", completed: false },
    { id: 4, text: "🧩 Play a collaborative board game together", completed: false }
  ]);

  const font = "'Poppins','Inter',sans-serif";

  // --- RENDER PROFILE SETUP ---
  if (!parentProfileCompleted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: font }}>
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 60px rgba(16,185,129,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{parentProfileForm.avatar}</div>
            <h1 style={{ margin: '0 0 6px', fontSize: '1.5rem', fontWeight: '800', color: '#065F46' }}>Parent Profile Setup</h1>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Set up your parent space in MindBridge to get started.</p>
          </div>
          {/* Avatar Picker */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '10px' }}>Pick Your Avatar</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PARENT_AVATARS.map(av => (
                <button key={av} onClick={() => setParentProfileForm(p => ({ ...p, avatar: av }))} style={{ width: '44px', height: '44px', fontSize: '1.4rem', borderRadius: '10px', border: `2px solid ${parentProfileForm.avatar === av ? '#10B981' : '#E2E8F0'}`, background: parentProfileForm.avatar === av ? '#D1FAE5' : '#F8FAFC', cursor: 'pointer' }}>{av}</button>
              ))}
            </div>
          </div>
          {/* Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Your Name <span style={{ color: '#EF4444' }}>*</span></label>
            <input type="text" placeholder="e.g. Anita, Rajesh..." value={parentProfileForm.name} onChange={e => { setParentProfileForm(p => ({ ...p, name: e.target.value })); setParentProfileError(''); }} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1.5px solid ${parentProfileError ? '#EF4444' : '#E2E8F0'}`, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            {parentProfileError && <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#EF4444' }}>{parentProfileError}</p>}
          </div>
          {/* Role */}
          <div style={{ marginBottom: '26px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Your Role</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Mother', 'Father', 'Guardian', 'Grandparent'].map(r => (
                <button key={r} onClick={() => setParentProfileForm(p => ({ ...p, role: r }))} style={{ padding: '8px 14px', borderRadius: '10px', border: `2px solid ${parentProfileForm.role === r ? '#10B981' : '#E2E8F0'}`, background: parentProfileForm.role === r ? '#10B981' : '#F8FAFC', color: parentProfileForm.role === r ? '#fff' : '#374151', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>{r}</button>
              ))}
            </div>
          </div>
          <button onClick={() => {
            if (!parentProfileForm.name.trim()) { setParentProfileError('Please enter your name.'); return; }
            const profile = { name: parentProfileForm.name.trim(), role: parentProfileForm.role, avatar: parentProfileForm.avatar };
            localStorage.setItem('mb_parent_profile', JSON.stringify(profile));
            setParentSavedProfile(profile);
            setParentProfileCompleted(true);
          }} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #059669, #10B981)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
            Enter Parent Portal →
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER SELECTION MENU (LANDING) ---
  if (!parentPortalView) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F0FDF4 0%, #EFF6FF 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', fontFamily: font }}>
        
        {/* Role Toggle Dropdown Header */}
        <div style={{ width: '100%', maxWidth: '680px', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={() => setActiveRole('teen')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: '50px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700', color: '#475569', transition: 'all 0.2s', fontFamily: font }}>
            🔄 Switch to Teen Portal
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{parentSavedProfile.avatar}</div>
          <h1 style={{ margin: '0 0 6px', fontSize: '1.8rem', fontWeight: '800', color: '#1E293B' }}>Welcome, {parentSavedProfile.name} 👋</h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>{parentSavedProfile.role} · MindBridge Parent Portal</p>
        </div>

        {/* 2 Option Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '680px', width: '100%' }}>
          {/* My Wellness */}
          <button onClick={() => setParentPortalView('my-wellness')} style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '2px solid #DBEAFE', cursor: 'pointer', textAlign: 'left', boxShadow: '0 8px 32px rgba(37,99,235,0.08)', transition: 'all 0.2s', fontFamily: 'inherit' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '16px' }}>🧘</div>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: '800', color: '#1E293B' }}>My Wellness</h2>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>Track your own mood, write a private journal, and manage your personal wellness journey.</p>
            <span style={{ display: 'inline-block', background: '#EFF6FF', color: '#2563EB', padding: '6px 14px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '700' }}>Open My Dashboard →</span>
          </button>

          {/* Child Wellness Check */}
          <button onClick={() => setParentPortalView('child-wellness')} style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '2px solid #D1FAE5', cursor: 'pointer', textAlign: 'left', boxShadow: '0 8px 32px rgba(16,185,129,0.08)', transition: 'all 0.2s', fontFamily: 'inherit' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #059669, #10B981)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '16px' }}>👶</div>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: '800', color: '#1E293B' }}>Child Wellness Check</h2>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>View your child's wellness overview using the shared Family Code. Privacy-first, no private content shown.</p>
            <span style={{ display: 'inline-block', background: '#D1FAE5', color: '#065F46', padding: '6px 14px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '700' }}>View Child Data →</span>
          </button>
        </div>

        <button onClick={onLogout} style={{ marginTop: '28px', padding: '10px 22px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}>Logout</button>
      </div>
    );
  }

  // --- MY WELLNESS DASHBOARD ---
  if (parentPortalView === 'my-wellness') {
    const card = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(37,99,235,0.04)' };
    return (
      <div style={{ minHeight: '100vh', background: '#F0F6FF', fontFamily: font }}>
        {/* Sticky Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setParentPortalView(null)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: '1.5px solid #BFDBFE', borderRadius: '50px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700', color: '#2563EB', fontFamily: font, transition: 'all 0.2s' }}
            >
              ← Back to Menu
            </button>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#2563EB' }}>🧘 My Wellness — {parentSavedProfile.name}</span>
          </div>
          <button onClick={onLogout} style={{ padding: '7px 14px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', fontFamily: font }}>Logout</button>
        </div>

        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Welcome Banner */}
          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', borderRadius: '20px', padding: '28px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '0.8rem', opacity: 0.9 }}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: '800' }}>Hello, {parentSavedProfile.name}!</h2>
              <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>Your wellness matters too. Take a moment for yourself today. 🌿</p>
            </div>
            <span style={{ fontSize: '3rem' }}>{parentSavedProfile.avatar}</span>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
            {[
              { label: 'Mood Entries', val: parentMoodLogs.length, icon: '😊', color: '#10B981' },
              { label: 'Journals Written', val: parentJournals.length, icon: '📖', color: '#3B82F6' },
              { label: 'Streak', val: parentMoodLogs.length > 0 ? '1 Day' : '0 Days', icon: '🔥', color: '#F97316' },
            ].map((s, i) => (
              <div key={i} style={{ ...card, textAlign: 'center', padding: '18px' }}>
                <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                <h3 style={{ margin: '6px 0 2px', fontSize: '1.3rem', fontWeight: '800', color: s.color }}>{s.val}</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Mood Tracker */}
            <div style={card}>
              <h3 style={{ margin: '0 0 14px' }}>😊 Daily Mood Check-In</h3>
              {parentMoodAlert && <div style={{ padding: '10px 14px', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', marginBottom: '12px' }}>{parentMoodAlert}</div>}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {PARENT_MOOD_OPTIONS.map(opt => (
                  <button key={opt.label} onClick={() => setParentSelectedMood(opt)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '12px 14px', background: parentSelectedMood?.label === opt.label ? opt.color : '#F8FAFC', color: parentSelectedMood?.label === opt.label ? '#fff' : '#374151', border: `2px solid ${parentSelectedMood?.label === opt.label ? opt.color : '#E2E8F0'}`, borderRadius: '10px', cursor: 'pointer', minWidth: '72px', fontFamily: font }}>
                    <span style={{ fontSize: '1.5rem' }}>{opt.emoji}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: '700' }}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <textarea rows="2" placeholder="Optional note..." value={parentMoodNote} onChange={e => setParentMoodNote(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #E2E8F0', resize: 'none', fontFamily: font, outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }} />
              <button disabled={!parentSelectedMood} onClick={() => {
                if (!parentSelectedMood) return;
                const ts = new Date().toLocaleString();
                setParentMoodLogs(p => [{ mood: parentSelectedMood.label, emoji: parentSelectedMood.emoji, note: parentMoodNote, date: ts }, ...p]);
                setParentSelectedMood(null); setParentMoodNote('');
                setParentMoodAlert(`✅ "${parentSelectedMood.label}" logged!`);
                setTimeout(() => setParentMoodAlert(''), 3000);
              }} style={{ padding: '10px 20px', background: parentSelectedMood ? '#2563EB' : '#E2E8F0', color: parentSelectedMood ? '#fff' : '#94A3B8', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: parentSelectedMood ? 'pointer' : 'not-allowed', fontFamily: font }}>Save Mood</button>

              {parentMoodLogs.length > 0 && (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>History</p>
                  {parentMoodLogs.slice(0, 5).map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{l.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '0.82rem' }}>{l.mood}</p>
                        {l.note && <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B' }}>{l.note}</p>}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{l.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Private Journal */}
            <div style={card}>
              <h3 style={{ margin: '0 0 14px' }}>📖 Private Journal</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                {['new', 'history'].map(t => (
                  <button key={t} onClick={() => setParentJournalTab(t)} style={{ padding: '7px 16px', borderRadius: '50px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', border: `1px solid ${parentJournalTab === t ? '#2563EB' : '#E2E8F0'}`, background: parentJournalTab === t ? '#2563EB' : '#fff', color: parentJournalTab === t ? '#fff' : '#64748B', fontFamily: font }}>{t === 'new' ? '✏️ New Entry' : '📚 My Entries'}</button>
                ))}
              </div>
              {parentJournalTab === 'new' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Entry title..." value={parentJournalTitle} onChange={e => setParentJournalTitle(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none', fontFamily: font }} />
                  <textarea rows="5" placeholder="Write your thoughts privately..." value={parentJournalBody} onChange={e => setParentJournalBody(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #E2E8F0', resize: 'vertical', outline: 'none', fontFamily: font }} />
                  <button onClick={() => {
                    if (!parentJournalTitle.trim() || !parentJournalBody.trim()) return;
                    setParentJournals(p => [{ id: Date.now(), title: parentJournalTitle, body: parentJournalBody, time: new Date().toLocaleString() }, ...p]);
                    setParentJournalTitle(''); setParentJournalBody('');
                    setParentJournalTab('history');
                  }} style={{ padding: '10px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontFamily: font }}>Save Entry</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="🔍 Search..." value={parentJournalSearch} onChange={e => setParentJournalSearch(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none', fontFamily: font }} />
                  {parentJournals.length === 0 ? <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>No entries yet. Write your first one.</p> :
                    parentJournals.filter(j => !parentJournalSearch || j.title.toLowerCase().includes(parentJournalSearch.toLowerCase())).map(j => (
                      <div key={j.id} style={{ background: '#F8FAFC', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <h4 style={{ margin: 0, fontSize: '0.88rem' }}>{j.title}</h4>
                          <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{j.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#374151', whiteSpace: 'pre-wrap' }}>{j.body}</p>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>

          {/* Wellness Tips */}
          <div style={{ ...card, background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <h3 style={{ margin: '0 0 12px', color: '#1E40AF' }}>💡 Adult Wellness Tips</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { icon: '🌬️', title: 'Box Breathing', desc: '4-4-4-4 breathing to manage parenting stress quickly.' },
                { icon: '🚶', title: 'Daily Walk', desc: '15 min outdoor walk boosts mood and lowers cortisol.' },
                { icon: '📵', title: 'Screen-Off Hour', desc: 'Disconnect 1 hr before sleep for better rest quality.' },
                { icon: '🤝', title: 'Talk It Out', desc: 'Sharing your parenting worries reduces anxiety by 40%.' },
              ].map((t, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                  <h4 style={{ margin: '6px 0 4px', fontSize: '0.88rem', color: '#1E40AF' }}>{t.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#3B82F6', lineHeight: '1.4' }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Back Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
            <button
              onClick={() => setParentPortalView(null)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '0.88rem', fontFamily: font, boxShadow: '0 8px 24px rgba(37,99,235,0.15)', transition: 'all 0.2s' }}
            >
              ← Back to Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- CHILD WELLNESS CHECK ---
  if (parentPortalView === 'child-wellness') {
    // Load dynamic child wellness data from localStorage
    const teenProfile = JSON.parse(localStorage.getItem('mb_teen_profile') || '{}');
    const teenMoodLogs = JSON.parse(localStorage.getItem('mb_teen_mood_logs') || '[]');
    const teenJournals = JSON.parse(localStorage.getItem('mb_teen_journals') || '[]');
    const teenBreathing = Number(localStorage.getItem('mb_teen_breathing') || '0');
    const teenAssessments = JSON.parse(localStorage.getItem('mb_teen_assessments') || '[]');
    const teenGratitude = JSON.parse(localStorage.getItem('mb_teen_gratitude') || '[]');
    const teenGames = JSON.parse(localStorage.getItem('mb_teen_games_played') || '{"memory":0,"matching":0,"breathing":0,"tapping":0}');

    let tasksCompleted = 0;
    if (teenMoodLogs.length > 0) tasksCompleted += 1;
    if (teenJournals.length > 0) tasksCompleted += 1;
    if (teenBreathing > 0) tasksCompleted += 1;
    if (teenAssessments.length > 0) tasksCompleted += 1;
    
    const childWellnessPercent = Math.round((tasksCompleted / 4) * 100);
    const card = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(16,185,129,0.04)' };

    return (
      <div style={{ minHeight: '100vh', background: '#F0FDF4', fontFamily: font }}>
        {/* Sticky Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => { setParentPortalView(null); setChildWellnessUnlocked(false); setChildFamilyCodeInput(''); setChildCodeError(''); }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'linear-gradient(135deg,#F0FDF4,#D1FAE5)', border: '1.5px solid #6EE7B7', borderRadius: '50px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700', color: '#065F46', fontFamily: font, transition: 'all 0.2s' }}
            >
              ← Back to Menu
            </button>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#059669' }}>👶 Child Wellness Check</span>
          </div>
          <button onClick={onLogout} style={{ padding: '7px 14px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', fontFamily: font }}>Logout</button>
        </div>

        {/* Main Layout Panel */}
        {!childWellnessUnlocked ? (
          /* Lock Screen */
          <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ ...card, textAlign: 'center', padding: '48px 40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🔐</div>
              <h2 style={{ margin: '0 0 10px', color: '#1E293B' }}>Enter Family Code to Unlock</h2>
              <p style={{ margin: '0 0 24px', fontSize: '0.88rem', color: '#64748B', lineHeight: '1.6' }}>
                Access your child's wellness overview using the Family Code shared by their Teen Portal.<br/>
                <strong>No email access.</strong> Only the correct Family Code works.
              </p>
              <div style={{ maxWidth: '360px', margin: '0 auto' }}>
                <input
                  type="text"
                  placeholder="Enter Family Code (e.g. MB-1234-XY)"
                  value={childFamilyCodeInput}
                  onChange={e => { setChildFamilyCodeInput(e.target.value); setChildCodeError(''); }}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: `2px solid ${childCodeError ? '#EF4444' : '#E2E8F0'}`, fontSize: '0.92rem', outline: 'none', fontFamily: font, textAlign: 'center', letterSpacing: '0.05em', marginBottom: '10px', boxSizing: 'border-box' }}
                />
                {childCodeError && <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#EF4444' }}>{childCodeError}</p>}
                <button onClick={() => {
                  const code = childFamilyCodeInput.trim();
                  if (!code) { setChildCodeError('Please enter the Family Code.'); return; }
                  
                  let savedCode = '';
                  try {
                    const p = JSON.parse(localStorage.getItem('mb_teen_profile') || '{}');
                    savedCode = p.familyCode || '';
                  } catch (e) {
                    console.log("No teen profile found:", e);
                  }
                  
                  if (savedCode && code === savedCode) {
                    setChildWellnessUnlocked(true);
                    setChildCodeError('');
                  } else {
                    setChildCodeError('Incorrect Family Code. Please enter the exact code generated by your child in their Teen Portal.');
                  }
                }} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #059669, #10B981)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', fontFamily: font }}>
                  Unlock Child Wellness View
                </button>
              </div>
              <div style={{ marginTop: '20px', padding: '14px 20px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '10px', fontSize: '0.78rem', color: '#92400E', lineHeight: '1.5' }}>
                🔒 <strong>Privacy First:</strong> Private journals, AI conversations, and individual mood entries are never shown here. Only aggregate statistics are visible.
              </div>
            </div>
          </div>
        ) : (
          /* Sidebar + Dashboard Workspace */
          <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', background: '#F8FAFC' }}>
            
            {/* Sidebar */}
            <aside style={{ width: '250px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>CHILD WELLNESS</div>
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
                  { id: 'teen-insights', label: 'Teen Insights', icon: '📈' },
                  { id: 'ai-coach', label: 'AI Parent Coach', icon: '💡' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setParentActiveSidebar(tab.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none',
                      background: parentActiveSidebar === tab.id ? '#F0FDF4' : 'transparent',
                      color: parentActiveSidebar === tab.id ? '#059669' : '#475569',
                      fontWeight: parentActiveSidebar === tab.id ? '700' : '500',
                      fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: font
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Bottom Profile Info */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{parentSavedProfile.avatar}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: '700', color: '#1E293B' }}>{parentSavedProfile.name}</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#94A3B8' }}>{parentSavedProfile.role}</p>
                  </div>
                </div>
                <button onClick={onLogout} style={{ width: '100%', padding: '10px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem', fontFamily: font }}>Logout</button>
              </div>
            </aside>

            {/* Dashboard Content */}
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto', boxSizing: 'border-box' }}>
              {parentActiveSidebar === 'dashboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', borderRadius: '20px', padding: '24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '50px' }}>Family Connection Active</span>
                      <h2 style={{ margin: '8px 0 4px', fontSize: '1.40rem', fontWeight: '800' }}>Teen Wellness Dashboard</h2>
                      <p style={{ margin: 0, fontSize: '0.82rem', opacity: 0.9 }}>Aggregated analytics and wellness tracking workspace.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '12px', padding: '10px 16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', display: 'block', opacity: 0.8 }}>Connected Code</span>
                      <strong style={{ fontSize: '1.05rem', fontFamily: 'monospace' }}>{parentForm?.familyCode || teenProfile?.familyCode}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    <div style={{ ...card, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏆</div>
                      <h3 style={{ margin: 0 }}>Child Wellness Adherence</h3>
                      <p style={{ margin: '4px 0 14px', fontSize: '0.8rem', color: '#64748B' }}>Daily habits tracking progress</p>
                      <div style={{ fontSize: '2.8rem', fontWeight: '900', color: childWellnessPercent === 100 ? '#10B981' : '#2563EB' }}>
                        {childWellnessPercent}%
                      </div>
                      <span style={{ fontSize: '0.72rem', color: childWellnessPercent === 100 ? '#065F46' : '#1E40AF', background: childWellnessPercent === 100 ? '#D1FAE5' : '#DBEAFE', padding: '3px 10px', borderRadius: '50px', marginTop: '8px', fontWeight: '700' }}>
                        {tasksCompleted} / 4 Goals Met
                      </span>
                    </div>

                    <div style={card}>
                      <h3 style={{ margin: '0 0 4px' }}>😊 Mood Logs</h3>
                      <p style={{ margin: '0 0 16px', fontSize: '0.8rem', color: '#64748B' }}>Real-time emotional logs logged by your child</p>
                      {teenMoodLogs.length === 0 ? (
                        <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: '10px' }}>No mood logs recorded today.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {teenMoodLogs.slice(0, 3).map((l, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', padding: '10px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                              <span style={{ fontSize: '1.4rem' }}>{l.emoji || '😊'}</span>
                              <div>
                                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: '700' }}>{l.mood}</p>
                                {l.note && <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B' }}>"{l.note}"</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={card}>
                      <h3 style={{ margin: '0 0 4px' }}>📊 Screening Results</h3>
                      <p style={{ margin: '0 0 16px', fontSize: '0.8rem', color: '#64748B' }}>Most recent wellness assessments</p>
                      {teenAssessments.length === 0 ? (
                        <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: '10px' }}>No screening tests taken yet.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {teenAssessments.slice(0, 2).map((a, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', justifyContent: 'space-between' }}>
                              <div>
                                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: '700' }}>{a.name}</p>
                                <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{a.date}</span>
                              </div>
                              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>Score: {a.score} ({a.level})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coach Insights */}
                  <div style={{ ...card, background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>💡</span>
                      <h3 style={{ margin: 0, color: '#1E40AF', fontSize: '1.05rem' }}>AI Parent Coach Insights (Based on Progress)</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem', color: '#1E293B', lineHeight: '1.5' }}>
                      {childWellnessPercent === 0 && (
                        <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #3B82F6' }}>
                          <strong>Low Goal Adherence:</strong> "Your child hasn't started their self-care activities today. A gentle message like 'How was your day?' can make it easier for them to share."
                        </div>
                      )}
                      {childWellnessPercent > 0 && childWellnessPercent < 100 && (
                        <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #3B82F6' }}>
                          <strong>Active Engagement:</strong> "Your child is active on self-care today! They completed box breathing or checked in their mood. Encourage them to keep it up!"
                        </div>
                      )}
                      {childWellnessPercent === 100 && (
                        <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #10B981' }}>
                          <strong>100% Completion:</strong> "Outstanding! Your child completed all self-care activities today. Reinforce their commitment with a supportive high-five or words of praise!"
                        </div>
                      )}
                      {teenMoodLogs.some(l => l.mood === 'Anxious' || l.mood === 'Sad' || l.mood === 'Tired') && (
                        <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #F59E0B' }}>
                          <strong>Stress Indicators:</strong> "Your child logged feeling anxious, tired, or sad today. Give them emotional space, avoid offering immediate fixes, and suggest practicing Box Breathing together."
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Family Activities */}
                  {(() => {
                    const latestMood = teenMoodLogs.length > 0 ? teenMoodLogs[0].mood : 'Calm';
                    return (
                      <div style={{ ...card, background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '1.5rem' }}>❤️</span>
                          <h3 style={{ margin: 0, color: '#92400E', fontSize: '1.05rem' }}>AI Family Activities (Based on Teen's Mood: {latestMood})</h3>
                        </div>
                        <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#B45309' }}>
                          Recommended interactive family activities to connect with your child today based on their emotional state:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                          {latestMood === 'Anxious' && (
                            <>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #F59E0B' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🎨 Art Session</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Unwind together with watercolor sketching or crafts.</span>
                              </div>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #F59E0B' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🚶 Evening Walk</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>A quiet walk around the block helps ground a nervous system.</span>
                              </div>
                            </>
                          )}
                          {latestMood === 'Sad' && (
                            <>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #EF4444' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🎬 Family Movie</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Cozy up with their favorite film, blankets, and snacks.</span>
                              </div>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #EF4444' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🍕 Cook Together</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Prepare a comforting dinner or dessert recipe as a team.</span>
                              </div>
                            </>
                          )}
                          {latestMood === 'Tired' && (
                            <>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #8B5CF6' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🎲 Board Game Night</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Play a relaxed board game or card game in low lighting.</span>
                              </div>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #8B5CF6' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🎬 Family Movie</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Watch a calming documentary or comedy to wind down.</span>
                              </div>
                            </>
                          )}
                          {(latestMood !== 'Anxious' && latestMood !== 'Sad' && latestMood !== 'Tired') && (
                            <>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #10B981' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🌳 Park Visit</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Visit a local green park for some active outdoor time.</span>
                              </div>
                              <div style={{ background: '#fff', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #10B981' }}>
                                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#92400E' }}>🍕 Cook Together</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Bake a fresh dessert or try a new recipe together.</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {parentActiveSidebar === 'teen-insights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={card}>
                    <h3>🧘 Self-Care Checklist Completion</h3>
                    <p style={{ margin: '4px 0 16px', fontSize: '0.78rem', color: '#64748B' }}>Adherence rate to self-guided support exercises.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}><span>Select Today's Mood</span><strong>{teenMoodLogs.length > 0 ? '100% (Completed)' : '0% (Todo)'}</strong></div>
                        <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '50px', overflow: 'hidden' }}><div style={{ width: teenMoodLogs.length > 0 ? '100%' : '0%', height: '100%', background: '#10B981' }} /></div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}><span>Mindful Journal Entries</span><strong>{teenJournals.length > 0 ? '100% (Completed)' : '0% (Todo)'}</strong></div>
                        <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '50px', overflow: 'hidden' }}><div style={{ width: teenJournals.length > 0 ? '100%' : '0%', height: '100%', background: '#3B82F6' }} /></div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}><span>Box Breathing Cycles</span><strong>{teenBreathing > 0 ? `${Math.min(100, teenBreathing * 25)}% (${teenBreathing} completed)` : '0% (Todo)'}</strong></div>
                        <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '50px', overflow: 'hidden' }}><div style={{ width: teenBreathing > 0 ? `${Math.min(100, teenBreathing * 25)}%` : '0%', height: '100%', background: '#8B5CF6' }} /></div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}><span>Gratitude Jar Entries</span><strong>{teenGratitude.length > 0 ? `${teenGratitude.length} Memories Saved` : '0% (Todo)'}</strong></div>
                        <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '50px', overflow: 'hidden' }}><div style={{ width: teenGratitude.length > 0 ? '100%' : '0%', height: '100%', background: '#D97706' }} /></div>
                      </div>
                    </div>
                  </div>

                  <div style={card}>
                    <h3>🎮 Stress-Relief Wellness Games Stats</h3>
                    <p style={{ margin: '4px 0 16px', fontSize: '0.78rem', color: '#64748B' }}>Interactive gamified exercises played by your child to regulate stress levels.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                      <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>💨</span>
                        <strong style={{ fontSize: '0.9rem', display: 'block' }}>{teenGames.breathing || 0}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Breathing Cycles</span>
                      </div>
                      <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🫧</span>
                        <strong style={{ fontSize: '0.9rem', display: 'block' }}>{teenGames.tapping || 0}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Bubble Tapping</span>
                      </div>
                      <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🃏</span>
                        <strong style={{ fontSize: '0.9rem', display: 'block' }}>{teenGames.memory || 0}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Memory Match</span>
                      </div>
                      <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🎨</span>
                        <strong style={{ fontSize: '0.9rem', display: 'block' }}>{teenGames.matching || 0}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Color Stroop</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {parentActiveSidebar === 'ai-coach' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ ...card, background: '#F0FDF4', border: '1px solid #A7F3D0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '1.6rem' }}>💡</span>
                      <h3 style={{ margin: 0, color: '#065F46' }}>AI Parent Coach Suggestion</h3>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#047857', lineHeight: '1.5' }}>
                      {childWellnessPercent === 100 
                        ? "Your child has completely logged all habits today! Reinforce this positive behavior. Take some time to celebrate with them tonight — maybe play a board game or enjoy a dessert together."
                        : "Keep communication channels open and stress-free. Try active listening tonight: when your child talks, instead of jumping to advice, repeat back what you hear: 'It sounds like you felt really overwhelmed today, is that right?'"}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div style={card}>
                      <h3>🎯 Weekly Parent Goals</h3>
                      <p style={{ margin: '4px 0 14px', fontSize: '0.78rem', color: '#64748B' }}>Interactive tasks to strengthen family communication.</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {parentWeeklyGoals.map(goal => (
                          <label key={goal.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: '0.82rem' }}>
                            <input
                              type="checkbox"
                              checked={goal.completed}
                              onChange={() => {
                                setParentWeeklyGoals(prev => prev.map(g => g.id === goal.id ? { ...g, completed: !g.completed } : g));
                              }}
                            />
                            <span style={{ textDecoration: goal.completed ? 'line-through' : 'none', color: goal.completed ? '#94A3B8' : '#334155' }}>{goal.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={card}>
                      <h3>🧩 Family Activity Recommendation</h3>
                      <h4 style={{ margin: '8px 0 4px', color: '#059669' }}>Collaborative Dinner Prep</h4>
                      <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: '#64748B', lineHeight: '1.4' }}>Prepare a meal together where your teen gets to choose the music and lead the recipe direction. Gives them agency and builds shared joy.</p>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', fontSize: '#0.75rem', color: '#64748B' }}>
                        💬 <strong>Communication Tip:</strong> Keep talks light — avoid academic or grade check-ins during this time.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    );
  }

  return null;
}

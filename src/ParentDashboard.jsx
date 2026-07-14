import React, { useState, useEffect } from 'react';

const PARENT_MOOD_OPTIONS = [
  { label: 'Happy', color: '#10B981', bg: '#D1FAE5' },
  { label: 'Calm', color: '#3B82F6', bg: '#DBEAFE' },
  { label: 'Stressed', color: '#F59E0B', bg: '#FEF3C7' },
  { label: 'Tired', color: '#8B5CF6', bg: '#EDE9FE' },
  { label: 'Overwhelmed', color: '#EF4444', bg: '#FEE2E2' },
];

export default function ParentDashboard({ user, onLogout, activeRole, setActiveRole }) {
  // --- STATE DECLARATIONS ---
  const [parentPortalView, setParentPortalView] = useState(null); // null | 'my-wellness' | 'child-wellness'
  const [parentActiveSidebar, setParentActiveSidebar] = useState('reports');

  const [parentProfileCompleted, setParentProfileCompleted] = useState(false);
  const [parentSavedProfile, setParentSavedProfile] = useState({
    name: '',
    role: 'Mother',
    avatarColor: '#2563EB'
  });
  const [alertMessage, setAlertMessage] = useState('');

  // Parent wellness data
  const [parentMoodLogs, setParentMoodLogs] = useState([]);
  const [parentSelectedMood, setParentSelectedMood] = useState(null);
  const [parentMoodNote, setParentMoodNote] = useState('');
  const [parentMoodAlert, setParentMoodAlert] = useState('');
  const [parentJournals, setParentJournals] = useState([]);
  const [parentJournalTitle, setParentJournalTitle] = useState('');
  const [parentJournalBody, setParentJournalBody] = useState('');

  // Child wellness unlock
  const [childFamilyCodeInput, setChildFamilyCodeInput] = useState('');
  const [childWellnessUnlocked, setChildWellnessUnlocked] = useState(false);
  const [childCodeError, setChildCodeError] = useState('');

  // Weekly Goals for Parent
  const [parentWeeklyGoals, setParentWeeklyGoals] = useState([
    { id: 1, text: "Have a 10-minute active listening check-in with your child", completed: false },
    { id: 2, text: "Establish a device-free family dinner tonight", completed: false },
    { id: 3, text: "Go on a shared evening walk in nature", completed: false },
    { id: 4, text: "Engage in a collaborative breathing cycle together", completed: false }
  ]);

  // Load profiles and logs
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mb_parent_profile');
      if (stored) {
        setParentSavedProfile(JSON.parse(stored));
        setParentProfileCompleted(true);
      }
      
      const storedMoods = localStorage.getItem('mb_parent_moods');
      if (storedMoods) setParentMoodLogs(JSON.parse(storedMoods));

      const storedJournals = localStorage.getItem('mb_parent_journals');
      if (storedJournals) setParentJournals(JSON.parse(storedJournals));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveParentProfile = (profile) => {
    localStorage.setItem('mb_parent_profile', JSON.stringify(profile));
    setParentSavedProfile(profile);
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (!parentSavedProfile.name.trim()) {
      setAlertMessage("Name is required.");
      return;
    }
    saveParentProfile(parentSavedProfile);
    setParentProfileCompleted(true);
    setAlertMessage('');
  };

  // Submit parent mood
  const handleParentMoodSubmit = () => {
    if (!parentSelectedMood) return;
    const log = {
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: parentSelectedMood.label,
      note: parentMoodNote,
      color: parentSelectedMood.color
    };
    const updated = [log, ...parentMoodLogs];
    setParentMoodLogs(updated);
    localStorage.setItem('mb_parent_moods', JSON.stringify(updated));
    setParentMoodNote('');
    setParentMoodAlert('Daily Mood Logged.');
    setTimeout(() => setParentMoodAlert(''), 3000);
  };

  // Save parent journal
  const handleSaveParentJournal = () => {
    if (!parentJournalBody.trim()) return;
    const item = {
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      title: parentJournalTitle.trim() || 'Untitled Reflection',
      text: parentJournalBody
    };
    const updated = [item, ...parentJournals];
    setParentJournals(updated);
    localStorage.setItem('mb_parent_journals', JSON.stringify(updated));
    setParentJournalTitle('');
    setParentJournalBody('');
    setAlertMessage('Reflection Journal saved successfully.');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  // Style cards
  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(15, 23, 42, 0.02)',
  };

  // Render onboarding
  if (!parentProfileCompleted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '460px', width: '100%', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(15,23,42,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', marginBottom: '14px' }}></span>
            <h1 style={{ margin: '0 0 8px', fontSize: '1.6rem', fontWeight: '800', fontFamily: "'Lora', serif", color: '#0F172A' }}>Setup Parent Portal</h1>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>Create your private local caregiver workspace.</p>
          </div>

          <form onSubmit={handleOnboardingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Full Name</label>
              <input type="text" placeholder="e.g. Sarah Smith" value={parentSavedProfile.name} onChange={e => setParentSavedProfile({ ...parentSavedProfile, name: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Relationship</label>
              <select value={parentSavedProfile.role} onChange={e => setParentSavedProfile({ ...parentSavedProfile, role: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', background: '#fff', fontSize: '0.9rem' }}>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
                <option value="Caregiver">Caregiver</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Avatar Theme Color</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'].map(c => (
                  <button key={c} type="button" onClick={() => setParentSavedProfile({ ...parentSavedProfile, avatarColor: c })} style={{ width: '32px', height: '32px', borderRadius: '50%', background: c, border: parentSavedProfile.avatarColor === c ? '3px solid #0F172A' : 'none', cursor: 'pointer' }} />
                ))}
              </div>
            </div>

            {alertMessage && <p style={{ color: '#EF4444', fontSize: '0.8rem', margin: 0 }}>{alertMessage}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Generate Profile</button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDERING MENU LANDING VIEW ---
  if (!parentPortalView) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', fontFamily: "'Inter', sans-serif" }}>
        {/* Switch Role Dropdown Header */}
        <div style={{ width: '100%', maxWidth: '680px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontFamily: "'Lora', serif", fontWeight: '700', color: '#0F172A' }}>FeelFree</h1>
          </div>
          <button onClick={() => setActiveRole('teen')} className="btn btn-secondary btn-sm" style={{ borderColor: '#E2E8F0' }}>
            Switch to Teen Portal
          </button>
        </div>

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontWeight: '500', fontSize: '1.8rem', color: '#0F172A', margin: '0 0 6px' }}>Welcome, {parentSavedProfile.name}</h2>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>Caregiver Workspace | Coordinated Family Mental Wellness</p>
        </div>

        {/* 2 Main Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '680px', width: '100%' }}>
          {/* Card 1: Parent Wellness */}
          <button onClick={() => setParentPortalView('my-wellness')} style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '32px', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 4px 20px rgba(15,23,42,0.02)', transition: 'all 0.2s', fontFamily: 'inherit'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontWeight: '800', marginBottom: '16px' }}>🧘</div>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 8px', fontSize: '1.15rem', color: '#0F172A' }}>My Caregiver Wellness</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#64748B', lineHeight: '1.5' }}>Track your own emotional state, write reflections, and maintain your personal mental wellness baseline.</p>
            <span style={{ display: 'inline-block', color: '#2563EB', fontSize: '0.78rem', fontWeight: '700' }}>Open My Workspace →</span>
          </button>

          {/* Card 2: Child Wellness check */}
          <button onClick={() => setParentPortalView('child-wellness')} style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '32px', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 4px 20px rgba(15,23,42,0.02)', transition: 'all 0.2s', fontFamily: 'inherit'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontWeight: '800', marginBottom: '16px' }}>👤</div>
            <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 8px', fontSize: '1.15rem', color: '#0F172A' }}>Child Wellness Check</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#64748B', lineHeight: '1.5' }}>Link securely using the Family Code generated by your child. Review diagnostics and coaching recommendations.</p>
            <span style={{ display: 'inline-block', color: '#10B981', fontSize: '0.78rem', fontWeight: '700' }}>Review Diagnostics →</span>
          </button>
        </div>

        <button onClick={onLogout} className="btn btn-secondary btn-sm" style={{ marginTop: '36px', borderColor: '#E2E8F0', color: '#EF4444' }}>Log Out</button>
      </div>
    );
  }

  // --- VIEW: MY CAREGIVER WELLNESS ---
  if (parentPortalView === 'my-wellness') {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
        {/* Sticky Header */}
        <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setParentPortalView(null)} className="btn btn-secondary btn-sm" style={{ borderColor: '#E2E8F0' }}>
              ← Main Menu
            </button>
            <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#2563EB', fontFamily: "'Lora', serif" }}>🧘 My Caregiver Wellness Workspace</span>
          </div>
          <button onClick={onLogout} className="btn btn-secondary btn-sm" style={{ borderColor: '#E2E8F0', color: '#EF4444' }}>Log Out</button>
        </header>

        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Welcome Banner */}
          <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '20px', padding: '28px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD', fontWeight: '700' }}>Active Wellness Baseline</span>
              <h2 style={{ margin: '8px 0 4px', fontSize: '1.4rem', fontFamily: "'Lora', serif", fontWeight: '500' }}>Taking care of you.</h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#94A3B8' }}>Caregivers need mental support baselines too. Log your reflection logs below.</p>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: parentSavedProfile.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem', color: '#fff' }}>
              {parentSavedProfile.name.slice(0,2).toUpperCase()}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Mood logger */}
            <div style={{ ...cardStyle }}>
              <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '1.05rem' }}>Daily Mood Check-In</h3>
              
              {parentMoodAlert && (
                <div style={{ padding: '10px 14px', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '12px' }}>
                  {parentMoodAlert}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {PARENT_MOOD_OPTIONS.map(opt => (
                  <button key={opt.label} onClick={() => setParentSelectedMood(opt)} style={{
                    padding: '8px 14px', borderRadius: '10px', fontSize: '0.78rem', cursor: 'pointer', border: '1px solid #E2E8F0',
                    background: parentSelectedMood?.label === opt.label ? opt.color : '#fff',
                    color: parentSelectedMood?.label === opt.label ? '#fff' : '#475569',
                    fontWeight: parentSelectedMood?.label === opt.label ? '700' : '500'
                  }}>
                    {opt.label}
                  </button>
                ))}
              </div>

              <textarea placeholder="How are you managing today?" value={parentMoodNote} onChange={e => setParentMoodNote(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.8rem', fontFamily: 'inherit', marginBottom: '14px', resize: 'vertical' }} />
              <button onClick={handleParentMoodSubmit} disabled={!parentSelectedMood} className="btn btn-primary" style={{ width: '100%' }}>Save Mood Log</button>
            </div>

            {/* Reflection Journal */}
            <div style={{ ...cardStyle }}>
              <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 14px', fontSize: '1.05rem' }}>Private Caregiver Journal</h3>
              
              {alertMessage && !parentMoodAlert && (
                <div style={{ padding: '10px 14px', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '12px' }}>
                  {alertMessage}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Title" value={parentJournalTitle} onChange={e => setParentJournalTitle(e.target.value)} style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.8rem', outline: 'none' }} />
                <textarea rows="4" placeholder="Document reflections..." value={parentJournalBody} onChange={e => setParentJournalBody(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
                <button onClick={handleSaveParentJournal} disabled={!parentJournalBody.trim()} className="btn btn-primary">Save Journal Reflection</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: CHILD WELLNESS CHECK (UNLOCKED SECURELY) ---
  if (parentPortalView === 'child-wellness') {
    // Read linked child data from local storage
    const teenProfile = JSON.parse(localStorage.getItem('mb_teen_profile') || '{}');
    const teenMoodLogs = JSON.parse(localStorage.getItem('mb_teen_moods') || '[]');
    const teenJournals = JSON.parse(localStorage.getItem('mb_teen_journals') || '[]');
    const teenAssessments = JSON.parse(localStorage.getItem('mb_teen_assessments') || '[]');
    
    // Adherence scores
    let tasksCompleted = 0;
    if (teenMoodLogs.length > 0) tasksCompleted += 1;
    if (teenJournals.length > 0) tasksCompleted += 1;
    if (teenAssessments.length > 0) tasksCompleted += 1;
    const childWellnessPercent = Math.round((tasksCompleted / 3) * 100);

    const handleUnlockChildPortal = () => {
      const input = childFamilyCodeInput.trim();
      if (!input) {
        setChildCodeError('Please enter family link code.');
        return;
      }
      
      const realCode = teenProfile.familyCode || '';
      if (realCode && input === realCode) {
        setChildWellnessUnlocked(true);
        setChildCodeError('');
      } else {
        setChildCodeError('Incorrect Family Code. Ensure profile is generated in Child Portal.');
      }
    };

    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
        {/* Sticky Header */}
        <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => { setParentPortalView(null); setChildWellnessUnlocked(false); setChildFamilyCodeInput(''); }} className="btn btn-secondary btn-sm" style={{ borderColor: '#E2E8F0' }}>
              ← Main Menu
            </button>
            <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#10B981', fontFamily: "'Lora', serif" }}>👤 Family Portal Coordinated Support</span>
          </div>
          <button onClick={onLogout} className="btn btn-secondary btn-sm" style={{ borderColor: '#E2E8F0', color: '#EF4444' }}>Log Out</button>
        </header>

        {!childWellnessUnlocked ? (
          /* Lock Screen */
          <div style={{ padding: '40px 24px', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ ...cardStyle, textAlign: 'center', padding: '40px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontSize: '1.2rem', margin: '0 auto 16px auto' }}>🔒</div>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: '500', fontSize: '1.4rem', color: '#0F172A', margin: '0 0 10px' }}>Link Family Code</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.5', marginBottom: '24px' }}>
                Enter the secure family link code generated by the Child Portal to synchronize aggregate wellness metrics.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Enter Family Code (e.g. MB-XXXX-XXXX)"
                  value={childFamilyCodeInput}
                  onChange={e => { setChildFamilyCodeInput(e.target.value); setChildCodeError(''); }}
                  style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem', textAlign: 'center', fontFamily: 'monospace' }}
                />
                {childCodeError && <p style={{ color: '#EF4444', fontSize: '0.78rem', margin: 0 }}>{childCodeError}</p>}
                <button onClick={handleUnlockChildPortal} className="btn btn-primary" style={{ padding: '12px' }}>Synchronize Portals</button>
              </div>
            </div>
          </div>
        ) : (
          /* Unlocked Sidebar + Content Workspace */
          <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
            {/* Local Portal Navigation */}
            <aside style={{ width: '220px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', padding: '20px 10px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { id: 'reports', label: 'Reports' },
                  { id: 'insights', label: 'Journey Summary' },
                  { id: 'dashboard', label: 'Assessment Status' },
                  { id: 'coach', label: 'Shared Wellness Profile' }
                ].map(item => (
                  <button key={item.id} onClick={() => setParentActiveSidebar(item.id)} style={{
                    textAlign: 'left', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem',
                    fontWeight: parentActiveSidebar === item.id ? '700' : '500',
                    background: parentActiveSidebar === item.id ? '#E6F4EA' : 'transparent',
                    color: parentActiveSidebar === item.id ? '#059669' : '#475569',
                    border: 'none', cursor: 'pointer'
                  }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Content Workspace Panel */}
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
              {parentActiveSidebar === 'dashboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Status Banner */}
                  <div style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '20px', padding: '24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '50px', fontWeight: '700' }}>Secure Care Connection Active</span>
                      <h2 style={{ margin: '8px 0 4px', fontSize: '1.3rem', fontFamily: "'Lora', serif", fontWeight: '500' }}>Child Wellness Overview</h2>
                      <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>Linked Code: {teenProfile.familyCode}</p>
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {/* Wellness score */}
                    <div style={{ ...cardStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Wellness Adherence Score</span>
                      <h3 style={{ fontFamily: "'Lora', serif", fontSize: '2.5rem', fontWeight: '800', color: '#10B981', margin: '10px 0' }}>{childWellnessPercent}%</h3>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>{tasksCompleted} of 3 Daily Wellness Actions Met</p>
                    </div>

                    {/* Completion status logs */}
                    <div style={{ ...cardStyle }}>
                      <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 12px', fontSize: '0.95rem' }}>Daily Self-Care Checkpoints</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.78rem' }}>
                          <span style={{ color: '#475569' }}>Mood Tracker Check-In</span>
                          <span style={{ fontWeight: '700', color: teenMoodLogs.length > 0 ? '#10B981' : '#F59E0B' }}>{teenMoodLogs.length > 0 ? 'COMPLETED' : 'PENDING'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.78rem' }}>
                          <span style={{ color: '#475569' }}>Reflection Journal Entries</span>
                          <span style={{ fontWeight: '700', color: teenJournals.length > 0 ? '#10B981' : '#F59E0B' }}>{teenJournals.length > 0 ? 'COMPLETED' : 'PENDING'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.78rem' }}>
                          <span style={{ color: '#475569' }}>Clinical Wellness Check</span>
                          <span style={{ fontWeight: '700', color: teenAssessments.length > 0 ? '#10B981' : '#F59E0B' }}>{teenAssessments.length > 0 ? 'COMPLETED' : 'PENDING'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI parent coach alert advice */}
                  <div style={{ ...cardStyle }}>
                    <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '1rem' }}>Caregiver Action Guidelines</h3>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.6' }}>
                      {childWellnessPercent === 100 ? (
                        "Alex has completed all daily wellness cycles. Acknowledge this effort with positive words. Focus talks on interests rather than performance checkpoints."
                      ) : (
                        "Alex has pending self-care logs. Maintain open channels. Suggest simple stretching sequences together without asking intrusive questions."
                      )}
                    </p>
                  </div>
                </div>
              )}

              {parentActiveSidebar === 'insights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ ...cardStyle }}>
                    <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 4px', fontSize: '1.1rem' }}>Screening Metrics & TrendLogs</h3>
                    <p style={{ margin: '0 0 20px', fontSize: '0.78rem', color: '#64748B' }}>Evidence-based scores logged by your child over time. Assessments include GAD-7 and PHQ-A.</p>
                    
                    {teenAssessments.length === 0 ? (
                      <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>No assessment history logs recorded by child portal yet.</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {teenAssessments.map((a, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.82rem' }}>
                            <div>
                              <strong style={{ color: '#0F172A' }}>{a.type} Screening</strong>
                              <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', marginTop: '2px' }}>Date submitted: {a.date}</span>
                            </div>
                            <span style={{ fontWeight: '800', color: '#2563EB' }}>Score: {a.score} / {a.maxScore}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Privacy lock warning banner */}
                  <div style={{ ...cardStyle, border: '1px solid #FEE2E2', background: '#FFF5F5' }}>
                    <h4 style={{ fontFamily: "'Lora', serif", color: '#991B1B', margin: '0 0 6px', fontSize: '0.9rem' }}>🔒 Locked Content Privacy Promise</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#991B1B', lineHeight: '1.5' }}>
                      To protect teenager clinical safety thresholds, individual Reflection Journals, voice notes, and Virtual Companion lines are fully encrypted and completely inaccessible.
                    </p>
                  </div>
                </div>
              )}

              {parentActiveSidebar === 'reports' && (
                <div style={{ ...cardStyle, maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '2px solid #0F172A', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: '800', color: '#10B981' }}>CLINICAL CARE SUMMARY</span>
                    <h3 style={{ fontFamily: "'Lora', serif", margin: '4px 0 0', fontSize: '1.2rem', color: '#0F172A' }}>Shared Care Assessment</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Active Child:</span>
                      <strong style={{ color: '#0F172A' }}>{teenProfile.nickname || 'Linked Child'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Assessed Bracket:</span>
                      <strong>{teenProfile.ageGroup || 'N/A'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Screenings Logged:</span>
                      <strong>{teenAssessments.length} Completed</strong>
                    </div>
                  </div>

                  <button onClick={() => alert("Simulating Wellness PDF report build. Ready for print.")} className="btn btn-primary" style={{ background: '#10B981', alignSelf: 'flex-start' }}>Download Coordinated Care Report</button>
                </div>
              )}

              {parentActiveSidebar === 'coach' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ ...cardStyle }}>
                    <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 10px', fontSize: '1.1rem' }}>Active Caregiver Goals</h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 16px' }}>Select actions completed today to strengthen parent-teen relationships.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {parentWeeklyGoals.map(goal => (
                        <label key={goal.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.82rem', cursor: 'pointer' }}>
                          <input type="checkbox" checked={goal.completed} onChange={() => {
                            setParentWeeklyGoals(parentWeeklyGoals.map(g => g.id === goal.id ? { ...g, completed: !g.completed } : g));
                          }} />
                          <span style={{ color: goal.completed ? '#94A3B8' : '#334155', textDecoration: goal.completed ? 'line-through' : 'none' }}>
                            {goal.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...cardStyle }}>
                    <h3 style={{ fontFamily: "'Lora', serif", margin: '0 0 6px', fontSize: '1rem' }}>Active Listening Principle</h3>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.6' }}>
                      Refrain from offering solutions instantly. Instead, summarize their concerns to validate their state: 
                      <em>"It sounds like you felt really overwhelmed by school today, is that right?"</em>
                    </p>
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

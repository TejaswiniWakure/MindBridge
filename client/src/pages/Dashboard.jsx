import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Heart, BookOpen, Moon, CheckSquare, Wind, Clipboard,
  Users, Calendar as CalendarIcon, Award, Settings, LogOut, Search, Bell,
  Sun, Plus, ChevronRight, TrendingUp, Sparkles, AlertCircle, PlusCircle,
  MinusCircle, CheckCircle2, Bookmark, Flame, Activity, HelpCircle, X, Info
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Active navigation page tab
  const [activeTab, setActiveTab] = useState('dashboard');
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  // Dark mode trigger
  const [darkMode, setDarkMode] = useState(false);
  // Notification menu trigger
  const [showNotifications, setShowNotifications] = useState(false);
  // Quick checkin modal trigger
  const [showMoodModal, setShowMoodModal] = useState(false);
  // Emergency support modal trigger
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  // Quick Actions floating menu trigger
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  // Selected chart range
  const [chartRange, setChartRange] = useState('7d');

  // Interactive Mock State: Daily Plan
  const [plan, setPlan] = useState([
    { id: 1, text: 'Drink 8 cups of water', checked: true },
    { id: 2, text: 'Log afternoon journal reflection', checked: false },
    { id: 3, text: '10 min mindfulness breathing practice', checked: false },
    { id: 4, text: '30 min physical exercise', checked: true },
    { id: 5, text: 'Off screen and sleep before 11 PM', checked: false },
  ]);

  // Interactive Mock State: Water Intake Clicker
  const [waterCups, setWaterCups] = useState(4);
  const targetCups = 8;

  // Interactive Mock State: Daily Mood state
  const [selectedMood, setSelectedMood] = useState({ emoji: '😊', label: 'Peaceful & Focused', time: 'Updated 2h ago' });

  // Interactive Mock State: Quick Notes
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('mindbridge_teen_notes') || 'Use this quick notepad to jot down coping strategies, journal keywords, or reminders...';
  });

  // Save notes locally on change
  useEffect(() => {
    localStorage.setItem('mindbridge_teen_notes', notes);
  }, [notes]);

  // Quote items to cycle
  const quotes = [
    { text: "Your feelings are valid, and it's okay to feel whatever you are feeling right now.", author: "MindBridge Guides" },
    { text: "Small daily steps lead to massive emotional growth over time.", author: "Calm Practices" },
    { text: "Breathe in peace, breathe out tension. You are in control of this moment.", author: "Mindfulness Coach" },
    { text: "Progress is not linear. Be gentle with yourself on difficult days.", author: "Dr. Jenkins" }
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Toggle checklist item
  const handleTogglePlan = (id) => {
    setPlan(
      plan.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
    toast.showToast('Daily plan status updated!', 'info');
  };

  // Calculate plan checklist completion percentage
  const planCompletion = Math.round(
    (plan.filter((item) => item.checked).length / plan.length) * 100
  );

  // Handle water cup logs
  const handleAddWater = () => {
    if (waterCups < 12) {
      setWaterCups(waterCups + 1);
      toast.showToast('Cup of water logged successfully!', 'success');
    }
  };
  const handleRemoveWater = () => {
    if (waterCups > 0) {
      setWaterCups(waterCups - 1);
    }
  };

  // Chart dataset based on timeframe selections
  const chartDatasets = {
    '7d': [
      { label: 'Mon', value: 4 },
      { label: 'Tue', value: 3.5 },
      { label: 'Wed', value: 5 },
      { label: 'Thu', value: 4.2 },
      { label: 'Fri', value: 4.8 },
      { label: 'Sat', value: 5.5 },
      { label: 'Sun', value: 5.2 },
    ],
    '30d': [
      { label: 'Wk 1', value: 3.8 },
      { label: 'Wk 2', value: 4.2 },
      { label: 'Wk 3', value: 4.7 },
      { label: 'Wk 4', value: 5.1 },
    ],
    '90d': [
      { label: 'Jul', value: 3.5 },
      { label: 'Aug', value: 4.1 },
      { label: 'Sep', value: 4.9 },
    ],
  };

  const chartData = chartDatasets[chartRange];
  const maxChartVal = 6;

  // Navigation Items
  const sidebarLinks = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
    { label: 'Mood Tracker', id: 'mood', icon: Heart },
    { label: 'Journal', id: 'journal', icon: BookOpen },
    { label: 'Sleep Tracker', id: 'sleep', icon: Moon },
    { label: 'Habit Tracker', id: 'habits', icon: CheckSquare },
    { label: 'Meditation', id: 'meditation', icon: Wind },
    { label: 'Assessments', id: 'assessments', icon: Clipboard },
    { label: 'Community Hub', id: 'community', icon: Users },
    { label: 'Appointments', id: 'appointments', icon: CalendarIcon },
    { label: 'Achievements', id: 'achievements', icon: Award },
    { label: 'Settings', id: 'settings', icon: Settings },
  ];

  const notifications = [
    { id: 1, text: 'Time for your afternoon mood check-in.', time: '10m ago', type: 'mood' },
    { id: 2, text: 'Your counselor confirmed your session for Friday.', time: '2h ago', type: 'appt' },
    { id: 3, text: 'You unlocked a new badge: "Meditation Master"!', time: '1d ago', type: 'badge' },
  ];

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row bg-[#F0F7FF] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans`}>
      
      {/* 1. SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-blue-100 dark:border-slate-800 p-6 gap-8 justify-between select-none">
        
        {/* Brand Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-md shadow-primary-500/10">
              <span className="font-heading font-black text-lg">M</span>
            </div>
            <span className="font-heading font-extrabold text-lg bg-gradient-to-r from-slate-900 via-primary-700 to-slate-850 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              MindBridge
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'bg-primary-50 dark:bg-slate-800 text-primary-650 dark:text-primary-400 shadow-xs border-l-3 border-primary-600'
                      : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850'
                    }
                  `}
                >
                  <Icon size={16} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              toast.showToast('Redirecting to home...', 'info');
              navigate('/');
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
          >
            <LogOut size={16} />
            Logout Account
          </button>
        </div>
      </aside>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        
        {/* 2. TOP NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-blue-100 dark:border-slate-800 px-6 h-16.5 flex items-center justify-between gap-4 select-none">
          {/* Greeting */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
              Welcome back
            </span>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white mt-1">
              Good Morning, Alex 👋
            </h1>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 rounded-xl w-64 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30 transition-all">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search journals, quests, exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs w-full focus:outline-none placeholder-slate-400"
            />
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3.5 relative">
            
            {/* Emergency trigger button */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-650 px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide uppercase border border-red-200/50 cursor-pointer"
            >
              Emergency help
            </button>

            {/* Theme trigger */}
            <button
              onClick={() => {
                const isDark = !darkMode;
                setDarkMode(isDark);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  toast.showToast('Dark mode enabled', 'info');
                } else {
                  document.documentElement.classList.remove('dark');
                  toast.showToast('Light mode enabled', 'info');
                }
              }}
              className="p-2 rounded-xl text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Sun size={18} />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800 relative cursor-pointer"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-600 animate-ping" />
            </button>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white font-extrabold text-xs">
              A
            </div>

            {/* Notifications Dropdown Panel */}
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-11 z-50 w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-2xl p-4 flex flex-col gap-3.5"
                  >
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Notifications</span>
                      <button onClick={() => setShowNotifications(false)} className="text-[10px] text-primary-600 hover:underline">
                        Dismiss All
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {notifications.map((item) => (
                        <div key={item.id} className="flex flex-col gap-0.5 text-xs pb-2.5 border-b border-slate-50 dark:border-slate-850/50 last:border-none last:pb-0">
                          <p className="text-slate-700 dark:text-slate-250 leading-relaxed">{item.text}</p>
                          <span className="text-[9px] text-slate-400">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </div>
        </header>

        {/* 3. MAIN DASHBOARD CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row gap-6">
          
          {/* Left Main Scroll Panel */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Top Grid Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Today's Mood */}
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex justify-between items-center relative overflow-hidden group">
                <div className="flex flex-col gap-3.5">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today's Mood</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                      {selectedMood.label}
                    </h3>
                    <p className="text-[10px] text-slate-450 mt-1">{selectedMood.time}</p>
                  </div>
                  <button
                    onClick={() => setShowMoodModal(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-xl transition-all shadow-md shadow-primary-500/10 cursor-pointer self-start"
                  >
                    Quick Check In
                  </button>
                </div>
                <div className="text-5xl select-none group-hover:scale-110 transition-transform duration-300">
                  {selectedMood.emoji}
                </div>
              </div>

              {/* Card 2: Current Wellness Score */}
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wellness Score</span>
                  <h3 className="text-2xl font-black text-slate-850 dark:text-white mt-0.5">84% Optimal</h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase mt-1">
                    <TrendingUp size={12} />
                    +5% from last week
                  </div>
                </div>
                {/* Circular Progress SVG */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      className="text-primary-600"
                      strokeDasharray="84, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-slate-800 dark:text-slate-150">
                    84%
                  </div>
                </div>
              </div>

            </div>

            {/* Mood History Chart */}
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Mood Analytics</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-500">Your wellness trajectory trend logs</p>
                </div>
                
                {/* Time range switcher */}
                <div className="flex bg-slate-50 dark:bg-slate-850 p-1 border border-slate-200/50 rounded-xl">
                  {['7d', '30d', '90d'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setChartRange(range)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer
                        ${chartRange === range
                          ? 'bg-white dark:bg-slate-750 text-primary-650 dark:text-primary-400 shadow-xs'
                          : 'text-slate-400 hover:text-slate-700'
                        }
                      `}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive SVG Chart Line */}
              <div className="w-full relative h-48 flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={15 + r * 110}
                      x2="500"
                      y2={15 + r * 110}
                      stroke="#f1f5f9"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* SVG Chart coordinates mapping */}
                  <path
                    d={`M 0 100 Q 80 50 160 80 T 320 60 T 500 40 L 500 150 L 0 150 Z`}
                    fill="url(#chart-fill)"
                  />
                  <path
                    d={`M 0 100 Q 80 50 160 80 T 320 60 T 500 40`}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="500" cy="40" r="4.5" fill="#4f46e5" />
                </svg>

                {/* X Axis Labels */}
                <div className="absolute bottom-[-15px] left-0 right-0 flex justify-between px-2 text-[9px] text-slate-400 font-semibold uppercase">
                  {chartData.map((d, i) => (
                    <span key={i}>{d.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Split row: Today's Plan Checklist & Habits Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Today's Plan Card */}
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-850 dark:text-white">Today's Wellness Plan</h3>
                  <p className="text-xs text-slate-450 mt-0.5">Your daily checklists for healthy routines</p>
                </div>

                {/* Checklist Progress indicator */}
                <div className="flex items-center justify-between gap-4 mt-2">
                  <div className="h-2 flex-grow bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-650 transition-all duration-500 rounded-full"
                      style={{ width: `${planCompletion}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-extrabold text-primary-650 whitespace-nowrap">{planCompletion}% Done</span>
                </div>

                {/* Checklist items */}
                <div className="flex flex-col gap-3 mt-2">
                  {plan.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleTogglePlan(item.id)}
                      className="flex items-center gap-3 cursor-pointer select-none py-0.5 group"
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all duration-150
                        ${item.checked
                          ? 'bg-primary-600 border-primary-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 group-hover:border-slate-350'
                        }
                      `}>
                        {item.checked && (
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" strokeWidth="4.5" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-250 font-medium'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Habit Tracker Clicker Cards */}
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-850 dark:text-white">Active Habit Tracking</h3>
                  <p className="text-xs text-slate-450 mt-0.5">Click parameters to log daily goals</p>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  {/* Water intake clicker */}
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/50 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💧</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-150">Water Intake</span>
                        <span className="text-[10px] text-slate-450 mt-0.5">Target: {targetCups} Cups ({waterCups}/{targetCups})</span>
                      </div>
                    </div>
                    {/* Add/remove controls */}
                    <div className="flex items-center gap-2">
                      <button onClick={handleRemoveWater} className="text-slate-400 hover:text-red-500 cursor-pointer">
                        <MinusCircle size={20} />
                      </button>
                      <span className="text-sm font-extrabold text-slate-800 dark:text-white w-5 text-center">{waterCups}</span>
                      <button onClick={handleAddWater} className="text-primary-650 hover:text-primary-800 cursor-pointer">
                        <PlusCircle size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Meditation Habit */}
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/50 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🧘</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-150">Mindfulness Meditation</span>
                        <span className="text-[10px] text-slate-450 mt-0.5">Log: 10 minutes session logged</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">Logged</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Wellness Insights & Quote Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card: Wellness Insights */}
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-850 dark:text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-primary-600" />
                    Wellness Insights
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-650 dark:text-primary-400 text-[9px] font-bold">AI Placeholder</span>
                </div>
                <div className="flex flex-col gap-3.5 mt-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-350">
                    <Info size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <p>Your sleep quality has increased by 15% after logging meditation sessions.</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-350">
                    <Info size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <p>Mondays show a lower mood trend. We suggest scheduling check-ins for the afternoon.</p>
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-10px] text-slate-50 dark:text-slate-800 font-extrabold text-[120px] select-none pointer-events-none font-sans opacity-40">
                  “
                </div>
                <div className="flex flex-col gap-2 relative">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quote of the Day</span>
                  <p className="text-xs text-slate-650 dark:text-slate-300 font-medium italic leading-relaxed mt-2">
                    "{quotes[quoteIndex].text}"
                  </p>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold mt-1">— {quotes[quoteIndex].author}</span>
                </div>
                <button
                  onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
                  className="text-right text-[10px] text-primary-650 dark:text-primary-400 font-extrabold cursor-pointer hover:underline self-end"
                >
                  Cycle Quote
                </button>
              </div>

            </div>

            {/* Sleep Summary */}
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col gap-5">
              <div>
                <h3 className="text-base font-bold text-slate-850 dark:text-white">Sleep Summary</h3>
                <p className="text-xs text-slate-450 mt-0.5">Track sleep duration and quality logs</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                {/* Stats block */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Average duration</span>
                    <span className="text-2xl font-black text-slate-800 dark:text-white mt-1">8.2 hrs</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Typical schedule</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">10:30 PM — 7:00 AM</span>
                  </div>
                </div>
                {/* Bar graph */}
                <div className="sm:col-span-2 relative h-28 flex items-end justify-between px-2 pt-4 border-b border-slate-100 dark:border-slate-800">
                  {/* Graph bars */}
                  {[7.5, 8.2, 6.8, 8.5, 7.8, 8.0, 8.2].map((val, i) => {
                    const pct = (val / 10) * 100;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1.5 flex-1 group">
                        {/* Bar */}
                        <div className="w-4 bg-primary-100 hover:bg-primary-600 rounded-t-sm transition-colors cursor-pointer relative h-20">
                          <div className="absolute bottom-0 left-0 right-0 bg-primary-500 rounded-t-sm" style={{ height: `${pct}%` }} />
                        </div>
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Achievements Animated Cards */}
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs flex flex-col gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-850 dark:text-white">Achievements & Streaks</h3>
                <p className="text-xs text-slate-450 mt-0.5">Celebrate wellness goals achieved</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {[
                  { title: '7 Day Streak', icon: '🔥', desc: 'Active logs weekly' },
                  { title: '30 Day Journal', icon: '✍️', desc: 'Consistent journaling' },
                  { title: 'Meditation Master', icon: '🧘', desc: '15 sessions completed' },
                  { title: 'Healthy Sleeper', icon: '😴', desc: 'Consistent schedules' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-4 bg-slate-50/50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 rounded-2xl flex flex-col items-center text-center gap-2 shadow-xs cursor-pointer select-none"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <h5 className="text-[10px] font-bold text-slate-800 dark:text-slate-100">{item.title}</h5>
                    <p className="text-[8.5px] text-slate-450">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Insights Sidebar Panel (Desktop only) */}
          <div className="hidden lg:flex flex-col w-72 gap-6 select-none">
            
            {/* Quick Notes pad */}
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Bookmark size={12} className="text-primary-600" />
                Quick Notepad
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-primary-500 resize-none leading-relaxed text-slate-650"
              />
            </div>

            {/* Upcoming Calendar Events */}
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <CalendarIcon size={12} className="text-primary-600" />
                Upcoming Events
              </span>
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200/30 flex flex-col gap-1 shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Today, 4:00 PM</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-150">Counseling Appointment</span>
                  <span className="text-[9px] text-slate-450 mt-0.5">With Dr. Jenkins (Online session)</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200/30 flex flex-col gap-1 shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Tomorrow, 9:00 AM</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-150">Group Meditation Session</span>
                  <span className="text-[9px] text-slate-450 mt-0.5">Guided breathing sequences (15 min)</span>
                </div>
              </div>
            </div>

            {/* Weekly Goal Progress Ring */}
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs flex flex-col gap-4.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weekly Goal Status</span>
              <div className="flex items-center gap-4">
                {/* SVG Progress Ring */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-teal-500"
                      strokeDasharray="60, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-800 dark:text-slate-150">
                    60%
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Daily check-ins logged</h4>
                  <span className="text-[10px] text-slate-450">Complete 3 more checks to unlock badge!</span>
                </div>
              </div>
            </div>

          </div>

        </main>

      </div>

      {/* 4. MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 z-40 flex lg:hidden items-center justify-around select-none shadow-lg">
        {sidebarLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const isActive = activeTab === link.id;

          return (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-1.5 cursor-pointer text-[9px] font-bold transition-all
                ${isActive
                  ? 'text-primary-650 dark:text-primary-400 scale-105'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
                }
              `}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{link.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* 5. FLOATING QUICK ACTION BUTTON (FAB) */}
      <div className="fixed bottom-20 right-5 lg:bottom-6 lg:right-6 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showQuickMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="flex flex-col gap-2 mb-2 select-none"
            >
              {/* Quick Mood check */}
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  setShowMoodModal(true);
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>😊</span> Log Mood
              </button>
              {/* Quick journal check */}
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  toast.showToast('Redirecting to Journal page...', 'info');
                  setActiveTab('journal');
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>✍️</span> Quick Journal
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowQuickMenu(!showQuickMenu)}
          className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-lg shadow-primary-500/20 active:scale-95 transition-all cursor-pointer"
        >
          {showQuickMenu ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {/* 6. MODAL: QUICK MOOD CHECK-IN */}
      <AnimatePresence>
        {showMoodModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoodModal(false)}
            />
            <motion.div
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-6 flex flex-col gap-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-base font-bold text-slate-850 dark:text-white">How are you feeling?</h4>
                <button onClick={() => setShowMoodModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              {/* Mood selector grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { emoji: '😊', label: 'Peaceful' },
                  { emoji: '🤩', label: 'Excited' },
                  { emoji: '😔', label: 'Sad' },
                  { emoji: '🧘', label: 'Focused' },
                  { emoji: '😴', label: 'Exhausted' },
                  { emoji: '😟', label: 'Anxious' },
                ].map((item) => (
                  <div
                    key={item.label}
                    onClick={() => {
                      setSelectedMood({ emoji: item.emoji, label: item.label, time: 'Updated just now' });
                      setShowMoodModal(false);
                      toast.showToast('Mood check-in logged successfully!', 'success');
                    }}
                    className="p-3.5 bg-slate-50 dark:bg-slate-850 hover:bg-primary-50 hover:border-primary-600 border border-slate-200/50 dark:border-slate-800 rounded-2xl flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-150 active:scale-95"
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-250">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. MODAL: EMERGENCY HOTLINES & HELPDESK */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-red-950/20 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmergencyModal(false)}
            />
            <motion.div
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-xl overflow-hidden p-6 flex flex-col gap-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Header info */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-red-650">
                  <AlertCircle size={22} className="animate-pulse" />
                  <h4 className="text-base font-bold">Emergency Support Resources</h4>
                </div>
                <button onClick={() => setShowEmergencyModal(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              {/* Call hotlines list */}
              <div className="flex flex-col gap-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  If you are experiencing severe distress or crisis thoughts, please connect with standard helpline resources instantly. MindBridge is an assistant, not a substitute for clinical services.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-100 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold text-red-600">USA Suicide & Crisis Lifeline</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-white">Call or Text 988</span>
                    </div>
                    <a href="tel:988" className="bg-red-650 hover:bg-red-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg cursor-pointer">Call 988</a>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold text-slate-450">Crisis Text Line</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-white">Text HOME to 741741</span>
                    </div>
                    <a href="sms:741741" className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg cursor-pointer">Text Now</a>
                  </div>
                </div>

                {/* Coping exercise placeholder */}
                <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 rounded-xl flex flex-col gap-1.5 mt-1">
                  <h5 className="text-xs font-bold text-primary-750 flex items-center gap-1.5">🧘 Grounding Box Breathing</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Try breathing in for 4 seconds, holding for 4 seconds, breathing out for 4 seconds, and holding for 4 seconds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;

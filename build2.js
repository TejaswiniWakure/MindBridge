import fs from 'fs';
import path from 'path';

const files = {
  'src/components/ui/Badge.jsx': `import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({ children, variant = 'info', size = 'md', className }) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  };
  return (
    <span className={twMerge(clsx('inline-flex items-center font-medium rounded-full', variants[variant], sizes[size], className))}>
      {children}
    </span>
  );
};`,

  'src/components/ui/LoadingSpinner.jsx': `import React from 'react';
export const LoadingSpinner = ({ fullPage }) => {
  const spinner = (
    <div className="flex items-center justify-center">
      <svg className="animate-spin h-8 w-8 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
  if (fullPage) return <div className="fixed inset-0 flex items-center justify-center bg-primary-light bg-opacity-75 z-50">{spinner}</div>;
  return spinner;
};`,

  'src/components/ui/EmptyState.jsx': `import React from 'react';
import { Button } from './Button';
export const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-dashed border-gray-300">
    {Icon && <div className="bg-gray-50 p-4 rounded-full mb-4 text-gray-400"><Icon size={32} /></div>}
    <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
    {actionText && <Button onClick={onAction}>{actionText}</Button>}
  </div>
);`,

  'src/layouts/PublicLayout.jsx': `import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <Leaf className="h-6 w-6 text-teal" />
              <span className="text-xl font-bold font-serif tracking-tight">Mindwell</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
              <a href="#wellbeing" className="text-gray-600 hover:text-primary transition-colors">Wellbeing</a>
              <Link to="/professionals" className="text-gray-600 hover:text-primary transition-colors">Professionals</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Log in</Link>
              <Link to="/signup"><Button size="sm">Sign up</Button></Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-primary text-primary-light py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-teal" />
            <span className="text-xl font-bold font-serif">Mindwell</span>
          </div>
          <div className="text-sm opacity-75">&copy; {new Date().getFullYear()} Mindwell. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};`,

  'src/layouts/UserLayout.jsx': `import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Home, ClipboardList, Target, LineChart, BookHeart, Bot, Users, Calendar, LogOut, Menu } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const UserLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: Home },
    { name: 'Assessments', path: '/app/assessments', icon: ClipboardList },
    { name: 'My Plan', path: '/app/my-plan', icon: Target },
    { name: 'Progress', path: '/app/progress', icon: LineChart },
    { name: 'Journal', path: '/app/journal', icon: BookHeart },
    { name: 'AI Coach', path: '/app/ai-coach', icon: Bot },
    { name: 'Professionals', path: '/app/professionals', icon: Users },
    { name: 'Appointments', path: '/app/appointments', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-primary-light flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 text-primary">
          <Leaf className="h-6 w-6 text-teal" />
          <span className="text-xl font-bold font-serif">Mindwell</span>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                \`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors \${
                  isActive ? 'bg-teal-light text-teal-dark font-medium' : 'text-gray-600 hover:bg-gray-50'
                }\`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="md:hidden flex items-center gap-2 text-primary">
            <Leaf className="h-6 w-6 text-teal" />
            <span className="font-bold font-serif">Mindwell</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="h-8 w-8 bg-sage text-white rounded-full flex items-center justify-center font-medium">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};`,
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 2 complete');

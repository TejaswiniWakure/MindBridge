import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  Activity,
  Sparkles,
  Users,
  BarChart2,
  Calendar,
  UserCheck,
  ClipboardList,
  Shield,
  Settings,
  User
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!user) return null;

  // Base navigation links for everyone
  const getNavLinks = (role) => {
    switch (role) {
      case 'teen':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'My Journal', path: '/journal', icon: BookOpen },
          { name: 'Mood Tracker', path: '/mood', icon: Heart },
          { name: 'Wellbeing Quests', path: '/quests', icon: Activity },
          { name: 'AI Therapy Helper', path: '/ai-chat', icon: Sparkles },
        ];
      case 'parent':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Family Insights', path: '/family', icon: Users },
          { name: 'Progress Tracker', path: '/reports', icon: BarChart2 },
          { name: 'Consultations', path: '/consultations', icon: Calendar },
        ];
      case 'therapist':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Client Directory', path: '/clients', icon: UserCheck },
          { name: 'Appt Schedule', path: '/schedule', icon: Calendar },
          { name: 'Clinical Logs', path: '/logs', icon: ClipboardList },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'User Management', path: '/users', icon: Users },
          { name: 'Platform Settings', path: '/platform', icon: Shield },
        ];
      default:
        return [{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }];
    }
  };

  const navLinks = getNavLinks(user.role);

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80 pt-16 flex flex-col justify-between transform transition-transform duration-300 lg:transform-none lg:static lg:w-60 lg:h-[calc(100vh-4rem)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="px-4 py-6 flex-1 overflow-y-auto">
          {/* Section title */}
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider px-3.5 block mb-4">
            Navigation Portal
          </span>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3.5 px-3.5 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-slate-200'
                    }
                  `}
                >
                  <Icon size={18} />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User context footer in Sidebar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30">
          <div className="flex flex-col gap-3">
            <NavLink
              to="/profile"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200'
                  : 'text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850'
                }
              `}
            >
              <User size={16} />
              My Profile
            </NavLink>
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200'
                  : 'text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850'
                }
              `}
            >
              <Settings size={16} />
              Settings
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

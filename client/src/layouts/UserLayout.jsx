import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Home, Target, LineChart, CheckSquare, Bot, Users, Stethoscope, Calendar, BookOpen, UserCircle, LogOut } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const UserLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navGroups = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', path: '/app/dashboard', icon: Home }
      ]
    },
    {
      title: 'MY WELLNESS',
      items: [
        { name: 'Wellness Plan', path: '/app/wellness-plan', icon: Target },
        { name: 'Progress', path: '/app/progress', icon: LineChart },
        { name: 'Check-ins', path: '/app/check-ins', icon: CheckSquare }
      ]
    },
    {
      title: 'COMPANION',
      items: [
        { name: 'AI Companion', path: '/app/support/companion', icon: Bot }
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { name: 'Support Circle', path: '/app/support/circle', icon: Users },
        { name: 'Professionals', path: '/app/professionals', icon: Stethoscope },
        { name: 'Appointments', path: '/app/appointments', icon: Calendar }
      ]
    },
    {
      title: 'RESOURCES',
      items: [
        { name: 'Resources', path: '/app/resources', icon: BookOpen }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex selection:bg-[#EEEEEC] selection:text-[#202020]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#DCDCDC] sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 text-[#202020] mb-2">
          <Leaf className="h-6 w-6 text-[#292929]" />
          <span className="text-xl font-bold font-serif uppercase tracking-tight">Mindwell</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-6">
          {navGroups.map((group, i) => (
            <div key={i}>
              <h3 className="px-3 text-[10px] font-bold text-[#858585] uppercase tracking-widest mb-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        isActive ? 'bg-[#EEEEEC] text-[#202020]' : 'text-[#555555] hover:bg-[#F6F6F4] hover:text-[#181818]'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-[#DCDCDC] space-y-1">
          <NavLink to="/app/profile" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-[#EEEEEC] text-[#202020]' : 'text-[#555555] hover:bg-[#F6F6F4]'}`}>
            <UserCircle className="h-4 w-4" />
            Profile
          </NavLink>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-[#555555] hover:bg-[#F6F6F4] transition-colors text-sm font-medium">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LayoutDashboard, Users, Calendar, MessageSquare, AlertCircle, LogOut } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const TherapistLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner fullPage />;
  if (!user || user.role !== 'therapist') {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/therapist/dashboard', icon: LayoutDashboard },
    { name: 'My Clients', path: '/therapist/clients', icon: Users },
    { name: 'Calendar', path: '/therapist/sessions', icon: Calendar },
    { name: 'Messages', path: '/therapist/messages', icon: MessageSquare },
    { name: 'Alerts', path: '/therapist/alerts', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex selection:bg-[#EEEEEC] selection:text-[#202020]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#DCDCDC] sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 text-[#202020] mb-6">
          <Leaf className="h-6 w-6 text-[#292929]" />
          <span className="text-xl font-bold font-serif uppercase tracking-tight">Mindwell Pro</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-sm font-medium ${
                  isActive ? 'bg-[#EEEEEC] text-[#202020]' : 'text-[#555555] hover:bg-[#F6F6F4] hover:text-[#181818]'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-[#DCDCDC]">
          <div className="flex items-center gap-3 px-3 py-3 mb-2">
             <div className="h-8 w-8 bg-[#202020] text-white rounded-full flex items-center justify-center font-bold text-xs">
                {user.name?.charAt(0).toUpperCase()}
             </div>
             <div className="text-sm font-bold text-[#181818]">Dr. {user.name?.split(' ')[1] || user.name}</div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-[#555555] hover:bg-[#F6F6F4] transition-colors text-sm font-medium">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 md:p-10 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

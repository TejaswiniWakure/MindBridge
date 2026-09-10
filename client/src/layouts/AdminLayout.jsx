import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Stethoscope, Activity, Settings, LogOut } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner fullPage />;
  if (!user || user.role !== 'admin') {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: Activity },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Therapists', path: '/admin/therapists', icon: Stethoscope },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-2 text-white">
          <Shield className="h-6 w-6 text-danger" />
          <span className="text-xl font-bold font-serif">Admin Portal</span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white font-medium' : 'hover:bg-gray-800/50 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="text-sm text-gray-500 mr-4">{user.email}</div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
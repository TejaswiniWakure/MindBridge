import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('user@mindwell.com');
  const [password, setPassword] = useState('password123');
  const [portal, setPortal] = useState('USER PORTAL');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login based on seed data
    login({ name: 'Demo User', email, role: portal === 'USER PORTAL' ? 'user' : 'therapist' });
    if (portal === 'USER PORTAL') navigate('/app/dashboard');
    else navigate('/therapist/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
        <div className="flex justify-center mb-6">
          <Leaf className="w-10 h-10 text-teal" />
        </div>
        <h2 className="text-2xl font-serif text-center mb-6">Sign in to Mindwell</h2>
        
        <div className="flex space-x-2 mb-8 bg-neutral-100 p-1 rounded-lg">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${portal === 'USER PORTAL' ? 'bg-white shadow-sm text-primary' : 'text-neutral-500'}`}
            onClick={() => setPortal('USER PORTAL')}
          >
            USER PORTAL
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${portal === 'THERAPIST PORTAL' ? 'bg-white shadow-sm text-primary' : 'text-neutral-500'}`}
            onClick={() => setPortal('THERAPIST PORTAL')}
          >
            THERAPIST PORTAL
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal" required />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-neutral-600">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-teal hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all mt-6">
            Sign in
          </button>
        </form>
        <p className="text-center text-sm text-neutral-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-teal font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

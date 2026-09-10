import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ email, password }); 
      const user = data.user;
      if (user?.role === 'admin') navigate('/admin/dashboard');
      else if (user?.role === 'therapist') navigate('/therapist/dashboard');
      else navigate('/app/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] p-4">
      <Card className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl" padding="lg">
        <div className="flex flex-col items-center mb-8">
          <Leaf className="h-10 w-10 text-teal mb-4" />
          <h1 className="text-2xl font-serif font-bold text-primary text-center">
            Sign in to Mindwell
          </h1>
          <p className="text-gray-500 mt-2 text-sm text-center">
            Enter your details to continue to your portal.
          </p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 border border-red-100 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@example.com"
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button type="submit" className="w-full py-3 rounded-full text-base font-medium shadow-sm hover:shadow-md transition-all" loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-teal font-medium hover:text-teal-dark transition-colors">Sign up</Link>
        </p>
      </Card>
    </div>
  );
};
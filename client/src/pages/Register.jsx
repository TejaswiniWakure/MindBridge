import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teen');
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { label: 'Teen / Youth', value: 'teen' },
    { label: 'Parent / Guardian', value: 'parent' },
    { label: 'Professional Therapist', value: 'therapist' },
    { label: 'System Administrator', value: 'admin' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      showToast('Please fill in all fields', 'warning');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, role);
      showToast('Registration successful! Welcome.', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 min-h-[70vh]">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center flex flex-col gap-1 border-none pb-0">
            <CardTitle className="text-2xl font-bold font-heading">
              Create Account
            </CardTitle>
            <CardDescription>
              Join MindWell to start your well-being journey
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Full Name"
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={User}
                required
              />
              <Input
                label="Email Address"
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />
              <Select
                label="Select Your Portal Role"
                id="role"
                options={roleOptions}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />

              <Button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl"
                isLoading={loading}
              >
                Create Account
              </Button>
            </form>

            <div className="text-center mt-4">
              <span className="text-xs text-slate-450">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-650 hover:underline font-semibold">
                  Sign in
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

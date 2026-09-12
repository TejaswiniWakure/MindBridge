import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { Leaf, User, Stethoscope } from 'lucide-react';

export const Signup = () => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ ...formData, role });
      navigate(role === 'therapist' ? '/therapist/application' : '/app/onboarding');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light p-4">
      <Card className="w-full max-w-2xl" padding="lg">
        <div className="flex flex-col items-center mb-8">
          <Leaf className="h-10 w-10 text-teal mb-4" />
          <h1 className="text-2xl font-serif font-bold text-primary">Create your Mindwell account</h1>
          {!role && <p className="text-gray-500 mt-2">How would you like to use Mindwell?</p>}
        </div>

        {!role ? (
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setRole('user')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal text-left transition-colors flex flex-col items-start gap-4"
            >
              <div className="bg-teal-light p-3 rounded-full text-teal-dark"><User /></div>
              <div>
                <h3 className="font-semibold text-lg">User Portal</h3>
                <p className="text-sm text-gray-500">For individuals seeking mental wellness support.</p>
              </div>
            </button>
            <button
              onClick={() => setRole('therapist')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary text-left transition-colors flex flex-col items-start gap-4"
            >
              <div className="bg-sage-light p-3 rounded-full text-primary"><Stethoscope /></div>
              <div>
                <h3 className="font-semibold text-lg">Therapist Portal</h3>
                <p className="text-sm text-gray-500">For verified mental-health professionals.</p>
              </div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500 cursor-pointer" onClick={() => setRole(null)}>
              &larr; Back to roles
            </div>
            <Input label="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <Input label="Email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <Input label="Password" type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <Button type="submit" className="w-full mt-4" loading={loading}>Sign Up</Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-teal font-medium hover:underline">Sign in</Link>
        </p>
      </Card>
    </div>
  );
};
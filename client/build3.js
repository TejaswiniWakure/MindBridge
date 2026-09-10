import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/public/Landing.jsx': `import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <div className="bg-primary-light">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex-1 space-y-8"
        >
          <h1 className="text-5xl lg:text-7xl font-bold font-serif text-primary leading-tight">
            Understand yourself. <br/><span className="text-teal">Move forward.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg">
            A comprehensive mental wellness platform that adapts to you. Track your mood, follow personalized plans, and connect with professionals.
          </p>
          <div className="flex gap-4">
            <Link to="/signup"><Button size="lg">Get Started</Button></Link>
            <Button variant="outline" size="lg">Explore Mindwell</Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          {/* Mock UI Visualization */}
          <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800">Your Wellbeing Score</h3>
              <span className="text-2xl font-bold text-teal">72</span>
            </div>
            <div className="space-y-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-teal" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-sage-light/30 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Stress Level</p>
                  <p className="font-medium text-sage">Moderate</p>
                </div>
                <div className="bg-teal-light/50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Sleep Quality</p>
                  <p className="font-medium text-teal-dark">Improving</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-sage-light rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-teal-light rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-y-1/4 -translate-x-1/4"></div>
        </motion.div>
      </section>
      
      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary">How Mindwell Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Take Assessment', desc: 'Answer a few questions to help us understand where you are.' },
              { title: 'Understand Wellbeing', desc: 'Get a clear picture of your mood, stress, and anxiety.' },
              { title: 'Follow Plan', desc: 'Complete daily tasks curated specifically for you.' },
              { title: 'Track Progress', desc: 'See your improvement over time and adjust as needed.' }
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 bg-teal-light text-teal-dark rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{i + 1}</div>
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 bg-teal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-6">Start understanding yourself today.</h2>
          <Link to="/signup"><Button size="lg" className="bg-white text-teal hover:bg-gray-50">Get Started</Button></Link>
        </div>
      </section>
    </div>
  );
};`,

  'src/pages/public/Login.jsx': `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const [isTherapist, setIsTherapist] = useState(false);
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
      await login({ email, password, role: isTherapist ? 'therapist' : 'user' });
      navigate(isTherapist ? '/therapist' : '/app');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light p-4">
      <Card className="w-full max-w-md" padding="lg">
        <div className="flex flex-col items-center mb-8">
          <Leaf className="h-10 w-10 text-teal mb-4" />
          <h1 className="text-2xl font-serif font-bold text-primary">Sign in to Mindwell</h1>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            className={\`flex-1 py-2 text-sm font-medium rounded-md transition-colors \${!isTherapist ? 'bg-white shadow text-primary' : 'text-gray-500'}\`}
            onClick={() => setIsTherapist(false)}
          >
            USER PORTAL
          </button>
          <button
            className={\`flex-1 py-2 text-sm font-medium rounded-md transition-colors \${isTherapist ? 'bg-white shadow text-primary' : 'text-gray-500'}\`}
            onClick={() => setIsTherapist(true)}
          >
            THERAPIST PORTAL
          </button>
        </div>

        {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full" loading={loading}>Sign In</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-teal font-medium hover:underline">Sign up</Link>
        </p>
      </Card>
    </div>
  );
};`,

  'src/pages/public/Signup.jsx': `import React, { useState } from 'react';
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
};`,
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 3 complete');

import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/user/Dashboard.jsx': `import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-serif font-bold text-primary">Good morning, {user?.name || 'User'}.</h1>
        <p className="text-gray-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="font-semibold text-lg mb-4">Today's Mood</h3>
            <div className="flex gap-4">
              {[1,2,3,4,5].map(m => (
                <button key={m} className="w-12 h-12 rounded-full bg-gray-100 hover:bg-teal-light text-xl flex items-center justify-center transition-colors">
                  {['😢','😕','😐','🙂','😄'][m-1]}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Today's Tasks</h3>
              <span className="text-sm text-teal font-medium">1 of 3 completed</span>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Morning Check-in', type: 'Journal', done: true },
                { title: '10 Min Breathing', type: 'Exercise', done: false },
                { title: 'Read: Understanding Stress', type: 'Learn', done: false }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <CheckCircle2 className={\`w-6 h-6 \${task.done ? 'text-teal' : 'text-gray-300'}\`} />
                  <div>
                    <p className={\`font-medium \${task.done ? 'text-gray-500 line-through' : 'text-gray-800'}\`}>{task.title}</p>
                    <p className="text-xs text-gray-500">{task.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-white">
            <h3 className="font-semibold mb-2">Progress Summary</h3>
            <p className="text-primary-light text-sm mb-4">Week 2 of Anxiety Management Plan</p>
            <div className="h-2 bg-primary-dark rounded-full mb-2">
              <div className="h-full bg-teal rounded-full w-[45%]"></div>
            </div>
            <p className="text-xs text-primary-light text-right mb-4">45% this week</p>
            <Button variant="secondary" className="w-full text-sm">View Insights</Button>
          </Card>

          <Card>
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-sage-light text-primary p-2 rounded-lg"><MessageCircle /></div>
              <div>
                <h3 className="font-semibold">AI Coach</h3>
                <p className="text-sm text-gray-500">Need to talk?</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">Open AI Coach</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};`,

  'src/App.jsx': `import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { UserLayout } from './layouts/UserLayout';
import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';
import { Dashboard } from './pages/user/Dashboard';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'therapist' ? '/therapist' : '/app'} />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* User Portal */}
      <Route path="/app" element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<div className="p-8 text-center text-gray-500">Page under construction</div>} />
      </Route>

      {/* Therapist Portal Placeholder */}
      <Route path="/therapist" element={<ProtectedRoute role="therapist"><div>Therapist Portal</div></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;`,

  'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 4 complete');

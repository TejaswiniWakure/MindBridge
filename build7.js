import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/user/Onboarding.jsx': `import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const Onboarding = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card padding="lg" className="text-center space-y-6">
        <h1 className="text-2xl font-serif font-bold text-primary">Welcome to Mindwell</h1>
        <p className="text-gray-600">Let's set up your profile and understand your goals.</p>
        <div className="pt-4">
          <Button onClick={() => window.location.href = '/app/dashboard'}>Complete Onboarding</Button>
        </div>
      </Card>
    </div>
  );
};`,

  'src/pages/user/Assessments.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const Assessments = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">Assessments</h1>
    <Card>
      <h3 className="font-semibold mb-2">PHQ-9 Depression Screener</h3>
      <p className="text-sm text-gray-500 mb-4">A brief assessment to measure depression severity.</p>
      <button className="text-teal font-medium hover:underline">Take Assessment &rarr;</button>
    </Card>
  </div>
);`,

  'src/pages/user/Progress.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const Progress = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">Progress</h1>
    <Card>
      <h3 className="font-semibold mb-2">Mood Trends</h3>
      <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">Chart Placeholder</div>
    </Card>
  </div>
);`,

  'src/pages/therapist/Dashboard.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const TherapistDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">Therapist Dashboard</h1>
    <div className="grid grid-cols-3 gap-6">
      <Card><h3 className="text-gray-500 text-sm">Today's Sessions</h3><p className="text-2xl font-bold">4</p></Card>
      <Card><h3 className="text-gray-500 text-sm">Active Clients</h3><p className="text-2xl font-bold">12</p></Card>
      <Card><h3 className="text-gray-500 text-sm">Unread Messages</h3><p className="text-2xl font-bold">3</p></Card>
    </div>
  </div>
);`,

  'src/pages/admin/Dashboard.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
    <div className="grid grid-cols-3 gap-6">
      <Card><h3 className="text-gray-500 text-sm">Total Users</h3><p className="text-2xl font-bold">1,204</p></Card>
      <Card><h3 className="text-gray-500 text-sm">Therapists</h3><p className="text-2xl font-bold">45</p></Card>
      <Card><h3 className="text-gray-500 text-sm">Revenue</h3><p className="text-2xl font-bold">$12k</p></Card>
    </div>
  </div>
);`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build 7 complete');

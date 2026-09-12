import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/user/AssessmentFlow.jsx': `import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const AssessmentFlow = () => {
  const [step, setStep] = useState(0);
  const questions = [
    "Over the past two weeks, how often have you been feeling down, depressed, or hopeless?",
    "How often have you had little interest or pleasure in doing things?",
    "How often have you been feeling nervous, anxious, or on edge?"
  ];
  const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

  if (step >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <Card padding="lg">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Assessment Complete</h2>
          <p className="text-gray-600 mb-6">Thank you for sharing. We're updating your personalized plan.</p>
          <Button onClick={() => window.location.href = '/app/snapshot'}>View Wellbeing Snapshot</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm text-gray-500 font-medium">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
        </div>
        <ProgressBar progress={((step + 1) / questions.length) * 100} />
      </div>

      <Card padding="lg" className="space-y-8">
        <h2 className="text-xl font-medium text-gray-900">{questions[step]}</h2>
        <div className="space-y-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setStep(step + 1)}
              className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-teal hover:bg-teal-light/20 transition-all font-medium text-gray-700"
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="pt-4 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
        </div>
      </Card>
    </div>
  );
};`,

  'src/pages/user/WellbeingSnapshot.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AssessmentChart } from '../../components/charts/AssessmentChart';
import { Info, Sparkles } from 'lucide-react';

export const WellbeingSnapshot = () => {
  const data = [
    { subject: 'Depression', A: 40 },
    { subject: 'Anxiety', A: 60 },
    { subject: 'Stress', A: 75 },
    { subject: 'Sleep', A: 30 },
    { subject: 'Wellness', A: 50 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Your Wellbeing Snapshot</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center">
          <AssessmentChart data={data} />
        </Card>
        
        <Card className="bg-sage-light/30 border-none space-y-4">
          <div className="flex items-center gap-2 text-teal-dark font-semibold">
            <Sparkles size={20} /> AI Summary
          </div>
          <p className="text-gray-800 leading-relaxed">
            Based on your recent assessments, you're experiencing elevated levels of stress and anxiety, which seems to be impacting your sleep quality. Your mood remains relatively stable, but there's room for improvement in daily wellness habits. We recommend focusing on stress-reduction techniques this week.
          </p>
          <div className="text-xs text-gray-500 flex items-start gap-1 mt-4">
            <Info size={14} className="shrink-0 mt-0.5" />
            <span>This is an AI-generated summary for informational purposes, not a medical diagnosis.</span>
          </div>
          <Button className="w-full mt-4" onClick={() => window.location.href='/app/my-plan'}>Update My Plan</Button>
        </Card>
      </div>
    </div>
  );
};`,

  'src/pages/user/SupportCircle.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Shield, Plus } from 'lucide-react';

export const SupportCircle = () => {
  const members = [
    { id: 1, name: 'Jane Doe', relation: 'Partner', permissions: ['Mood', 'Emergencies'] }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Support Circle</h1>
          <p className="text-gray-500 text-sm">Keep trusted people close.</p>
        </div>
        <Button className="gap-2"><Plus size={18}/> Add Member</Button>
      </div>

      <div className="grid gap-4">
        {members.map(m => (
          <Card key={m.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={m.name} />
              <div>
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.relation}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {m.permissions.map(p => (
                <span key={p} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 flex items-center gap-1">
                  <Shield size={10} /> {p}
                </span>
              ))}
              <Button variant="outline" size="sm" className="ml-2">Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};`,

  'src/pages/user/Professionals.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { Search, Star, MapPin } from 'lucide-react';

export const Professionals = () => {
  const therapists = [
    { id: 1, name: 'Dr. Sarah Jenkins', title: 'Clinical Psychologist', spec: 'Anxiety, Depression', rate: '$120/session', rating: 4.9 }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Find a Professional</h1>
      <div className="flex gap-4">
        <Input placeholder="Search by name or specialty..." className="flex-1" />
        <Button variant="secondary" className="gap-2"><Search size={18}/> Search</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {therapists.map(t => (
          <Card key={t.id} className="flex flex-col h-full">
            <div className="flex gap-4 mb-4">
              <Avatar name={t.name} size="lg" />
              <div>
                <h3 className="font-semibold text-lg text-primary">{t.name}</h3>
                <p className="text-sm text-gray-600">{t.title}</p>
                <div className="flex items-center gap-1 text-sm text-warning mt-1">
                  <Star size={14} fill="currentColor" /> {t.rating}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4 flex-1">
              <p><strong>Specialties:</strong> {t.spec}</p>
              <p><strong>Rate:</strong> {t.rate}</p>
            </div>
            <Button className="w-full" onClick={() => window.location.href=\`/app/professionals/\${t.id}\`}>View Profile</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};`,

  'src/pages/user/ProfessionalProfile.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export const ProfessionalProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => window.history.back()}>&larr; Back to directory</Button>
      <Card padding="lg">
        <div className="flex items-start gap-6">
          <Avatar name="Dr. Sarah Jenkins" size="lg" className="w-24 h-24 text-2xl" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary">Dr. Sarah Jenkins</h1>
            <p className="text-gray-600 mb-4">Clinical Psychologist</p>
            <p className="text-gray-800 leading-relaxed mb-6">
              I specialize in cognitive behavioral therapy for anxiety and depression. My approach is collaborative and evidence-based.
            </p>
            <Button>Book Appointment</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};`,

  'src/pages/user/Appointments.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar as CalIcon, Video } from 'lucide-react';

export const Appointments = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Appointments</h1>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="bg-teal-light text-teal-dark p-3 rounded-xl flex flex-col items-center justify-center min-w-[80px]">
              <span className="text-xs font-bold uppercase">Oct</span>
              <span className="text-2xl font-bold">12</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-primary">Dr. Sarah Jenkins</h3>
              <p className="text-gray-500 text-sm flex items-center gap-1"><CalIcon size={14}/> 10:00 AM - 10:50 AM</p>
              <p className="text-gray-500 text-sm mt-1">Video Session</p>
            </div>
          </div>
          <Button className="gap-2"><Video size={16}/> Join Session</Button>
        </div>
      </Card>
    </div>
  );
};`,

  'src/pages/user/Settings.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const Settings = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Settings</h1>
      <Card className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Profile</h3>
        <Input label="Full Name" defaultValue="User Name" />
        <Input label="Email" defaultValue="user@example.com" disabled />
        <Button>Save Changes</Button>
      </Card>
      <Card className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2 text-danger">Danger Zone</h3>
        <Button variant="danger">Delete Account</Button>
      </Card>
    </div>
  );
};`,

  'src/pages/user/Help.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Phone, ShieldAlert } from 'lucide-react';

export const Help = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Help & Safety</h1>
      
      <Card className="bg-danger/10 border-danger/20 space-y-4">
        <div className="flex items-center gap-2 text-danger font-bold text-lg">
          <ShieldAlert /> Emergency Resources
        </div>
        <p className="text-gray-800">If you or someone else is in immediate danger, please contact local emergency services immediately.</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-danger/20">
            <Phone className="text-danger" />
            <div>
              <p className="font-bold text-gray-900">National Crisis Hotline</p>
              <p className="text-danger font-mono text-lg">988</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build user complete');

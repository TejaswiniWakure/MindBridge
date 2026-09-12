import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/therapist/Application.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const Application = () => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-serif font-bold text-primary mb-6">Professional Verification</h1>
      <Card className="space-y-4">
        <Input label="License Number" required />
        <Input label="Years of Experience" type="number" required />
        <Input label="Specialties (comma separated)" required />
        <div className="pt-4">
          <Button className="w-full" onClick={() => window.location.href='/therapist/application/status'}>Submit Application</Button>
        </div>
      </Card>
    </div>
  );
};`,

  'src/pages/therapist/AppStatus.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AppStatus = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <Card padding="lg">
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Application Under Review</h2>
        <p className="text-gray-600 mb-6">Our team is reviewing your credentials. We will notify you once you are verified.</p>
        <Button variant="outline" onClick={() => window.location.href='/therapist/dashboard'}>Go to Dashboard (Dev Bypass)</Button>
      </Card>
    </div>
  );
};`,

  'src/pages/therapist/Clients.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const Clients = () => {
  const clients = [
    { id: 1, name: 'Alice Smith', risk: 'high', nextSession: 'Oct 12' },
    { id: 2, name: 'Bob Jones', risk: 'low', nextSession: 'Oct 14' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Clients</h1>
      <Card padding="none">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-medium text-gray-500">Name</th>
              <th className="p-4 font-medium text-gray-500">Risk Level</th>
              <th className="p-4 font-medium text-gray-500">Next Session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href=\`/therapist/clients/\${c.id}\`}>
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4"><Badge variant={c.risk === 'high' ? 'danger' : 'success'}>{c.risk.toUpperCase()}</Badge></td>
                <td className="p-4 text-gray-600">{c.nextSession}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};`,

  'src/pages/therapist/ClientDetail.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ClientDetail = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => window.history.back()}>&larr; Back</Button>
        <h1 className="text-2xl font-serif font-bold text-primary">Alice Smith</h1>
      </div>
      <Card>
        <h3 className="font-semibold text-lg border-b pb-2 mb-4">Client Overview</h3>
        <p className="text-gray-600">Client showing elevated symptoms of anxiety. Adherence to daily plan is at 45%.</p>
      </Card>
    </div>
  );
};`,

  'src/pages/therapist/Sessions.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const Sessions = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">Sessions</h1>
    <Card>
      <p className="text-gray-500">Calendar view goes here.</p>
    </Card>
  </div>
);`,

  'src/pages/therapist/Messages.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const TherapistMessages = () => (
  <div className="space-y-6 h-[calc(100vh-8rem)]">
    <h1 className="text-2xl font-serif font-bold text-primary">Messages</h1>
    <Card className="h-full flex items-center justify-center">
      <p className="text-gray-500">Select a conversation</p>
    </Card>
  </div>
);`,

  'src/pages/therapist/Alerts.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const Alerts = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">High-Risk Alerts</h1>
    <Card className="border-danger/30">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold">Alice Smith</h3>
            <Badge variant="danger">High Risk</Badge>
          </div>
          <p className="text-gray-600 text-sm">Self-harm thoughts indicated on recent PHQ-9.</p>
        </div>
        <div className="text-sm text-gray-400">2 hours ago</div>
      </div>
    </Card>
  </div>
);`,

  'src/pages/therapist/Earnings.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const Earnings = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">Earnings</h1>
    <div className="grid grid-cols-3 gap-6">
      <Card><h3 className="text-gray-500 text-sm">This Month</h3><p className="text-2xl font-bold">$3,240</p></Card>
    </div>
  </div>
);`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build therapist complete');

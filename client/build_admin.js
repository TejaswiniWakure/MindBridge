import fs from 'fs';
import path from 'path';

const files = {
  'src/pages/admin/Users.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AdminUsers = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Users</h1>
    <Card padding="none">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="p-4 font-medium text-gray-500">Email</th>
            <th className="p-4 font-medium text-gray-500">Status</th>
            <th className="p-4 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="p-4">user@example.com</td>
            <td className="p-4"><Badge variant="success">Active</Badge></td>
            <td className="p-4"><button className="text-teal hover:underline">View</button></td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
);`,

  'src/pages/admin/Therapists.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminTherapists = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Therapists</h1>
    <Card>
      <p className="text-gray-500">Manage verified professionals.</p>
    </Card>
  </div>
);`,

  'src/pages/admin/Verification.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminVerification = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Verification Queue</h1>
    <Card>
      <p className="text-gray-500">Review therapist applications and credentials.</p>
    </Card>
  </div>
);`,

  'src/pages/admin/Content.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminContent = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Content Management</h1>
    <Card>
      <p className="text-gray-500">Manage educational modules and resources.</p>
    </Card>
  </div>
);`,

  'src/pages/admin/Safety.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminSafety = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Safety & Crisis Log</h1>
    <Card className="border-danger/20">
      <p className="text-gray-500">Audit trail of high-risk events.</p>
    </Card>
  </div>
);`,

  'src/pages/admin/Audit.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminAudit = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Audit Logs</h1>
    <Card>
      <p className="text-gray-500">System access and modification logs.</p>
    </Card>
  </div>
);`,

  'src/pages/admin/Analytics.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';
import { ProgressChart } from '../../components/charts/ProgressChart';

export const AdminAnalytics = () => {
  const data = [{ name: 'Week 1', value: 80 }, { name: 'Week 2', value: 90 }];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-gray-900">Platform Analytics</h1>
      <Card>
        <ProgressChart data={data} />
      </Card>
    </div>
  );
};`,

  'src/pages/admin/Payments.jsx': `import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminPayments = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Payments</h1>
    <Card>
      <p className="text-gray-500">Therapist payouts and platform revenue.</p>
    </Card>
  </div>
);`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/tejaswini/Desktop/MindCare/client', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log('Build admin complete');

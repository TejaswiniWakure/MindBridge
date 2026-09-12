import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminAudit = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Audit Logs</h1>
    <Card>
      <p className="text-gray-500">System access and modification logs.</p>
    </Card>
  </div>
);
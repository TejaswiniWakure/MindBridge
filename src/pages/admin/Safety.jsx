import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminSafety = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Safety & Crisis Log</h1>
    <Card className="border-danger/20">
      <p className="text-gray-500">Audit trail of high-risk events.</p>
    </Card>
  </div>
);
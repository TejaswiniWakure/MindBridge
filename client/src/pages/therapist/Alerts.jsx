import React from 'react';
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
);
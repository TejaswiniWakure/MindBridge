import React from 'react';
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
};
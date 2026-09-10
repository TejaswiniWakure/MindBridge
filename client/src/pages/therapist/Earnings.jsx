import React from 'react';
import { Card } from '../../components/ui/Card';

export const Earnings = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">Earnings</h1>
    <div className="grid grid-cols-3 gap-6">
      <Card><h3 className="text-gray-500 text-sm">This Month</h3><p className="text-2xl font-bold">$3,240</p></Card>
    </div>
  </div>
);
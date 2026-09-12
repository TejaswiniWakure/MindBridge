import React from 'react';
import { Card } from '../components/ui/Card';
export const Placeholder = ({ title }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <h1 className="text-2xl font-serif font-bold text-primary">{title}</h1>
    <Card>
      <p className="text-gray-500">This page is currently under construction.</p>
    </Card>
  </div>
);
import React from 'react';
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
);
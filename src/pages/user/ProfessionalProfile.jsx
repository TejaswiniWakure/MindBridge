import React from 'react';
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
};
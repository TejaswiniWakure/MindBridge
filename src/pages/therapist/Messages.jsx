import React from 'react';
import { Card } from '../../components/ui/Card';

export const TherapistMessages = () => (
  <div className="space-y-6 h-[calc(100vh-8rem)]">
    <h1 className="text-2xl font-serif font-bold text-primary">Messages</h1>
    <Card className="h-full flex items-center justify-center">
      <p className="text-gray-500">Select a conversation</p>
    </Card>
  </div>
);
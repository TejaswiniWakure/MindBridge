import React from 'react';
import { Card } from '../../components/ui/Card';
import { Phone, ShieldAlert } from 'lucide-react';

export const Help = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Help & Safety</h1>
      
      <Card className="bg-danger/10 border-danger/20 space-y-4">
        <div className="flex items-center gap-2 text-danger font-bold text-lg">
          <ShieldAlert /> Emergency Resources
        </div>
        <p className="text-gray-800">If you or someone else is in immediate danger, please contact local emergency services immediately.</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-danger/20">
            <Phone className="text-danger" />
            <div>
              <p className="font-bold text-gray-900">National Crisis Hotline</p>
              <p className="text-danger font-mono text-lg">988</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
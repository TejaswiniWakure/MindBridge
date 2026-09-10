import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar as CalIcon, Video } from 'lucide-react';

export const Appointments = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Appointments</h1>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="bg-teal-light text-teal-dark p-3 rounded-xl flex flex-col items-center justify-center min-w-[80px]">
              <span className="text-xs font-bold uppercase">Oct</span>
              <span className="text-2xl font-bold">12</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-primary">Dr. Sarah Jenkins</h3>
              <p className="text-gray-500 text-sm flex items-center gap-1"><CalIcon size={14}/> 10:00 AM - 10:50 AM</p>
              <p className="text-gray-500 text-sm mt-1">Video Session</p>
            </div>
          </div>
          <Button className="gap-2"><Video size={16}/> Join Session</Button>
        </div>
      </Card>
    </div>
  );
};
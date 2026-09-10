import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { Search, Star, MapPin } from 'lucide-react';

export const Professionals = () => {
  const therapists = [
    { id: 1, name: 'Dr. Sarah Jenkins', title: 'Clinical Psychologist', spec: 'Anxiety, Depression', rate: '$120/session', rating: 4.9 }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Find a Professional</h1>
      <div className="flex gap-4">
        <Input placeholder="Search by name or specialty..." className="flex-1" />
        <Button variant="secondary" className="gap-2"><Search size={18}/> Search</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {therapists.map(t => (
          <Card key={t.id} className="flex flex-col h-full">
            <div className="flex gap-4 mb-4">
              <Avatar name={t.name} size="lg" />
              <div>
                <h3 className="font-semibold text-lg text-primary">{t.name}</h3>
                <p className="text-sm text-gray-600">{t.title}</p>
                <div className="flex items-center gap-1 text-sm text-warning mt-1">
                  <Star size={14} fill="currentColor" /> {t.rating}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4 flex-1">
              <p><strong>Specialties:</strong> {t.spec}</p>
              <p><strong>Rate:</strong> {t.rate}</p>
            </div>
            <Button className="w-full" onClick={() => window.location.href=`/app/professionals/${t.id}`}>View Profile</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
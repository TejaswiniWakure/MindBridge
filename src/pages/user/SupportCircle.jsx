import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Shield, Plus } from 'lucide-react';

export const SupportCircle = () => {
  const members = [
    { id: 1, name: 'Jane Doe', relation: 'Partner', permissions: ['Mood', 'Emergencies'] }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Support Circle</h1>
          <p className="text-gray-500 text-sm">Keep trusted people close.</p>
        </div>
        <Button className="gap-2"><Plus size={18}/> Add Member</Button>
      </div>

      <div className="grid gap-4">
        {members.map(m => (
          <Card key={m.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={m.name} />
              <div>
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.relation}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {m.permissions.map(p => (
                <span key={p} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 flex items-center gap-1">
                  <Shield size={10} /> {p}
                </span>
              ))}
              <Button variant="outline" size="sm" className="ml-2">Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
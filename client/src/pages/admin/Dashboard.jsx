import React from 'react';
import { Card } from '../../components/ui/Card';

export const AdminDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
    <div className="grid grid-cols-3 gap-6">
      <Card><h3 className="text-gray-500 text-sm">Total Users</h3><p className="text-2xl font-bold">1,204</p></Card>
      <Card><h3 className="text-gray-500 text-sm">Therapists</h3><p className="text-2xl font-bold">45</p></Card>
      <Card><h3 className="text-gray-500 text-sm">Revenue</h3><p className="text-2xl font-bold">$12k</p></Card>
    </div>
  </div>
);
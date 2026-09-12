import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AdminUsers = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-serif font-bold text-gray-900">Users</h1>
    <Card padding="none">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="p-4 font-medium text-gray-500">Email</th>
            <th className="p-4 font-medium text-gray-500">Status</th>
            <th className="p-4 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="p-4">user@example.com</td>
            <td className="p-4"><Badge variant="success">Active</Badge></td>
            <td className="p-4"><button className="text-teal hover:underline">View</button></td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
);
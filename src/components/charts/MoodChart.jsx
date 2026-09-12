import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MoodChart = ({ data }) => {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">No mood data available</div>;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: '#888', marginBottom: '4px' }}
          />
          <Line type="monotone" dataKey="score" stroke="#5b8e7d" strokeWidth={3} dot={{ r: 4, fill: '#5b8e7d', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#3d6b5a' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
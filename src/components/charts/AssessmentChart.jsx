import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const AssessmentChart = ({ data }) => {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">No assessment data available</div>;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Score" dataKey="A" stroke="#5b8e7d" fill="#5b8e7d" fillOpacity={0.4} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
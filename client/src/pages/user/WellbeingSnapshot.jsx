import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AssessmentChart } from '../../components/charts/AssessmentChart';
import { Info, Sparkles } from 'lucide-react';

export const WellbeingSnapshot = () => {
  const data = [
    { subject: 'Depression', A: 40 },
    { subject: 'Anxiety', A: 60 },
    { subject: 'Stress', A: 75 },
    { subject: 'Sleep', A: 30 },
    { subject: 'Wellness', A: 50 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold text-primary">Your Wellbeing Snapshot</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center">
          <AssessmentChart data={data} />
        </Card>
        
        <Card className="bg-sage-light/30 border-none space-y-4">
          <div className="flex items-center gap-2 text-teal-dark font-semibold">
            <Sparkles size={20} /> AI Summary
          </div>
          <p className="text-gray-800 leading-relaxed">
            Based on your recent assessments, you're experiencing elevated levels of stress and anxiety, which seems to be impacting your sleep quality. Your mood remains relatively stable, but there's room for improvement in daily wellness habits. We recommend focusing on stress-reduction techniques this week.
          </p>
          <div className="text-xs text-gray-500 flex items-start gap-1 mt-4">
            <Info size={14} className="shrink-0 mt-0.5" />
            <span>This is an AI-generated summary for informational purposes, not a medical diagnosis.</span>
          </div>
          <Button className="w-full mt-4" onClick={() => window.location.href='/app/my-plan'}>Update My Plan</Button>
        </Card>
      </div>
    </div>
  );
};
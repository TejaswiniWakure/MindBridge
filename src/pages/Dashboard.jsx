import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, ChevronRight, Activity, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-serif text-primary">Good morning, {user?.name?.split(' ')[0] || 'there'}.</h1>
        <p className="text-neutral-500 mt-1">Here is your wellness overview for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-primary">Today's Tasks</h2>
            <span className="text-sm text-teal font-medium">1 of 3 completed</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-teal" />
                <span className="font-medium text-neutral-400 line-through">Morning Check-in</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-neutral-200 shadow-sm cursor-pointer hover:border-teal transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
                <span className="font-medium text-primary">5-Minute Breathing</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-neutral-200 shadow-sm cursor-pointer hover:border-teal transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
                <span className="font-medium text-primary">Evening Reflection</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
          </div>
        </motion.div>

        {/* Mood Tracker */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-primary mb-2">Today's Mood</h2>
            <p className="text-sm text-neutral-500 mb-6">How are you feeling?</p>
            <div className="flex justify-between items-center px-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-teal/20 hover:text-teal transition-colors text-lg">
                  {i === 1 ? '😢' : i === 3 ? '😐' : i === 5 ? '😊' : '•'}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 bg-neutral-100 text-neutral-600 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors">
            Add Note
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-sage/20 rounded-xl">
            <Activity className="w-6 h-6 text-teal" />
          </div>
          <div>
            <h3 className="font-medium text-primary">Weekly Progress</h3>
            <p className="text-sm text-neutral-500 mt-1 mb-3">You are on Day 4 of the Stress Reset plan. Great consistency.</p>
            <button className="text-sm font-medium text-teal hover:underline">View Insights</button>
          </div>
        </div>

        {/* Journal Card */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-sage/20 rounded-xl">
            <BookOpen className="w-6 h-6 text-teal" />
          </div>
          <div>
            <h3 className="font-medium text-primary">Private Journal</h3>
            <p className="text-sm text-neutral-500 mt-1 mb-3">Clear your mind. Your last entry was 2 days ago.</p>
            <button className="text-sm font-medium text-teal hover:underline">New Entry</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

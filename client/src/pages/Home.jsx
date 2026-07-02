import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { Heart, Shield, Users, Sparkles, Brain } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero section */}
      <section className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-primary-750 dark:text-primary-400 text-xs font-semibold">
          <Brain size={14} className="animate-pulse" />
          Nurturing Mental Strength & Well-being
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          A Secure Space for <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Mental Growth</span>
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-xl">
          MindWell connects Teens, Parents, and Therapists with tailored dashboards, clinical notes tracking, and interactive AI mental support tools.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <Link to="/register">
            <Button size="lg" className="rounded-xl shadow-lg">
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="rounded-xl">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Role breakdown section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:translate-y-[-4px] transition-transform duration-200">
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-primary-650 dark:text-primary-400 flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h3 className="font-heading font-bold text-slate-850 dark:text-slate-100 text-base">
              Teens
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed">
              Express yourself in a private, encrypted digital journal, track daily moods, and chat with a supportive AI helper.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-y-[-4px] transition-transform duration-200">
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-secondary-650 dark:text-secondary-400 flex items-center justify-center">
              <Users size={24} />
            </div>
            <h3 className="font-heading font-bold text-slate-850 dark:text-slate-100 text-base">
              Parents
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed">
              Understand your teen's general progress and mood trends via high-level data summaries, and easily request professional therapy sessions.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-y-[-4px] transition-transform duration-200">
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-650 dark:text-emerald-400 flex items-center justify-center">
              <Heart size={24} />
            </div>
            <h3 className="font-heading font-bold text-slate-850 dark:text-slate-100 text-base">
              Therapists
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed">
              Manage client appointments, maintain private clinical logs, and view permitted mood reports.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-y-[-4px] transition-transform duration-200">
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h3 className="font-heading font-bold text-slate-850 dark:text-slate-100 text-base">
              Administrators
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed">
              Ensure platform compliance, review system performance indicators, and manage secure accounts.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-20 px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-primary leading-tight mb-6">
          Understand yourself. <br/><span className="text-teal">Move forward.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
          Mindwell helps you understand your wellbeing, build personalized habits, track your progress, and find support when you need it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/signup" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
            Get Started
          </Link>
          <button className="w-full sm:w-auto bg-white border border-neutral-200 text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-neutral-50 transition-all">
            Explore Mindwell
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;

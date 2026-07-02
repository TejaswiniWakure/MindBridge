import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 py-4.5 px-6 text-center text-xs text-slate-400 dark:text-slate-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} MindWell. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#support" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Support Helpdesk</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F6F6F4] selection:bg-[#EEEEEC] selection:text-[#202020]">
      {/* Navbar: Darkest Brand */}
      <header className="bg-[#202020] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-[#F6F6F4] hover:opacity-80 transition-opacity">
              <Leaf className="h-6 w-6 text-[#292929]" />
              <span className="text-xl font-bold font-serif tracking-tight">Mindwell</span>
            </Link>
            
            {/* Center Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/#how-it-works" className="text-sm font-medium text-[#858585] hover:text-[#F6F6F4] transition-colors">How It Works</a>
              <a href="/#assessments" className="text-sm font-medium text-[#858585] hover:text-[#F6F6F4] transition-colors">Assessments</a>
              <a href="/#professionals" className="text-sm font-medium text-[#858585] hover:text-[#F6F6F4] transition-colors">Professionals</a>
              <a href="/#about" className="text-sm font-medium text-[#858585] hover:text-[#F6F6F4] transition-colors">About</a>
              <a href="/#contact" className="text-sm font-medium text-[#858585] hover:text-[#F6F6F4] transition-colors">Contact</a>
            </nav>
            
            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm font-medium text-[#F6F6F4] hover:text-[#292929] transition-colors">Login</Link>
              <Link to="/login" className="bg-[#292929] text-[#FFFFFF] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#333333] transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-[#202020] text-[#858585] py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-[#292929]" />
                <span className="text-xl font-bold font-serif text-[#F6F6F4]">Mindwell</span>
              </div>
              <p className="text-lg opacity-90 max-w-sm text-[#F6F6F4]">Understand. Personalize. Progress.</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <span className="text-[#F6F6F4] font-semibold text-sm tracking-wider uppercase mb-2">Explore</span>
              <a href="/#how-it-works" className="hover:text-[#F6F6F4] transition-colors">How It Works</a>
              <a href="/#assessments" className="hover:text-[#F6F6F4] transition-colors">Assessments</a>
              <a href="/#professionals" className="hover:text-[#F6F6F4] transition-colors">Professionals</a>
              <a href="/#about" className="hover:text-[#F6F6F4] transition-colors">About</a>
              <a href="/#contact" className="hover:text-[#F6F6F4] transition-colors">Contact</a>
            </div>
            
            <div className="flex flex-col space-y-3">
              <span className="text-[#F6F6F4] font-semibold text-sm tracking-wider uppercase mb-2">Support & Legal</span>
              <Link to="/login" className="hover:text-[#F6F6F4] transition-colors">AI Companion</Link>
              <Link to="/login" className="hover:text-[#F6F6F4] transition-colors">Support Circle</Link>
              <Link to="/login" className="hover:text-[#F6F6F4] transition-colors">Professionals</Link>
              <Link to="#" className="hover:text-[#F6F6F4] transition-colors mt-2">Privacy</Link>
              <Link to="#" className="hover:text-[#F6F6F4] transition-colors">Terms</Link>
            </div>
          </div>
          <div className="pt-8 border-t border-[#202020] text-sm opacity-60">
            &copy; {new Date().getFullYear()} Mindwell. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
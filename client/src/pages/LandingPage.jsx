import React from 'react';

// Landing Sections
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import TrustedBy from '../components/landing/TrustedBy';
import WhyMindBridge from '../components/landing/WhyMindBridge';
import HowItWorks from '../components/landing/HowItWorks';
import DashboardPreview from '../components/landing/DashboardPreview';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      {/* Sticky Navigation header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <WhyMindBridge />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      {/* Footer layout */}
      <Footer />
    </div>
  );
};

export default LandingPage;

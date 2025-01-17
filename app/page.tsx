import React from 'react';
import Banner from '../components/Banner';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-accent text-neutral">
      <Banner />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

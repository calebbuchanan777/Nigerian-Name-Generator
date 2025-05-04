import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainGenerator from '@/components/MainGenerator';
import PremiumFeatures from '@/components/PremiumFeatures';
import DemoPersonalization from '@/components/DemoPersonalization';
import AdUnit from '@/components/AdUnit';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <MainGenerator />
        <PremiumFeatures />
        <DemoPersonalization />
        <AdUnit />
      </main>
      
      <Footer />
    </div>
  );
}

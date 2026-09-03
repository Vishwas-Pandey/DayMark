import React from 'react';
import { HeroContent } from './HeroContent';
import { HeroDashboard } from './HeroDashboard';

export const HeroContainer = () => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
      <HeroContent />
      <HeroDashboard />
    </div>
  );
};
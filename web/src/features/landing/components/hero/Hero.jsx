import React from 'react';
import { HeroContainer } from './HeroContainer';
import { HeroBackground } from './HeroBackground';
import { HeroScrollIndicator } from './HeroScrollIndicator';

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden pt-24 pb-16">
      <HeroBackground />
      <HeroContainer />
      <HeroScrollIndicator />
    </section>
  );
};
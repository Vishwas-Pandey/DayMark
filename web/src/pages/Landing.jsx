import React from 'react';
import { Hero } from '../features/landing/components/hero';
import { ProductPreview } from '../features/landing/components/product-preview';
import { Storytelling } from '../features/landing/components/storytelling';
import { BentoSection } from '../features/landing/components/bento';
import { AISection } from '../features/landing/components/ai';
import { TestimonialsSection } from '../features/landing/components/testimonials';
import { CTASection } from '../features/landing/components/cta';
import { FooterSection } from '../features/landing/components/footer';

export const Landing = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section id="hero"><Hero /></section>
      <section id="features"><ProductPreview /></section>
      <section id="about"><Storytelling /></section>
      <section id="roadmap"><BentoSection /></section>
      
      <div className="py-12 sm:py-16 relative z-10" id="ai">
        <AISection />
      </div>
      
      <div className="pt-6 pb-12 sm:pt-8 sm:pb-16 relative z-10" id="pricing">
        <TestimonialsSection />
      </div>
      
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Landing;

import React from 'react';
import { AIContainer } from './AIContainer';

export const AISection = () => {
  return (
    <section className="relative w-full py-32 bg-surface-primary overflow-hidden min-h-[100dvh] flex items-center">
      <AIContainer />
    </section>
  );
};
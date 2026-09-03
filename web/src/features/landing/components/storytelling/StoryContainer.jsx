import React from 'react';
import { ChaosScene } from './ChaosScene';
import { TransformationLayer } from './TransformationLayer';
import { ClarityScene } from './ClarityScene';
import { HeroMessage } from './HeroMessage';
import { ScrollCue } from './ScrollCue';

export const StoryContainer = ({ scrollProgress }) => {
  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-10 perspective-[2000px]">
      <HeroMessage scrollProgress={scrollProgress} />
      
      <div className="relative w-full aspect-video max-w-5xl mt-12 flex items-center justify-center">
        <ChaosScene scrollProgress={scrollProgress} />
        <TransformationLayer scrollProgress={scrollProgress} />
        <ClarityScene scrollProgress={scrollProgress} />
      </div>
      
      <ScrollCue scrollProgress={scrollProgress} />
    </div>
  );
};
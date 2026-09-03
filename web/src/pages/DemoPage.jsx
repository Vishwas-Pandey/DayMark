import React, { useEffect } from 'react';
import { useDemoStore } from '../features/demo/store/useDemoStore';
import { DemoTransition } from '../features/demo/components/DemoTransition';
import { DemoWelcomeOverlay } from '../features/demo/components/DemoWelcomeOverlay';
import { DemoBanner } from '../features/demo/components/DemoBanner';
import { DemoDashboard } from '../features/demo/components/DemoDashboard';

export const DemoPage = () => {
  const { resetDemo } = useDemoStore();

  // Reset state on mount (refresh)
  useEffect(() => {
    resetDemo();
    // Scroll to top
    window.scrollTo(0, 0);
  }, [resetDemo]);

  return (
    <div className="relative min-h-[100dvh] bg-[#0a0a0a] text-text-heading overflow-x-hidden font-sans">
      <DemoTransition />
      <DemoWelcomeOverlay />
      <DemoDashboard />
      <DemoBanner />
    </div>
  );
};
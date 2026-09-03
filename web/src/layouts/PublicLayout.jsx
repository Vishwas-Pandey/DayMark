import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../features/landing/components/navigation';

export const PublicLayout = () => {
  return (
    <div className="relative min-h-[100dvh] bg-surface-primary selection:bg-interactive-primary selection:text-text-heading">
      <Navigation />
      <main className="relative z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '../features/landing/components/navigation/ThemeToggle';
import { AuthBrandPanel } from '../features/auth/components/AuthBrandPanel';

export const AuthLayout = () => {
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-2 bg-surface-primary">
      <AuthBrandPanel />

      <div className="relative flex flex-col">
        <header className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden focus-ring rounded-md p-1 outline-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-text-heading">
              <path d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z" />
            </svg>
            <span className="font-semibold text-text-heading">DayMark</span>
          </Link>
          <span className="hidden lg:block" />
          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;

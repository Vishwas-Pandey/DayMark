import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { NavigationCTA } from './NavigationCTA';
import { NavigationDivider } from './NavigationDivider';
import { useAuthContext } from '../../../../context/AuthProvider';

export const NavigationActions = () => {
  let isAuthenticated = false;
  try {
    const auth = useAuthContext();
    isAuthenticated = auth?.isAuthenticated;
  } catch (e) {
    // Graceful fallback if AuthProvider is missing
  }

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {!isAuthenticated && (
        <Link 
          to="/login"
          className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-heading transition-colors focus-ring rounded-md"
        >
          Login
        </Link>
      )}
      <NavigationDivider />
      <NavigationCTA />
    </div>
  );
};

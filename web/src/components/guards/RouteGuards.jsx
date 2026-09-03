import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { DashboardSkeleton } from '../common/Skeletons';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <DashboardSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (isLoading) return <DashboardSkeleton />;
  // Authenticated users shouldn't see login/signup, redirect them back to where they were going, or dashboard
  if (isAuthenticated) return <Navigate to={from} replace />;

  return children;
};

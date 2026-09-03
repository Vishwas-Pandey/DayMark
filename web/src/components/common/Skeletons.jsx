import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonBase = ({ className = '', ...props }) => (
  <div 
    className={`relative overflow-hidden bg-surface-secondary/50 border border-border-default rounded-xl ${className}`} 
    aria-hidden="true"
    {...props}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-text-heading/5 to-transparent" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="min-h-[100dvh] bg-surface-primary flex">
    <div className="hidden lg:flex w-64 p-4 border-r border-border-default flex-col gap-4">
      <SkeletonBase className="h-12 w-full rounded-xl" />
      <div className="space-y-2 mt-8">
        <SkeletonBase className="h-10 w-full rounded-lg" />
        <SkeletonBase className="h-10 w-full rounded-lg" />
        <SkeletonBase className="h-10 w-full rounded-lg" />
      </div>
    </div>
    <div className="flex-1 p-4 lg:p-8 flex flex-col gap-6">
      <SkeletonBase className="h-16 w-full max-w-4xl rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        <SkeletonBase className="h-64 rounded-2xl" />
        <SkeletonBase className="h-64 rounded-2xl" />
        <SkeletonBase className="h-64 rounded-2xl" />
      </div>
    </div>
  </div>
);

export const TaskSkeleton = () => (
  <div className="flex items-center gap-3 p-3 rounded-lg border border-border-default/50">
    <SkeletonBase className="w-5 h-5 rounded-md shrink-0" />
    <SkeletonBase className="h-4 w-full max-w-[200px]" />
  </div>
);

export const WidgetSkeleton = () => <SkeletonBase className='h-48 w-full rounded-xl' />;

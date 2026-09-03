import React, { Suspense } from 'react';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { WidgetSkeleton } from '../common/Skeletons';

// These components would be lazily loaded in a real app to save bundle size
const AIInsight = React.lazy(() => import('../../features/ai/components/AIInsight').then(m => ({ default: m.AIInsight })));
const Recommendations = React.lazy(() => import('../../features/ai/components/Recommendations').then(m => ({ default: m.Recommendations })));

export const RightPanel = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <aside className="hidden lg:flex w-80 flex-col h-full bg-surface-secondary/30 border-l border-border-default p-4 gap-6 overflow-y-auto">
      <h3 className="font-semibold text-text-heading flex items-center gap-2">
        <span className="text-xl">✨</span> Intelligence
      </h3>
      
      <ErrorBoundary>
        <Suspense fallback={<WidgetSkeleton />}>
          <AIInsight />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<WidgetSkeleton />}>
          <Recommendations />
        </Suspense>
      </ErrorBoundary>
    </aside>
  );
};

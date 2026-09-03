import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsHeader } from '../features/analytics/components/AnalyticsHeader';
import { AnalyticsTimeRange } from '../features/analytics/components/AnalyticsTimeRange';
import { AnalyticsOverviewCards } from '../features/analytics/components/AnalyticsOverviewCards';
import { AnalyticsCharts } from '../features/analytics/components/AnalyticsCharts';
import { AnalyticsHeatmaps } from '../features/analytics/components/AnalyticsHeatmaps';
import { AnalyticsModuleBreakdown } from '../features/analytics/components/AnalyticsModuleBreakdown';
import { DashboardSkeleton } from '../components/common/Skeletons';
import { EmptyState } from '../components/common/EmptyStates';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('this-month');
  const { data, isLoading, error, refetch, isRefetching } = useAnalytics(timeRange);

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 min-h-full">
      <ErrorBoundary>
        <AnalyticsHeader 
          data={data} 
          isRefetching={isRefetching} 
          onRefetch={() => refetch()} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <AnalyticsTimeRange 
          currentRange={timeRange} 
          onRangeChange={setTimeRange} 
        />
      </ErrorBoundary>
      
      {isLoading && !data ? (
        <div className="space-y-8">
          <DashboardSkeleton />
          <DashboardSkeleton />
        </div>
      ) : error ? (
        <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-red-600">Failed to load analytics data.</div>
      ) : !data || Object.keys(data).length === 0 ? (
        <div className="py-20 bg-surface-primary rounded-2xl border border-border-default shadow-sm">
          <EmptyState title="No analytics available" message="Complete tasks, track habits, and use DayMark to generate insights." />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <ErrorBoundary>
            <AnalyticsOverviewCards data={data} />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <AnalyticsCharts data={data} />
          </ErrorBoundary>

          <ErrorBoundary>
            <AnalyticsHeatmaps data={data} />
          </ErrorBoundary>

          <ErrorBoundary>
            <AnalyticsModuleBreakdown data={data} />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
};

export default Analytics;

import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics';

// Accepts either a plain range string (e.g. 'today', 'this-month') or a
// { timeRange } object — both are normalized to a query-key value only,
// the backend summary endpoint itself takes no range params.
export const useAnalytics = (range) => {
  const key = typeof range === 'string' ? range : range?.timeRange;

  const summaryQuery = useQuery({
    queryKey: ['analytics', 'summary', key],
    queryFn: () => analyticsApi.getSummary().then(res => res.data)
  });

  const trendsQuery = useQuery({
    queryKey: ['analytics', 'trends', key],
    queryFn: () => analyticsApi.getTrends().then(res => res.data)
  });

  return {
    // Dashboard summary shape: { tasks, habits, goals, journal, calendar, scores }
    data: summaryQuery.data,
    trends: trendsQuery.data,
    isLoading: summaryQuery.isLoading || trendsQuery.isLoading,
    isRefetching: summaryQuery.isRefetching || trendsQuery.isRefetching,
    error: summaryQuery.error || trendsQuery.error,
    refetch: () => {
      summaryQuery.refetch();
      trendsQuery.refetch();
    }
  };
};

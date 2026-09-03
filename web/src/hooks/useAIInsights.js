import { useQuery } from '@tanstack/react-query';
import { aiApi } from '../api/ai';

// Real, rule-based insights computed server-side from the user's actual
// tasks/habits/goals/journal/calendar data (see backend insight.engine.js).
export const useAIInsights = () => {
  const query = useQuery({
    queryKey: ['ai', 'insights'],
    queryFn: () => aiApi.getInsights().then(res => res.data),
    staleTime: 5 * 60 * 1000
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error
  };
};

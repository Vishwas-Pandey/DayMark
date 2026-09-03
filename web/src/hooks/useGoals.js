import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalsApi } from '../api/goals';

export const useGoals = () => {
  const queryClient = useQueryClient();
  const queryKey = ['goals'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => goalsApi.list().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: goalsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => goalsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: goalsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateProgressMutation = useMutation({
    mutationFn: ({ id, data }) => goalsApi.updateProgress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    // Resource-specific aliases (full mutation objects, so `.mutate(...)` works directly)
    createGoal: createMutation,
    updateGoal: updateMutation,
    deleteGoal: deleteMutation,
    updateGoalProgress: updateProgressMutation
  };
};

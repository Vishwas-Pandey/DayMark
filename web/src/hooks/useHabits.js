import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { habitsApi } from '../api/habits';

export const useHabits = () => {
  const queryClient = useQueryClient();
  const queryKey = ['habits'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => habitsApi.list().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: habitsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => habitsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: habitsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const completeMutation = useMutation({
    mutationFn: (id) => habitsApi.complete(id),
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
    createHabit: createMutation,
    deleteHabit: deleteMutation,
    // Marks a habit complete for today via the dedicated completion endpoint
    // (habits have no `completedDates` field — completions are tracked separately)
    toggleHabit: completeMutation
  };
};

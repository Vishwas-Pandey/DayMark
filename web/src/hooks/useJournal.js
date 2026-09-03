import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { journalApi } from '../api/journal';

export const useJournal = () => {
  const queryClient = useQueryClient();
  const queryKey = ['journal'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => journalApi.list().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: journalApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => journalApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: journalApi.delete,
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
    createEntry: createMutation,
    updateEntry: updateMutation,
    deleteEntry: deleteMutation
  };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';

export const useTasks = () => {
  const queryClient = useQueryClient();
  const queryKey = ['tasks'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => tasksApi.list().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const bulkCompleteMutation = useMutation({
    mutationFn: (taskIds) => tasksApi.bulkUpdate(taskIds, { status: 'completed' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (taskIds) => tasksApi.bulkDelete(taskIds),
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
    createTask: createMutation,
    updateTask: updateMutation,
    deleteTask: deleteMutation,
    bulkCompleteTasks: bulkCompleteMutation,
    bulkDeleteTasks: bulkDeleteMutation
  };
};

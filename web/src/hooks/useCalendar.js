import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarApi } from '../api/calendar';

export const useCalendar = () => {
  const queryClient = useQueryClient();
  const queryKey = ['calendar'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => calendarApi.list().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: calendarApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => calendarApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: calendarApi.delete,
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
    createEvent: createMutation,
    updateEvent: updateMutation,
    deleteEvent: deleteMutation
  };
};

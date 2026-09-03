import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.me().then(res => res.data),
    retry: false,
    staleTime: Infinity,
    enabled: localStorage.getItem('hasSession') === 'true'
  });

  const loginMutation = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (response) => {
      const data = response.data;
      localStorage.setItem('hasSession', 'true');
      localStorage.setItem('accessToken', data.accessToken);
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error) => {
      console.error('[auth] login failed:', error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: (credentials) => authApi.register(credentials),
    onSuccess: (response) => {
      const data = response.data;
      localStorage.setItem('hasSession', 'true');
      localStorage.setItem('accessToken', data.accessToken);
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error) => {
      console.error('[auth] registration failed:', error);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('hasSession');
      queryClient.clear();
    }
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    isAuthenticated: !!userQuery.data,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync
  };
};

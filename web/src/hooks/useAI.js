import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiApi } from '../api/ai';

export const useAI = () => {
  const queryClient = useQueryClient();

  const chatMutation = useMutation({
    mutationFn: aiApi.chat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'conversations'] });
    }
  });

  const conversationsQuery = useQuery({
    queryKey: ['ai', 'conversations'],
    queryFn: () => aiApi.listConversations().then(res => res.data)
  });

  const deleteConversationMutation = useMutation({
    mutationFn: aiApi.deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'conversations'] });
    }
  });

  return {
    chat: chatMutation.mutateAsync,
    isProcessing: chatMutation.isPending,
    // Resource-specific aliases used by the AI workspace page
    sendMessage: chatMutation,
    isGenerating: chatMutation.isPending,
    error: chatMutation.error,
    conversations: conversationsQuery.data,
    isLoadingConversations: conversationsQuery.isLoading,
    deleteConversation: deleteConversationMutation
  };
};

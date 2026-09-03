import React, { useState } from 'react';
import { Camera, Check } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthProvider';
import { usersApi } from '../api/users';

const formatMemberSince = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const Profile = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const updateMutation = useMutation({
    mutationFn: (data) => usersApi.updateProfile(user.id, data),
    onSuccess: (response) => {
      queryClient.setQueryData(['user'], response.data);
      toast.success('Profile updated');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update profile');
    }
  });

  const handleSave = () => {
    if (!displayName.trim()) return;
    updateMutation.mutate({ displayName: displayName.trim() });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-text-heading mb-1">My Profile</h1>
        <p className="text-sm text-text-muted">Your account information.</p>
      </div>

      <div className="p-6 rounded-2xl bg-surface-primary border border-border-default shadow-sm flex flex-col sm:flex-row gap-8 items-start sm:items-center">
        <div className="relative group cursor-pointer shrink-0">
          <div className="w-24 h-24 rounded-full bg-interactive-primary/10 border-2 border-interactive-primary flex items-center justify-center text-3xl font-bold text-interactive-primary overflow-hidden">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={24} className="text-white" />
          </div>
        </div>
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-xl bg-surface-secondary border border-border-default focus:border-interactive-primary focus:ring-1 focus:ring-interactive-primary outline-none text-text-heading transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              disabled
              className="w-full max-w-md px-4 py-2 rounded-xl bg-surface-secondary/50 border border-border-default text-text-muted outline-none cursor-not-allowed"
            />
            <p className="text-xs text-text-muted mt-2">Email address cannot be changed. Contact support for assistance.</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-surface-primary border border-border-default shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-text-heading mb-2">Account Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-secondary border border-border-default">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Account Status</p>
            <p className="font-semibold text-green-500 flex items-center gap-1"><Check size={16} /> Active</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-secondary border border-border-default">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Member Since</p>
            <p className="font-semibold text-text-heading">{formatMemberSince(user?.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={updateMutation.isPending || !displayName.trim()}
          className="px-6 py-2.5 bg-interactive-primary text-white font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-interactive-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Profile;

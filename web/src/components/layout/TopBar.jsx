import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';
import { useAuthContext } from '../../context/AuthProvider';
import { ThemeToggle } from '../../features/landing/components/navigation/ThemeToggle';
import Modal from '../common/Modal';
import TaskForm from '../TaskForm';

const QUICK_ADD_TYPES = [
  { key: 'task', label: 'Task' },
  { key: 'habit', label: 'Habit' },
  { key: 'goal', label: 'Goal' },
  { key: 'event', label: 'Event' },
];

export const TopBar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState('task');
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <>
      <header className="h-16 px-4 md:px-6 bg-surface-primary/80 backdrop-blur-md border-b border-border-default flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 text-text-muted">
          {/* Mobile hamburger menu could go here */}
          <span className="font-semibold text-text-heading hidden sm:block tracking-tight">{dateStr}</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setIsModalOpen(true)} className="p-2 md:px-3 md:py-1.5 md:bg-interactive-primary md:text-white rounded-full md:rounded-lg hover:bg-interactive-primary/90 text-text-muted transition-colors flex items-center gap-1.5">
            <Plus size={18} />
            <span className="hidden md:block text-sm font-semibold">Create</span>
          </button>
          
          <button
            onClick={() => navigate('/ai')}
            className="p-2 rounded-full bg-interactive-primary/10 text-interactive-primary hover:bg-interactive-primary/20 transition-colors"
            aria-label="Open AI Workspace"
          >
            <Sparkles size={18} />
          </button>
          
          <ThemeToggle />

          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-surface-secondary border border-border-default overflow-hidden flex items-center justify-center font-bold text-sm text-text-heading ml-1 cursor-pointer shadow-sm hover:border-interactive-primary/50 transition-colors focus-ring outline-none"
            aria-label="Open profile"
          >
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </button>
        </div>
      </header>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Quick Add">
        <div className="flex gap-2 mb-4">
          {QUICK_ADD_TYPES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setQuickAddType(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${quickAddType === key ? 'bg-interactive-primary text-white' : 'bg-surface-secondary text-text-muted hover:text-text-heading'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <TaskForm defaultType={quickAddType} onSuccess={() => setIsModalOpen(false)} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

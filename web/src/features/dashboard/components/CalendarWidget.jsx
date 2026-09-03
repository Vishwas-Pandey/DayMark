import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Clock } from 'lucide-react';
import { useCalendar } from '../../../hooks/useCalendar';
import { WidgetSkeleton } from '../../../components/common/Skeletons';
import { EmptyState } from '../../../components/common/EmptyStates';
import Modal from '../../../components/common/Modal';
import TaskForm from '../../../components/TaskForm';

export const CalendarWidget = () => {
  const { data: events, isLoading, error } = useCalendar();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load schedule.</div>;
  
  const upcomingEvents = events?.filter(e => new Date(e.time?.end || e.time?.start) > new Date())
                               .sort((a,b) => new Date(a.time?.start) - new Date(b.time?.start))
                               .slice(0, 4) || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading flex items-center gap-2">
          Schedule <span className="bg-surface-secondary text-text-muted px-2 py-0.5 rounded-full text-xs font-semibold">Today</span>
        </h3>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors"
          aria-label="Add event"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 -mr-1 relative">
        {upcomingEvents.length === 0 ? (
          <EmptyState title="Clear schedule" message="You have no upcoming events today." />
        ) : (
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border-default z-0" />
        )}
        
        <div className="space-y-4 relative z-10">
          {upcomingEvents.map((event, idx) => (
            <div key={event.id || idx} className="flex gap-4">
              <div className="w-5 h-5 rounded-full bg-surface-primary border-2 border-interactive-primary shrink-0 flex items-center justify-center mt-0.5">
                <div className="w-1.5 h-1.5 bg-interactive-primary rounded-full" />
              </div>
              <div className="flex-1 bg-surface-secondary/50 border border-border-default p-3 rounded-lg hover:border-interactive-primary/30 transition-colors cursor-pointer">
                <p className="text-sm font-semibold text-text-heading mb-1">{event.title}</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
                  <Clock size={12} />
                  <span>
                    {new Date(event.time?.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                    {new Date(event.time?.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Event">
        <TaskForm onSuccess={() => setIsCreateOpen(false)} onClose={() => setIsCreateOpen(false)} defaultType="event" />
      </Modal>
    </motion.div>
  );
};

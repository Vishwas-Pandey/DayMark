import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, AlignLeft, Users, Trash2 } from 'lucide-react';
import { calendarApi } from '../../../api/calendar';

export const EventDetailDrawer = ({ event: eventSummary, isOpen, onClose, onDelete }) => {
  // The list view only has the slim summary shape (no location/description) —
  // fetch the full record once the drawer is opened.
  const { data: fullEvent } = useQuery({
    queryKey: ['calendar', eventSummary?.id],
    queryFn: () => calendarApi.get(eventSummary.id).then(res => res.data),
    enabled: Boolean(isOpen && eventSummary?.id)
  });

  const event = fullEvent || eventSummary;
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-heading/20 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] md:w-[500px] bg-surface-primary shadow-2xl border-l border-border-default z-50 flex flex-col"
          >
            <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 backdrop-blur-md">
              <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Event Details</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDelete(event.id)}
                  className="p-2 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="w-px h-4 bg-border-default mx-1" />
                <button onClick={onClose} className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded border border-border-default bg-surface-secondary text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {event.type || 'General'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-text-heading mb-4">{event.title}</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-text-heading text-sm">{new Date(event.time?.start).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric'})}</p>
                      <p className="text-sm text-text-muted">
                        {new Date(event.time?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                        {event.time?.end && ` - ${new Date(event.time?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                  </div>

                  {event.location?.location && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-secondary text-text-muted flex items-center justify-center shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium text-text-heading text-sm">{event.location.location}</p>
                      </div>
                    </div>
                  )}

                  {event.participants?.length > 0 && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-secondary text-text-muted flex items-center justify-center shrink-0">
                        <Users size={20} />
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium text-text-heading text-sm">{event.participants.length} Guests</p>
                      </div>
                    </div>
                  )}

                  {event.description && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-secondary text-text-muted flex items-center justify-center shrink-0">
                        <AlignLeft size={20} />
                      </div>
                      <div className="pt-2">
                        <p className="font-medium text-text-muted text-sm leading-relaxed whitespace-pre-wrap">{event.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

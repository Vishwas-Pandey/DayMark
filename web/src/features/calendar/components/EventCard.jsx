import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, CheckCircle2, Clock } from 'lucide-react';

export const EventCard = ({ event, isAgenda, onClick }) => {
  const isCompleted = event.status === 'completed';
  const isCancelled = event.status === 'cancelled';
  
  const getStyle = (type) => {
    switch(type) {
      case 'meeting': return 'bg-blue-50 border-blue-200 text-blue-900 border-l-blue-500';
      case 'focus': return 'bg-purple-50 border-purple-200 text-purple-900 border-l-purple-500';
      case 'break': return 'bg-green-50 border-green-200 text-green-900 border-l-green-500';
      case 'task': return 'bg-orange-50 border-orange-200 text-orange-900 border-l-orange-500';
      default: return 'bg-surface-secondary border-border-default text-text-heading border-l-interactive-primary';
    }
  };

  const styleClasses = getStyle(event.type);

  if (isAgenda) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className={`flex items-start gap-4 p-4 rounded-xl border-l-4 border-y border-r transition-all cursor-pointer hover:shadow-md ${styleClasses} ${(isCompleted || isCancelled) && 'opacity-60 grayscale'}`}
      >
        <div className="w-24 shrink-0 text-sm font-bold opacity-80 mt-1">
          {new Date(event.time?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-base mb-1 ${isCancelled && 'line-through'}`}>{event.title}</h4>
          <div className="flex flex-wrap gap-3 text-xs opacity-80 font-medium">
            {event.location?.location && <span className="flex items-center gap-1"><MapPin size={12}/> {event.location.location}</span>}
            {event.participants?.length > 0 && <span className="flex items-center gap-1"><Users size={12}/> {event.participants.length}</span>}
            {event.duration && <span className="flex items-center gap-1"><Clock size={12}/> {event.duration}m</span>}
          </div>
        </div>
        {isCompleted && <CheckCircle2 size={20} className="text-green-500 shrink-0" />}
      </motion.div>
    );
  }

  // Grid/Block view representation (Simplified for scaffolding)
  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`w-full p-2 text-xs rounded-lg border-l-4 border-y border-r cursor-pointer hover:brightness-95 transition-all overflow-hidden relative shadow-sm ${styleClasses} ${(isCompleted || isCancelled) && 'opacity-60'}`}
    >
      <div className={`font-semibold truncate ${isCancelled && 'line-through'}`}>{event.title}</div>
      <div className="opacity-80 font-medium truncate mt-0.5">
        {new Date(event.time?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

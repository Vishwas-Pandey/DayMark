import React from 'react';
import { EventCard } from './EventCard';
import { EmptyState } from '../../../components/common/EmptyStates';

export const AgendaView = ({ events, onClickEvent }) => {
  if (!events || events.length === 0) {
    return (
      <div className="py-20 border border-border-default rounded-2xl bg-surface-primary shadow-sm">
        <EmptyState title="Your schedule is clear" message="No events scheduled for this day." />
      </div>
    );
  }

  // Group events by date logically if we were showing multiple days, but assuming single day focus for simplicity
  return (
    <div className="space-y-3 bg-surface-primary p-4 rounded-2xl border border-border-default shadow-sm min-h-[500px]">
      <div className="relative">
        <div className="absolute left-[88px] top-4 bottom-4 w-px bg-border-default hidden sm:block" />
        <div className="space-y-4 relative z-10">
          {events.map((event, i) => (
            <EventCard 
              key={event.id || i} 
              event={event} 
              isAgenda={true} 
              onClick={() => onClickEvent(event)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

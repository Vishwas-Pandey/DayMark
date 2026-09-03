import React from 'react';
import { EventCard } from './EventCard';

export const CalendarGrid = ({ events, view, currentDate, onClickEvent }) => {
  // Simplified grid scaffolding simulating a Day view timeline
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-surface-primary rounded-2xl border border-border-default shadow-sm overflow-hidden flex flex-col h-[700px]">
      <div className="flex-1 overflow-y-auto relative">
        <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] relative min-h-[1440px]">
          {/* Time axis */}
          <div className="border-r border-border-default bg-surface-secondary/30 relative">
            {hours.map(hour => (
              <div key={hour} className="h-[60px] border-b border-border-default relative">
                <span className="absolute -top-3 left-0 right-0 text-center text-xs font-semibold text-text-muted">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </span>
              </div>
            ))}
          </div>
          
          {/* Grid lines & Events container */}
          <div className="relative">
            {hours.map(hour => (
              <div key={hour} className="h-[60px] border-b border-border-default" />
            ))}

            {/* Fake layout rendering for existing events */}
            <div className="absolute top-0 left-0 right-0 bottom-0 p-2 pointer-events-none">
              {events.map((event, i) => {
                // Mock calculation for top positioning based on date string
                const d = new Date(event.time?.start);
                const minutesFromMidnight = d.getHours() * 60 + d.getMinutes();
                const top = `${(minutesFromMidnight / 60) * 60}px`;
                
                return (
                  <div key={event.id || i} className="absolute left-2 right-2 pointer-events-auto z-10" style={{ top, minHeight: '60px' }}>
                    <EventCard event={event} onClick={() => onClickEvent(event)} />
                  </div>
                );
              })}
            </div>
            
            {/* Current time indicator */}
            {currentDate.toDateString() === new Date().toDateString() && (
              <div 
                className="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none" 
                style={{ top: `${(new Date().getHours() + new Date().getMinutes()/60) * 60}px` }}
              >
                <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-red-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

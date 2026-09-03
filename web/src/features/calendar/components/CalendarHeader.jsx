import React from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Zap, Coffee } from 'lucide-react';

export const CalendarHeader = ({ events, onOpenCreate }) => {
  const today = new Date();
  const todayEvents = events?.filter(e => new Date(e.time?.start).toDateString() === today.toDateString()) || [];
  
  const upcomingEvents = events?.filter(e => new Date(e.time?.start) > today) || [];
  
  // Calculate duration stats (approximate based on start/end strings if available)
  const calcMinutes = (type) => todayEvents.filter(e => e.type === type).reduce((acc, e) => {
    if(!e.time?.end) return acc + 30; // default 30 mins
    return acc + Math.round((new Date(e.time?.end) - new Date(e.time?.start)) / 60000);
  }, 0);

  const focusTime = calcMinutes('focus');
  const meetingTime = calcMinutes('meeting');

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading mb-4">Calendar</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <CalendarIcon size={16} className="text-text-muted" />
            <span className="text-sm font-semibold text-text-heading">{todayEvents.length} <span className="text-text-muted font-medium">Today</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <Clock size={16} className="text-text-muted" />
            <span className="text-sm font-semibold text-text-heading">{upcomingEvents.length} <span className="text-text-muted font-medium">Upcoming</span></span>
          </div>
          {focusTime > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-xl shadow-sm">
              <Zap size={16} className="text-purple-500" />
              <span className="text-sm font-semibold text-purple-700">{Math.round(focusTime/60)}h {focusTime%60}m <span className="text-purple-600/70 font-medium">Focus</span></span>
            </div>
          )}
          {meetingTime > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
              <Coffee size={16} className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">{Math.round(meetingTime/60)}h {meetingTime%60}m <span className="text-orange-600/70 font-medium">Meetings</span></span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end shrink-0">
        <button 
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-interactive-primary text-white font-semibold rounded-xl hover:bg-interactive-primary/90 transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          <span>New Event</span>
        </button>
      </div>
    </div>
  );
};

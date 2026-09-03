import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarHeader } from '../features/calendar/components/CalendarHeader';
import { CalendarToolbar } from '../features/calendar/components/CalendarToolbar';
import { CalendarGrid } from '../features/calendar/components/CalendarGrid';
import { AgendaView } from '../features/calendar/components/AgendaView';
import { EventDetailDrawer } from '../features/calendar/components/EventDetailDrawer';
import { DashboardSkeleton } from '../components/common/Skeletons';
import Modal from '../components/common/Modal';
import TaskForm from '../components/TaskForm';

export const Calendar = () => {
  const { data: events, isLoading, error, deleteEvent, refetch } = useCalendar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('agenda');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter events for the current date view (simplified logic for scaffolding)
  const displayEvents = events?.filter(e => {
    const eventDate = new Date(e.time?.start);
    if (view === 'day' || view === 'agenda') {
      return eventDate.toDateString() === currentDate.toDateString();
    }
    // Stub for week/month
    return true; 
  }).sort((a, b) => new Date(a.time?.start) - new Date(b.time?.start)) || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent.mutate(id);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 min-h-full flex flex-col">
      <ErrorBoundary>
        <CalendarHeader 
          events={events} 
          onOpenCreate={() => setIsCreateOpen(true)} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <CalendarToolbar 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
          view={view} 
          setView={setView} 
        />
      </ErrorBoundary>
      
      <div className="flex-1">
        {isLoading ? (
          <DashboardSkeleton />
        ) : error ? (
          <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-red-600">Failed to load calendar.</div>
        ) : (
          <ErrorBoundary>
            {view === 'agenda' ? (
              <AgendaView events={displayEvents} onClickEvent={setSelectedEvent} />
            ) : (
              <CalendarGrid events={displayEvents} view={view} currentDate={currentDate} onClickEvent={setSelectedEvent} />
            )}
          </ErrorBoundary>
        )}
      </div>

      <EventDetailDrawer 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)}
        onDelete={handleDelete}
      />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Event">
        <TaskForm onSuccess={() => { setIsCreateOpen(false); refetch(); }} onClose={() => setIsCreateOpen(false)} defaultType="event" />
      </Modal>
    </div>
  );
};

export default Calendar;

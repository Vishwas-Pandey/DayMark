import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, LayoutList } from 'lucide-react';

export const CalendarToolbar = ({ currentDate, setCurrentDate, view, setView }) => {
  const views = [
    { id: 'day', label: 'Day' },
    { id: 'agenda', label: 'Agenda', icon: LayoutList }
  ];

  const goPrev = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const goNext = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date());

  const getDisplayDate = () => currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-surface-primary p-3 rounded-2xl border border-border-default shadow-sm">
      <div className="flex items-center gap-2">
        <button onClick={goPrev} className="p-2 rounded-lg hover:bg-surface-secondary text-text-muted hover:text-text-heading transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={goNext} className="p-2 rounded-lg hover:bg-surface-secondary text-text-muted hover:text-text-heading transition-colors">
          <ChevronRight size={20} />
        </button>
        <button onClick={goToday} className="px-3 py-1.5 rounded-lg border border-border-default font-semibold text-sm hover:bg-surface-secondary transition-colors">
          Today
        </button>
        <div className="w-px h-6 bg-border-default mx-2 hidden sm:block" />
        <h2 className="text-lg font-bold text-text-heading flex items-center gap-2">
          <CalendarDays size={20} className="text-interactive-primary hidden sm:block" />
          {getDisplayDate()}
        </h2>
      </div>

      <div className="flex items-center bg-surface-secondary p-1 rounded-xl border border-border-default w-full sm:w-auto">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              view === v.id 
                ? 'bg-surface-primary text-text-heading shadow-sm' 
                : 'text-text-muted hover:text-text-heading hover:bg-surface-primary/50'
            }`}
          >
            {v.icon ? <v.icon size={16} className="mx-auto sm:hidden" /> : <span className="sm:hidden">{v.label[0]}</span>}
            <span className="hidden sm:inline">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

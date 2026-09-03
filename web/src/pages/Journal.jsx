import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useJournal } from '../hooks/useJournal';
import { JournalHeader } from '../features/journal/components/JournalHeader';
import { JournalFilterBar } from '../features/journal/components/JournalFilterBar';
import { JournalFeed } from '../features/journal/components/JournalFeed';
import { JournalDetailDrawer } from '../features/journal/components/JournalDetailDrawer';
import { JournalEditor } from '../features/journal/components/JournalEditor';

export const Journal = () => {
  const { data: entries, isLoading, error, deleteEntry } = useJournal();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedEntry, setSelectedEntry] = useState(null); // For Reading view
  const [editingEntry, setEditingEntry] = useState(null); // For Editor view
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const filteredEntries = entries?.filter(entry => {
    if (searchQuery && !entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.content?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    if (filter === 'favorites') return entry.tags?.includes('favorite');
    if (filter === 'pinned') return entry.tags?.includes('pinned');
    
    return true; 
  }).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) || []; // Sort newest first

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      deleteEntry.mutate(id);
      setSelectedEntry(null);
    }
  };

  const openEditor = (entry = null) => {
    setEditingEntry(entry);
    setSelectedEntry(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-24 min-h-full">
      <ErrorBoundary>
        <JournalHeader 
          entries={entries} 
          onOpenCreate={() => openEditor()} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <JournalFilterBar 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          onSearch={setSearchQuery} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <JournalFeed 
          entries={filteredEntries} 
          isLoading={isLoading} 
          error={error} 
          onClickEntry={setSelectedEntry}
        />
      </ErrorBoundary>

      <JournalDetailDrawer 
        entry={selectedEntry} 
        isOpen={!!selectedEntry} 
        onClose={() => setSelectedEntry(null)}
        onDelete={handleDelete}
        onEdit={(entry) => openEditor(entry)}
      />

      <JournalEditor 
        isOpen={isEditorOpen} 
        entry={editingEntry}
        onClose={() => setIsEditorOpen(false)}
        onSave={() => setIsEditorOpen(false)}
      />
    </div>
  );
};

export default Journal;

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ViewMode = 'modern' | 'professional';

interface ViewContextType {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<ViewMode>('modern');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved preference from localStorage
    const saved = localStorage.getItem('ui-view-mode') as ViewMode | null;
    if (saved && (saved === 'modern' || saved === 'professional')) {
      setViewState(saved);
      document.documentElement.setAttribute('data-view', saved);
    }
  }, []);

  const setView = (newView: ViewMode) => {
    setViewState(newView);
    localStorage.setItem('ui-view-mode', newView);
    document.documentElement.setAttribute('data-view', newView);
  };

  const toggleView = () => {
    const newView = view === 'modern' ? 'professional' : 'modern';
    setView(newView);
  };

  // Set initial data-view attribute before mount to prevent flash
  useEffect(() => {
    if (!mounted) {
      document.documentElement.setAttribute('data-view', view);
    }
  }, [mounted, view]);

  return (
    <ViewContext.Provider value={{ view, setView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}

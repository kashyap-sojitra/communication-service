'use client';

import { useView } from './ViewProvider';

export function ViewToggle() {
  const { view, toggleView } = useView();

  return (
    <button
      onClick={toggleView}
      className="view-toggle"
      aria-label={`Switch to ${view === 'modern' ? 'professional' : 'modern'} view`}
      title={`Current: ${view === 'modern' ? 'Modern UI' : 'Professional View'}`}
    >
      {view === 'modern' ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <span>Professional</span>
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span>Modern</span>
        </>
      )}
    </button>
  );
}

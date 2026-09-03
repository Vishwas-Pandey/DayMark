import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] bg-surface-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-secondary/50 border border-border-default rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h2 className="text-xl font-bold text-text-heading mb-2">Something went wrong</h2>
            <p className="text-text-muted text-sm mb-8">We encountered an unexpected error. Our team has been notified.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-interactive-primary text-text-heading rounded-xl font-semibold hover:bg-interactive-primary/90 transition-colors focus-ring"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

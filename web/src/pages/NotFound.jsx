import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="min-h-[100dvh] flex flex-col items-center justify-center gap-4 bg-surface-primary text-center px-6">
    <p className="text-sm font-semibold uppercase tracking-widest text-interactive-primary">404</p>
    <h1 className="text-3xl font-bold text-text-heading">This page doesn&apos;t exist</h1>
    <p className="text-text-muted max-w-sm">The link may be broken, or the page may have moved.</p>
    <Link
      to="/"
      className="mt-2 rounded-lg bg-interactive-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 focus-ring outline-none"
    >
      Back to DayMark
    </Link>
  </main>
);

export default NotFound;

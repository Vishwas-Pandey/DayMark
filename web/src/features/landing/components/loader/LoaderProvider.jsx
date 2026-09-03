import React, { createContext, useContext, useState, useEffect } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, 1200);

    const maxTimer = setTimeout(() => {
      setIsAppReady(true);
    }, 2200);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (isAppReady && minimumTimeElapsed) {
      // The loader component itself will handle the unmount animation duration.
      // We just signal the exit phase. 
      // Actually, we'll keep showLoader true until AnimatePresence removes it.
      // The exit signal is `!showLoader` for the portal.
      setShowLoader(false);
    }
  }, [isAppReady, minimumTimeElapsed]);

  return (
    <LoaderContext.Provider value={{ showLoader, setAppReady: () => setIsAppReady(true), isAppReady: isAppReady && minimumTimeElapsed }}>
      {children}
    </LoaderContext.Provider>
  );
};
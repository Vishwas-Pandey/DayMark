import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'daymark-theme';

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'dark';
  // index.html runs a blocking inline script that already set this before paint.
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Storage unavailable (private mode, etc) — theme still applies for this session.
    }
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

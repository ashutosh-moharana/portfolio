import { createContext, useState, useEffect } from "react";

export const ColorContext = createContext();

export const COLORS = {
  red: { name: "Red", hex: "#ef4444" },
  blue: { name: "Blue", hex: "#3b82f6" },
  green: { name: "Green", hex: "#22c55e" }
};

export const ColorProvider = ({ children }) => {
  // Always initialize from system preference — no localStorage
  const [theme, setTheme] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const [activeColor, setActiveColor] = useState(() => {
    const savedColor = localStorage.getItem("portfolio-theme-color");
    return (savedColor && COLORS[savedColor]) ? savedColor : "red";
  });

  // Listen for OS-level theme changes and update automatically
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Apply theme class and color CSS variables to document
  useEffect(() => {
    const colorData = COLORS[activeColor];

    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    if (colorData) {
      document.documentElement.style.setProperty("--primary", colorData.hex);
      document.documentElement.style.setProperty("--heading-color", colorData.hex);
    }

    // Only persist color preference, NOT theme (theme follows system)
    localStorage.setItem("portfolio-theme-color", activeColor);
  }, [activeColor, theme]);

  const changeColor = (colorKey) => {
    if (COLORS[colorKey]) setActiveColor(colorKey);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const changeTheme = (mode) => {
    if (mode === 'dark' || mode === 'light') setTheme(mode);
  };

  return (
    <ColorContext.Provider value={{ activeColor, changeColor, theme, toggleTheme, changeTheme, COLORS }}>
      {children}
    </ColorContext.Provider>
  );
};

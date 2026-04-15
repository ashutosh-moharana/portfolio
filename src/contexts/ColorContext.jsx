import { createContext, useState, useEffect } from "react";

export const ColorContext = createContext();

export const COLORS = {
  crimson: { name: "Crimson", hex: "#e11d48" },
  indigo: { name: "Indigo", hex: "#4f46e5" },
  emerald: { name: "Emerald", hex: "#059669" }
};

export const ColorProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme-mode");
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [activeColor, setActiveColor] = useState(() => {
    const savedColor = localStorage.getItem("portfolio-theme-color");
    return (savedColor && COLORS[savedColor]) ? savedColor : "crimson";
  });

  // When activeColor or theme changes, update CSS variables and mode classes globally
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

    localStorage.setItem("portfolio-theme-mode", theme);
    localStorage.setItem("portfolio-theme-color", activeColor);
  }, [activeColor, theme]);

  const changeColor = (colorKey) => {
    if (COLORS[colorKey]) {
      setActiveColor(colorKey);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const changeTheme = (mode) => {
    if (mode === 'dark' || mode === 'light') {
      setTheme(mode);
    }
  }

  return (
    <ColorContext.Provider value={{ activeColor, changeColor, theme, toggleTheme, changeTheme, COLORS }}>
      {children}
    </ColorContext.Provider>
  );
};

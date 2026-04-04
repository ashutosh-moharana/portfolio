import { createContext, useState, useEffect } from "react";

export const ColorContext = createContext();

export const COLORS = {
  red: { name: "Crimson Red", hex: "#ed1d24" },
  green: { name: "Neon Emerald", hex: "#00ff9d" },
  blue: { name: "Electric Cyan", hex: "#00f0ff" },
  purple: { name: "Deep Amethyst", hex: "#b14aed" },
  yellow: { name: "Cyber Amber", hex: "#ffb000" },
  white: { name: "Ghost White", hex: "#ffffff" }
};

export const ColorProvider = ({ children }) => {
  const [activeColor, setActiveColor] = useState(() => {
    const savedColor = localStorage.getItem("portfolio-theme-color");
    return (savedColor && COLORS[savedColor]) ? savedColor : "red";
  });

  // When activeColor changes, update CSS variables globally and save to localStorage
  useEffect(() => {
    const colorData = COLORS[activeColor];
    if (!colorData) return;

    if (activeColor === "red") {
      // Reset to stylesheet defaults
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--heading-color');
    } else {
      // Overriding the variables on the root html element
      document.documentElement.style.setProperty("--primary", colorData.hex);
      document.documentElement.style.setProperty("--heading-color", colorData.hex);
    }

    localStorage.setItem("portfolio-theme-color", activeColor);
  }, [activeColor]);

  const changeColor = (colorKey) => {
    if (COLORS[colorKey]) {
      setActiveColor(colorKey);
    }
  };

  return (
    <ColorContext.Provider value={{ activeColor, changeColor, COLORS }}>
      {children}
    </ColorContext.Provider>
  );
};

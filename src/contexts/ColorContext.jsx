import { createContext, useState, useEffect } from "react";

export const ColorContext = createContext();

export const COLORS = {
  red: { name: "Red", hex: "#ff003c" },
  green: { name: "Matrix Green", hex: "#00ff41" },
  blue: { name: "Cyber Blue", hex: "#00e5ff" },
  purple: { name: "Neon Purple", hex: "#b026ff" },
  orange: { name: "Volcanic Orange", hex: "#ff5100" }
};

export const ColorProvider = ({ children }) => {
  const [activeColor, setActiveColor] = useState("red");

  // On mount, load from localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem("portfolio-theme-color");
    if (savedColor && COLORS[savedColor]) {
      setActiveColor(savedColor);
    }
  }, []);

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

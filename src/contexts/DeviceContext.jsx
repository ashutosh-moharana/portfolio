import { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId;
    const checkIfMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(window.innerWidth <= 768), 150);
    };
    // Initial check (immediate, no debounce)
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkIfMobile);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <DeviceContext.Provider value={isMobile}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}

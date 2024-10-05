import React, { createContext, useState, ReactNode, useContext } from 'react';

interface TemperatureContextType {
  unit: 'C' | 'F';
  setUnit: (unit: 'C' | 'F') => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const TemperatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  return (
    <TemperatureContext.Provider value={{ unit, setUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

// Custom hook to use the Temperature Context
export const useTemperature = (): TemperatureContextType => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};

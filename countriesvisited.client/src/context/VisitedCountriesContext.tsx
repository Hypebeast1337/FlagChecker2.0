import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the visited countries state
type VisitedCountriesState = {
  visitedCountries: { [key: string]: { visited: number } };
  setVisitedCountries: React.Dispatch<
    React.SetStateAction<{ [key: string]: { visited: number } }>
  >;
};

// Create context
const VisitedCountriesContext = createContext<VisitedCountriesState | undefined>(undefined);

// Provider component
export const VisitedCountriesProvider = ({ children }: { children: ReactNode }) => {
  const [visitedCountries, setVisitedCountries] = useState<{ [key: string]: { visited: number } }>({
    PL: { visited: 1 }, // Poland
    DE: { visited: 1 }, // Germany
    IN: { visited: 1 }, // India
    US: { visited: 1 }, // United States
    FR: { visited: 0 }, // France
  });

  return (
    <VisitedCountriesContext.Provider value={{ visitedCountries, setVisitedCountries }}>
      {children}
    </VisitedCountriesContext.Provider>
  );
};

// Custom hook for using the context
export const useVisitedCountries = () => {
  const context = useContext(VisitedCountriesContext);
  if (!context) {
    throw new Error('useVisitedCountries must be used within a VisitedCountriesProvider');
  }
  return context;
};

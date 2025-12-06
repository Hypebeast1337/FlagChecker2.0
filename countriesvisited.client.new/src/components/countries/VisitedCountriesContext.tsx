import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define the shape of a visited country entry
type VisitedCountryEntry = {
  visited: number;
  year?: number;
};

// Define the shape of the visited countries state
type VisitedCountriesState = {
  visitedCountries: { [key: string]: VisitedCountryEntry };
  setVisitedCountries: React.Dispatch<
    React.SetStateAction<{ [key: string]: VisitedCountryEntry }>
  >;
  mapKey: number;
  resetCountries: () => void;
  removeCountry: (isoCode: string) => void;
  setCountryYear: (isoCode: string, year: number | undefined) => void;
  isResetting: boolean;
};

// Create context
const VisitedCountriesContext = createContext<VisitedCountriesState | undefined>(undefined);

// Provider component
export const VisitedCountriesProvider = ({ children }: { children: ReactNode }) => {
  const [visitedCountries, setVisitedCountries] = useState<{ [key: string]: VisitedCountryEntry }>({});
  const [mapKey, setMapKey] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  // Reset function with animation timing
  const resetCountries = useCallback(() => {
    setIsResetting(true);

    // Delay the actual reset to allow animation to play
    setTimeout(() => {
      setVisitedCountries({});
      setMapKey(prev => prev + 1);
    }, 400);

    // Clear the resetting state after animation completes
    setTimeout(() => {
      setIsResetting(false);
    }, 1200);
  }, []);

  // Remove individual country and force map re-render
  const removeCountry = useCallback((isoCode: string) => {
    setVisitedCountries(prev => ({
      ...prev,
      [isoCode]: { visited: 0 }
    }));
    // Increment mapKey to force jVectorMap to re-render
    setMapKey(prev => prev + 1);
  }, []);

  // Set the year a country was visited
  const setCountryYear = useCallback((isoCode: string, year: number | undefined) => {
    setVisitedCountries(prev => ({
      ...prev,
      [isoCode]: { 
        ...prev[isoCode],
        visited: prev[isoCode]?.visited || 1,
        year 
      }
    }));
  }, []);

  return (
    <VisitedCountriesContext.Provider value={{
      visitedCountries,
      setVisitedCountries,
      mapKey,
      resetCountries,
      removeCountry,
      setCountryYear,
      isResetting
    }}>
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

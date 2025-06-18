// src/components/ShareHandler.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVisitedCountries } from './countries/VisitedCountriesContext'; 
import { useTranslation } from 'react-i18next';
import countryData from './countries/data/countryData';

// Countries that exist in countryData but are NOT in jVectorMap worldMill
const MAP_INCOMPATIBLE_COUNTRIES = [
  'VA', // Vatican - confirmed to cause error
  'SM', // San Marino - very small
  'MC', // Monaco - very small  
  'LI', // Liechtenstein - very small
  'AD', // Andorra - very small
  'MT', // Malta - sometimes missing
  'SG', // Singapore - sometimes missing
  // Note: XK (Kosovo), PS (Palestine), TW (Taiwan) work fine based on your testing
];

const ShareHandler: React.FC = () => {
  const { encodedCountries } = useParams<{ encodedCountries: string }>();
  const { setVisitedCountries } = useVisitedCountries();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const loadSharedCountries = async () => {
      if (!encodedCountries) {
        setError('Invalid share link');
        setIsLoading(false);
        return;
      }

      try {
        // Decode the base64 string
        const decodedString = atob(encodedCountries);
        
        // Split by comma to get country ISO codes
        const countryIsoCodes = decodedString.split(',').filter(code => code.trim() !== '');
        
        // Filter out countries that don't exist in countryData
        const validCountries = countryIsoCodes.filter(isoCode => countryData[isoCode]);
        
        if (validCountries.length === 0) {
          setError('No valid countries found in share link');
          setIsLoading(false);
          return;
        }

        // Create the visited countries object (include ALL valid countries)
        const newVisitedCountries: { [key: string]: { visited: number } } = {};
        validCountries.forEach(isoCode => {
          newVisitedCountries[isoCode] = { visited: 1 };
        });

        // Update the context
        setVisitedCountries(newVisitedCountries);
        setLoadedCount(validCountries.length);
        
        // Log countries that will be filtered from map
        const mapIncompatible = validCountries.filter(code => MAP_INCOMPATIBLE_COUNTRIES.includes(code));
        if (mapIncompatible.length > 0) {
          console.log('Countries loaded but will be filtered from map:', mapIncompatible);
        }
        
        // Small delay to show the loading state, then redirect to home
        setTimeout(() => {
          setIsLoading(false);
          navigate('/', { replace: true });
        }, 3000);

      } catch (err) {
        console.error('Error decoding share link:', err);
        setError('Invalid share link format');
        setIsLoading(false);
      }
    };

    loadSharedCountries();
  }, [encodedCountries, setVisitedCountries, navigate]);

  // ... rest of your component remains the same
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('shareError')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error}
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('goHome')}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="animate-spin w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('loadingSharedCountries')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('loadingCountriesDesc', { count: loadedCount })}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default ShareHandler;

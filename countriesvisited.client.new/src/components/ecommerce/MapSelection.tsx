import React, { useState, useRef, useEffect } from 'react';
import CountryMap from "./CountryMap";
import { GlobeEuropeAfricaIcon, CheckIcon } from '@heroicons/react/24/outline';
import ReactCountryFlag from "react-country-flag";
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData";
import { useTranslation } from 'react-i18next';
import { CountryTranslationService } from '../../services/CountryTranslationService';

export default function MapSelection() {
  const { visitedCountries, setVisitedCountries } = useVisitedCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search term (search in translated names)
  const filteredCountries = Object.keys(countryData)
    .filter(isoCode => {
      const translatedName = CountryTranslationService.getCountryName(isoCode, i18n.language);
      const originalName = countryData[isoCode].name;
      
      // Search in both translated name and original name for better UX
      return translatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             originalName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Sort by translated country names
      const nameA = CountryTranslationService.getCountryName(a, i18n.language);
      const nameB = CountryTranslationService.getCountryName(b, i18n.language);
      return nameA.localeCompare(nameB);
    })
    .slice(0, 10); // Limit to 10 results for performance

  // Handle country selection from dropdown
  const handleCountrySelect = (isoCode: string) => {
    const isCurrentlyVisited = visitedCountries[isoCode]?.visited === 1;

    setVisitedCountries(prev => ({
      ...prev,
      [isoCode]: { visited: isCurrentlyVisited ? 0 : 1 }
    }));

    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(value.length > 0);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t('countriesSelection')}
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {t('countriesSelectionDesc')}
          </p>
        </div>

        <div className="relative w-full max-w-[430px]" ref={dropdownRef}>
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 z-10">
            <GlobeEuropeAfricaIcon className="size-5 text-gray-500" />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={t('searchCountryPlaceholder')}
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />

          {/* Dropdown */}
          {isDropdownOpen && filteredCountries.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {filteredCountries.map((isoCode) => {
                const isVisited = visitedCountries[isoCode]?.visited === 1;
                const translatedCountryName = CountryTranslationService.getCountryName(isoCode, i18n.language);

                return (
                  <div
                    key={isoCode}
                    onClick={() => handleCountrySelect(isoCode)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${isVisited ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                  >
                    <ReactCountryFlag
                      countryCode={isoCode}
                      svg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                      }}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {translatedCountryName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({isoCode})
                      </span>
                    </div>
                    {isVisited && (
                      <div className="flex items-center gap-2">
                        <CheckIcon className="size-4 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {t('added')}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* No results message */}
          {isDropdownOpen && searchTerm.length > 0 && filteredCountries.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 px-4 py-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('noCountriesFound')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Map container */}
      <div className="w-full h-full mt-4">
        <CountryMap />
      </div>
    </div>
  );
}

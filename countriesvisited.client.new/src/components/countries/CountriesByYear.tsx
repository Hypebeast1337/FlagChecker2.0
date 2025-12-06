import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { useVisitedCountries } from './VisitedCountriesContext';
import { CountryTranslationService } from '../../services/CountryTranslationService';

interface YearGroup {
  year: number;
  countries: { code: string; name: string }[];
}

const CountriesByYear: React.FC = () => {
  const { i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  // Group countries by year
  const yearGroups = useMemo(() => {
    const groups: Map<number, { code: string; name: string }[]> = new Map();
    const noYear: { code: string; name: string }[] = [];

    Object.entries(visitedCountries)
      .filter(([_, entry]) => entry.visited === 1)
      .forEach(([code, entry]) => {
        const name = CountryTranslationService.getCountryName(code, i18n.language);
        if (entry.year) {
          if (!groups.has(entry.year)) {
            groups.set(entry.year, []);
          }
          groups.get(entry.year)!.push({ code, name });
        } else {
          noYear.push({ code, name });
        }
      });

    // Sort years descending and convert to array
    const sortedGroups: YearGroup[] = Array.from(groups.entries())
      .sort(([a], [b]) => b - a)
      .map(([year, countries]) => ({
        year,
        countries: countries.sort((a, b) => a.name.localeCompare(b.name))
      }));

    return { sortedGroups, noYear: noYear.sort((a, b) => a.name.localeCompare(b.name)) };
  }, [visitedCountries, i18n.language]);

  // Check if there's any data to display
  const hasYearData = yearGroups.sortedGroups.length > 0;
  const hasNoYearData = yearGroups.noYear.length > 0;

  if (!hasYearData && !hasNoYearData) {
    return null;
  }

  // If all countries have no year assigned, don't show this component
  if (!hasYearData) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
          <CalendarDaysIcon className="size-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {i18n.language === 'pl' ? 'Podróże w czasie' : 'Travel Timeline'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {i18n.language === 'pl'
              ? 'Kraje pogrupowane według roku wizyty'
              : 'Countries grouped by year of visit'}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full" />

        <div className="space-y-6">
          {yearGroups.sortedGroups.map((group, index) => (
            <motion.div
              key={group.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="relative pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white dark:border-gray-900 shadow-md shadow-blue-500/30" />

              {/* Year header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {group.year}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({group.countries.length} {group.countries.length === 1
                    ? (i18n.language === 'pl' ? 'kraj' : 'country')
                    : (i18n.language === 'pl' ? 'krajów' : 'countries')})
                </span>
              </div>

              {/* Countries grid */}
              <div className="flex flex-wrap gap-2">
                {group.countries.map((country) => (
                  <motion.div
                    key={country.code}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                  >
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{ width: '1.2em', height: '1.2em' }}
                    />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {country.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Countries without year */}
          {hasNoYearData && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: yearGroups.sortedGroups.length * 0.1, duration: 0.3 }}
              className="relative pl-10"
            >
              {/* Timeline dot - different style for no year */}
              <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-900" />

              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <GlobeAltIcon className="size-4" />
                  {i18n.language === 'pl' ? 'Rok nieznany' : 'Year unknown'}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({yearGroups.noYear.length})
                </span>
              </div>

              {/* Countries */}
              <div className="flex flex-wrap gap-2">
                {yearGroups.noYear.map((country) => (
                  <div
                    key={country.code}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 opacity-70"
                  >
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{ width: '1.2em', height: '1.2em' }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {country.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesByYear;

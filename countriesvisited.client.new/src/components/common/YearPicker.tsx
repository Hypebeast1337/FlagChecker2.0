import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CalendarIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import Modal from 'react-modal';

interface YearPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectYear: (year: number | undefined) => void;
  selectedYear?: number;
  countryCode: string;
  countryName: string;
}

type YearRange = 'recent' | '2010s' | 'older';

const YearPicker: React.FC<YearPickerProps> = ({
  isOpen,
  onClose,
  onSelectYear,
  selectedYear,
  countryCode,
  countryName
}) => {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Track which year ranges are expanded
  const [expandedRanges, setExpandedRanges] = useState<Set<YearRange>>(new Set(['recent']));

  // Generate year ranges
  const yearRanges = useMemo(() => {
    // Recent years: current year down to 2020
    const recentYears: number[] = [];
    for (let year = currentYear; year >= 2020; year--) {
      recentYears.push(year);
    }

    // 2010s: 2019 down to 2010
    const years2010s: number[] = [];
    for (let year = 2019; year >= 2010; year--) {
      years2010s.push(year);
    }

    // Older: 2009 down to 1950
    const olderYears: number[] = [];
    for (let year = 2009; year >= 1950; year--) {
      olderYears.push(year);
    }

    return { recentYears, years2010s, olderYears };
  }, [currentYear]);

  const handleSelectYear = (year: number) => {
    onSelectYear(year);
    onClose();
  };

  const handleClearYear = () => {
    onSelectYear(undefined);
    onClose();
  };

  const toggleRange = (range: YearRange) => {
    setExpandedRanges(prev => {
      const next = new Set(prev);
      if (next.has(range)) {
        next.delete(range);
      } else {
        next.add(range);
      }
      return next;
    });
  };

  const quickYears = [
    { label: i18n.language === 'pl' ? 'Ten rok' : 'This year', year: currentYear },
    { label: i18n.language === 'pl' ? 'Zeszly rok' : 'Last year', year: currentYear - 1 },
    { label: `${currentYear - 2}`, year: currentYear - 2 },
    { label: `${currentYear - 3}`, year: currentYear - 3 },
  ];

  const renderYearButton = (year: number) => (
    <motion.button
      key={year}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleSelectYear(year)}
      className={`
        relative py-2 px-1 rounded-lg text-sm font-medium transition-all
        ${selectedYear === year
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
          : year === currentYear
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
        }
      `}
    >
      {year}
      {selectedYear === year && (
        <motion.div
          layoutId="selected-year"
          className="absolute inset-0 rounded-lg border-2 border-white/50"
        />
      )}
    </motion.button>
  );

  const renderExpandButton = (range: YearRange, label: string, count: number) => {
    const isExpanded = expandedRanges.has(range);
    return (
      <button
        onClick={() => toggleRange(range)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-dashed border-gray-300 dark:border-gray-700"
      >
        <ChevronDownIcon className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        {isExpanded
          ? (i18n.language === 'pl' ? 'Ukryj' : 'Hide')
          : `${label} (${count})`
        }
      </button>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl max-w-md mx-auto mt-10 p-0 focus:outline-none max-h-[85vh] overflow-hidden flex flex-col"
      overlayClassName="fixed inset-0 bg-gray-900/50 dark:bg-black/60 flex items-start justify-center p-4 z-50 backdrop-blur-sm"
      closeTimeoutMS={200}
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <CalendarIcon className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {i18n.language === 'pl' ? 'Rok wizyty' : 'Year of Visit'}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{ width: '1.2em', height: '1.2em' }}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {countryName}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {/* Selected Year Badge */}
        {selectedYear && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {i18n.language === 'pl' ? 'Wybrano:' : 'Selected:'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              <CheckIcon className="size-3.5" />
              {selectedYear}
            </span>
            <button
              onClick={handleClearYear}
              className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              ({i18n.language === 'pl' ? 'wyczysc' : 'clear'})
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick Select */}
      <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-800/30">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
          {i18n.language === 'pl' ? 'Szybki wybor' : 'Quick Select'}
        </p>
        <div className="flex flex-wrap gap-2">
          {quickYears.map(({ label, year }) => (
            <button
              key={year}
              onClick={() => handleSelectYear(year)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${selectedYear === year
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Year Grid with Progressive Loading */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="space-y-4">
          {/* Recent Years (2020-current) - Always visible */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider">
              {i18n.language === 'pl' ? 'Ostatnie lata' : 'Recent Years'}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {yearRanges.recentYears.map(renderYearButton)}
            </div>
          </div>

          {/* 2010s Section */}
          <div>
            {!expandedRanges.has('2010s') ? (
              renderExpandButton('2010s', i18n.language === 'pl' ? 'Lata 2010' : '2010s', yearRanges.years2010s.length)
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      2010s
                    </p>
                    <button
                      onClick={() => toggleRange('2010s')}
                      className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      {i18n.language === 'pl' ? 'ukryj' : 'hide'}
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {yearRanges.years2010s.map(renderYearButton)}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Older Years Section (only show button if 2010s is expanded) */}
          {expandedRanges.has('2010s') && (
            <div>
              {!expandedRanges.has('older') ? (
                renderExpandButton('older', i18n.language === 'pl' ? 'Przed 2010' : 'Before 2010', yearRanges.olderYears.length)
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        2009 - 1950
                      </p>
                      <button
                        onClick={() => toggleRange('older')}
                        className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        {i18n.language === 'pl' ? 'ukryj' : 'hide'}
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {yearRanges.olderYears.map(renderYearButton)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {i18n.language === 'pl'
              ? 'Wybierz rok pierwszej wizyty'
              : 'Select the year of your first visit'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {i18n.language === 'pl' ? 'Zamknij' : 'Close'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default YearPicker;

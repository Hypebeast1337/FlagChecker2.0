import { CurrencyEuroIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import { useTranslation } from 'react-i18next';

const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", 
  "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", 
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", 
  "SI", "ES", "SE"
];

export default function VisitedCountriesEU() {
    const { t } = useTranslation();
    const { visitedCountries } = useVisitedCountries();

    const visitedEUCount = Object.keys(visitedCountries).filter(
        (key) => visitedCountries[key].visited === 1 && EU_COUNTRIES.includes(key)
    ).length;

    const totalEUCount = EU_COUNTRIES.length;
    const allEUVisited = visitedEUCount === totalEUCount;

    return (
        <div className={`card-container rounded-2xl border p-5 md:p-6 ${
            allEUVisited
                ? "border-blue-500 bg-white dark:border-blue-500 dark:bg-white/[0.03]"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
        }`}>
          
          {/* Icon and Label Row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 flex-shrink-0">
              <CurrencyEuroIcon className="size-5 text-gray-500" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t('euCountries')}
            </span>
          </div>

          {/* Numbers Row - Full Width */}
          <div className="w-full">
            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
              <AnimatedNumber 
                value={visitedEUCount} 
                duration={1000}
                hasComma={false}
                size={28}
              />{" "}
              / {totalEUCount}
            </h4>
          </div>
        </div>
    );
}

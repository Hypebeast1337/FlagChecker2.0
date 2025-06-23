import { ChartPieIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import { useTranslation } from 'react-i18next';
import { CountryCountingService } from '../../services/CountryCountingService';

export default function VisitedCountriesContinents() {
    const { t } = useTranslation();
    const { visitedCountries } = useVisitedCountries();

    // Use the service to count visited continents (only from actual countries)
    const visitedContinentsCount = CountryCountingService.getVisitedContinentsCount(visitedCountries);
    const allContinentsVisited = visitedContinentsCount === 6;

    return (
        <div
            className={`card-container rounded-2xl border p-5 md:p-6 ${allContinentsVisited
                ? "border-blue-500 bg-white dark:border-blue-500 dark:bg-white/[0.03]"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                }`}>
            
            {/* Icon and Label Row */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 flex-shrink-0">
                    <ChartPieIcon className="size-5 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('visitedContinents')}
                </span>
            </div>

            {/* Numbers Row - Full Width */}
            <div className="w-full">
                <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                    <AnimatedNumber
                        value={visitedContinentsCount}
                        duration={1000}
                        hasComma={false}
                        size={28}
                    />{" "}
                    / 6 <span className="text-sm">( +1 )</span>
                </h4>
            </div>
        </div>
    );
}

import { ChartPieIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import countryData from "../countries/data/countryData";
import { useTranslation } from 'react-i18next';

export default function VisitedCountriesContinents() {
    const { t } = useTranslation();
    const { visitedCountries } = useVisitedCountries();

    const visitedContinents = new Set(
        Object.keys(visitedCountries)
            .filter((key) => visitedCountries[key].visited === 1)
            .map((key) => countryData[key]?.continent)
            .filter(Boolean)
    );

    const allContinentsVisited = visitedContinents.size === 6;

    return (
        <div
            className={`rounded-2xl border p-5 md:p-6 ${allContinentsVisited
                ? "border-green-500 bg-white dark:border-green-500 dark:bg-white/[0.03]"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                }`}>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <ChartPieIcon className="size-5 text-gray-500" />
            </div>

            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t('visitedContinents')}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        <AnimatedNumber
                            value={visitedContinents.size}
                            duration={1000}
                            hasComma={false}
                            size={28}
                        />{" "}
                        / 6 <span className="text-sm">( +1 )</span>
                    </h4>
                </div>
            </div>
        </div>
    );
}

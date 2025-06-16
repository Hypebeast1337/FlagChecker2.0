import { GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import { useTranslation } from 'react-i18next';
import { AreaCalculationService } from '../../services/AreaCalculationService'
export default function VisitedCountriesAreaPercentage() {
    const { t } = useTranslation();
    const { visitedCountries } = useVisitedCountries();

    const percentageVisitedArea = AreaCalculationService.getVisitedAreaPercentage(visitedCountries);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <GlobeAmericasIcon className="size-5 text-gray-500" />
            </div>

            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t('landAreaPercentage')}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        <AnimatedNumber 
                            value={+percentageVisitedArea.toFixed(2)}
                            duration={1000}
                            hasComma={false}
                            size={28}
                        />%
                    </h4>
                </div>
            </div>
        </div>
    );
}

import { GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import { useTranslation } from 'react-i18next';
import { AreaCalculationService } from '../../services/AreaCalculationService';
import StatCard from './StatCard';

export default function VisitedCountriesAreaPercentage() {
  const { t, i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  const percentage = AreaCalculationService.getVisitedAreaPercentage(visitedCountries);

  const getSubtitle = () => {
    if (i18n.language === 'pl') {
      if (percentage === 0) return "Swiat jest wielki!";
      if (percentage < 1) return "Maly poczatek!";
      if (percentage < 5) return "Rosnie z kazda podroza!";
      if (percentage < 10) return "Imponujacy postep!";
      if (percentage < 25) return "Cwierc swiata!";
      if (percentage < 50) return "Polowa planety!";
      return "Globalny odkrywca!";
    }
    if (percentage === 0) return "The world is big!";
    if (percentage < 1) return "Small but mighty start!";
    if (percentage < 5) return "Growing with each trip!";
    if (percentage < 10) return "Impressive progress!";
    if (percentage < 25) return "Quarter of the world!";
    if (percentage < 50) return "Half the planet!";
    return "Global explorer!";
  };

  return (
    <StatCard
      theme="percentage"
      icon={<GlobeAmericasIcon className="w-6 h-6" />}
      label={t('landAreaPercentage')}
      value={percentage}
      decimals={2}
      suffix="%"
      showProgress={false}
      subtitle={getSubtitle()}
      isComplete={percentage >= 100}
    />
  );
}

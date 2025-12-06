import { FlagIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import { useTranslation } from 'react-i18next';
import { CountryCountingService } from '../../services/CountryCountingService';
import StatCard from './StatCard';

export default function VisitedCountriesCount() {
  const { t, i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  const visitedCount = CountryCountingService.getVisitedCountriesCount(visitedCountries);
  const totalCount = CountryCountingService.getTotalCountriesCount();
  const percentage = (visitedCount / totalCount) * 100;

  const getSubtitle = () => {
    if (i18n.language === 'pl') {
      if (visitedCount === 0) return "Pierwsza flaga czeka!";
      if (percentage < 5) return "Dopiero zaczynasz!";
      if (percentage < 15) return "Swietny poczatek!";
      if (percentage < 30) return "Robisz postepy!";
      if (percentage < 50) return "Pol swiata przed Toba!";
      if (percentage < 75) return "Niesamowite!";
      if (percentage < 100) return "Prawie mistrz!";
      return "Legendarny podruznik!";
    }
    if (visitedCount === 0) return "Your first flag awaits!";
    if (percentage < 5) return "Just getting started!";
    if (percentage < 15) return "Great beginning!";
    if (percentage < 30) return "Making progress!";
    if (percentage < 50) return "Half the world awaits!";
    if (percentage < 75) return "Incredible explorer!";
    if (percentage < 100) return "Almost legendary!";
    return "Legendary traveler!";
  };

  return (
    <StatCard
      theme="countries"
      icon={<FlagIcon className="w-6 h-6" />}
      label={t('visitedCountriesCount')}
      value={visitedCount}
      maxValue={totalCount}
      subtitle={getSubtitle()}
      isComplete={visitedCount === totalCount}
    />
  );
}

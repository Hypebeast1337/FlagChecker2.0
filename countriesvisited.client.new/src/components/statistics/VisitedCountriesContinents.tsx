import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import { useTranslation } from 'react-i18next';
import { CountryCountingService } from '../../services/CountryCountingService';
import StatCard from './StatCard';

export default function VisitedCountriesContinents() {
  const { t, i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  const visitedContinentsCount = CountryCountingService.getVisitedContinentsCount(visitedCountries);
  const allContinentsVisited = visitedContinentsCount === 6;

  const getSubtitle = () => {
    if (i18n.language === 'pl') {
      if (visitedContinentsCount === 0) return "Czas rozpoczac przygode!";
      if (visitedContinentsCount === 1) return "Pierwszy kontynent zdobyty!";
      if (visitedContinentsCount === 2) return "Dwa kontynenty za Toba!";
      if (visitedContinentsCount === 3) return "Polmetek osiagniety!";
      if (visitedContinentsCount === 4) return "Prawie wszedzie!";
      if (visitedContinentsCount === 5) return "Jeszcze jeden!";
      return "Swiatowy podruznik!";
    }
    if (visitedContinentsCount === 0) return "Time to start exploring!";
    if (visitedContinentsCount === 1) return "First continent conquered!";
    if (visitedContinentsCount === 2) return "Two down, four to go!";
    if (visitedContinentsCount === 3) return "Halfway there!";
    if (visitedContinentsCount === 4) return "Almost everywhere!";
    if (visitedContinentsCount === 5) return "Just one more!";
    return "World traveler!";
  };

  return (
    <StatCard
      theme="continents"
      icon={<GlobeAltIcon className="w-6 h-6" />}
      label={t('visitedContinents')}
      value={visitedContinentsCount}
      maxValue={6}
      subtitle={getSubtitle()}
      isComplete={allContinentsVisited}
    />
  );
}

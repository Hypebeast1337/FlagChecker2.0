import { StarIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';

const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", 
  "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", 
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", 
  "SI", "ES", "SE"
];

export default function VisitedCountriesEU() {
  const { t, i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  const visitedEUCount = Object.keys(visitedCountries).filter(
    (key) => visitedCountries[key].visited === 1 && EU_COUNTRIES.includes(key)
  ).length;

  const totalEUCount = EU_COUNTRIES.length;
  const allEUVisited = visitedEUCount === totalEUCount;

  const getSubtitle = () => {
    const percentage = (visitedEUCount / totalEUCount) * 100;
    if (i18n.language === 'pl') {
      if (visitedEUCount === 0) return "Odkryj Europe!";
      if (percentage < 25) return "Europejski poczatek!";
      if (percentage < 50) return "Rosnie kolekcja!";
      if (percentage < 75) return "Europejski ekspert!";
      if (percentage < 100) return "Prawie wszystkie!";
      return "Mistrz Europy!";
    }
    if (visitedEUCount === 0) return "Discover Europe!";
    if (percentage < 25) return "European beginning!";
    if (percentage < 50) return "Collection growing!";
    if (percentage < 75) return "European expert!";
    if (percentage < 100) return "Almost complete!";
    return "EU Master!";
  };

  return (
    <StatCard
      theme="eu"
      icon={<StarIcon className="w-6 h-6" />}
      label={t('euCountries')}
      value={visitedEUCount}
      maxValue={totalEUCount}
      subtitle={getSubtitle()}
      isComplete={allEUVisited}
    />
  );
}

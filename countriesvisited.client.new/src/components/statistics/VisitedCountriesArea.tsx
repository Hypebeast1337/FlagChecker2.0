import { MapIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData";
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';

export default function VisitedCountriesArea() {
  const { t, i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  const totalArea = Object.keys(visitedCountries).reduce((sum, key) => {
    if (visitedCountries[key].visited === 1 && countryData[key]) {
      return sum + countryData[key].areaKm;
    }
    return sum;
  }, 0);

  const getSubtitle = () => {
    const areaInMillions = totalArea / 1_000_000;
    if (i18n.language === 'pl') {
      if (totalArea === 0) return "Zacznij zbierac kilometry!";
      if (areaInMillions < 1) return "Pierwsze tysiace km2!";
      if (areaInMillions < 5) return "Wiecej niz Polska!";
      if (areaInMillions < 10) return "Jak cala Europa!";
      if (areaInMillions < 20) return "Ogromny obszar!";
      return "Niesamowity zasieg!";
    }
    if (totalArea === 0) return "Start collecting kilometers!";
    if (areaInMillions < 1) return "First thousands of km2!";
    if (areaInMillions < 5) return "Bigger than Germany!";
    if (areaInMillions < 10) return "Size of Europe!";
    if (areaInMillions < 20) return "Massive territory!";
    return "Incredible coverage!";
  };

  return (
    <StatCard
      theme="area"
      icon={<MapIcon className="w-6 h-6" />}
      label={t('landAreaKm')}
      value={totalArea}
      suffix=" km²"
      showProgress={false}
      subtitle={getSubtitle()}
      compact={true}
    />
  );
}

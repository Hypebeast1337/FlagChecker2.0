import { UsersIcon } from '@heroicons/react/24/outline';
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData";
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';

export default function VisitedCountriesPopulation() {
  const { t, i18n } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  const totalPopulation = Object.keys(visitedCountries).reduce((sum, key) => {
    if (visitedCountries[key].visited === 1 && countryData[key]) {
      return sum + countryData[key].population;
    }
    return sum;
  }, 0);

  const totalPopulationMillions = totalPopulation / 1_000_000;
  // World population ~8 billion for reference

  const getSubtitle = () => {
    if (i18n.language === 'pl') {
      if (totalPopulationMillions === 0) return "Poznaj kultury swiata!";
      if (totalPopulationMillions < 100) return "Miliony ludzi poznanych!";
      if (totalPopulationMillions < 500) return "Pol miliarda!";
      if (totalPopulationMillions < 1000) return "Miliard ludzi!";
      if (totalPopulationMillions < 3000) return "Niesamowity zasieg!";
      return "Globalny obywatel!";
    }
    if (totalPopulationMillions === 0) return "Discover world cultures!";
    if (totalPopulationMillions < 100) return "Millions of people!";
    if (totalPopulationMillions < 500) return "Half a billion!";
    if (totalPopulationMillions < 1000) return "A billion people!";
    if (totalPopulationMillions < 3000) return "Incredible reach!";
    return "Global citizen!";
  };

  return (
    <StatCard
      theme="population"
      icon={<UsersIcon className="w-6 h-6" />}
      label={t('totalPopulation')}
      value={totalPopulationMillions}
      decimals={1}
      suffix=" mln"
      showProgress={false}
      subtitle={getSubtitle()}
    />
  );
}

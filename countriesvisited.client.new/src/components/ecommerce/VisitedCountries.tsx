import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import ReactCountryFlag from "react-country-flag";
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData";
import Badge from "../ui/badge/Badge";
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import { AreaCalculationService } from '../../services/AreaCalculationService';
import { CountryCountingService } from '../../services/CountryCountingService';
import { CountryTranslationService } from '../../services/CountryTranslationService';
import { ResetSelectedCountriesButton } from "../common/ResetSelectedCountriesButton";

// Define a mapping of continents to custom badge classes
const continentColors: { [key: string]: string } = {
  Europe: "continent-europe",
  Asia: "continent-asia",
  Africa: "continent-africa",
  Australia: "continent-australia",
  "North America": "continent-north-america",
  "South America": "continent-south-america",
};

const VisitedCountries = () => {
  const { t, i18n } = useTranslation();
  const { visitedCountries, setVisitedCountries } = useVisitedCountries();

  // Use the service for counting
  const visitedCount = CountryCountingService.getVisitedCountriesCount(visitedCountries);

  // Handle removing a country from visited list
  const handleRemoveCountry = (isoCode: string) => {
    setVisitedCountries(prev => ({
      ...prev,
      [isoCode]: { visited: 0 }
    }));
  };

  return (
    <>
      <style scoped>{`
        .continent-badge {
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.625rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          border: 1px solid;
        }
        
        .continent-europe {
          background-color: #5862f5;
          color: #ffffff;
          border-color: #4c56e0;
        }
        
        .continent-asia {
          background-color: #A7C7E7;
          color: #2832c7;
          border-color: #8bb4e0;
        }
        
        .continent-africa {
          background-color: #696969;
          color: #ffffff;
          border-color: #555555;
        }
        
        .continent-australia {
          background-color: #A9A9A9;
          color: #ffffff;
          border-color: #909090;
        }
        
        .continent-north-america {
          background-color: #ee82ee;
          color: #ffffff;
          border-color: #e066e0;
        }
        
        .continent-south-america {
          background-color: #9400D3;
          color: #ffffff;
          border-color: #7a00b3;
        }
      `}</style>
      
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            {t('visitedCountries')} - {visitedCount}
          </h3>

          <div className="flex items-center gap-3">
            <ResetSelectedCountriesButton/>
          </div>
        </div>

        {/* Mobile Card Layout */}
        <div className="block md:hidden space-y-3" style={{ maxHeight: "364px", overflowY: "auto" }}>
          {Object.keys(visitedCountries)
            .filter((key) => visitedCountries[key].visited === 1)
            .sort((a, b) => {
              const nameA = CountryTranslationService.getCountryName(a, i18n.language);
              const nameB = CountryTranslationService.getCountryName(b, i18n.language);
              return nameA.localeCompare(nameB);
            })
            .map((isoCode) => {
              const continentClass = continentColors[countryData[isoCode]?.continent] || "continent-australia";
              const isCountry = countryData[isoCode]?.isCountry ?? true;
              const areaKm = countryData[isoCode]?.areaKm || 0;
              const areaPercentage = AreaCalculationService.getFormattedPercentage(
                AreaCalculationService.getCountryAreaPercentage(areaKm),
                3
              );
              const translatedCountryName = CountryTranslationService.getCountryName(isoCode, i18n.language);

              return (
                <div key={isoCode} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  {/* Country Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <ReactCountryFlag
                      countryCode={isoCode}
                      svg
                      style={{ width: "2em", height: "2em" }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-800 dark:text-white/90 text-sm">
                          {translatedCountryName} ({isoCode})
                        </h4>
                        {!isCountry && (
                          <span
                            data-tooltip-id={`nc-mobile-${isoCode}`}
                            data-tooltip-content={t('notCountryTooltip')}
                          >
                            <Badge size="sm" color="light">NC</Badge>
                            <Tooltip id={`nc-mobile-${isoCode}`} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Country Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">{t('continent')}:</span>
                      <div className="mt-1">
                        <span className={`continent-badge ${continentClass}`}>
                          {countryData[isoCode]?.continent ? t(countryData[isoCode].continent) : t('unknown')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">{t('areaKm')}:</span>
                      <div className="mt-1 text-gray-700 dark:text-gray-300">
                        {areaKm.toLocaleString() || "-"} km²
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">{t('areaPercentage')}:</span>
                      <div className="mt-1 text-gray-700 dark:text-gray-300">
                        {areaKm > 0 ? `${areaPercentage}%` : "-"}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">{t('actions')}:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          data-tooltip-id={`calendar-mobile-${isoCode}`}
                          data-tooltip-content={t('setVisitDate')}
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          <CalendarIcon className="size-4" />
                        </button>
                        <Tooltip id={`calendar-mobile-${isoCode}`} />

                        <button
                          data-tooltip-id={`remove-mobile-${isoCode}`}
                          data-tooltip-content={t('removeCountry')}
                          onClick={() => handleRemoveCountry(isoCode)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors dark:hover:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <XMarkIcon className="size-4" />
                        </button>
                        <Tooltip id={`remove-mobile-${isoCode}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block max-w-full custom-scrollbar overflow-x-auto" style={{ maxHeight: "364px", overflowY: "auto" }}>
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {t('flag')}
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {t('country')}
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {t('continent')}
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {t('areaKm')}
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {t('areaPercentage')}
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {Object.keys(visitedCountries)
                .filter((key) => visitedCountries[key].visited === 1)
                .sort((a, b) => {
                  // Sort by translated country names
                  const nameA = CountryTranslationService.getCountryName(a, i18n.language);
                  const nameB = CountryTranslationService.getCountryName(b, i18n.language);
                  return nameA.localeCompare(nameB);
                })
                .map((isoCode) => {
                  const continentClass = continentColors[countryData[isoCode]?.continent] || "continent-australia";
                  const isCountry = countryData[isoCode]?.isCountry ?? true;
                  
                  const areaKm = countryData[isoCode]?.areaKm || 0;
                  const areaPercentage = AreaCalculationService.getFormattedPercentage(
                    AreaCalculationService.getCountryAreaPercentage(areaKm),
                    3
                  );

                  // Get translated country name
                  const translatedCountryName = CountryTranslationService.getCountryName(isoCode, i18n.language);

                  return (
                    <TableRow key={isoCode}>
                      <TableCell className="py-3">
                        <ReactCountryFlag
                          countryCode={isoCode}
                          svg
                          style={{
                            width: "2em",
                            height: "2em",
                          }}
                        />
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {translatedCountryName} ({isoCode})
                          </p>
                          {!isCountry && (
                            <span
                              data-tooltip-id={`nc-${isoCode}`}
                              data-tooltip-content={t('notCountryTooltip')}
                            >
                              <Badge size="sm" color="light">
                                NC
                              </Badge>
                              <Tooltip id={`nc-${isoCode}`} />
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className={`continent-badge ${continentClass}`}>
                          {countryData[isoCode]?.continent ? t(countryData[isoCode].continent) : t('unknown')}
                        </span>
                      </TableCell>

                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {areaKm.toLocaleString() || "-"} km²
                      </TableCell>

                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {areaKm > 0 ? `${areaPercentage}%` : "-"}
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            data-tooltip-id={`calendar-${isoCode}`}
                            data-tooltip-content={t('setVisitDate')}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            <CalendarIcon className="size-4" />
                          </button>
                          <Tooltip id={`calendar-${isoCode}`} />

                          <button
                            data-tooltip-id={`remove-${isoCode}`}
                            data-tooltip-content={t('removeCountry')}
                            onClick={() => handleRemoveCountry(isoCode)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:hover:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <XMarkIcon className="size-4" />
                          </button>
                          <Tooltip id={`remove-${isoCode}`} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default VisitedCountries;

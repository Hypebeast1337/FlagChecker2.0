import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import ReactCountryFlag from "react-country-flag"; // Import for flag rendering
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData"; // Import country data
import Badge from "../ui/badge/Badge"; // Import Badge component
import { AdjustmentsVerticalIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import { AreaCalculationService } from '../../services/AreaCalculationService';

// Define a mapping of continents to badge colors
const continentColors: { [key: string]: "primary" | "success" | "error" | "warning" | "info" | "light" | "dark" } = {
  Europe: "primary", // Primary for Europe
  Asia: "error", // Error (red) for Asia
  Africa: "warning", // Warning (yellow) for Africa
  Oceania: "success", // Success (green) for Oceania
  "North America": "info", // Info (blue) for North America
  "South America": "dark", // Dark for South America
  Antarctica: "light", // Light (gray) for Antarctica
};

const VisitedCountries = () => {
  const { t } = useTranslation();
  const { visitedCountries, setVisitedCountries } = useVisitedCountries(); // Access context

  // Calculate the count of visited countries
  const visitedCount = Object.keys(visitedCountries).filter(
    (key) => visitedCountries[key].visited === 1
  ).length;

  // Handle removing a country from visited list
  const handleRemoveCountry = (isoCode: string) => {
    setVisitedCountries(prev => ({
      ...prev,
      [isoCode]: { visited: 0 }
    }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
          {t('visitedCountries')} - {visitedCount}
        </h3>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <AdjustmentsVerticalIcon className="size-5" />
            {t('filter')}
          </button>
        </div>
      </div>
      <div className="max-w-full custom-scrollbar overflow-x-auto" style={{ maxHeight: "364px", overflowY: "auto" }}>
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

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {Object.keys(visitedCountries)
              .filter((key) => visitedCountries[key].visited === 1) // Only show visited countries
              .sort((a, b) => {
                const nameA = countryData[a]?.name || ""; // Get country name or empty string if undefined
                const nameB = countryData[b]?.name || ""; // Get country name or empty string if undefined
                return nameA.localeCompare(nameB); // Sort alphabetically by name
              })
              .map((isoCode) => {
                const continentColor = continentColors[countryData[isoCode]?.continent] || "light"; // Default to light if continent is unknown
                
                // Calculate area percentage using the service
                const areaKm = countryData[isoCode]?.areaKm || 0;
                const areaPercentage = AreaCalculationService.getFormattedPercentage(
                  AreaCalculationService.getCountryAreaPercentage(areaKm),
                  3
                );

                return (
                  <TableRow key={isoCode}>
                    {/* Flag */}
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

                    {/* Country Name */}
                    <TableCell className="py-3">
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {countryData[isoCode]?.name
                          ? `${countryData[isoCode].name} (${isoCode})`
                          : t('unknown')}
                      </p>
                    </TableCell>

                    {/* Continent */}
                    <TableCell className="py-3">
                      <Badge size="sm" color={continentColor}>
                        {countryData[isoCode]?.continent ? t(countryData[isoCode].continent) : t('unknown')}
                      </Badge>
                    </TableCell>

                    {/* Area in km² */}
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {areaKm.toLocaleString() || "-"} km²
                    </TableCell>

                    {/* Area Percentage - Now calculated dynamically */}
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {areaKm > 0 ? `${areaPercentage}%` : "-"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        {/* Calendar Icon */}
                        <button
                          data-tooltip-id={`calendar-${isoCode}`}
                          data-tooltip-content={t('setVisitDate')}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          <CalendarIcon className="size-4" />
                        </button>
                        <Tooltip id={`calendar-${isoCode}`} />

                        {/* Remove Icon */}
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
  );
};

export default VisitedCountries;

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData";

// Define continent colors - updated to match table
const continentColorMap: { [key: string]: string } = {
  'Europe': '#5862f5',        // Original blue (kept the same)
  'Asia': '#A7C7E7',          // Lighter blue
  'Africa': '#696969',        // Darker grey
  'Australia': '#A9A9A9',     // Grey
  'North America': '#ee82ee', // Violet
  'South America': '#9400D3', // Darker violet
};

export default function ContinentStatistics() {
  const { t } = useTranslation();
  const { visitedCountries } = useVisitedCountries();
  const [series, setSeries] = useState<number[]>([]);
  const [continentStats, setContinentStats] = useState<{ [key: string]: { visited: number; total: number } }>({});
  const [visibleContinents, setVisibleContinents] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Calculate continent data based on selected countries
  useEffect(() => {
    const continentCounts: { [key: string]: number } = {};
    const visitedCounts: { [key: string]: number } = {};

    // Count total countries per continent
    Object.values(countryData).forEach((country) => {
      const continent = country.continent;
      if (continent) {
        continentCounts[continent] = (continentCounts[continent] || 0) + 1;
      }
    });

    // Count visited countries per continent
    Object.keys(visitedCountries)
      .filter((key) => visitedCountries[key].visited === 1)
      .forEach((isoCode) => {
        const continent = countryData[isoCode]?.continent;
        if (continent) {
          visitedCounts[continent] = (visitedCounts[continent] || 0) + 1;
        }
      });

    // Combine data into a single object for stats
    const stats: { [key: string]: { visited: number; total: number } } = {};
    Object.keys(continentCounts).forEach((continent) => {
      stats[continent] = {
        visited: visitedCounts[continent] || 0,
        total: continentCounts[continent],
      };
    });

    setContinentStats(stats);
    setSeries(Object.values(visitedCounts));

    // Update visible continents for the legend (only those with at least one visited country)
    const visibleLabels = Object.keys(visitedCounts).filter((continent) => visitedCounts[continent] > 0);
    setVisibleContinents(visibleLabels);
  }, [visitedCountries]);

  // Generate colors array based on visible continents order
  const chartColors = visibleContinents.map(continent => continentColorMap[continent] || '#A9A9A9');

  // Chart options
  const options: ApexOptions = {
    colors: chartColors, // Use continent-specific colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 230,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: "600",
              color: "#000000", // Black color for both modes
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "500",
              color: "#000000", // Black color for both modes
              offsetY: 10,
              formatter: (val) => `${val}`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      },
    },
    legend: {
      position: "right",
      horizontalAlign: "center",
      labels: {
        colors: "#98a2b3", // Gray color for legend text
        useSeriesColors: false,
      }
    },
    stroke: {
      show: true,
      lineCap: 'butt',
      colors: ["#667085"],
      width: 1,
      dashArray: 0,
    },
    tooltip: {
      enabled: false,
      y: {
        formatter(val) {
          return `${val} ${t('countries')}`;
        },
      },
    },
    labels: visibleContinents.map(continent => t(continent)),
  };

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-2 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {t('continentStatistics')}
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              {t('continentStatisticsDesc')}
            </p>
          </div>
          <div className="relative inline-block">
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {t('viewMore')}
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {t('delete')}
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative">
          <div className="max-h-[230px]" id="chartDarkStyle">
            <Chart options={options} series={series} type="donut" height={230} />
          </div>
        </div>
      </div>

      {/* First Row of Continents */}
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5 xl:py-2">
        {['Europe', 'Asia', 'Africa'].map((continent, index) => (
          <div key={continent} className="flex items-center gap-5">
            <div>
              <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                {t(continent)}
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                {continentStats[continent]?.visited || 0} / {continentStats[continent]?.total || 0}
              </p>
            </div>
            {index < 2 && <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>}
          </div>
        ))}
      </div>

      {/* Second Row of Continents */}
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5 xl:py-2">
        {['North America', 'Australia', 'South America'].map((continent, index) => (
          <div key={continent} className="flex items-center gap-5">
            <div>
              <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                {t(continent)}
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                {continentStats[continent]?.visited || 0} / {continentStats[continent]?.total || 0}
              </p>
            </div>
            {index < 2 && <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

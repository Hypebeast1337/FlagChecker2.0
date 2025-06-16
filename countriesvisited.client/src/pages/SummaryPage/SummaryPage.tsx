import React from 'react';
import { useVisitedCountries } from '../../context/VisitedCountriesContext';
import CountriesTable from "../../components/CountriesTable";
import ReactCountryFlag from 'react-country-flag'; // Install this library for flag rendering
import { useTheme } from "../../context/ThemeContext";

const SummaryPage: React.FC = () => {
  const { visitedCountries } = useVisitedCountries();
  const { toggleTheme } = useTheme();

  // Mock data for country names and continents (you can replace this with an API later)
  const countryData: { [key: string]: { name: string; continent: string } } = {
    PL: { name: 'Poland', continent: 'Europe' },
    DE: { name: 'Germany', continent: 'Europe' },
    IN: { name: 'India', continent: 'Asia' },
    US: { name: 'United States', continent: 'North America' },
    FR: { name: 'France', continent: 'Europe' },
  };

  return (
    <>
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    >xxx
    </button>
      <div className="col-span-12 xl:col-span-7">
        <CountriesTable />
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-6">Summary</h1>
        <table className="table-auto w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="border border-gray-600 px-4 py-2">Code</th>
              <th className="border border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-600 px-4 py-2">Flag</th>
              <th className="border border-gray-600 px-4 py-2">Continent</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(visitedCountries)
              .filter((key) => visitedCountries[key].visited === 1)
              .sort()
              .map((countryCode) => (
                <tr key={countryCode} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2">{countryCode}</td>
                  <td className="border border-gray-600 px-4 py-2">{countryData[countryCode]?.name || 'Unknown'}</td>
                  <td className="border border-gray-600 px-4 py-2">
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{
                        width: '2em',
                        height: '2em',
                      }}
                    />
                  </td>
                  <td className="border border-gray-600 px-4 py-2">{countryData[countryCode]?.continent || 'Unknown'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SummaryPage;

// src/services/CountryCountingService.ts
import countryData from "../components/countries/data/countryData";

export class CountryCountingService {
  // Count visited countries (only actual countries, not territories)
  static getVisitedCountriesCount(visitedCountries: { [key: string]: { visited: number } }): number {
    return Object.keys(visitedCountries).filter(
      (key) => visitedCountries[key].visited === 1 && (countryData[key]?.isCountry ?? true)
    ).length;
  }

  // Count total countries in the dataset (only actual countries)
  static getTotalCountriesCount(): number {
    return Object.keys(countryData).filter(
      (key) => countryData[key]?.isCountry ?? true
    ).length;
  }

  // Get all visited countries (including territories)
  static getAllVisitedCount(visitedCountries: { [key: string]: { visited: number } }): number {
    return Object.keys(visitedCountries).filter(
      (key) => visitedCountries[key].visited === 1
    ).length;
  }

  // Check if a specific country/territory is visited
  static isCountryVisited(visitedCountries: { [key: string]: { visited: number } }, isoCode: string): boolean {
    return visitedCountries[isoCode]?.visited === 1;
  }

  // Get visited countries by type
  static getVisitedCountriesByType(visitedCountries: { [key: string]: { visited: number } }) {
    const visited = Object.keys(visitedCountries).filter(key => visitedCountries[key].visited === 1);
    
    return {
      countries: visited.filter(key => countryData[key]?.isCountry ?? true),
      territories: visited.filter(key => !(countryData[key]?.isCountry ?? true)),
      total: visited
    };
  }
  
  // Count visited continents (only from actual countries, not territories)
  static getVisitedContinentsCount(visitedCountries: { [key: string]: { visited: number } }): number {
    const visitedContinents = new Set(
      Object.keys(visitedCountries)
        .filter((key) => visitedCountries[key].visited === 1 && (countryData[key]?.isCountry ?? true))
        .map((key) => countryData[key]?.continent)
        .filter(Boolean)
    );
    return visitedContinents.size;
  }

  // Get visited continents set (for detailed analysis)
  static getVisitedContinents(visitedCountries: { [key: string]: { visited: number } }): Set<string> {
    return new Set(
      Object.keys(visitedCountries)
        .filter((key) => visitedCountries[key].visited === 1 && (countryData[key]?.isCountry ?? true))
        .map((key) => countryData[key]?.continent)
        .filter(Boolean)
    );
  }
}

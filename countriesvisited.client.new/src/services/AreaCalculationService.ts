// src/services/AreaCalculationService.ts
import countryData from "../components/countries/data/countryData";

export class AreaCalculationService {
  private static totalAreaAllCountries: number | null = null;

  // Calculate total area of all countries (cached for performance)
  private static getTotalAreaAllCountries(): number {
    if (this.totalAreaAllCountries === null) {
      this.totalAreaAllCountries = Object.values(countryData).reduce(
        (sum, country) => sum + country.areaKm, 
        0
      );
    }
    return this.totalAreaAllCountries;
  }

  // Calculate total area of visited countries
  static getTotalAreaVisited(visitedCountries: { [key: string]: { visited: number } }): number {
    return Object.keys(visitedCountries).reduce((sum, key) => {
      if (visitedCountries[key].visited === 1 && countryData[key]) {
        return sum + countryData[key].areaKm;
      }
      return sum;
    }, 0);
  }

  // Calculate percentage of visited area
  static getVisitedAreaPercentage(visitedCountries: { [key: string]: { visited: number } }): number {
    const totalAreaVisited = this.getTotalAreaVisited(visitedCountries);
    const totalAreaAll = this.getTotalAreaAllCountries();
    
    if (totalAreaAll === 0) return 0;
    
    return (totalAreaVisited / totalAreaAll) * 100;
  }

  // Calculate percentage for a single country
  static getCountryAreaPercentage(areaKm: number): number {
    const totalAreaAll = this.getTotalAreaAllCountries();
    
    if (totalAreaAll === 0) return 0;
    
    return (areaKm / totalAreaAll) * 100;
  }

  // Get formatted percentage string
  static getFormattedPercentage(percentage: number, decimals: number = 2): string {
    return percentage.toFixed(decimals);
  }
}

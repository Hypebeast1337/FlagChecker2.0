// src/services/MapUpdateService.ts
export class MapUpdateService {
  private static mapInstance: any = null;
  
  // Store reference to the map instance
  static setMapInstance(mapInstance: any) {
    this.mapInstance = mapInstance;
  }
  
  // Update map colors based on visited countries
  static updateMapColors(visitedCountries: { [key: string]: { visited: number } }) {
    if (!this.mapInstance) {
      console.warn('Map instance not available for color update');
      return;
    }
    
    try {
      // Countries that exist in countryData but are NOT in jVectorMap worldMill
      const MAP_INCOMPATIBLE_COUNTRIES = [
        'VA', 'SM', 'MC', 'LI', 'AD', 'MT', 'SG'
      ];
      
      // Create color data for the map
      const colorData: { [key: string]: number } = {};
      
      Object.keys(visitedCountries).forEach(isoCode => {
        // Only include countries that are compatible with the map
        if (!MAP_INCOMPATIBLE_COUNTRIES.includes(isoCode)) {
          colorData[isoCode] = visitedCountries[isoCode].visited;
        }
      });
      
      // Update the map series data
      this.mapInstance.series.regions[0].setValues(colorData);
      
    } catch (error) {
      console.error('Error updating map colors:', error);
    }
  }
  
  // Clear map instance reference
  static clearMapInstance() {
    this.mapInstance = null;
  }
}

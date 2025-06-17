// src/services/CountryTranslationService.ts
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import plLocale from 'i18n-iso-countries/langs/pl.json';
import countryData from "../components/countries/data/countryData";

// Register locales
countries.registerLocale(enLocale);
countries.registerLocale(plLocale);

export class CountryTranslationService {
  static getCountryName(isoCode: string, locale: string): string {
    // Try to get translated name from i18n-iso-countries
    const translatedName = countries.getName(isoCode, locale);
    
    if (translatedName) {
      return translatedName;
    }
    
    // Fallback to your countryData if not found
    return countryData[isoCode]?.name || isoCode;
  }

  static getAllCountryNames(locale: string): { [key: string]: string } {
    return countries.getNames(locale);
  }
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation & UI
      "changeLanguage": "Change language",
      "shareResults": "Share your travel results",
      "resetCountries": "Reset selected countries",

      // Countries Selection
      "countriesSelection": "Countries selection",
      "countriesSelectionDesc": "Select by clicking the map, or by choosing from the dropdown",
      "searchCountryPlaceholder": "Type country name...",
      "noCountriesFound": "No countries found",
      "added": "Added",

      // Visited Countries Table
      "visitedCountries": "Visited countries",
      "flag": "Flag",
      "country": "Country",
      "continent": "Continent",
      "areaKm": "Area km²",
      "areaPercentage": "Area %",
      "filter": "Filter",
      "unknown": "Unknown",
      "setVisitDate": "Set visit date",
      "removeCountry": "Remove visited country",
      "actions": "Actions",
      "notCountryTooltip": "Not a country - is not counted",

      // Reset Modal
      "resetCountriesTitle": "Reset selected countries",
      "resetCountriesMessage": "Are you sure you want to reset your countries selection? This action cannot be undone and will remove all currently selected countries.",
      "cancel": "Cancel",
      "yesReset": "Yes, reset",

      // Continents
      "Europe": "Europe",
      "Asia": "Asia",
      "Africa": "Africa",
      "Oceania": "Oceania",
      "North America": "North America",
      "South America": "South America",
      "Antarctica": "Antarctica",

      // Continent Statistics
      "continentStatistics": "Continent statistics",
      "continentStatisticsDesc": "Distribution of visited countries by continent",
      "viewMore": "View More",
      "delete": "Delete",
      "countries": "countries",

      // Statistics Cards
      "landAreaKm": "Km² of land area",
      "landAreaPercentage": "% of land area",
      "visitedContinents": "Visited continents",
      "visitedCountriesCount": "Visited countries",
      "euCountries": "European Union countries",
      "totalPopulation": "Total population",
      "millionAbbr": "mln",

      // Info Modal
      "dataInformation": "Data information",
      "dataInformationTitle": "Data Information",
      "countriesCount": "Number of countries",
      "countriesCountDesc": "we recognize countries based on the list of UN Member States for 2025 - 193 member countries and two non-member states Palestine and Vatican and in addition Kosovo and Taiwan, totaling 197. Source:",
      "countriesArea": "Countries area",
      "countriesAreaDesc": "according to 'List of countries and dependencies by area' Wikipedia as of May 2025. Source:",
      "countriesPopulation": "Countries population",
      "countriesPopulationDesc": "according to 'List of countries and dependencies by population' as of May 2025. Source:",
      "usedMap": "Used map",
      "usedMapDesc": "Currently used map is react-jvectormap/core - does NOT contain all countries that can be selected (e.g. through typing) due to obvious limitations of this library, some countries are too small to be visible on the map, e.g. Vatican, San Marino, Singapore etc.",
      "antarcticaNote": "Antarctica is not selectable",

      // Sharing functionality      
      "shareError": "Share Link error",
      "goHome": "Go to Home",
      "loadingSharedCountries": "Loading shared countries...",
      "loadingCountriesDesc": "Loading {{count}} countries from shared link",
      "shareResultsTitle": "Share results",
      "shareResultsDesc": "Send the below link to share your countries selection",
      "copy": "Copy",
      "copied": "Copied!",

    }
  },
  pl: {
    translation: {
      // Navigation & UI
      "changeLanguage": "Zmień język",
      "shareResults": "Udostępnij swoje wyniki podróży",
      "resetCountries": "Resetuj wybrane kraje",

      // Countries Selection
      "countriesSelection": "Wybór krajów",
      "countriesSelectionDesc": "Wybierz klikając na mapę lub wybierając z listy rozwijanej",
      "searchCountryPlaceholder": "Wpisz nazwę kraju...",
      "noCountriesFound": "Nie znaleziono krajów",
      "added": "Dodany",

      // Visited Countries Table
      "visitedCountries": "Odwiedzone kraje",
      "flag": "Flaga",
      "country": "Kraj",
      "continent": "Kontynent",
      "areaKm": "Powierzchnia km²",
      "areaPercentage": "Powierzchnia %",
      "filter": "Filtruj",
      "unknown": "Nieznany",
      "setVisitDate": "Ustaw datę odwiedzin",
      "removeCountry": "Usuń odwiedzony kraj",
      "actions": "Akcje",
      "notCountryTooltip": "Nie jest krajem - nie jest liczony",

      // Reset Modal
      "resetCountriesTitle": "Resetuj wybór krajów",
      "resetCountriesMessage": "Czy na pewno chcesz zresetować wybór krajów? Ta akcja nie może być cofnięta i usunie wszystkie aktualnie wybrane kraje.",
      "cancel": "Anuluj",
      "yesReset": "Tak, resetuj",

      // Continents
      "Europe": "Europa",
      "Asia": "Azja",
      "Africa": "Afryka",
      "Oceania": "Oceania",
      "North America": "Ameryka Północna",
      "South America": "Ameryka Południowa",
      "Antarctica": "Antarktyda",

      // Continent Statistics
      "continentStatistics": "Statystyki kontynentów",
      "continentStatisticsDesc": "Rozkład odwiedzonych krajów według kontynentów",
      "viewMore": "Zobacz więcej",
      "delete": "Usuń",
      "countries": "krajów",

      // Statistics Cards
      "landAreaKm": "Km² powierzchni ziemi (lądu)",
      "landAreaPercentage": "% powierzchni ziemi (lądu)",
      "visitedContinents": "Odwiedzonych kontynentów",
      "visitedCountriesCount": "Odwiedzonych krajów",
      "euCountries": "Krajów Unii Europejskiej",
      "totalPopulation": "Populacji łącznie",
      "millionAbbr": "mln",

      // Info Modal
      "dataInformation": "Informacje o danych",
      "dataInformationTitle": "Informacje o danych",
      "countriesCount": "Ilość krajów",
      "countriesCountDesc": "definiujemy kraj według listy Państw Członkowskich ONZ na rok 2025 - 193 kraje członkowskie i dwa państwa niebędące członkami tj. Palestyna i Watykan oraz dodatkowo Kosowo i Tajwan, czyli łącznie 197. Źródło:",
      "countriesArea": "Powierzchnia krajów",
      "countriesAreaDesc": "według 'List of countries and dependencies by area' Wikipedii na maj 2025. Źródło:",
      "countriesPopulation": "Populacja krajów",
      "countriesPopulationDesc": "według 'List of countries and dependencies by population' na maj 2025. Źródło:",
      "usedMap": "Użyta mapa",
      "usedMapDesc": "Aktualnie używana mapa to react-jvectormap/core -  NIE zawiera w sobie wszystkich krajów, które są możliwe do wybrania (np. poprzez wpisywanie) przez oczywiste ograniczenia tej biblioteki, niektóre kraje są za małe, aby były widoczne na mapie, np. Watykan, San Marino, Singapur itd.",
      "antarcticaNote": "Antarktyda nie jest możliwa do wybrania",

      // Sharing functionality      
      "shareError": "Błąd linku udostępniania",
      "goHome": "Idź do Strony Głównej", 
      "loadingSharedCountries": "Ładowanie udostępnionych krajów...",
      "loadingCountriesDesc": "Ładowanie {{count}} krajów z udostępnionego linku",
      "shareResultsTitle": "Udostępnij",
      "shareResultsDesc": "Wyślij poniższy link, aby udostępnić swój wybór krajów",
      "copy": "Kopiuj",
      "copied": "Skopiowano!",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

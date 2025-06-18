import React, { useMemo } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData";
import { useTranslation } from 'react-i18next';
import { CountryTranslationService } from '../../services/CountryTranslationService';

const CountryMap: React.FC = () => {
  const { visitedCountries, setVisitedCountries } = useVisitedCountries();
  const { i18n } = useTranslation();

  const MAP_INCOMPATIBLE_COUNTRIES = ['VA', 'SM', 'MC', 'LI', 'AD', 'MT', 'SG'];

  // Extract selected regions from context (filtered for map compatibility)
  // Use useMemo to ensure we always get a new array reference when visitedCountries changes
  const selectedRegions = useMemo(() => {
    return Object.keys(visitedCountries)
      .filter((key) => visitedCountries[key].visited === 1)
      .filter((key) => !MAP_INCOMPATIBLE_COUNTRIES.includes(key))
      .slice(); // Create a new array instance
  }, [visitedCountries]);

  // Handle region selection
  const handleRegionSelected = (
    event: any,
    code: string,
    isSelected: boolean,
    selectedRegionsList: string[]
  ) => {
    console.log("Selected Regions:", selectedRegionsList);
    console.log("Code:", code, "Is Selected:", isSelected);

    // Hide tooltip when selecting a new region (not when deselecting)
    if (isSelected) {
      setTimeout(() => {
        const tooltips = document.getElementsByClassName("jvectormap-tip");
        Array.from(tooltips).forEach((el: any) => {
          el.style.display = 'none';
        });
      }, 10);
    }

    setVisitedCountries((prev) => ({
      ...prev,
      [code]: { visited: isSelected ? 1 : 0 },
    }));
  };

  // Handle region tooltip with just translated country name
  const handleRegionTipShow = (event: any, label: any, code: string) => {
    const translatedCountryName = CountryTranslationService.getCountryName(code, i18n.language);
    label.html(translatedCountryName);
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <VectorMap
        key={selectedRegions.join(',')} // Use content-based key instead of counter
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={true}
        regionsSelectable={true}
        regionsSelectableOne={false}
        selectedRegions={selectedRegions}
        onRegionSelected={handleRegionSelected}
        onRegionTipShow={handleRegionTipShow}
        regionStyle={{
          initial: {
            fill: "#667085",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0,
            strokeOpacity: 0,
          },
          hover: {
            fill: "gray",
            cursor: "pointer",
          },
          selected: {
            fill: "#465FFF",
          },
          selectedHover: {
            fillOpacity: 0.8,
          },
        }}
      />
    </div>
  );
};

export default CountryMap;

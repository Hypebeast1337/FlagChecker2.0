import React, { useMemo } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import { useTranslation } from 'react-i18next';
import { CountryTranslationService } from '../../services/CountryTranslationService';
import { MapCompatibilityService } from "../../services/MapCompatibilityService";

const CountryMap: React.FC = () => {
  const { visitedCountries, setVisitedCountries } = useVisitedCountries();
  const { i18n } = useTranslation();

  // Extract selected regions from context (filtered for map compatibility)
  // Use useMemo to ensure we always get a new array reference when visitedCountries changes
  const selectedRegions = useMemo(() => {
    const selected = Object.keys(visitedCountries).filter(
      (key) => visitedCountries[key].visited === 1
    );

    // Only pass codes that exist in the vector map to avoid runtime errors
    return MapCompatibilityService.filterSupported(selected);
  }, [visitedCountries]);

  // Handle region selection
  const handleRegionSelected = (
    _event: any,
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
  const handleRegionTipShow = (_event: any, label: any, code: string) => {
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

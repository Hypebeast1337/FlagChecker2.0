import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useVisitedCountries } from "../countries/VisitedCountriesContext";
import countryData from "../countries/data/countryData"; // Import country data

const CountryMap: React.FC = () => {
  const { visitedCountries, setVisitedCountries } = useVisitedCountries(); // Access context

  // Extract selected regions from context
  const selectedRegions = Object.keys(visitedCountries).filter(
    (key) => visitedCountries[key].visited === 1
  );

  // Handle region selection
  const handleRegionSelected = (
    event: any,
    code: string,
    isSelected: boolean,
    selectedRegionsList: string[]
  ) => {
    console.log("Selected Regions:", selectedRegionsList); // Log selected regions
    console.log("Code:", code, "Is Selected:", isSelected); // Log individual country selection

    // Update visited countries in context
    setVisitedCountries((prev) => ({
      ...prev,
      [code]: { visited: isSelected ? 1 : 0 }, // Mark as visited or unvisited
    }));
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <VectorMap
        map={worldMill} // Use the worldMill map
        backgroundColor="transparent" // Transparent background
        zoomOnScroll={true} // Enable zoom on scroll
        regionsSelectable={true} // Allow regions to be selectable
        regionsSelectableOne={false} // Allow multiple selections
        selectedRegions={selectedRegions} // Bind selected regions from context
        onRegionSelected={handleRegionSelected} // Handle region selection
        regionStyle={{
          initial: {
            fill: "#B8E186", // Default color for unselected regions (light green)
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0,
            strokeOpacity: 0,
          },
          hover: {
            fill: "#CA0020", // Hover color (red)
            cursor: "pointer",
          },
          selected: {
            fill: "#465FFF", // Selected color (blue)
          },
          selectedHover: {
            fillOpacity: 0.8, // Slightly transparent when hovered and selected
          },
        }}
      />
    </div>
  );
};

export default CountryMap;

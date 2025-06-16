import React, { useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

const CountryMap: React.FC = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["US", "DE"]); // Preselect some regions

  // Handle region selection
  const handleRegionSelected = (
    event: any,
    code: string,
    isSelected: boolean,
    selectedRegionsList: string[]
  ) => {
    setSelectedRegions(selectedRegionsList); // Update selected regions state
    console.log("Selected Regions:", selectedRegionsList); // Log selected regions
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <VectorMap
        map={worldMill} // Use the worldMill map
        backgroundColor="transparent" // Transparent background
        zoomOnScroll={true} // Enable zoom on scroll
        regionsSelectable={true} // Allow regions to be selectable
        regionsSelectableOne={false} // Allow multiple selections
        selectedRegions={selectedRegions} // Bind selected regions state
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

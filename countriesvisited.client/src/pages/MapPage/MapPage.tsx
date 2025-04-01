import React, { useEffect, useRef, useState } from 'react';
import svgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // State to track visited countries dynamically
  const [visitedCountries, setVisitedCountries] = useState<{ [key: string]: { visited: number } }>({
    PL: { visited: 1 }, // Poland
    DE: { visited: 1 }, // Germany
    IN: { visited: 1 }, // India
    US: { visited: 1 }, // United States
    FR: { visited: 0 }, // France
  });

  useEffect(() => {
    let mapInstance: InstanceType<typeof svgMap> | null = null; // Correctly type svgMap instance

    const container = document.getElementById('svgMapContainer');
    if (container) {
      container.innerHTML = ''; // Clear any existing content (cleanup)
    }

    if (mapRef.current) {
      // Initialize svgMap only once
      mapInstance = new svgMap({
        targetElementID: 'svgMapContainer',
        data: {
          data: {
            visited: {
              name: 'Visited',
              format: '{0}',
              thresholdMax: 1,
              thresholdMin: 0,
            },
          },
          applyData: 'visited',
          values: visitedCountries,
        },
        colorMax: '#54a4ed', // Selected countries color
        colorNoData: '#222937', // Non-selected countries background
        showZoomReset: true,
      });

      // Attach click event listeners to paths dynamically (only once)
      const paths = document.querySelectorAll('#svgMapContainer path') as NodeListOf<SVGPathElement>;
      paths.forEach((path) => {
        path.style.cursor = 'pointer'; // Indicate interactivity
        path.addEventListener('click', () => handleCountryClick(path));
      });
    }

    return () => {
      // Cleanup function to remove the map instance before unmounting or reinitializing
      if (mapInstance) {
        const container = document.getElementById('svgMapContainer');
        if (container) {
          container.innerHTML = ''; // Clear container content
        }
        mapInstance = null; // Reset map instance
      }
    };
  }, []); // Initialize map only once

  const handleCountryClick = (pathElement: SVGPathElement) => {
    const countryCode = pathElement.id.replace('svgMapContainer-map-country-', ''); // Extract ISO code

    setVisitedCountries((prev) => {
      const isVisited = prev[countryCode]?.visited === 1;

      const updatedVisitedCountries = {
        ...prev,
        [countryCode]: { visited: isVisited ? 0 : 1 }, // Toggle visited status
      };

      console.log(
        "Updated Visited Countries:",
        Object.keys(updatedVisitedCountries)
          .filter((key) => updatedVisitedCountries[key].visited === 1)
          .sort()
      );

      // Dynamically update country color without reinitializing the map
      pathElement.style.fill = isVisited ? '#222937' : '#54a4ed'; // Toggle color based on state

      return updatedVisitedCountries;
    });
  };

  return (
    <div className="min-h-screen bg-primary text-textPrimary flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">Countries Visited</h1>

      <div className="mb-6 space-y-4 w-full max-w-4xl">
        <div className="p-4 bg-secondary rounded-lg shadow-md">
          <p className="text-textSecondary">
            Click on a country to mark it as visited or unvisited. Check the console for updates.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full flex justify-center">
        <div 
          id="svgMapContainer" 
          ref={mapRef}
          className="w-[70%] max-w-[900px] h-[500px] border border-gray-700 rounded-lg overflow-hidden"
          style={{
            maxWidth: '70%', // Enforce maximum width
            margin: '0 auto', // Center horizontally
          }}
        />
      </div>
    </div>
  );
};

export default MapPage;

import React from 'react';
import { Tab } from '@headlessui/react';
import MapPage from './pages/MapPage/MapPage';
import FlagsPage from './pages/FlagsPage/FlagsPage';

const SummaryPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Summary</h1>
      <p className="text-textSecondary">This is the summary page content.</p>
    </div>
  );
};

function App() {
  const tabs = [
    { label: 'Map', component: <MapPage /> },
    { label: 'Flags', component: <FlagsPage /> },
    { label: 'Summary', component: <SummaryPage /> },
  ];

  return (
    <div className="min-h-screen bg-primary text-textPrimary">
      <Tab.Group>
        {/* Tab List */}
        <Tab.List className="flex space-x-4 border-b border-gray-700 p-4 bg-secondary">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg ${
                  selected ? 'bg-accent text-white' : 'bg-gray-700 text-gray-300'
                }`
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>

        {/* Tab Panels */}
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index} className="p-4">
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;

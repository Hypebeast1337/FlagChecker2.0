import React, { useState } from 'react';
import { ArchiveBoxXMarkIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import Modal from 'react-modal';
import { useVisitedCountries } from '../countries/VisitedCountriesContext';
import { useTranslation } from 'react-i18next';

// Set the app element for accessibility (you should do this once in your main app file)
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root'); // or whatever your root element ID is
}

export const ResetSelectedCountriesButton: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setVisitedCountries } = useVisitedCountries();

  const handleResetClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmReset = () => {
    // Reset all countries to unvisited
    setVisitedCountries({});
    setIsModalOpen(false);
  };

  const handleCancelReset = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        data-tooltip-id="reset-countries-tooltip"
        data-tooltip-content={t('resetCountriesTitle')}
        onClick={handleResetClick}
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <ArchiveBoxXMarkIcon className="size-5" />
      </button>
      
      <Tooltip id="reset-countries-tooltip" />

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelReset}
        className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg mx-auto mt-20 p-0 focus:outline-none"
        overlayClassName="fixed inset-0 bg-gray-200 bg-opacity-75 dark:bg-black dark:bg-opacity-50 flex items-start justify-center p-4 z-50"
        closeTimeoutMS={200}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full">
                <TrashIcon className="size-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {t('resetCountriesTitle')}
              </h3>
            </div>
            <button
              onClick={handleCancelReset}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {t('resetCountriesMessage')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={handleCancelReset}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="size-4" />
              {t('cancel')}
            </button>
            <button
              onClick={handleConfirmReset}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="size-4" />
              {t('yesReset')}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

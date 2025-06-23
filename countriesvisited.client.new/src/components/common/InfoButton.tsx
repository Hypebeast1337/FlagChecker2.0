import React, { useState } from 'react';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

export const InfoButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        data-tooltip-id="info-tooltip"
        data-tooltip-content={t('dataInformation')}
        onClick={handleInfoClick}
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <QuestionMarkCircleIcon className="size-5" />
      </button>

      <Tooltip id="info-tooltip" />

      {/* Info Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg mx-auto mt-20 p-0 focus:outline-none"
        overlayClassName="fixed inset-0 bg-gray-200 bg-opacity-75 dark:bg-black dark:bg-opacity-50 flex items-start justify-center p-4 z-50"
        closeTimeoutMS={200}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <QuestionMarkCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {t('dataInformationTitle')}
              </h3>
            </div>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>{t('countriesCount')}</strong> - {t('countriesCountDesc')} <a href="https://www.un.org/en/about-us/member-states">member-states (un.org)</a>
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>{t('countriesArea')}</strong> - {t('countriesAreaDesc')} <a href="https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area">area (wikipedia.org)</a>
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>{t('countriesPopulation')}</strong> - {t('countriesPopulationDesc')} <a href="https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population">population (wikipedia.org)</a>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                <strong>{t('usedMap')}</strong> - {t('usedMapDesc')}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('antarcticaNote')}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 pt-6 text-sm text-right">
                wasilew.net
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

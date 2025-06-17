import React, { useState } from 'react';
import { ShareIcon, XMarkIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { useVisitedCountries } from '../countries/VisitedCountriesContext';

export const ShareButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation();
  const { visitedCountries } = useVisitedCountries();

  // Calculate the count of visited countries
  const visitedCount = Object.keys(visitedCountries).filter(
    (key) => visitedCountries[key]?.visited === 1
  ).length;

  // Generate the share link
  const generateShareLink = () => {
    // Get selected country ISO codes
    const selectedCountries = Object.keys(visitedCountries)
      .filter(isoCode => visitedCountries[isoCode]?.visited === 1);
    
    // Create comma-separated string
    const countriesString = selectedCountries.join(',');
    
    // Encode to base64
    const encodedCountries = btoa(countriesString);
    
    // Generate the share URL
    const currentUrl = window.location.origin;
    return `${currentUrl}/share/${encodedCountries}`;
  };

  const handleShareClick = () => {
    setIsModalOpen(true);
    setIsCopied(false); // Reset copy state when opening modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCopied(false);
  };

  const handleCopyLink = async () => {
    const shareLink = generateShareLink();
    
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const shareLink = generateShareLink();

  return (
    <>
      <button
        data-tooltip-id="share-tooltip"
        data-tooltip-content={t('shareResults')}
        onClick={handleShareClick}
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <ShareIcon className="size-5" />
      </button>
      
      <Tooltip id="share-tooltip" />

      {/* Share Modal */}
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
                <ShareIcon className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {t('shareResultsTitle')}
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
          <div className="mb-6">
            {/* Visited Countries Count */}
            <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-3">
              {t('visitedCountries')}: {visitedCount}
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {t('shareResultsDesc')}
            </p>
            
            {/* Share Link Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isCopied
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isCopied ? (
                  <>
                    <CheckIcon className="size-4" />
                    {t('copied')}
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="size-4" />
                    {t('copy')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

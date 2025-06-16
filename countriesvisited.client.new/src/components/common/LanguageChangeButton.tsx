import { LanguageIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';

export const LanguageChangeButton: React.FC = () => {
  const { i18n, t } = useTranslation();
  
  const currentLanguage = i18n.language;
  const isPolish = currentLanguage === 'pl';
  
  const toggleLanguage = () => {
    const newLanguage = isPolish ? 'en' : 'pl';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <button
        data-tooltip-id="language-tooltip"
        data-tooltip-content={t('changeLanguage')}
        onClick={toggleLanguage}
        className="relative flex items-center justify-center gap-2 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 px-3 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <LanguageIcon className="size-4" />
        <span className="text-xs font-medium">
          {isPolish ? 'PL' : 'ENG'}
        </span>
      </button>
      <Tooltip id="language-tooltip" />
    </>
  );
};

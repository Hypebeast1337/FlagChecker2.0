import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import { LanguageChangeButton } from "../components/common/LanguageChangeButton";
import { ResetSelectedCountriesButton } from "../components/common/ResetSelectedCountriesButton";
import { ShareButton } from "../components/common/ShareButton";
import { InfoButton } from "../components/common/InfoButton";

const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-center w-full gap-2 px-3 py-3 sm:gap-4">
        <ThemeToggleButton />
        <LanguageChangeButton />
        
        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>
        <InfoButton />
        <ResetSelectedCountriesButton />
        <ShareButton />
      </div>
    </header>
  );
};

export default AppHeader;

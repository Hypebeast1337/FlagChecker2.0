
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";

const LayoutContent: React.FC = () => {

  return (
    <div className="min-h-screen xl:flex">
      <div>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <LayoutContent />
  );
};

export default AppLayout;

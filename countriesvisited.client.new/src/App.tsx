import { BrowserRouter as Router, Routes, Route } from "react-router";
import './i18n/i18n';
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { VisitedCountriesProvider } from "./components/countries/VisitedCountriesContext";
import { CountryNotificationProvider } from "./components/notifications/CountryNotificationContext";
import CountryAddedNotification from "./components/notifications/CountryAddedNotification";
import ResetAnimation from './components/notifications/ResetAnimation';
import ShareHandler from './components/ShareHandler';

export default function App() {
  return (
    <>
      <VisitedCountriesProvider>
        <CountryNotificationProvider>
          <Router>
            <ScrollToTop />
            <CountryAddedNotification />
            <ResetAnimation />
            <Routes>
              {/* Dashboard Layout */}
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />

                {/* Others Page */}
                <Route path="/profile" element={<UserProfiles />} />

                {/* Forms */}
                <Route path="/form-elements" element={<FormElements />} />
              </Route>

              {/* Share */}
              <Route path="/share/:encodedCountries" element={<ShareHandler />} />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CountryNotificationProvider>
      </VisitedCountriesProvider>
    </>
  );
}

import ContinentStatistics from "../../components/ecommerce/ContinentStatistics";
import VisitedCountries from "../../components/ecommerce/VisitedCountries";
import VisitedCountriesCount from "../../components/statistics/VisitedCountriesCount";
import VisitedCountriesArea from "../../components/statistics/VisitedCountriesArea";
import VisitedCountriesAreaPercentage from "../../components/statistics/VisitedCountriesAreaPercentage";
import VisitedCountriesEuMembers from "../../components/statistics/VisitedCountriesEuMembers";
import VisitedCountriesPopulation from "../../components/statistics/VisitedCountriesPopulation";
import VisitedCountriesContinents from "../../components/statistics/VisitedCountriesContinents";
import { useVisitedCountries } from "../../components/countries/VisitedCountriesContext";
import MapSelection from "../../components/ecommerce/MapSelection";
import PageMeta from "../../components/common/PageMeta";
import { motion } from "framer-motion"; // Import framer-motion for animations

export default function Home() {
    const { visitedCountries } = useVisitedCountries(); // Access context

    // Calculate the count of visited countries
    const visitedCount = Object.keys(visitedCountries).filter(
        (key) => visitedCountries[key].visited === 1
    ).length;

    return (
        <>
            <PageMeta
                title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">                
                <motion.div
                        initial={{ opacity: 0, y: 0 }} // Fade-in effect with slight upward motion
                        animate={{ opacity: 1, y: 0 }} // Final state
                        transition={{ duration: 2 }} // Animation duration
                        className="col-span-12 xl:col-span-12"
                    >
                      <MapSelection />
                    </motion.div>

                {/* Conditionally render modules only if visitedCount > 1 */}
                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} // Fade-in effect with slight upward motion
                        animate={{ opacity: 1, y: 0 }} // Final state
                        transition={{ duration: 2 }} // Animation duration
                        className="col-span-6 space-y-6 xl:col-span-2"
                    >
                        <VisitedCountriesContinents />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-6 space-y-6 xl:col-span-2"
                    >
                        <VisitedCountriesCount />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-6 space-y-6 xl:col-span-2"
                    >
                        <VisitedCountriesArea />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-6 space-y-6 xl:col-span-2"
                    >
                        <VisitedCountriesAreaPercentage />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-6 space-y-6 xl:col-span-2"
                    >
                        <VisitedCountriesPopulation />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-6 space-y-6 xl:col-span-2"
                    >
                        <VisitedCountriesEuMembers />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-12 xl:col-span-7"
                    >
                        <VisitedCountries />
                    </motion.div>
                )}

                {visitedCount >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="col-span-12 xl:col-span-5"
                    >
                        <ContinentStatistics />
                    </motion.div>
                )}
            </div>
        </>
    );
}

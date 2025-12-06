import { motion, AnimatePresence } from 'framer-motion';
import { useVisitedCountries } from '../countries/VisitedCountriesContext';
import { useTranslation } from 'react-i18next';

// Dissolving particle - blue theme
const DissolveParticle: React.FC<{ delay: number; startX: number; startY: number }> = ({
  delay,
  startX,
  startY
}) => (
  <motion.div
    className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500"
    style={{
      left: `${startX}%`,
      top: `${startY}%`,
      boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
    }}
    initial={{ opacity: 1, scale: 1, y: 0 }}
    animate={{
      opacity: 0,
      scale: 0,
      y: -80,
    }}
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

// Sweep line effect - blue theme
const SweepLine: React.FC = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Main sweep line */}
    <motion.div
      className="absolute top-0 w-2 h-full"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.8) 50%, transparent 100%)',
        boxShadow: '0 0 30px 10px rgba(99, 102, 241, 0.4)',
      }}
      initial={{ left: '-5%' }}
      animate={{ left: '105%' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />

    {/* Trail effect */}
    <motion.div
      className="absolute top-0 h-full"
      style={{
        background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.3) 0%, transparent 100%)',
        width: '30%',
      }}
      initial={{ left: '-35%' }}
      animate={{ left: '105%' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />
  </motion.div>
);

// Flash effect
const FlashOverlay: React.FC = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, delay: 0.3 }}
  />
);

// Main reset animation component
const ResetAnimation: React.FC = () => {
  const { isResetting } = useVisitedCountries();
  const { i18n } = useTranslation();

  // Generate particles with fixed positions (not random on each render)
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: (i % 5) * 0.06,
    startX: 10 + (i * 6) % 80,
    startY: 35 + (i * 7) % 30,
  }));

  const resetText = i18n.language === 'pl' ? 'Zresetowano!' : 'Reset Complete!';

  return (
    <AnimatePresence>
      {isResetting && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Sweep effect */}
          <SweepLine />

          {/* Flash */}
          <FlashOverlay />

          {/* Dissolving particles */}
          {particles.map((p) => (
            <DissolveParticle
              key={p.id}
              delay={p.delay + 0.1}
              startX={p.startX}
              startY={p.startY}
            />
          ))}

          {/* Center notification */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.2
              }}
            >
              {/* Background blur card - blue/indigo/purple gradient */}
              <motion.div
                className="px-8 py-4 rounded-2xl backdrop-blur-md bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-purple-500/90 shadow-2xl"
                initial={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)' }}
                animate={{ boxShadow: '0 0 60px rgba(99, 102, 241, 0.7)' }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Icon and text */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -10 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      delay: 0.4
                    }}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.div>

                  <div className="flex flex-col">
                    <motion.span
                      className="text-white/80 text-sm font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.25 }}
                    >
                      {i18n.language === 'pl' ? 'Wszystkie kraje' : 'All countries'}
                    </motion.span>
                    <motion.span
                      className="text-white font-bold text-xl"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45, duration: 0.25 }}
                    >
                      {resetText}
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Expanding ring effect - indigo */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-indigo-400/50"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResetAnimation;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useCountryNotification, CountryNotification } from './CountryNotificationContext';

// Sparkle/particle component
const Sparkle: React.FC<{ delay: number; x: number; y: number }> = ({ delay, x, y }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      boxShadow: '0 0 6px #fbbf24',
    }}
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1, 0],
      x: x,
      y: y,
    }}
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

// Star burst component
const StarBurst: React.FC = () => {
  const particles = [
    { delay: 0, x: -30, y: -25 },
    { delay: 0.05, x: 30, y: -20 },
    { delay: 0.1, x: -25, y: 25 },
    { delay: 0.15, x: 35, y: 20 },
    { delay: 0.08, x: 0, y: -35 },
    { delay: 0.12, x: -40, y: 0 },
    { delay: 0.18, x: 40, y: 5 },
    { delay: 0.06, x: 20, y: 30 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p, i) => (
        <Sparkle key={i} delay={p.delay} x={p.x} y={p.y} />
      ))}
    </div>
  );
};

// Ring burst animation
const RingBurst: React.FC = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="absolute rounded-full border-2 border-blue-400"
      initial={{ width: 20, height: 20, opacity: 0.8 }}
      animate={{ width: 100, height: 100, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <motion.div
      className="absolute rounded-full border-2 border-green-400"
      initial={{ width: 20, height: 20, opacity: 0.6 }}
      animate={{ width: 80, height: 80, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    />
  </motion.div>
);

// Single notification item
const NotificationItem: React.FC<{ notification: CountryNotification; index: number }> = ({
  notification,
  index
}) => {
  const { i18n } = useTranslation();
  const [showEffects, setShowEffects] = useState(true);
  const isAdded = notification.type === 'added';

  useEffect(() => {
    // Hide particle effects after they complete
    const timer = setTimeout(() => setShowEffects(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scale: 0.3,
        y: 50,
        rotateZ: -10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotateZ: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        y: -20,
        transition: { duration: 0.3 }
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.8,
      }}
      className="relative"
      style={{ marginBottom: index > 0 ? '8px' : '0' }}
    >
      {/* Background card */}
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl px-5 py-4
          backdrop-blur-md shadow-2xl
          ${isAdded
            ? 'bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-purple-500/90'
            : 'bg-gradient-to-r from-gray-500/90 via-gray-600/90 to-gray-700/90'
          }
        `}
        initial={{ boxShadow: '0 0 0 rgba(99, 102, 241, 0)' }}
        animate={{
          boxShadow: isAdded
            ? ['0 0 20px rgba(99, 102, 241, 0.5)', '0 0 40px rgba(99, 102, 241, 0.3)', '0 0 20px rgba(99, 102, 241, 0.1)']
            : '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 1.5 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Particle effects */}
        {showEffects && isAdded && (
          <>
            <StarBurst />
            <RingBurst />
          </>
        )}

        {/* Content */}
        <div className="relative flex items-center gap-4">
          {/* Flag with bounce animation */}
          <motion.div
            className="relative"
            animate={isAdded ? {
              scale: [1, 1.3, 0.9, 1.1, 1],
              rotate: [0, -5, 5, -3, 0],
            } : {}}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="relative">
              <ReactCountryFlag
                countryCode={notification.isoCode}
                svg
                style={{
                  width: '3em',
                  height: '3em',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
              {/* Glow effect behind flag */}
              {isAdded && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-white/30 blur-md -z-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.3],
                  }}
                  transition={{ duration: 1, repeat: 1 }}
                />
              )}
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col">
            <motion.span
              className="text-white/70 text-xs font-medium uppercase tracking-wider"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {isAdded ? (i18n.language === 'pl' ? '+ Dodano' : '+ Added') : (i18n.language === 'pl' ? '- Usunięto' : '- Removed')}
            </motion.span>
            <motion.span
              className="text-white font-bold text-lg leading-tight"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              {notification.countryName}
            </motion.span>
            <motion.span
              className="text-white/60 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {notification.isoCode}
            </motion.span>
          </div>

          {/* Checkmark / X icon with pop animation */}
          <motion.div
            className={`
              ml-auto w-10 h-10 rounded-full flex items-center justify-center
              ${isAdded ? 'bg-green-400/30' : 'bg-red-400/30'}
            `}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
              delay: 0.2,
            }}
          >
            {isAdded ? (
              <motion.svg
                className="w-6 h-6 text-green-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
              </motion.svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 2, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
};

// Main notification container
const CountryAddedNotification: React.FC = () => {
  const { notifications } = useCountryNotification();

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col-reverse items-end gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CountryAddedNotification;

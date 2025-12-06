import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme configurations for different stat types
export const statThemes = {
  continents: {
    gradient: 'from-violet-500 to-purple-600',
    lightGradient: 'from-violet-500/10 to-purple-600/10',
    ringColor: '#8b5cf6',
    ringBg: 'rgba(139, 92, 246, 0.15)',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    accentColor: 'violet',
  },
  countries: {
    gradient: 'from-blue-500 to-indigo-600',
    lightGradient: 'from-blue-500/10 to-indigo-600/10',
    ringColor: '#3b82f6',
    ringBg: 'rgba(59, 130, 246, 0.15)',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accentColor: 'blue',
  },
  area: {
    gradient: 'from-emerald-500 to-teal-600',
    lightGradient: 'from-emerald-500/10 to-teal-600/10',
    ringColor: '#10b981',
    ringBg: 'rgba(16, 185, 129, 0.15)',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accentColor: 'emerald',
  },
  percentage: {
    gradient: 'from-cyan-500 to-blue-600',
    lightGradient: 'from-cyan-500/10 to-blue-600/10',
    ringColor: '#06b6d4',
    ringBg: 'rgba(6, 182, 212, 0.15)',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    accentColor: 'cyan',
  },
  population: {
    gradient: 'from-amber-500 to-orange-600',
    lightGradient: 'from-amber-500/10 to-orange-600/10',
    ringColor: '#f59e0b',
    ringBg: 'rgba(245, 158, 11, 0.15)',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accentColor: 'amber',
  },
  eu: {
    gradient: 'from-blue-600 to-yellow-500',
    lightGradient: 'from-blue-600/10 to-blue-400/10',
    ringColor: '#2563eb',
    ringBg: 'rgba(37, 99, 235, 0.15)',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accentColor: 'blue',
  },
} as const;

export type StatThemeType = keyof typeof statThemes;

// Circular Progress Ring Component
const CircularProgress: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  bgColor: string;
  children?: React.ReactNode;
}> = ({ progress, size = 80, strokeWidth = 6, color, bgColor, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Sparkle effect for achievements
const Sparkles: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          initial={{
            opacity: 0,
            scale: 0,
            x: '50%',
            y: '50%',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: `${20 + Math.random() * 60}%`,
            y: `${20 + Math.random() * 60}%`,
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            boxShadow: '0 0 6px 2px rgba(250, 204, 21, 0.6)',
          }}
        />
      ))}
    </div>
  );
};

// Achievement badge
const AchievementBadge: React.FC<{ show: boolean }> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg z-10"
      >
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

// Compact number formatter (e.g., 76,020,498 -> "76.0M")
const formatCompactNumber = (num: number, decimals: number = 1): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(decimals) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimals) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
};

// Animated counter component - animates from previous value to new value
const AnimatedCounter: React.FC<{
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  compact?: boolean;
}> = ({ value, decimals = 0, suffix = '', prefix = '', className = '', compact = false }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const diff = endValue - startValue;
    
    // If no change, skip animation
    if (diff === 0) return;
    
    const duration = 600; // Slightly faster for smoother feel
    const steps = 40;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Easing function for smoother animation
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = startValue + diff * eased;
      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(endValue);
        previousValue.current = endValue;
        clearInterval(timer);
      }
    }, stepDuration);

    return () => {
      clearInterval(timer);
      previousValue.current = value;
    };
  }, [value]);

  const formattedValue = compact
    ? formatCompactNumber(displayValue, decimals > 0 ? decimals : 1)
    : decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

// Main StatCard Component
interface StatCardProps {
  theme: StatThemeType;
  icon: React.ReactNode;
  label: string;
  value: number;
  maxValue?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  showProgress?: boolean;
  subtitle?: string;
  isComplete?: boolean;
  compact?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  theme,
  icon,
  label,
  value,
  maxValue,
  suffix = '',
  prefix = '',
  decimals = 0,
  showProgress = true,
  subtitle,
  isComplete = false,
  compact = false,
}) => {
  const themeConfig = statThemes[theme];
  const progress = maxValue ? (value / maxValue) * 100 : 0;
  const hasMaxValue = maxValue !== undefined && maxValue > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        relative overflow-hidden rounded-2xl p-5 md:p-6
        bg-white dark:bg-gray-900
        border-2 transition-all duration-300
        ${isComplete
          ? `border-${themeConfig.accentColor}-500 shadow-lg shadow-${themeConfig.accentColor}-500/20`
          : 'border-gray-200 dark:border-gray-800'
        }
      `}
      style={{
        boxShadow: isComplete
          ? `0 8px 32px ${themeConfig.ringColor}30`
          : undefined
      }}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${themeConfig.lightGradient} opacity-50`}
      />

      {/* Sparkle effects for completed */}
      <Sparkles active={isComplete} />

      {/* Achievement badge */}
      <AchievementBadge show={isComplete} />

      {/* Content */}
      <div className="relative z-10">
        {/* Top section with icon and progress ring */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl
              ${themeConfig.iconBg}
            `}
          >
            <div className={themeConfig.iconColor}>
              {icon}
            </div>
          </motion.div>

          {/* Progress Ring (for stats with max value) */}
          {hasMaxValue && showProgress && (
            <CircularProgress
              progress={progress}
              size={56}
              strokeWidth={5}
              color={themeConfig.ringColor}
              bgColor={themeConfig.ringBg}
            >
              <span
                className="text-xs font-bold"
                style={{ color: themeConfig.ringColor }}
              >
                {Math.round(progress)}%
              </span>
            </CircularProgress>
          )}
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {label}
        </p>

        {/* Value */}
        <div className="flex items-baseline gap-2">
          <motion.h4
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
          >
            <AnimatedCounter
              value={value}
              decimals={decimals}
              prefix={prefix}
              suffix={suffix}
              compact={compact}
            />
          </motion.h4>

          {hasMaxValue && (
            <span className="text-lg text-gray-400 dark:text-gray-500 font-medium">
              / {maxValue.toLocaleString()}
            </span>
          )}
        </div>

        {/* Subtitle / Fun fact */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-xs text-gray-500 dark:text-gray-400"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Linear progress bar (alternative to ring) */}
        {hasMaxValue && !showProgress && (
          <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${themeConfig.gradient} rounded-full`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
export { CircularProgress, AnimatedCounter, AchievementBadge };

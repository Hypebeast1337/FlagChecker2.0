import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type NotificationType = 'added' | 'removed';

export interface CountryNotification {
  id: string;
  isoCode: string;
  countryName: string;
  type: NotificationType;
  timestamp: number;
}

interface CountryNotificationContextType {
  notifications: CountryNotification[];
  showNotification: (isoCode: string, countryName: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
}

const CountryNotificationContext = createContext<CountryNotificationContextType | undefined>(undefined);

export const CountryNotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<CountryNotification[]>([]);

  const showNotification = useCallback((isoCode: string, countryName: string, type: NotificationType) => {
    const id = `${isoCode}-${Date.now()}`;
    const notification: CountryNotification = {
      id,
      isoCode,
      countryName,
      type,
      timestamp: Date.now(),
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 2000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <CountryNotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
    </CountryNotificationContext.Provider>
  );
};

export const useCountryNotification = () => {
  const context = useContext(CountryNotificationContext);
  if (!context) {
    throw new Error('useCountryNotification must be used within a CountryNotificationProvider');
  }
  return context;
};

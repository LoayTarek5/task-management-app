import { useState, useEffect, useCallback } from 'react';

const useNotifications = () => {
  const [permission, setPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    const supported = 'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn('Notifications not supported');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback(
    (title, options = {}) => {
      if (!isSupported || permission !== 'granted') {
        console.warn('Notifications not available or not permitted');
        return null;
      }

      const defaultOptions = {
        icon: '✅',
        badge: '✅',
        vibrate: [200, 100, 200],
        requireInteraction: false,
        ...options,
      };

      try {
        const notification = new Notification(title, defaultOptions);

        notification.onclick = () => {
          window.focus();
          notification.close();
          if (options.onClick) options.onClick();
        };

        // Auto close after 5 seconds
        setTimeout(() => notification.close(), 5000);

        return notification;
      } catch (error) {
        console.error('Error sending notification:', error);
        return null;
      }
    },
    [isSupported, permission]
  );

  return {
    isSupported,
    permission,
    isGranted: permission === 'granted',
    isDenied: permission === 'denied',
    requestPermission,
    sendNotification,
  };
};

export default useNotifications;
import { useState } from 'react';
import useNotifications from '../hooks/useNotifications.js';

const NotificationBanner = () => {
  const { isSupported, permission, isGranted, isDenied, requestPermission } = useNotifications();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if not supported, already granted, or dismissed
  if (!isSupported || isGranted || dismissed) {
    return null;
  }

  // Show different message if denied
  if (isDenied) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⚠️</span>
            <p className="text-sm text-yellow-700">
              Notifications are blocked. Enable them in browser settings for task reminders.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  const handleEnable = async () => {
    await requestPermission();
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 animate-[fade-in_0.3s_ease-in-out]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-xl">🔔</span>
          <div>
            <p className="text-sm font-medium text-blue-800">
              Enable notifications
            </p>
            <p className="text-xs text-blue-600">
              Get reminders for due and overdue tasks
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEnable}
            className="btn-primary text-sm py-1.5"
          >
            Enable
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="btn-secondary text-sm py-1.5"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
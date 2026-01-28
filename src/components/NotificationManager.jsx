import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectTasksDueToday, selectOverdueTasks } from '../store/selectors.js';
import useNotifications from '../hooks/useNotifications.js';

const NotificationManager = () => {
  const { isGranted, sendNotification } = useNotifications();
  const tasksDueToday = useSelector(selectTasksDueToday);
  const overdueTasks = useSelector(selectOverdueTasks);
  
  const notifiedTasksRef = useRef(new Set());
  const lastCheckRef = useRef(null);

  const checkAndNotify = useCallback(() => {
    if (!isGranted) return;

    const now = new Date();
    const currentDate = now.toDateString();

    // Only check once per day for daily summary
    if (lastCheckRef.current !== currentDate) {
      lastCheckRef.current = currentDate;
      notifiedTasksRef.current.clear();

      // Morning summary notification
      const totalUrgent = tasksDueToday.length + overdueTasks.length;
      
      if (totalUrgent > 0) {
        sendNotification('📋 Task Manager - Daily Summary', {
          body: `You have ${overdueTasks.length} overdue and ${tasksDueToday.length} tasks due today.`,
          tag: 'daily-summary',
        });
      }
    }

    // Notify for overdue tasks (once per task)
    overdueTasks.forEach((task) => {
      if (!notifiedTasksRef.current.has(task.id)) {
        notifiedTasksRef.current.add(task.id);
        sendNotification('⚠️ Overdue Task!', {
          body: `"${task.title}" is overdue!`,
          tag: `overdue-${task.id}`,
        });
      }
    });
  }, [isGranted, tasksDueToday, overdueTasks, sendNotification]);

  // Check on mount and when tasks change
  useEffect(() => {
    checkAndNotify();
  }, [checkAndNotify]);

  // Check periodically (every hour)
  useEffect(() => {
    const interval = setInterval(checkAndNotify, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAndNotify]);

  // This component doesn't render anything
  return null;
};

export default NotificationManager;
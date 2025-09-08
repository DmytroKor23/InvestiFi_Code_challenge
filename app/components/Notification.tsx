"use client";

import { NotificationState } from "../types";

interface NotificationProps {
  notification: NotificationState;
  onClose: () => void;
}

/**
 * Notification component that displays toast-style messages
 * 
 * Features:
 * - Three notification types: success (green), error (red), info (blue)
 * - Fixed positioning in top-right corner with z-index overlay
 * - Auto-themed colors and icons based on notification type
 * - Manual close button with hover effects
 * - Dark mode support with appropriate color schemes
 * - Conditional rendering (hidden when show = false)
 * 
 * @param {NotificationProps} props - Component props
 * @param {NotificationState} props.notification - Notification data and state
 * @param {Function} props.onClose - Callback to close the notification
 */
export default function Notification({ notification, onClose }: NotificationProps) {
  if (!notification.show) return null;

  // Theme configurations for different notification types
  const bgColor = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  };

  const textColor = {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    info: "text-blue-600 dark:text-blue-400",
  };

  const icon = {
    success: "✓",
    error: "✕",
    info: "ⓘ",
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 max-w-md"
      role="region" 
      aria-label="Notifications"
    >
      <div 
        className={`${bgColor[notification.type]} border rounded-lg p-4 shadow-lg`}
        role={notification.type === "error" ? "alert" : "status"}
        aria-live={notification.type === "error" ? "assertive" : "polite"}
        aria-atomic="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className={`${textColor[notification.type]} font-bold`}
              aria-hidden="true"
            >
              {icon[notification.type]}
            </span>
            <p className={`${textColor[notification.type]} text-sm font-medium`}>
              {notification.message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`${textColor[notification.type]} hover:opacity-70 transition-opacity ml-4 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1`}
            aria-label="Close notification"
            type="button"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useCallback } from "react";
import { NotificationState } from "../types";

/**
 * Custom hook for managing notification state and display
 * 
 * Features:
 * - Success, error, and info notification types
 * - Auto-hide functionality with 5-second timeout
 * - Manual hide capability
 * - Simple API for showing different notification types
 * 
 * @returns {Object} Notification state and methods
 * @returns {NotificationState} notification - Current notification state
 * @returns {Function} showNotification - Generic show notification function
 * @returns {Function} showSuccess - Show success notification
 * @returns {Function} showError - Show error notification  
 * @returns {Function} hideNotification - Manually hide notification
 */
export function useNotification() {
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    type: "info",
    show: false,
  });

  /**
   * Shows a notification with auto-hide after 5 seconds
   * 
   * @param {string} message - Notification message to display
   * @param {"success" | "error" | "info"} type - Type of notification
   */
  const showNotification = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setNotification({ message, type, show: true });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  }, []);

  /**
   * Manually hides the currently displayed notification
   */
  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }));
  }, []);

  /**
   * Shows a success notification (green theme)
   * 
   * @param {string} message - Success message to display
   */
  const showSuccess = useCallback((message: string) => {
    showNotification(message, "success");
  }, [showNotification]);

  /**
   * Shows an error notification (red theme)
   * 
   * @param {string} message - Error message to display
   */
  const showError = useCallback((message: string) => {
    showNotification(message, "error");
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
  };
}
"use client";

import { useEffect, useCallback } from "react";

/**
 * Custom hook for keyboard navigation support
 * 
 * Features:
 * - Provides keyboard shortcuts for common actions
 * - Manages focus states for accessibility
 * - Supports view mode switching and form navigation
 * 
 * @param {Object} handlers - Keyboard event handlers
 * @param {Function} handlers.onViewModeToggle - Toggle between view modes
 * @param {Function} handlers.onFocusSearch - Focus the search/amount input
 * @param {Function} handlers.onEscape - Handle escape key press
 * 
 * @returns {Object} Keyboard navigation utilities
 * @returns {Function} handleKeyDown - Key down event handler
 */
interface UseKeyboardNavigationProps {
  onViewModeToggle?: () => void;
  onFocusSearch?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  onViewModeToggle,
  onFocusSearch,
  onEscape,
  enabled = true,
}: UseKeyboardNavigationProps) {
  
  /**
   * Handles keyboard shortcuts and navigation
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    // Don't interfere with form inputs
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
      // Only handle escape in form inputs
      if (event.key === 'Escape' && onEscape) {
        onEscape();
      }
      return;
    }

    switch (event.key) {
      case 'v':
      case 'V':
        // Toggle view mode with 'V' key
        if (!event.ctrlKey && !event.metaKey && onViewModeToggle) {
          event.preventDefault();
          onViewModeToggle();
        }
        break;
        
      case 's':
      case 'S':
        // Focus search/amount input with 'S' key
        if (!event.ctrlKey && !event.metaKey && onFocusSearch) {
          event.preventDefault();
          onFocusSearch();
        }
        break;
        
      case 'Escape':
        if (onEscape) {
          onEscape();
        }
        break;
        
      case '?':
        // Show keyboard shortcuts help
        if (!event.shiftKey) return;
        event.preventDefault();
        showKeyboardHelp();
        break;
    }
  }, [enabled, onViewModeToggle, onFocusSearch, onEscape]);

  /**
   * Shows keyboard shortcuts help in console
   */
  const showKeyboardHelp = () => {
    console.log(`
🔑 Keyboard Shortcuts:
• V - Toggle view mode (List ↔ Tiles)
• S - Focus amount input
• Escape - Clear focus/close dialogs
• Shift + ? - Show this help
• Tab - Navigate between interactive elements
• Enter - Activate buttons/submit forms
• Space - Activate buttons
• Arrow keys - Navigate in lists
    `);
  };

  // Set up global keyboard event listener
  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, enabled]);

  /**
   * Focuses an element by ID with error handling
   */
  const focusElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      // Announce focus change to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Focused on ${element.getAttribute('aria-label') || element.textContent || elementId}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  }, []);

  /**
   * Manages focus trap for modal-like components
   */
  const trapFocus = useCallback((containerElement: HTMLElement) => {
    const focusableElements = containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    containerElement.addEventListener('keydown', handleTabKey);
    return () => containerElement.removeEventListener('keydown', handleTabKey);
  }, []);

  return {
    handleKeyDown,
    focusElement,
    trapFocus,
    showKeyboardHelp,
  };
}
"use client";

import { ViewMode } from "../types";
import { VIEW_MODES } from "../constants";

interface HeaderProps {
  countdown: number;
  loading: boolean;
  error: string | null;
  hasData: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

/**
 * Header component that displays the app title, countdown timer, and view mode toggle
 * 
 * Features:
 * - Shows "Crypto prices" title
 * - Displays countdown timer with animated indicator when data is loaded
 * - Provides view mode switcher (Tiles/List) when data is available
 * - Responsive design with appropriate spacing and styling
 * 
 * @param {HeaderProps} props - Component props
 * @param {number} props.countdown - Seconds until next data refresh
 * @param {boolean} props.loading - Whether data is currently loading
 * @param {string | null} props.error - Error message if any
 * @param {boolean} props.hasData - Whether crypto data is available
 * @param {ViewMode} props.viewMode - Current view mode (list/boxed)
 * @param {Function} props.onViewModeChange - Callback to change view mode
 */
export default function Header({
  countdown,
  loading,
  error,
  hasData,
  viewMode,
  onViewModeChange,
}: HeaderProps) {
  return (
    <header className="text-center mb-12" role="banner">
      <h1 className="text-4xl font-bold mb-4">Crypto prices</h1>

      {!loading && !error && (
        <div 
          className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
          role="status"
          aria-live="polite"
          aria-label={`Data will refresh in ${countdown} seconds`}
        >
          <div 
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            aria-hidden="true"
          ></div>
          <span>Next update in <span className="font-semibold">{countdown}</span> seconds</span>
        </div>
      )}

      {!loading && !error && hasData && (
        <div className="flex items-center justify-center gap-2 mb-6" role="group" aria-label="View mode selection">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300" id="view-mode-label">
            View:
          </span>
          <div className="flex gap-2" role="radiogroup" aria-labelledby="view-mode-label">
            <button
              onClick={() => onViewModeChange(VIEW_MODES.BOXED as ViewMode)}
              className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                viewMode === VIEW_MODES.BOXED
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              role="radio"
              aria-checked={viewMode === VIEW_MODES.BOXED}
              aria-label="Display cryptocurrencies in tile format"
            >
              <span aria-hidden="true">⬜</span> Tiles
            </button>
            <button
              onClick={() => onViewModeChange(VIEW_MODES.LIST as ViewMode)}
              className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                viewMode === VIEW_MODES.LIST
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              role="radio"
              aria-checked={viewMode === VIEW_MODES.LIST}
              aria-label="Display cryptocurrencies in list format"
            >
              <span aria-hidden="true">☰</span> List
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
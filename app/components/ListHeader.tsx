"use client";

import { SortOption, SortDirection } from "../types";

interface ListHeaderProps {
  onSortClick: (option: SortOption) => void;
  sortBy: SortOption | null;
  sortDirection: SortDirection;
}

/**
 * ListHeader component that provides column headers with sorting functionality for list view
 * 
 * Features:
 * - Clickable column headers for sorting (Asset, Symbol, Price)
 * - Visual sort indicators (↑ for ascending, ↓ for descending, ↕ for unsorted)
 * - Hover effects and transitions
 * - Responsive grid layout matching the data rows
 * - Dark mode support
 * 
 * @param {ListHeaderProps} props - Component props
 * @param {Function} props.onSortClick - Callback when a column header is clicked
 * @param {SortOption | null} props.sortBy - Currently active sort column
 * @param {SortDirection} props.sortDirection - Current sort direction
 */
export default function ListHeader({ onSortClick, sortBy, sortDirection }: ListHeaderProps) {
  /**
   * Gets the appropriate sort icon for a column
   * @param {SortOption} option - Column name to get icon for
   * @returns {string} Unicode arrow character indicating sort state
   */
  const getSortIcon = (option: SortOption) => {
    if (sortBy === option) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return "↕";
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        <button
          onClick={() => onSortClick("name")}
          className="flex items-center gap-1 text-left hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Asset
          <span className="text-xs">{getSortIcon("name")}</span>
        </button>

        <button
          onClick={() => onSortClick("symbol")}
          className="flex items-center gap-1 text-left hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Symbol
          <span className="text-xs">{getSortIcon("symbol")}</span>
        </button>

        <button
          onClick={() => onSortClick("price")}
          className="flex items-center gap-1 justify-end text-right hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Price (USD)
          <span className="text-xs">{getSortIcon("price")}</span>
        </button>
      </div>
    </div>
  );
}
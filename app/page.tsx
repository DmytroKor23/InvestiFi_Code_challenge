"use client";

import { useState, useMemo } from "react";
import CryptoCard from "./components/CryptoCard";
import ErrorBoundary from "./components/ErrorBoundary";
import ListHeader from "./components/ListHeader";
import Header from "./components/Header";
import PurchaseForm from "./components/PurchaseForm";
import Notification from "./components/Notification";
import { useCryptoData } from "./hooks/useCryptoData";
import { usePurchaseForm } from "./hooks/usePurchaseForm";
import { useNotification } from "./hooks/useNotification";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { SortOption, SortDirection, ViewMode, CryptoAsset } from "./types";
import { VIEW_MODES, ERROR_MESSAGES } from "./constants";

export default function Home() {
  // Fetch cryptocurrency data with auto-refresh functionality
  const { cryptoData, loading, error, countdown, getDefaultAsset } = useCryptoData();

  // Notification system for user feedback
  const { notification, showSuccess, showError, hideNotification } =
    useNotification();

  // Sorting state management
  const [sortBy, setSortBy] = useState<SortOption | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // View mode state (boxed grid or list view)
  const [viewMode, setViewMode] = useState<ViewMode>("boxed");

  // Purchase form functionality with validation
  const { formData, formErrors, handleSubmit, updateField } = usePurchaseForm({
    cryptoData,
    getDefaultAsset,
    onSuccess: showSuccess,
    onError: showError,
  });

  // Keyboard navigation support
  const { focusElement } = useKeyboardNavigation({
    onViewModeToggle: () => {
      setViewMode(current => current === VIEW_MODES.BOXED ? VIEW_MODES.LIST as ViewMode : VIEW_MODES.BOXED as ViewMode);
    },
    onFocusSearch: () => {
      focusElement('purchase-amount');
    },
    onEscape: () => {
      // Clear any focused elements or close notifications
      hideNotification();
      (document.activeElement as HTMLElement)?.blur();
    },
    enabled: !loading && !error,
  });

  /**
   * Sorts cryptocurrency data based on the selected sort option and direction
   * @param data - Array of cryptocurrency assets to sort
   * @param sortOption - Field to sort by (name, symbol, or price)
   * @param direction - Sort direction (asc or desc)
   * @returns Sorted array of cryptocurrency assets
   */
  const sortCryptoData = (
    data: CryptoAsset[],
    sortOption: SortOption | null,
    direction: SortDirection
  ) => {
    if (!sortOption) return data;
    return [...data].sort((a, b) => {
      let result = 0;

      switch (sortOption) {
        case "name":
          result = a.name.localeCompare(b.name);
          break;
        case "symbol":
          result = a.symbol.localeCompare(b.symbol);
          break;
        case "price":
          result = a.quote.USD.price - b.quote.USD.price;
          break;
      }

      return direction === "desc" ? -result : result;
    });
  };

  /**
   * Handles sorting column clicks - toggles direction if same column, sets new column otherwise
   * @param option - The sort option (column) that was clicked
   */
  const handleSortClick = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle sort direction for the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending
      setSortBy(option);
      setSortDirection("asc");
    }
  };

  /**
   * Memoized sorted cryptocurrency data - applies sorting or defaults to alphabetical by name
   */
  const sortedCryptoData = useMemo(() => {
    return sortBy
      ? sortCryptoData(cryptoData, sortBy, sortDirection)
      : [...cryptoData].sort((a, b) => a.name.localeCompare(b.name)); // Default: alphabetical by name
  }, [cryptoData, sortBy, sortDirection]);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="max-w-6xl mx-auto" role="main">
        {/* Skip to main content link for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
          tabIndex={0}
        >
          Skip to main content
        </a>
        <Notification notification={notification} onClose={hideNotification} />

        <Header
          countdown={countdown}
          loading={loading}
          error={error}
          hasData={cryptoData.length > 0}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {!loading && !error && cryptoData.length > 0 && (
          <PurchaseForm
            cryptoData={sortedCryptoData}
            formData={formData}
            formErrors={formErrors}
            onSubmit={handleSubmit}
            onUpdateField={updateField}
          />
        )}

        {loading && (
          <div 
            className="flex flex-col items-center justify-center py-12"
            role="status"
            aria-live="polite"
            aria-label="Loading cryptocurrency data"
          >
            <div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"
              aria-hidden="true"
            ></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading cryptocurrency data...
            </p>
          </div>
        )}

        {error && (
          <div 
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-red-600 dark:text-red-400 font-medium">
              Error: {error}
            </p>
          </div>
        )}

        {!loading && !error && cryptoData.length > 0 && (
          <ErrorBoundary>
            <section id="main-content" aria-label="Cryptocurrency data display">
            {viewMode === VIEW_MODES.LIST && (
              <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                role="table"
                aria-label="Cryptocurrency prices in list format"
              >
                <ListHeader
                  onSortClick={handleSortClick}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                />

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedCryptoData.map((crypto) => (
                    <CryptoCard
                      key={crypto.id}
                      crypto={crypto}
                      viewMode="list"
                    />
                  ))}
                </div>
              </div>
            )}

            {viewMode === VIEW_MODES.BOXED && (
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                role="grid"
                aria-label="Cryptocurrency prices in card format"
              >
                {sortedCryptoData.map((crypto) => (
                  <CryptoCard
                    key={crypto.id}
                    crypto={crypto}
                    viewMode="boxed"
                  />
                ))}
              </div>
            )}
            </section>
          </ErrorBoundary>
        )}

        {!loading && !error && cryptoData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {ERROR_MESSAGES.NO_DATA}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

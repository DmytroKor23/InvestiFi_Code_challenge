/**
 * Configuration settings for API interactions
 * Controls data fetching behavior and pagination
 */
export const API_CONFIG = {
  /** Interval in milliseconds between auto-refresh requests (10 seconds) */
  REFRESH_INTERVAL: 10000,
  /** Maximum number of cryptocurrency assets to fetch and display */
  MAX_CRYPTO_ASSETS: 10,
  /** Starting position for API pagination (1-based) */
  API_START_POSITION: 1,
} as const;

/**
 * Validation limits and constraints for cryptocurrency purchases
 * Defines acceptable ranges for form inputs
 */
export const PURCHASE_LIMITS = {
  /** Minimum purchase amount in USD */
  MIN_AMOUNT: 0.01,
  /** Maximum purchase amount in USD */
  MAX_AMOUNT: 5000,
  /** Step increment for amount input field */
  AMOUNT_STEP: 0.01,
} as const;

/**
 * User interface timing and behavior configuration
 * Controls countdown timers and refresh cycles
 */
export const UI_CONFIG = {
  /** Value to reset countdown to after reaching zero (10 seconds) */
  COUNTDOWN_RESET: 10,
  /** Initial countdown value when component mounts (10 seconds) */
  INITIAL_COUNTDOWN: 10,
} as const;

/**
 * Available view modes for displaying cryptocurrency data
 * Used for consistent mode switching throughout the application
 */
export const VIEW_MODES = {
  /** List view - horizontal table-style layout */
  LIST: "list",
  /** Boxed view - card-based grid layout */
  BOXED: "boxed",
} as const;

/**
 * Sort direction constants
 * Provides type-safe string literals for sorting functionality
 */
export const SORT_DIRECTIONS = {
  /** Ascending sort order */
  ASC: "asc",
  /** Descending sort order */
  DESC: "desc",
} as const;

/**
 * User-facing error messages for various failure scenarios
 * Provides consistent, friendly error messaging throughout the application
 */
export const ERROR_MESSAGES = {
  /** API data fetching failed */
  FETCH_FAILED: "Failed to fetch cryptocurrency data",
  /** Purchase form validation - missing amount */
  AMOUNT_REQUIRED: "USD amount is required",
  /** Purchase form validation - non-numeric input */
  INVALID_NUMBER: "Please enter a valid number",
  /** Purchase form validation - amount too small */
  AMOUNT_TOO_LOW: "Amount must be greater than 0",
  /** Purchase form validation - amount exceeds maximum */
  AMOUNT_TOO_HIGH: `Amount must not exceed $${PURCHASE_LIMITS.MAX_AMOUNT.toLocaleString()}`,
  /** Purchase form validation - no asset selected */
  SELECT_ASSET: "Please select an asset to purchase",
  /** Fallback error message for unexpected scenarios */
  GENERIC_ERROR: "An unknown error occurred",
  /** Message when no cryptocurrency data is available */
  NO_DATA: "No cryptocurrency data available.",
} as const;

/**
 * Success messages for positive user actions
 * Provides consistent feedback for successful operations
 */
export const SUCCESS_MESSAGES = {
  /** Message shown after successful purchase form submission */
  PURCHASE_SUBMITTED:
    "Purchase order submitted! Check browser console for details.",
} as const;

/**
 * Default values for various application features
 * Provides fallback values and initial state configuration
 */
export const DEFAULTS = {
  /** Default cryptocurrency symbol to prefer (Bitcoin) */
  CRYPTO_SYMBOL: "BTC",
  /** Default view mode on application startup */
  VIEW_MODE: VIEW_MODES.BOXED,
  /** Default sort direction for new sorts */
  SORT_DIRECTION: SORT_DIRECTIONS.ASC,
} as const;

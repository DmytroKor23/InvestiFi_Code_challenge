/**
 * Represents a cryptocurrency asset from the CoinMarketCap API
 * Contains essential information needed for display and purchasing
 */
export interface CryptoAsset {
  /** Unique identifier for the cryptocurrency */
  id: number;
  /** Full name of the cryptocurrency (e.g., "Bitcoin") */
  name: string;
  /** Symbol/ticker of the cryptocurrency (e.g., "BTC") */
  symbol: string;
  /** Market capitalization ranking */
  cmc_rank: number;
  /** Price information in different currencies */
  quote: {
    /** USD pricing data */
    USD: {
      /** Current price in USD */
      price: number;
    };
  };
}

/**
 * Response structure from the CoinMarketCap API
 * Matches the expected format from the /api/crypto endpoint
 */
export interface ApiResponse {
  /** Array of cryptocurrency assets */
  data: CryptoAsset[];
  /** API response status information */
  status: {
    /** Timestamp of the API response */
    timestamp: string;
    /** Error code (0 for success) */
    error_code: number;
    /** Error message if request failed, null on success */
    error_message: string | null;
  };
}

/** Available sorting options for cryptocurrency list */
export type SortOption = "name" | "symbol" | "price";

/** Sort direction options */
export type SortDirection = "asc" | "desc";

/** Available view modes for displaying cryptocurrency data */
export type ViewMode = "list" | "boxed";

/**
 * Form data structure for cryptocurrency purchase form
 */
export interface PurchaseFormData {
  /** USD amount to purchase (as string for form input) */
  amount: string;
  /** Selected cryptocurrency asset ID (as string) */
  selectedAsset: string;
}

/**
 * Form validation errors for purchase form
 * Fields are optional - undefined means no error for that field
 */
export interface FormErrors {
  /** Error message for amount field validation */
  amount?: string;
  /** Error message for asset selection validation */
  asset?: string;
}

/**
 * State structure for notification system
 * Controls display and styling of toast notifications
 */
export interface NotificationState {
  /** Message text to display */
  message: string;
  /** Notification type affects color scheme and icon */
  type: "success" | "error" | "info";
  /** Whether notification is currently visible */
  show: boolean;
}
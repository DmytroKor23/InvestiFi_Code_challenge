import { CryptoAsset } from "../types";
import { formatPrice } from "../utils/formatters";

interface CryptoCardProps {
  crypto: CryptoAsset;
  viewMode: "list" | "boxed";
}

/**
 * CryptoCard component that displays cryptocurrency information in two different layouts
 * 
 * Features:
 * - List view: Horizontal layout for table-style display
 * - Boxed view: Card-style layout for grid display
 * - Shows rank, name, symbol, and formatted USD price
 * - Responsive design with hover effects
 * - Dark mode support
 * 
 * @param {CryptoCardProps} props - Component props
 * @param {CryptoAsset} props.crypto - Cryptocurrency data to display
 * @param {"list" | "boxed"} props.viewMode - Display mode (affects layout)
 */
export default function CryptoCard({ crypto, viewMode }: CryptoCardProps) {
  // Render list view layout (horizontal, table-style)
  if (viewMode === "list") {
    return (
      <div 
        className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-within:bg-gray-50 dark:focus-within:bg-gray-700"
        role="row"
        aria-label={`${crypto.name} (${crypto.symbol}): ${formatPrice(crypto.quote.USD.price)}`}
      >
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-3" role="gridcell">
            <span 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded"
              aria-label={`Rank ${crypto.cmc_rank}`}
            >
              #{crypto.cmc_rank}
            </span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {crypto.name}
              </h3>
            </div>
          </div>

          <div role="gridcell">
            <span className="text-gray-600 dark:text-gray-300 font-mono font-medium">
              {crypto.symbol}
            </span>
          </div>

          <div className="text-right" role="gridcell">
            <span 
              className="text-lg font-bold text-gray-900 dark:text-gray-100"
              aria-label={`Price: ${formatPrice(crypto.quote.USD.price)}`}
            >
              {formatPrice(crypto.quote.USD.price)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render boxed view layout (card-style for grid)
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      role="gridcell"
      aria-label={`${crypto.name} (${crypto.symbol}) cryptocurrency card: Rank ${crypto.cmc_rank}, Price ${formatPrice(crypto.quote.USD.price)}`}
      tabIndex={0}
    >
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
            #{crypto.cmc_rank}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          {crypto.name} ({crypto.symbol})
        </h3>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price:</p>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {formatPrice(crypto.quote.USD.price)}
        </p>
      </div>
    </div>
  );
}
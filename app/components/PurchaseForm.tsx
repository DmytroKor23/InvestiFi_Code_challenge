"use client";

import { CryptoAsset, PurchaseFormData, FormErrors } from "../types";
import { PURCHASE_LIMITS } from "../constants";
import { formatPrice } from "../utils/formatters";

interface PurchaseFormProps {
  cryptoData: CryptoAsset[];
  formData: PurchaseFormData;
  formErrors: FormErrors;
  onSubmit: (e: React.FormEvent) => void;
  onUpdateField: (field: keyof PurchaseFormData, value: string) => void;
}

/**
 * PurchaseForm component that allows users to simulate cryptocurrency purchases
 * 
 * Features:
 * - USD amount input with currency symbol and validation
 * - Dropdown selection for cryptocurrency asset
 * - Form validation with error display
 * - Responsive inline layout
 * - Submit button with loading/disabled states
 * - Dark mode support
 * - Configurable purchase limits from constants
 * 
 * @param {PurchaseFormProps} props - Component props
 * @param {CryptoAsset[]} props.cryptoData - Available cryptocurrencies for selection
 * @param {PurchaseFormData} props.formData - Current form data state
 * @param {FormErrors} props.formErrors - Form validation errors
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.onUpdateField - Field update handler
 */
export default function PurchaseForm({
  cryptoData,
  formData,
  formErrors,
  onSubmit,
  onUpdateField,
}: PurchaseFormProps) {
  return (
    <section 
      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6"
      aria-labelledby="purchase-form-title"
    >
      <h2 id="purchase-form-title" className="sr-only">Purchase Cryptocurrency</h2>
      <form onSubmit={onSubmit} className="w-full" role="form" aria-label="Cryptocurrency purchase form">
        <div className="flex items-center gap-4 flex-wrap w-full">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Buy
          </span>

          <div className="relative flex-shrink-0">
            <label htmlFor="purchase-amount" className="sr-only">
              Purchase amount in USD (minimum $0.01, maximum ${PURCHASE_LIMITS.MAX_AMOUNT.toLocaleString()})
            </label>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" aria-hidden="true">
              $
            </span>
            <input
              id="purchase-amount"
              type="number"
              value={formData.amount}
              onChange={(e) => onUpdateField("amount", e.target.value)}
              placeholder="0.00"
              min="0"
              max={PURCHASE_LIMITS.MAX_AMOUNT.toString()}
              step={PURCHASE_LIMITS.AMOUNT_STEP.toString()}
              className={`w-32 pl-8 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                formErrors.amount
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              aria-invalid={formErrors.amount ? "true" : "false"}
              aria-describedby={formErrors.amount ? "amount-error" : "amount-help"}
            />
            {formErrors.amount && (
              <div id="amount-error" className="text-red-500 text-sm mt-1" role="alert">
                {formErrors.amount}
              </div>
            )}
            <div id="amount-help" className="sr-only">
              Enter the USD amount you want to purchase, between $0.01 and ${PURCHASE_LIMITS.MAX_AMOUNT.toLocaleString()}
            </div>
          </div>

          <span className="text-gray-700 dark:text-gray-300 font-medium">
            of
          </span>

          <div className="flex-grow">
            <label htmlFor="crypto-select" className="sr-only">
              Choose cryptocurrency to purchase
            </label>
            <select
              id="crypto-select"
              value={formData.selectedAsset}
              onChange={(e) => onUpdateField("selectedAsset", e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 ${
                formErrors.asset
                  ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
              aria-invalid={formErrors.asset ? "true" : "false"}
              aria-describedby={formErrors.asset ? "asset-error" : "asset-help"}
            >
              <option value="">Choose an asset...</option>
              {cryptoData.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol}) - {formatPrice(crypto.quote.USD.price)}
                </option>
              ))}
            </select>
            {formErrors.asset && (
              <div id="asset-error" className="text-red-500 text-sm mt-1" role="alert">
                {formErrors.asset}
              </div>
            )}
            <div id="asset-help" className="sr-only">
              Select a cryptocurrency from the dropdown to purchase
            </div>
          </div>

          <button
            type="submit"
            className="flex-shrink-0 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit cryptocurrency purchase order"
            disabled={!formData.amount || !formData.selectedAsset}
          >
            Buy
          </button>
        </div>

        <div className="mt-2 w-full">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Minimum: ${PURCHASE_LIMITS.MIN_AMOUNT} • Maximum: $
            {PURCHASE_LIMITS.MAX_AMOUNT.toLocaleString()}
          </p>
          {formErrors.amount && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formErrors.amount}
            </p>
          )}
          {formErrors.asset && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formErrors.asset}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
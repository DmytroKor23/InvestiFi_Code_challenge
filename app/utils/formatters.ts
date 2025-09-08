/**
 * Formats a numeric price value as a USD currency string
 * 
 * Uses the Intl.NumberFormat API for proper locale-aware currency formatting
 * Always displays exactly 2 decimal places for consistency
 * 
 * @param {number} price - The price value to format
 * @returns {string} Formatted price string (e.g., "$1,234.56")
 * 
 * @example
 * formatPrice(1234.567) // Returns "$1,234.57"
 * formatPrice(50) // Returns "$50.00"
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
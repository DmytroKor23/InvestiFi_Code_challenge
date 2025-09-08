"use client";

import { useState, useEffect, useCallback } from "react";
import { CryptoAsset, ApiResponse } from "../types";
import { API_CONFIG, ERROR_MESSAGES, UI_CONFIG, DEFAULTS } from "../constants";

/**
 * Custom hook for fetching and managing cryptocurrency data with auto-refresh
 * 
 * Features:
 * - Fetches cryptocurrency data from CoinMarketCap API
 * - Auto-refreshes every 10 seconds with countdown timer
 * - Provides loading and error states
 * - Returns default asset selection helper
 * 
 * @returns {Object} Hook state and methods
 * @returns {CryptoAsset[]} cryptoData - Array of cryptocurrency assets
 * @returns {boolean} loading - Loading state indicator
 * @returns {string | null} error - Error message if fetch fails
 * @returns {number} countdown - Seconds until next refresh
 * @returns {Function} refetch - Manual refresh function
 * @returns {Function} getDefaultAsset - Get default asset ID (Bitcoin or first asset)
 */
export function useCryptoData() {
  const [cryptoData, setCryptoData] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(UI_CONFIG.INITIAL_COUNTDOWN);

  /**
   * Fetches cryptocurrency data from the API endpoint
   * Handles loading states, error handling, and data validation
   */
  const fetchCryptoData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/crypto");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch crypto data: ${response.status} ${errorText}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Invalid API response format");
      }

      setCryptoData(result.data);
      setError(null);
      setCountdown(UI_CONFIG.INITIAL_COUNTDOWN);
    } catch (err) {
      console.error("Crypto data fetch error:", err);
      setError(
        err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch and setup auto-refresh interval
  useEffect(() => {
    fetchCryptoData();

    // Set up auto-refresh every 10 seconds
    const refreshInterval = setInterval(() => {
      fetchCryptoData();
    }, API_CONFIG.REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
  }, [fetchCryptoData]);

  // Countdown timer that runs when data is loaded and no errors
  useEffect(() => {
    if (loading || error) return;

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return UI_CONFIG.COUNTDOWN_RESET; // Reset to 10 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [loading, error]);

  /**
   * Gets the default cryptocurrency asset for form selection
   * Prefers Bitcoin (BTC) if available, otherwise returns first asset
   * 
   * @returns {string} Asset ID as string, empty if no data
   */
  const getDefaultAsset = useCallback(() => {
    if (cryptoData.length === 0) return "";
    
    // Try to find Bitcoin as the default
    const bitcoin = cryptoData.find(
      (crypto) => crypto.symbol === DEFAULTS.CRYPTO_SYMBOL
    );
    return bitcoin ? bitcoin.id.toString() : cryptoData[0].id.toString();
  }, [cryptoData]);

  return {
    cryptoData,
    loading,
    error,
    countdown,
    refetch: fetchCryptoData,
    getDefaultAsset,
  };
}
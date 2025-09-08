"use client";

import { useState, useCallback, useEffect } from "react";
import { PurchaseFormData, FormErrors, CryptoAsset } from "../types";
import { PURCHASE_LIMITS, ERROR_MESSAGES } from "../constants";

interface UsePurchaseFormProps {
  cryptoData: CryptoAsset[];
  getDefaultAsset: () => string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

/**
 * Custom hook for managing cryptocurrency purchase form functionality
 * 
 * Features:
 * - Form state management for amount and asset selection
 * - Comprehensive validation with error handling
 * - Purchase simulation with quantity calculation
 * - Success/error callback integration
 * 
 * @param {UsePurchaseFormProps} props - Hook configuration
 * @param {CryptoAsset[]} props.cryptoData - Available cryptocurrency assets
 * @param {Function} props.getDefaultAsset - Function to get default asset ID (prefers Bitcoin)
 * @param {Function} props.onSuccess - Success callback with message
 * @param {Function} props.onError - Error callback with message
 * 
 * @returns {Object} Form state and handlers
 * @returns {PurchaseFormData} formData - Current form data
 * @returns {FormErrors} formErrors - Validation errors
 * @returns {Function} handleSubmit - Form submission handler
 * @returns {Function} updateField - Field update handler
 * @returns {Function} setSelectedAsset - Asset selection helper
 * @returns {Function} validateForm - Manual validation trigger
 */
export function usePurchaseForm({ cryptoData, getDefaultAsset, onSuccess, onError }: UsePurchaseFormProps) {
  const [formData, setFormData] = useState<PurchaseFormData>({
    amount: "",
    selectedAsset: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  /**
   * Effect to set default asset when crypto data becomes available
   * Automatically selects Bitcoin (BTC) if available, otherwise first asset
   */
  useEffect(() => {
    if (cryptoData.length > 0 && !formData.selectedAsset) {
      const defaultAssetId = getDefaultAsset();
      if (defaultAssetId) {
        setFormData(prev => ({ ...prev, selectedAsset: defaultAssetId }));
      }
    }
  }, [cryptoData, getDefaultAsset, formData.selectedAsset]);

  /**
   * Validates the purchase form data
   * Checks amount validity (required, numeric, within limits) and asset selection
   * 
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    const amount = parseFloat(formData.amount);

    // Validate amount field
    if (!formData.amount || formData.amount.trim() === "") {
      errors.amount = ERROR_MESSAGES.AMOUNT_REQUIRED;
    } else if (isNaN(amount)) {
      errors.amount = ERROR_MESSAGES.INVALID_NUMBER;
    } else if (amount <= 0) {
      errors.amount = ERROR_MESSAGES.AMOUNT_TOO_LOW;
    } else if (amount > PURCHASE_LIMITS.MAX_AMOUNT) {
      errors.amount = ERROR_MESSAGES.AMOUNT_TOO_HIGH;
    }

    // Validate asset selection
    if (!formData.selectedAsset) {
      errors.asset = ERROR_MESSAGES.SELECT_ASSET;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  /**
   * Handles form submission for cryptocurrency purchase
   * Validates form, calculates purchase details, and logs transaction data
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      onError("Please fix the form errors before submitting");
      return;
    }

    const asset = cryptoData.find(
      (crypto) => crypto.id.toString() === formData.selectedAsset
    );
    const amount = parseFloat(formData.amount);

    if (!asset) {
      onError("Selected asset not found");
      return;
    }

    // Create purchase transaction data for logging
    const purchaseData = {
      usdAmount: amount,
      selectedAsset: {
        id: asset.id,
        name: asset.name,
        symbol: asset.symbol,
        price: asset.quote.USD.price,
      },
      estimatedQuantity: amount / asset.quote.USD.price, // Calculate crypto quantity
      timestamp: new Date().toISOString(),
    };

    // Log transaction details to console (in real app, this would be sent to backend)
    console.log("Purchase Data:", purchaseData);

    // Reset form after successful submission
    setFormData({ amount: "", selectedAsset: "" });
    setFormErrors({});
    onSuccess("Purchase order submitted successfully! Check console for details.");
  }, [formData, validateForm, cryptoData, onSuccess, onError]);

  /**
   * Updates a specific field in the form data and clears related errors
   * 
   * @param {keyof PurchaseFormData} field - Field name to update
   * @param {string} value - New field value
   */
  const updateField = useCallback((field: keyof PurchaseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [formErrors]);

  /**
   * Helper function to set the selected cryptocurrency asset
   * 
   * @param {string} assetId - ID of the selected asset
   */
  const setSelectedAsset = useCallback((assetId: string) => {
    updateField("selectedAsset", assetId);
  }, [updateField]);

  return {
    formData,
    formErrors,
    handleSubmit,
    updateField,
    setSelectedAsset,
    validateForm,
  };
}
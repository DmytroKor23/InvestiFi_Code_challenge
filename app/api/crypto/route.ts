import { NextResponse } from "next/server";
import { API_CONFIG, ERROR_MESSAGES } from "../../constants";

/**
 * GET handler for cryptocurrency data API endpoint
 * 
 * Fetches live cryptocurrency data from CoinMarketCap API and returns formatted response
 * 
 * Features:
 * - Fetches top cryptocurrencies by market cap from CoinMarketCap
 * - Requires COINMARKETCAP_API_KEY environment variable
 * - Limits results to configured maximum (API_CONFIG.MAX_CRYPTO_ASSETS)
 * - Handles API errors and returns appropriate HTTP status codes
 * - Returns data in standardized format matching ApiResponse interface
 * 
 * @returns {Promise<NextResponse>} JSON response with crypto data or error
 */
export async function GET() {
  try {
    // Fetch cryptocurrency data from CoinMarketCap Pro API
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${API_CONFIG.API_START_POSITION}&limit=${API_CONFIG.MAX_CRYPTO_ASSETS}&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY!,
          Accept: "application/json",
        },
      }
    );

    // Check if API request was successful
    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status}`);
    }

    const data = await response.json();

    // Return formatted response with limited data set
    return NextResponse.json({
      data: data.data?.slice(0, API_CONFIG.MAX_CRYPTO_ASSETS) || [],
      status: data.status,
    });
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching crypto data:", error);

    // Return user-friendly error response
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_FAILED },
      { status: 500 }
    );
  }
}

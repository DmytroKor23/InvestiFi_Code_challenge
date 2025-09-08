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
    // Check if API key is available
    const apiKey = process.env.COINMARKETCAP_API_KEY;
    if (!apiKey) {
      console.error("COINMARKETCAP_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log("Fetching crypto data from CoinMarketCap...");
    
    // Fetch cryptocurrency data from CoinMarketCap Pro API
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${API_CONFIG.API_START_POSITION}&limit=${API_CONFIG.MAX_CRYPTO_ASSETS}&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
      }
    );

    // Check if API request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CoinMarketCap API error: ${response.status} - ${errorText}`);
      throw new Error(`CoinMarketCap API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.data?.length || 0} cryptocurrencies`);

    // Return formatted response with limited data set and proper headers
    return NextResponse.json(
      {
        data: data.data?.slice(0, API_CONFIG.MAX_CRYPTO_ASSETS) || [],
        status: data.status,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching crypto data:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);

    // Return user-friendly error response with proper headers
    return NextResponse.json(
      { 
        error: ERROR_MESSAGES.FETCH_FAILED,
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 * Ensures proper cross-origin access for the API endpoint
 * 
 * @returns {NextResponse} CORS headers for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

import { NextResponse } from "next/server";

const API_BASE_URL = "https://cardvault-api.onrender.com/api";

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache cleanup - remove expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now > value.expiresAt) {
      cache.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint parameter is required" },
        { status: 400 }
      );
    }

    // Construct the full API URL
    const apiUrl = `${API_BASE_URL}${endpoint}`;

    // Check cache first
    const cacheKey = apiUrl;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() < cached.expiresAt) {
      console.log("Serving from cache:", apiUrl);
      return NextResponse.json({
        ...cached.data,
        _cached: true,
        _cacheAge: Math.floor((Date.now() - cached.cachedAt) / 1000)
      });
    }

    console.log("Fetching from CardVault API:", apiUrl);

    // Get demo token from environment or use stored demo token
    const demoToken = process.env.CARDVAULT_DEMO_TOKEN || "";

    // Forward the request to the CardVault API with authentication
    const headers = {
      "Content-Type": "application/json",
    };

    if (demoToken) {
      headers["Authorization"] = `Bearer ${demoToken}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("CardVault API Error:", {
        url: apiUrl,
        status: response.status,
        errorData
      });

      // Don't cache error responses
      console.log("Not caching error response");

      // Extract error message from various possible formats
      const errorMessage = errorData.error || errorData.message || `API request failed: ${response.statusText}`;
      const additionalInfo = errorData.message || errorData.error || null;

      return NextResponse.json(
        {
          error: errorMessage,
          message: additionalInfo !== errorMessage ? additionalInfo : null,
          status: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cache successful responses
    cache.set(cacheKey, {
      data,
      cachedAt: Date.now(),
      expiresAt: Date.now() + CACHE_DURATION
    });

    console.log(`Cached response for: ${apiUrl} (expires in ${CACHE_DURATION / 1000}s)`);

    return NextResponse.json({
      ...data,
      _cached: false
    });
  } catch (error) {
    console.error("CardVault API Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from CardVault API" },
      { status: 500 }
    );
  }
}

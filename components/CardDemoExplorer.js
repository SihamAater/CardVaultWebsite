"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

// Proxy through our Next.js API to avoid CORS issues
const PROXY_URL = "/api/cardvault-proxy";

const GAMES = [
  { id: "pokemon", name: "Pokémon", icon: "⚡", available: true },
  { id: "yugioh", name: "Yu-Gi-Oh!", icon: "🃏", available: false },
  { id: "lorcana", name: "Lorcana", icon: "✨", available: false },
  { id: "mtg", name: "Magic: The Gathering", icon: "🔮", available: false },
];

const CardDemoExplorer = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [expansions, setExpansions] = useState([]);
  const [selectedExpansion, setSelectedExpansion] = useState(null);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoadingExpansions, setIsLoadingExpansions] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cacheStatus, setCacheStatus] = useState(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch expansions when game is selected
  useEffect(() => {
    if (selectedGame) {
      fetchExpansions();
      setSelectedExpansion(null);
      setCards([]);
      setSearchQuery("");
      setDebouncedSearchQuery("");
    }
  }, [selectedGame]);

  // Fetch cards when expansion is selected or debounced search query changes
  useEffect(() => {
    if (selectedExpansion || debouncedSearchQuery) {
      fetchCards();
    }
  }, [selectedExpansion, debouncedSearchQuery, currentPage]);

  const fetchExpansions = async () => {
    setIsLoadingExpansions(true);
    try {
      const endpoint = `/v1/${selectedGame}/expansions?page=1&limit=100`;
      console.log("Fetching expansions with endpoint:", endpoint);

      const response = await fetch(`${PROXY_URL}?endpoint=${encodeURIComponent(endpoint)}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Expansions API Error:", {
          status: response.status,
          endpoint,
          errorData
        });

        // Handle authentication errors
        if (response.status === 401) {
          throw new Error("Authentication required. Please check API configuration.");
        }

        // Handle rate limiting
        if (response.status === 403 || response.status === 429) {
          const rateLimitMsg = errorData.message || errorData.error || "API rate limit reached";
          throw new Error(`🚧 Backend API rate limit exceeded. This is a shared demo API - the rate limit resets every 5 minutes. Please wait and try again, or contact us for a dedicated API instance.`);
        }

        const errorMsg = errorData.message || errorData.error || `Failed to fetch expansions (${response.status})`;
        throw new Error(errorMsg);
      }

      const result = await response.json();
      console.log("Expansions response:", result);

      // Update cache status
      if (result._cached) {
        setCacheStatus({ type: 'expansions', age: result._cacheAge });
        setTimeout(() => setCacheStatus(null), 3000);
      }

      // Handle different API response structures
      let expansionData = [];
      if (result.data?.data) {
        // Pokemon structure: {data: {data: [...]}}
        expansionData = result.data.data;
      } else if (result.data && Array.isArray(result.data)) {
        // Yu-Gi-Oh/Others: {data: [...]}
        expansionData = result.data;
      } else if (Array.isArray(result)) {
        // Direct array
        expansionData = result;
      }

      console.log("Parsed expansions:", expansionData.length, "sets");
      setExpansions(expansionData);
    } catch (error) {
      console.error("Error fetching expansions:", error);
      toast.error(error.message || "Failed to load sets. Please try again.");
      setExpansions([]);
    } finally {
      setIsLoadingExpansions(false);
    }
  };

  const fetchCards = async () => {
    if (!selectedGame) return;

    setIsLoadingCards(true);
    try {
      let endpoint;

      if (debouncedSearchQuery) {
        endpoint = `/v1/${selectedGame}/cards?search=${encodeURIComponent(debouncedSearchQuery)}&page=${currentPage}&limit=20`;
      } else if (selectedExpansion) {
        // Use expansionId query parameter, not path parameter
        endpoint = `/v1/${selectedGame}/cards?expansionId=${encodeURIComponent(selectedExpansion)}&page=${currentPage}&limit=20`;
      } else {
        endpoint = `/v1/${selectedGame}/cards?page=${currentPage}&limit=20`;
      }

      console.log("Fetching cards with endpoint:", endpoint);

      const response = await fetch(`${PROXY_URL}?endpoint=${encodeURIComponent(endpoint)}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        console.error("API Error:", {
          status: response.status,
          endpoint,
          errorData
        });

        // Handle no more pages first (404 or empty response or invalid page)
        if (
          response.status === 404 ||
          errorData.message?.includes("No cards found") ||
          errorData.error?.includes("No cards found") ||
          errorData.message?.includes("Invalid page") ||
          errorData.error?.includes("Invalid page")
        ) {
          if (currentPage > 1) {
            setTotalPages(currentPage - 1);
            setCurrentPage(currentPage - 1);
            toast("You've reached the last page", { icon: "ℹ️" });
          } else {
            setCards([]);
            toast("No cards found", { icon: "ℹ️" });
          }
          return;
        }

        // Handle rate limiting (both 429 and 403 can indicate rate limits)
        if (response.status === 429 || response.status === 403) {
          const rateLimitMsg = errorData.message || errorData.error || "API rate limit reached";
          throw new Error(`🚧 Backend API rate limit exceeded. This is a shared demo API - wait 5-10 minutes and try again, or contact us for a dedicated instance.`);
        }

        const errorMessage = errorData.message || errorData.error || `Failed to fetch cards (${response.status})`;
        throw new Error(errorMessage);
      }

      const result = await response.json();

      // Update cache status
      if (result._cached) {
        setCacheStatus({ type: 'cards', age: result._cacheAge });
        setTimeout(() => setCacheStatus(null), 3000);
      }

      // Handle different API response structures
      let cardData = [];
      let totalPagesCount = 1;

      if (result.data?.data) {
        // Pokemon structure: {data: {data: [...], metadata: {...}}}
        cardData = result.data.data;

        // Calculate total pages from metadata
        if (result.data.metadata) {
          const { total, limit } = result.data.metadata;
          totalPagesCount = total && limit ? Math.ceil(total / limit) : 1;
        } else if (result.data.pagination) {
          totalPagesCount = result.data.pagination.totalPages || 1;
        }
      } else if (result.data && Array.isArray(result.data)) {
        // Yu-Gi-Oh/Others: {data: [...]}
        cardData = result.data;
      } else if (result.cards) {
        // Alternative: {cards: [...]}
        cardData = result.cards;
      } else if (Array.isArray(result)) {
        // Direct array
        cardData = result;
      }

      setCards(cardData);

      // If we get empty results on a page > 1, adjust total pages
      if (cardData.length === 0 && currentPage > 1) {
        setTotalPages(currentPage - 1);
        setCurrentPage(currentPage - 1);
        toast("No more pages available", { icon: "ℹ️" });
        return;
      }

      setTotalPages(totalPagesCount);

      // Show info message if no cards found for the set
      if (cardData.length === 0 && selectedExpansion && !debouncedSearchQuery) {
        toast("No cards found for this set. Try searching or select a different set.", {
          icon: "ℹ️",
        });
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error(error.message || "Failed to load cards. Please try again.");
      setCards([]);
    } finally {
      setIsLoadingCards(false);
    }
  };

  const handleGameSelect = (game) => {
    if (!game.available) {
      toast("Coming soon! This game will be available shortly.", { icon: "🚀" });
      return;
    }
    setSelectedGame(game.id);
    setCurrentPage(1);
  };

  const handleExpansionSelect = (expansion) => {
    console.log("Selected expansion:", expansion);
    setSelectedExpansion(expansion);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedExpansion(null);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (isLoadingCards) return; // Prevent rapid pagination clicks
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Cache Status Indicator */}
      {cacheStatus && (
        <div className="alert alert-success shadow-lg animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            ⚡ Loaded from cache ({cacheStatus.age}s ago) - Faster response!
          </span>
        </div>
      )}

      {/* Game Selector */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Select a Game</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className={`btn btn-lg ${
                  selectedGame === game.id ? "btn-primary" : "btn-outline"
                } ${!game.available ? "btn-disabled" : ""}`}
              >
                <span className="text-2xl">{game.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="hidden md:inline">{game.name}</span>
                  {!game.available && (
                    <span className="hidden md:inline text-xs opacity-60">Coming Soon</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expansions/Sets */}
      {selectedGame && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Browse Sets</h2>

            {/* Search Bar */}
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search cards by name... (tip: type full word and wait)"
                  className="input input-bordered w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="btn btn-square" disabled={isLoadingCards}>
                  {isLoadingCards && searchQuery !== debouncedSearchQuery ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {searchQuery && searchQuery !== debouncedSearchQuery && (
                <label className="label">
                  <span className="label-text-alt text-info">⏳ Waiting to search...</span>
                </label>
              )}
            </div>

            {/* Expansions List */}
            {isLoadingExpansions ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {expansions.map((expansion, index) => {
                  const expansionName =
                    expansion.name || expansion.set_name || expansion.title || "Unknown Set";
                  // Use tcgPlayerId for Pokemon, set_code for others
                  const expansionIdentifier =
                    expansion.tcgPlayerId || expansion.set_code || expansion.code || expansion.name || expansionName;
                  const expansionKey = expansion.id || index;

                  return (
                    <button
                      key={expansionKey}
                      onClick={() => handleExpansionSelect(expansionIdentifier)}
                      className={`btn btn-sm justify-start ${
                        selectedExpansion === expansionIdentifier ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      {expansionName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cards Display */}
      {selectedGame && (selectedExpansion || searchQuery) && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {debouncedSearchQuery ? `Search Results: "${debouncedSearchQuery}"` : "Cards"}
            </h2>

            {isLoadingCards ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : cards.length === 0 ? (
              <div className="text-center py-12 opacity-60">
                <p>No cards found. Try a different search or select a set.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {cards.map((card, index) => {
                    const cardName = card.name || card.card_name || "Unknown Card";
                    const cardImage =
                      card.image_url ||
                      card.card_images?.[0]?.image_url ||
                      card.imageUrl ||
                      "/placeholder-card.png";

                    return (
                      <div key={card.id || index} className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow">
                        <figure className="px-2 pt-2">
                          <img
                            src={cardImage}
                            alt={cardName}
                            className="rounded-lg w-full h-auto object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/200x280?text=No+Image";
                            }}
                          />
                        </figure>
                        <div className="card-body p-3">
                          <h3 className="card-title text-sm line-clamp-2">{cardName}</h3>
                          {card.set_name && (
                            <p className="text-xs opacity-60">{card.set_name}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      className="btn btn-sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isLoadingCards}
                    >
                      «
                    </button>
                    <span className="btn btn-sm btn-ghost">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || isLoadingCards}
                    >
                      »
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedGame && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center py-12">
            <p className="text-lg opacity-60">
              Select a game above to start exploring the card database
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDemoExplorer;

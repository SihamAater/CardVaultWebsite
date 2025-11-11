import { getSEOTags } from "@/libs/seo";
import CardDemoExplorer from "@/components/CardDemoExplorer";

export const metadata = getSEOTags({
  title: "Try CardVault API - Interactive Demo",
  description:
    "Explore the CardVault API in action. Browse through Pokémon card database with real-time search and filtering. More games coming soon!",
  canonicalUrlRelative: "/demo",
});

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Try CardVault API
          </h1>
          <p className="text-lg opacity-80 mb-4">
            Explore our Pokémon card database. Browse sets and search through thousands of cards. More games coming soon!
          </p>
          <div className="space-y-3">
            <div className="alert alert-info max-w-2xl mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm">
                <strong>Demo Mode:</strong> The API is in active development. Card data and pagination are being continuously improved. Use the search feature for best results.
              </div>
            </div>
            <div className="alert alert-warning max-w-2xl mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="text-sm">
                <strong>Shared Demo Rate Limits:</strong> The backend API is shared and may hit rate limits from the upstream Pokemon API. This happens even if you didn&apos;t make many requests - others might be using it too. Wait 5-10 minutes and try again, or contact us for your own API instance.
              </div>
            </div>
          </div>
        </div>

        <CardDemoExplorer />
      </div>
    </div>
  );
}

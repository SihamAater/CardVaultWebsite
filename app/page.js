import { getSEOTags } from "@/libs/seo";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export const metadata = getSEOTags({
  title: "CardVault - Manage Your Pokémon, Yu-Gi-Oh! & Lorcana Collections on iOS",
  description:
    "The ultimate iOS app for trading card collectors. Track, organize, and manage your Pokémon, Yu-Gi-Oh!, and Lorcana card collections. Coming soon to the App Store.",
  canonicalUrlRelative: "/",
  keywords: [
    "CardVault",
    "Pokemon card collection",
    "Yu-Gi-Oh card tracker",
    "Lorcana collection manager",
    "iOS card collector app",
    "trading card manager",
    "card collection app",
    "Pokemon TCG tracker",
  ],
  openGraph: {
    title: "CardVault - Your Card Collection Manager for iOS",
    description:
      "Track and manage your Pokémon, Yu-Gi-Oh!, and Lorcana collections on your iPhone. Coming soon to the App Store.",
  },
});

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
}

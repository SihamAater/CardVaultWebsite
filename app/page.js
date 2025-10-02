import { getSEOTags } from "@/libs/seo";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export const metadata = getSEOTags({
  title: "CardVault - Manage Your Pokémon, Yu-Gi-Oh!, Lorcana & Magic Collections on iOS",
  description:
    "The ultimate iOS app for trading card collectors. Track, organize, and manage your Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering card collections. Coming soon to the App Store.",
  canonicalUrlRelative: "/",
  keywords: [
    "CardVault",
    "Pokemon card collection",
    "Yu-Gi-Oh card tracker",
    "Lorcana collection manager",
    "Magic The Gathering tracker",
    "MTG collection app",
    "iOS card collector app",
    "trading card manager",
    "card collection app",
    "Pokemon TCG tracker",
  ],
  openGraph: {
    title: "CardVault - Your Card Collection Manager for iOS",
    description:
      "Track and manage your Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering collections on your iPhone. Coming soon to the App Store.",
  },
});

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}

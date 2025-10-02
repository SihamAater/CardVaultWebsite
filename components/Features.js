const Features = () => {
  const features = [
    {
      icon: "📦",
      title: "All Your Cards in One App",
      description:
        "Manage your Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering collections on your iPhone. No more spreadsheets or scattered notes.",
    },
    {
      icon: "💰",
      title: "Auto Pricing - Live TCG Pricing",
      description:
        "Real-time market pricing updated every 24 hours from trusted TCG sources. Track your collection's value automatically without manual updates.",
    },
    {
      icon: "📁",
      title: "Custom Collections",
      description:
        "Organize your cards your way. Create custom collections for different decks, sets, or trading binders. Perfect for managing multiple collections.",
    },
    {
      icon: "⭐",
      title: "Wishlist & Want Lists",
      description:
        "Track cards you're hunting for across all games. Set priority levels, price alerts, and never buy duplicates you don't need again.",
    },
    {
      icon: "🔍",
      title: "Quick Search & Filter",
      description:
        "Find any card instantly with powerful search. Filter by name, set, rarity, type, or price range right from your pocket.",
    },
    {
      icon: "📱",
      title: "Native iOS Experience",
      description:
        "Built specifically for iPhone with a beautiful, intuitive interface. Fast, smooth, and designed for iOS.",
    },
    {
      icon: "🔒",
      title: "Offline Access",
      description:
        "Access your entire collection without internet. Perfect for conventions, shops, or trading sessions.",
    },
  ];

  return (
    <section className="bg-base-200" id="features">
      <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-4">
            A Card Collection Manager Built for iPhone
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Built by collectors, for collectors. CardVault brings professional-grade
            collection management to your iPhone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

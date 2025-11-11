const Pricing = () => {
  const plans = [
    {
      name: "Monthly",
      price: "6.99",
      period: "month",
      features: [
        "Unlimited card scanning",
        "All TCG collections (Pokémon, Yu-Gi-Oh!, Lorcana, MTG)",
        "Real-time pricing checks",
        "Bulk scanning",
        "Export & import from other apps",
        "Japanese card support",
        "40+ languages",
        "Offline access",
      ],
    },
    {
      name: "Yearly",
      price: "29.99",
      period: "year",
      popular: true,
      savings: "Save 64% vs Monthly",
      features: [
        "Unlimited card scanning",
        "All TCG collections (Pokémon, Yu-Gi-Oh!, Lorcana, MTG)",
        "Real-time pricing checks",
        "Bulk scanning",
        "Export & import from other apps",
        "Japanese card support",
        "40+ languages",
        "Offline access",
      ],
    },
    {
      name: "Lifetime",
      price: "69.99",
      period: "one-time",
      features: [
        "Unlimited card scanning",
        "All TCG collections (Pokémon, Yu-Gi-Oh!, Lorcana, MTG)",
        "Real-time pricing checks",
        "Bulk scanning",
        "Export & import from other apps",
        "Japanese card support",
        "40+ languages",
        "Offline access",
        "All future updates included",
      ],
    },
  ];

  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Choose the plan that fits your collecting journey. All plans include full access to every feature.
          </p>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative w-full max-w-lg">
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="badge text-xs text-primary-content font-semibold border-0 bg-primary">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {plan.popular && (
                <div className="absolute -inset-[1px] rounded-[9px] bg-primary z-10"></div>
              )}

              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
                <div>
                  <h3 className="text-lg lg:text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="flex gap-2 items-baseline">
                  {plan.originalPrice && (
                    <div className="flex flex-col justify-end text-lg">
                      <p className="relative">
                        <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                        <span className="text-base-content/80">${plan.originalPrice}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-5xl tracking-tight font-extrabold">${plan.price}</p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-sm text-base-content/60 font-semibold">/{plan.period}</p>
                  </div>
                </div>

                {plan.savings && (
                  <p className="text-success font-semibold -mt-4">{plan.savings}</p>
                )}

                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-[18px] h-[18px] opacity-80 shrink-0 mt-0.5 text-success"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.period === "one-time" && (
                  <p className="text-xs text-center text-base-content/60 font-medium">
                    Pay once. Access forever.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm opacity-70 mt-12">
          All prices in USD. No hidden fees. Cancel anytime for subscription plans.
        </p>
      </div>
    </section>
  );
};

export default Pricing;

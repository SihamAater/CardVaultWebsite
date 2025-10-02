import Image from "next/image";
import config from "@/config";
import ButtonLead from "./ButtonLead";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
          <span>📱</span>
          <span>iOS App Coming Soon</span>
        </div>

        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Your Card Collection,
          <span className="block text-primary">On Your iPhone</span>
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          The ultimate iOS app for managing your Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering collections.
          Track your cards, know their value, and never miss a card again.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <ButtonLead />
          <p className="text-sm opacity-80 text-center lg:text-left">
            🎁 Join the waitlist and get <span className="font-semibold text-primary">20% off</span> when we launch!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2 opacity-70">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            <span>iOS App</span>
          </div>
          <div className="flex items-center gap-2 opacity-70">
            <span>✓</span>
            <span>Free to Download</span>
          </div>
          <div className="flex items-center gap-2 opacity-70">
            <span>✓</span>
            <span>Offline Access</span>
          </div>
        </div>
      </div>
      <div className="lg:w-full">
        <Image
          src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=800&auto=format&fit=crop"
          alt="Trading card collection"
          className="w-full rounded-lg shadow-2xl"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;

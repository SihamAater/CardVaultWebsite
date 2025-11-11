import Image from "next/image";
import ButtonLead from "./ButtonLead";
import ButtonTryDemo from "./ButtonTryDemo";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-start lg:w-1/2">
        <div className="inline-flex items-center gap-2 px-5 py-3 bg-primary/20 rounded-full text-base font-bold text-primary border-2 border-primary/30">
          <span className="text-xl">📱</span>
          <span>Launching December 2025</span>
        </div>

        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Your Complete Trading Card{" "}
          <span className="inline-block bg-primary text-primary-content px-3 py-1 rounded-lg">Collection</span>
          <span className="block mt-2">In Your Pocket</span>
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Scan, organize, and track your Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering cards instantly.
          Know your collection&apos;s value in real-time and never lose track of a card again.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <ButtonLead />

          <ButtonTryDemo />

          <div className="alert alert-info">
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
              <span className="font-semibold">Coming Soon:</span> Web & Android versions - Early 2026
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
        <Image
          src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=800&auto=format&fit=crop"
          alt="Trading card collection"
          className="w-full h-auto rounded-2xl shadow-2xl"
          priority={true}
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default Hero;

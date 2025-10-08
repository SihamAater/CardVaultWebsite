import ButtonLead from "./ButtonLead";

const CTA = () => {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
        <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl">
          <div className="card-body items-center text-center p-8 lg:p-16">
            <div className="max-w-3xl">
              <div className="badge badge-warning badge-lg mb-6 text-warning-content font-bold">
                ⏰ Limited Time Offer - Expires November 1st
              </div>

              <h2 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
                Don&apos;t Miss Your 20% Launch Discount
              </h2>

              <p className="text-lg lg:text-xl opacity-90 mb-8">
                Join the waitlist now and save 20% on CardVault when we launch in November.
                Over 1,000 collectors have already secured their discount!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <ButtonLead />
                <div className="text-sm opacity-80">
                  ✓ No credit card required
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-content/20">
                <div>
                  <div className="text-3xl lg:text-4xl font-bold">1,000+</div>
                  <div className="text-sm opacity-80 mt-1">On Waitlist</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold">4</div>
                  <div className="text-sm opacity-80 mt-1">TCG Games</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold">40+</div>
                  <div className="text-sm opacity-80 mt-1">Languages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

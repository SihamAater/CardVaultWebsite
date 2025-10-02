import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: October 2, 2025

Welcome to CardVault!

These Terms of Service ("Terms") govern your use of the CardVault website at https://cardvault.app ("Website") and mobile application ("App"), and the services provided by CardVault. By using our Website, App, and services, you agree to these Terms.

1. Description of CardVault

CardVault is a card collection management platform designed for trading card game enthusiasts. Our service helps users organize, track, and manage their collections for Pokémon, Yu-Gi-Oh!, Disney Lorcana, and Magic: The Gathering cards.

2. Service Features and Subscriptions

CardVault offers both free and premium subscription tiers:

Free Tier: Access to basic collection tracking features
Premium Subscription: Access to advanced features including:
- Automatic pricing updates
- Custom collections
- Wishlist functionality
- Cloud sync across devices
- Export capabilities

Subscription fees are billed on a recurring basis. You may cancel your subscription at any time, and you will continue to have access to premium features until the end of your billing period.

3. Refund Policy

We offer a full refund within 7 days of your initial subscription purchase. After this period, refunds will be considered on a case-by-case basis. To request a refund, please contact us at support@cardvault.app.

4. User Responsibilities

When using CardVault, you agree to:
- Provide accurate information during registration
- Maintain the security of your account credentials
- Use the service in compliance with all applicable laws
- Not attempt to reverse engineer, decompile, or hack the service
- Not use the service for any unauthorized commercial purposes

5. Your Data

You retain all rights to the collection data you input into CardVault. We do not claim ownership of your collection information. You may export or delete your data at any time.

CardVault is not responsible for the accuracy of third-party card pricing data or market values displayed in the app.

6. User Data and Privacy

We collect and store user data, including name, email, payment information, and your card collection data as necessary to provide our services. For details on how we handle your data, please refer to our Privacy Policy at https://cardvault.app/privacy-policy.

7. Non-Personal Data Collection

We use web cookies and analytics to collect non-personal data for the purpose of improving our services and user experience.

8. Service Availability

We strive to maintain 99.9% uptime but do not guarantee uninterrupted access to CardVault. We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.

9. Intellectual Property

The CardVault app, website, logo, and original content are owned by CardVault and protected by copyright and trademark laws. Card images, names, and related intellectual property belong to their respective owners (The Pokémon Company, Konami, Disney, Wizards of the Coast, etc.).

10. Limitation of Liability

CardVault is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.

11. Governing Law

These Terms are governed by the laws of the United States.

12. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any significant changes via email and through the app.

13. Contact Information

For any questions or concerns regarding these Terms of Service, please contact us at:

Email: support@cardvault.app

Thank you for using CardVault!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;

import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: October 2, 2025

Thank you for visiting CardVault ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://cardvault.app (the "Website") and our mobile application (the "App").

By accessing or using the Website or App, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our services.

1. Information We Collect

1.1 Personal Data

We collect the following personal information from you:

Name: We collect your name to personalize your experience and communicate with you effectively.
Email: We collect your email address to send you important updates, notifications about new features, and communication related to our services.
Payment Information: We collect payment details to process your subscription securely. However, we do not store your payment information on our servers. Payments are processed by trusted third-party payment processors (Stripe).

1.2 Collection Data

When you use our App, we store the trading card collection data you input, including:
- Card names, sets, and quantities
- Collection values and pricing information
- Custom collections and wishlists
This data is stored securely and is only accessible to you through your account.

1.3 Non-Personal Data

We may use web cookies and similar technologies to collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information helps us to enhance your browsing experience, analyze trends, and improve our services.

2. Purpose of Data Collection

We collect and use your personal data for the following purposes:
- Processing subscriptions and providing access to premium features
- Storing and syncing your card collection data across devices
- Sending service updates, launch notifications, and feature announcements
- Providing customer support
- Improving our services and user experience

3. Data Sharing

We do not share your personal data with any third parties except as required for service operation (e.g., sharing your information with payment processors). We do not sell, trade, or rent your personal information to others.

Your collection data is private and will never be shared with third parties without your explicit consent.

4. Children's Privacy

CardVault is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at the email address provided below.

5. Data Security

We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your collection data is encrypted in transit and at rest.

6. Your Rights

You have the right to:
- Access the personal data we hold about you
- Request correction of inaccurate data
- Request deletion of your data and account
- Export your collection data at any time

7. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page, and we may notify you via email about significant changes.

8. Contact Information

If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:

Email: support@cardvault.app

For all other inquiries, please visit our Contact Us page on the Website.

By using CardVault, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

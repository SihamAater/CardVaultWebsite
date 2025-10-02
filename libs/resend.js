import { Resend } from "resend";
import config from "@/config";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {Object} params - The parameters for sending the email.
 * @param {string | string[]} params.to - The recipient's email address or an array of email addresses.
 * @param {string} params.subject - The subject of the email.
 * @param {string} params.text - The plain text content of the email.
 * @param {string} params.html - The HTML content of the email.
 * @param {string} [params.replyTo] - The email address to set as the "Reply-To" address.
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  const { data, error } = await resend.emails.send({
    from: config.resend.fromAdmin,
    to,
    subject,
    text,
    html,
    ...(replyTo && { replyTo }),
  });

  if (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }

  return data;
};

/**
 * Sends launch notification email to a subscriber
 *
 * @async
 * @param {string} email - The subscriber's email address
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendLaunchNotification = async (email) => {
  const subject = "🎉 CardVault is Now Live!";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4f46e5; margin-bottom: 10px;">🎉 CardVault is Now Live!</h1>
        </div>

        <p>Hey there, card collector!</p>

        <p>We're excited to announce that <strong>CardVault</strong> is officially live and ready to help you manage your trading card collection!</p>

        <h2 style="color: #4f46e5; margin-top: 30px;">What You Can Do Now:</h2>
        <ul style="line-height: 2;">
          <li>📦 <strong>Organize Your Collection</strong> - Track cards from Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering</li>
          <li>💰 <strong>Auto Pricing</strong> - Get real-time price updates on your collection value</li>
          <li>✨ <strong>Custom Collections</strong> - Create custom sets and organize cards your way</li>
          <li>❤️ <strong>Wishlist</strong> - Keep track of cards you're hunting for</li>
          <li>☁️ <strong>Cloud Sync</strong> - Access your collection from any device</li>
        </ul>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://${config.domainName}" style="background-color: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Get Started Now</a>
        </div>

        <p>We're offering a special launch discount for early supporters like you. Don't miss out!</p>

        <p>Thank you for your interest in CardVault. We can't wait to see you organize your collection!</p>

        <p style="margin-top: 30px;">Happy Collecting!<br>
        <strong>The CardVault Team</strong></p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">

        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          You're receiving this email because you signed up for early access to CardVault.<br>
          <a href="https://${config.domainName}/privacy-policy" style="color: #4f46e5;">Privacy Policy</a> |
          <a href="https://${config.domainName}/tos" style="color: #4f46e5;">Terms of Service</a>
        </p>
      </body>
    </html>
  `;

  const text = `
CardVault is Now Live!

Hey there, card collector!

We're excited to announce that CardVault is officially live and ready to help you manage your trading card collection!

What You Can Do Now:
- Organize Your Collection - Track cards from Pokémon, Yu-Gi-Oh!, Lorcana, and Magic: The Gathering
- Auto Pricing - Get real-time price updates on your collection value
- Custom Collections - Create custom sets and organize cards your way
- Wishlist - Keep track of cards you're hunting for
- Cloud Sync - Access your collection from any device

Get started now: https://${config.domainName}

We're offering a special launch discount for early supporters like you. Don't miss out!

Thank you for your interest in CardVault. We can't wait to see you organize your collection!

Happy Collecting!
The CardVault Team

---
You're receiving this email because you signed up for early access to CardVault.
Privacy Policy: https://${config.domainName}/privacy-policy
Terms of Service: https://${config.domainName}/tos
  `.trim();

  return sendEmail({ to: email, subject, text, html });
};

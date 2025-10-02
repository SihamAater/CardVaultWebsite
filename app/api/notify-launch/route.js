import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import { sendLaunchNotification } from "@/libs/resend";

// This route sends launch notification emails to all leads
// IMPORTANT: Use this route only once when you're ready to launch
// You might want to add authentication or run this via a cron job
export async function POST(req) {
  try {
    await connectMongo();

    // Get all leads from database
    const leads = await Lead.find({});

    if (leads.length === 0) {
      return NextResponse.json({
        message: "No leads found in database",
        count: 0,
      });
    }

    console.log(`📧 Sending launch notifications to ${leads.length} subscribers...`);

    // Send emails to all leads
    const results = await Promise.allSettled(
      leads.map((lead) => sendLaunchNotification(lead.email))
    );

    // Count successes and failures
    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`✅ Successfully sent ${successful} emails`);
    if (failed > 0) {
      console.log(`❌ Failed to send ${failed} emails`);
    }

    return NextResponse.json({
      message: `Launch notifications sent`,
      total: leads.length,
      successful,
      failed,
    });
  } catch (e) {
    console.error("Error sending launch notifications:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

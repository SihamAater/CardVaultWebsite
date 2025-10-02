import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";

// This route is used to store the leads that are generated from the landing page.
// The API call is initiated by the Hero component
// Duplicate emails just return 200 OK
export async function POST(req) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // If MongoDB is configured, save to database
    if (process.env.MONGODB_URI) {
      await connectMongo();
      const lead = await Lead.findOne({ email: body.email });
      if (!lead) {
        await Lead.create({ email: body.email });
      }
      console.log(`✅ Lead saved to MongoDB: ${body.email}`);
    } else {
      // Fallback: just log to console for now
      console.log(`📧 New lead collected: ${body.email}`);
      console.log(`⚠️  Add MONGODB_URI to .env.local to save leads to database`);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";

// This route fetches all leads from the database
// WARNING: Add authentication before deploying to production!
export async function GET(req) {
  try {
    await connectMongo();

    const leads = await Lead.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      count: leads.length,
      leads: leads.map((lead) => ({
        email: lead.email,
        createdAt: lead.createdAt,
      })),
    });
  } catch (e) {
    console.error("Error fetching leads:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

const MOOSEND_API_KEY = process.env.MOOSEND_API_KEY;
const MOOSEND_LIST_ID = process.env.MOOSEND_LIST_ID;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    if (!MOOSEND_API_KEY || !MOOSEND_LIST_ID) {
      console.error("Moosend credentials not configured");
      return NextResponse.json(
        { error: "Subscription service is not configured." },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.moosend.com/v3/subscribers/${MOOSEND_LIST_ID}/subscribe.json?apikey=${MOOSEND_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          HasExternalDoubleOptIn: false,
        }),
      }
    );

    const data = await res.json();

    if (data.Code !== 0) {
      return NextResponse.json(
        { error: data.Error || "Subscription failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

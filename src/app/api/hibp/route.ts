import { NextRequest, NextResponse } from "next/server";

const HIBP_URL = "https://api.pwnedpasswords.com/range/";

export async function GET(request: NextRequest) {
  const prefix = request.nextUrl.searchParams.get("prefix");

  if (!prefix || !/^[0-9A-Fa-f]{5}$/.test(prefix)) {
    return NextResponse.json(
      { error: "prefix must be exactly 5 hex characters" },
      { status: 400 }
    );
  }

  try {
    const hibpResponse = await fetch(`${HIBP_URL}${prefix.toUpperCase()}`, {
      headers: {
        "Add-Padding": "true",
        "User-Agent": "PasswordAnalyzer/1.0",
      },
    });

    if (!hibpResponse.ok) {
      return NextResponse.json(
        { error: "HIBP API error" },
        { status: hibpResponse.status }
      );
    }

    const text = await hibpResponse.text();
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to reach HIBP" }, { status: 502 });
  }
}

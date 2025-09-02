// src/app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE;
  const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_KEY_SECRET;

  if (!websiteUrl || !consumerKey || !consumerSecret) {
    return NextResponse.json({ error: "API credentials missing" }, { status: 400 });
  }

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    const res = await fetch(`${websiteUrl}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

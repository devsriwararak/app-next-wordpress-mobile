// src/app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE;
  const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_KEY_SECRET;

  if (!websiteUrl || !consumerKey || !consumerSecret) {
    return NextResponse.json({ error: "API credentials missing" }, { status: 400 });
  }

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  // ดึง query param
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    // ดึงข้อมูลสินค้าหลัก
    const productRes = await fetch(`${websiteUrl}/wp-json/wc/v3/products/${id}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });
    const product = await productRes.json();

    // ถ้าเป็น variable product → ดึง variations เพิ่ม
    if (product.type === "variable") {
      const variationRes = await fetch(`${websiteUrl}/wp-json/wc/v3/products/${id}/variations`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      const variations = await variationRes.json();

      return NextResponse.json({
        ...product,
        variations, // แนบราคาตามจำนวนวันมาเลย
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

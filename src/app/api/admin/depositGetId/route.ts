import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { product_id } = await req.json();
    if (!product_id) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const deposit = await prisma.deposit_price.findUnique({
      where: { product_id: Number(product_id) },
    });

    if (!deposit) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json(deposit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//      const { product_id } = await req.json();

//     if (!product_id) {
//       return NextResponse.json({ error: "product_id is required" }, { status: 400 });
//     }

//     const deposit = await prisma.deposit_price.findUnique({
//       where: { product_id: Number(product_id) },
//     });

//     if (!deposit) {
//       return NextResponse.json({ error: "Data not found" }, { status: 404 });
//     }

//     return NextResponse.json(deposit);
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }


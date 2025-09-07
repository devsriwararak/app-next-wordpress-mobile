import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// กำหนด type เอง
type DepositParams = {
  product_id: string;
};

export async function GET(
  request: NextRequest,
   context: { params: Promise<{ product_id: string }> } 
) {
  try {
   const { product_id } = await context.params;
    console.log({ product_id })

    const downData = await prisma.deposit_price.findUnique({
      where: {
        product_id: parseInt(product_id, 10),
      },
    })

    if (!downData) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 })
    }

    return NextResponse.json(downData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

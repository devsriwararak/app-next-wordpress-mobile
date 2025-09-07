import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ product_id: string }> }
) {
  try {
    const { product_id } = await params
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

// app/api/down/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: อ่านข้อมูลทั้งหมด
export async function GET() {
    try {
        const downs = await prisma.down.findMany();
        return NextResponse.json(downs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

// POST: เพิ่มข้อมูลใหม่
export async function POST(req: Request) {
    try {
        const { name, sum } = await req.json();
        if (!name || typeof sum !== 'number') {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const existingProduct = await prisma.mount.findUnique({
            where: { name: name, },
        });

        if (existingProduct) {
            return NextResponse.json(
                { error: 'Product ID already exists. Use PUT to update.' },
                { status: 409 }
            );
        }
        const newDown = await prisma.down.create({
            data: {
                name,
                sum,
            },
        });
        return NextResponse.json(newDown, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create data' }, { status: 500 });
    }
}

// PUT: อัปเดตข้อมูล
export async function PUT(req: Request) {
    try {
        const { id, name, sum } = await req.json();
        if (!id || !name || typeof sum !== 'number') {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const existingProduct = await prisma.mount.findUnique({
            where: {
                name: name,
                NOT: { id: id }
            },
        });

        if (existingProduct) {
            return NextResponse.json(
                { error: 'Product ID already exists. Use PUT to update.' },
                { status: 409 }
            );
        }

        const updatedDown = await prisma.down.update({
            where: { id: id },
            data: { name, sum },
        });
        return NextResponse.json(updatedDown, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}

// DELETE: ลบข้อมูล
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        await prisma.down.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: 'Data deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}


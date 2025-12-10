import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id;
        if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // Retrieve entries for a specific year if needed, or all recent
        // For now, let's get all of them, the frontend can filter or we can add query params later
        const { searchParams } = new URL(request.url);
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const where: any = { userId };
        if (start && end) {
            where.date = {
                gte: new Date(start),
                lte: new Date(end),
            };
        }

        const entries = await prisma.lunarJournal.findMany({
            where,
            orderBy: { date: 'asc' },
        });

        return NextResponse.json(entries);
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id;
        if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const body = await request.json();
        const { id, date, eventType, notes } = body;

        if (!notes) {
            return NextResponse.json({ error: 'Notes are required' }, { status: 400 });
        }

        if (id) {
            // Update existing entry
            // Verify ownership
            const existing = await prisma.lunarJournal.findUnique({ where: { id } });
            if (!existing || existing.userId !== userId) {
                return NextResponse.json({ error: 'Entry not found or unauthorized' }, { status: 403 });
            }

            const updated = await prisma.lunarJournal.update({
                where: { id },
                data: { notes, updatedAt: new Date() },
            });
            return NextResponse.json(updated);
        } else {
            // Create new entry
            const created = await prisma.lunarJournal.create({
                data: {
                    userId,
                    date: new Date(date),
                    eventType,
                    notes,
                },
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        console.error('Error saving journal entry:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id;
        if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const existing = await prisma.lunarJournal.findUnique({ where: { id } });
        if (!existing || existing.userId !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await prisma.lunarJournal.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting' }, { status: 500 });
    }
}

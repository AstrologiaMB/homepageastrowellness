import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    console.log('Health check called', process.env.NEXT_PUBLIC_COMMIT_SHA);
    return NextResponse.json({
        status: 'healthy',
        service: 'homepageastrowellness',
        commit_sha: process.env.NEXT_PUBLIC_COMMIT_SHA || process.env.COMMIT_SHA || null,
        timestamp: new Date().toISOString(),
    });
}

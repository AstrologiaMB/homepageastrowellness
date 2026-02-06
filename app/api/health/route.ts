import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'healthy',
        service: 'homepageastrowellness',
        commit_sha: process.env.NEXT_PUBLIC_COMMIT_SHA || process.env.COMMIT_SHA || null,
        timestamp: new Date().toISOString(),
    });
}

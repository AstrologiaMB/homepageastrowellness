import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptionsSync } from '@/lib/auth-url';
import { getApiUrl } from '@/lib/api-config';

export async function GET(
    request: NextRequest,
    { params }: { params: { taskId: string } }
) {
    try {
        // Check auth
        const session = await getServerSession(getAuthOptionsSync());
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { taskId } = params;

        // Call backend
        const backendUrl = getApiUrl('CARTA_ELECTIVA');
        const response = await fetch(`${backendUrl}/progress/${taskId}`);

        // Check backend status but always return JSON
        // If backend is down, fetch throws. If backend returns 404, response.ok is false.

        if (!response.ok) {
            // Try to parse error
            const errorData = await response.json().catch(() => null);
            return NextResponse.json(errorData || { error: 'Backend error' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error proxying progress:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

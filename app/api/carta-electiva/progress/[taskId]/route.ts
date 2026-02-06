import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getCartaElectivaClient } from '@/lib/api-clients/carta-electiva-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Call backend
    // Call backend using client
    const client = getCartaElectivaClient();
    let progressResponse;
    try {
      progressResponse = await client.default.progressProgressTaskIdGet(taskId);
    } catch (error: any) {
      // Handle client errors
      if (error.status === 404) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      throw error;
    }

    return NextResponse.json(progressResponse);
  } catch (error) {
    console.error('Error proxying progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

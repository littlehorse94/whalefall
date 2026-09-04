import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getSession } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getSession();
        if (!session) throw new Error('Unauthorized');

        return {
          allowedContentTypes: ['image/*', 'video/*', 'audio/*'],
          addRandomSuffix: true,
          allowOverwrite: false,
          maximumSizeInBytes: 500 * 1024 * 1024,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 401 },
    );
  }
}

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/auth';

const ALLOWED_PREFIXES = ['image/', 'video/', 'audio/'];

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const pathname = formData.get('pathname');

  if (!(file instanceof File) || typeof pathname !== 'string' || !pathname) {
    return NextResponse.json({ error: 'Missing file or pathname' }, { status: 400 });
  }

  if (!ALLOWED_PREFIXES.some((p) => file.type.startsWith(p))) {
    return NextResponse.json({ error: 'Only image, video, or audio files are allowed' }, { status: 400 });
  }

  try {
    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

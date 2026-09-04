'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { putSection } from '@/lib/blob-store';
import type { MediaSettings } from '@/lib/content-types';

export async function saveMedia(data: MediaSettings): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    await putSection('media', data);
    revalidatePath('/admin/media');
    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath('/legends');
    revalidatePath('/montages');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

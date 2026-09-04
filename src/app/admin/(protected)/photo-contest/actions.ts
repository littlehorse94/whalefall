'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { putSection } from '@/lib/blob-store';
import type { PhotoContestConfig } from '@/lib/content-types';

export async function savePhotoContestConfig(data: PhotoContestConfig): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    await putSection('photo-contest', data);
    revalidatePath('/admin/photo-contest');
    revalidatePath('/');
    revalidatePath('/gallery');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

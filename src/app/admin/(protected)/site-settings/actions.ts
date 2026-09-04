'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { putSection } from '@/lib/blob-store';
import type { SiteSettings } from '@/lib/content-types';

export async function saveSiteSettings(data: SiteSettings): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    await putSection('site-settings', data);
    revalidatePath('/admin/site-settings');
    revalidatePath('/', 'layout');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

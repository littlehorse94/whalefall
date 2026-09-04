'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { putSection } from '@/lib/blob-store';
import type { HeroContent } from '@/lib/content-types';

export async function saveHero(data: HeroContent): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    await putSection('hero', data);
    revalidatePath('/admin/hero');
    revalidatePath('/');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

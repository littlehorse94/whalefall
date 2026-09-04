'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getSection, putSection } from '@/lib/blob-store';
import { CHRONICLE_SEED } from '@/lib/seed-data';
import type { Milestone } from '@/lib/content-types';

const KEY = 'chronicle';

export async function saveMilestone(item: Milestone): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    const items = await getSection(KEY, CHRONICLE_SEED);
    const idx = items.findIndex((i) => i.id === item.id);
    const next = idx >= 0 ? items.map((i, n) => (n === idx ? item : i)) : [...items, item];
    await putSection(KEY, next);
    revalidatePath('/admin/chronicle');
    revalidatePath('/');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

export async function deleteMilestone(id: string): Promise<void> {
  await requireAdmin();
  const items = await getSection(KEY, CHRONICLE_SEED);
  await putSection(KEY, items.filter((i) => i.id !== id));
  revalidatePath('/admin/chronicle');
  revalidatePath('/');
}

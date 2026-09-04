'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getSection, putSection } from '@/lib/blob-store';
import { STATS_SEED } from '@/lib/seed-data';
import type { StatTile } from '@/lib/content-types';

const KEY = 'stats';

export async function saveStat(item: StatTile): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    const items = await getSection(KEY, STATS_SEED);
    const idx = items.findIndex((i) => i.id === item.id);
    const next = idx >= 0 ? items.map((i, n) => (n === idx ? item : i)) : [...items, item];
    await putSection(KEY, next);
    revalidatePath('/admin/stats');
    revalidatePath('/');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

export async function deleteStat(id: string): Promise<void> {
  await requireAdmin();
  const items = await getSection(KEY, STATS_SEED);
  await putSection(KEY, items.filter((i) => i.id !== id));
  revalidatePath('/admin/stats');
  revalidatePath('/');
}

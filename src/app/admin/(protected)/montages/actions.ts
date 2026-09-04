'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getSection, putSection } from '@/lib/blob-store';
import { MONTAGES_SEED } from '@/lib/seed-data';
import type { MontageCategory } from '@/lib/content-types';

const KEY = 'montages';

export async function saveMontageCategory(item: MontageCategory): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    const items = await getSection(KEY, MONTAGES_SEED);
    const idx = items.findIndex((i) => i.id === item.id);
    const next = idx >= 0 ? items.map((i, n) => (n === idx ? item : i)) : [...items, item];
    await putSection(KEY, next);
    revalidatePath('/admin/montages');
    revalidatePath('/montages');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

export async function deleteMontageCategory(id: string): Promise<void> {
  await requireAdmin();
  const items = await getSection(KEY, MONTAGES_SEED);
  await putSection(KEY, items.filter((i) => i.id !== id));
  revalidatePath('/admin/montages');
  revalidatePath('/montages');
}

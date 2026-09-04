'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getSection, putSection } from '@/lib/blob-store';
import { LEGENDS_SEED } from '@/lib/seed-data';
import type { LegendMember } from '@/lib/content-types';

const KEY = 'legends';

export async function saveLegend(item: LegendMember): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    const items = await getSection(KEY, LEGENDS_SEED);
    const idx = items.findIndex((i) => i.id === item.id);
    const next = idx >= 0 ? items.map((i, n) => (n === idx ? item : i)) : [...items, item];
    await putSection(KEY, next);
    revalidatePath('/admin/legends');
    revalidatePath('/legends');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

export async function deleteLegend(id: string): Promise<void> {
  await requireAdmin();
  const items = await getSection(KEY, LEGENDS_SEED);
  await putSection(KEY, items.filter((i) => i.id !== id));
  revalidatePath('/admin/legends');
  revalidatePath('/legends');
}

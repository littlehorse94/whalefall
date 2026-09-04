'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getSection, putSection } from '@/lib/blob-store';
import { GUESTBOOK_SEED } from '@/lib/seed-data';
import type { GuestbookEntry } from '@/lib/content-types';

const KEY = 'guestbook';

export async function saveGuestbookEntry(item: GuestbookEntry): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    const items = await getSection(KEY, GUESTBOOK_SEED);
    const idx = items.findIndex((i) => i.id === item.id);
    const next = idx >= 0 ? items.map((i, n) => (n === idx ? item : i)) : [item, ...items];
    await putSection(KEY, next);
    revalidatePath('/admin/guestbook');
    revalidatePath('/');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

export async function deleteGuestbookEntry(id: string): Promise<void> {
  await requireAdmin();
  const items = await getSection(KEY, GUESTBOOK_SEED);
  await putSection(KEY, items.filter((i) => i.id !== id));
  revalidatePath('/admin/guestbook');
  revalidatePath('/');
}

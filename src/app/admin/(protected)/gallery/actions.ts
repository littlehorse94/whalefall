'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getSection, putSection } from '@/lib/blob-store';
import { GALLERY_SEED } from '@/lib/seed-data';
import type { GalleryEvent } from '@/lib/content-types';

const KEY = 'gallery';

export async function saveGalleryEvent(item: GalleryEvent): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    const items = await getSection(KEY, GALLERY_SEED);
    const idx = items.findIndex((i) => i.id === item.id);
    const next = idx >= 0 ? items.map((i, n) => (n === idx ? item : i)) : [...items, item];
    await putSection(KEY, next);
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

export async function deleteGalleryEvent(id: string): Promise<void> {
  await requireAdmin();
  const items = await getSection(KEY, GALLERY_SEED);
  await putSection(KEY, items.filter((i) => i.id !== id));
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}

'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { putSection } from '@/lib/blob-store';
import type { DiscordConfig } from '@/lib/content-types';

export async function saveDiscordConfig(data: DiscordConfig): Promise<{ error: string } | void> {
  try {
    await requireAdmin();
    await putSection('discord', data);
    revalidatePath('/admin/discord');
    revalidatePath('/');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to save' };
  }
}

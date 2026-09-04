'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSection, putSection } from './blob-store';
import { GUESTBOOK_SEED, PHOTO_CONTEST_SEED } from './seed-data';
import type { GuestbookEntry } from './content-types';

const GUESTBOOK_KEY = 'guestbook';
const CONTEST_KEY = 'photo-contest';

export async function submitGuestbookEntry(formData: FormData): Promise<{ error: string } | void> {
  const name = String(formData.get('name') ?? '').trim().slice(0, 60);
  const message = String(formData.get('message') ?? '').trim().slice(0, 600);
  if (!name || !message) return { error: 'Name and message are required.' };

  const colors = ['#4dd9e8', '#c9a84c', '#e84d4d', '#4de890', '#e8a84d'];
  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name,
    message,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    avatar: name.slice(0, 2).toUpperCase(),
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  const items = await getSection(GUESTBOOK_KEY, GUESTBOOK_SEED);
  await putSection(GUESTBOOK_KEY, [entry, ...items]);
  revalidatePath('/');
  revalidatePath('/admin/guestbook');
}

export async function voteForPhoto(photoId: string): Promise<{ error: string } | void> {
  const cookieStore = await cookies();
  const monthKey = new Date().toISOString().slice(0, 7);
  const cookieName = `wf_voted_${monthKey}`;
  const voted = new Set((cookieStore.get(cookieName)?.value ?? '').split(',').filter(Boolean));

  if (voted.has(photoId)) {
    return { error: 'You already voted for this photo.' };
  }

  const config = await getSection(CONTEST_KEY, PHOTO_CONTEST_SEED);
  const next = {
    ...config,
    photos: config.photos.map((p) => (p.id === photoId ? { ...p, votes: p.votes + 1 } : p)),
  };
  await putSection(CONTEST_KEY, next);

  voted.add(photoId);
  cookieStore.set(cookieName, Array.from(voted).join(','), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 31,
  });

  revalidatePath('/');
  revalidatePath('/gallery');
}

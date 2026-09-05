'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import { getSection, putSection } from './blob-store';
import { isSubmissionsOpen, isVotingOpen } from './contest-schedule';
import { GUESTBOOK_SEED, getPhotoContestConfig } from './seed-data';
import type { ContestPhoto, GuestbookEntry } from './content-types';

const GUESTBOOK_KEY = 'guestbook';
const CONTEST_KEY = 'photo-contest';

function contestVoteCookieName(): string {
  return `wf_voted_${new Date().toISOString().slice(0, 7)}`;
}

/** The photo this visitor already voted for this month, if any — read server-side so a page reload shows their vote as already cast instead of looking untouched. */
export async function getVotedPhotoId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(contestVoteCookieName())?.value ?? null;
}

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
  const config = await getPhotoContestConfig();

  if (!isVotingOpen(config)) {
    return { error: 'Voting is currently closed.' };
  }

  const cookieStore = await cookies();
  const cookieName = contestVoteCookieName();

  // One vote total for the whole contest, not one vote per photo — a
  // visitor who already voted (for any photo) is done for the month.
  if (config.oneVotePerVoter && cookieStore.get(cookieName)?.value) {
    return { error: 'You have already cast your vote for this contest.' };
  }

  const next = {
    ...config,
    photos: config.photos.map((p) => (p.id === photoId ? { ...p, votes: p.votes + 1 } : p)),
  };

  try {
    await putSection(CONTEST_KEY, next);
  } catch (err) {
    console.error('voteForPhoto: failed to save vote', err);
    return { error: 'Could not save your vote — please try again.' };
  }

  if (config.oneVotePerVoter) {
    cookieStore.set(cookieName, photoId, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 31,
    });
  }

  revalidatePath('/');
  revalidatePath('/gallery');
}

const CONTEST_SUBMISSION_MAX_BYTES = 8 * 1024 * 1024;

export async function submitContestPhoto(formData: FormData): Promise<{ error: string } | void> {
  const config = await getPhotoContestConfig();
  if (!isSubmissionsOpen(config)) {
    return { error: 'Submissions are closed for this contest.' };
  }

  const submitter = String(formData.get('submitter') ?? '').trim().slice(0, 60);
  const title = String(formData.get('title') ?? '').trim().slice(0, 80);
  const file = formData.get('file');

  if (!submitter || !title) return { error: 'Name and photo title are required.' };
  if (!(file instanceof File) || file.size === 0) return { error: 'Please choose a photo to submit.' };
  if (!file.type.startsWith('image/')) return { error: 'Only image files are allowed.' };
  if (file.size > CONTEST_SUBMISSION_MAX_BYTES) return { error: 'Image must be under 8MB.' };

  const pathname = `media/photo-contest-submissions/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name}`;

  try {
    const blob = await put(pathname, file, { access: 'public', addRandomSuffix: true, contentType: file.type });
    const entry: ContestPhoto = { id: crypto.randomUUID(), url: blob.url, submitter, title, votes: 0 };
    const next = { ...config, pendingPhotos: [...config.pendingPhotos, entry] };
    await putSection(CONTEST_KEY, next);
  } catch (err) {
    console.error('submitContestPhoto: failed to save submission', err);
    return { error: 'Could not save your submission — please try again.' };
  }

  revalidatePath('/admin/photo-contest');
}

'use server';

import { redirect } from 'next/navigation';
import { verifyPassword, verifyUsername, setSessionCookie, clearSessionCookie } from '@/lib/auth';

export async function login(_prevState: { error: string } | null, formData: FormData): Promise<{ error: string } | null> {
  const username = String(formData.get('username') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!verifyUsername(username) || !(await verifyPassword(password))) {
    return { error: 'Incorrect username or password.' };
  }

  await setSessionCookie();
  redirect('/admin');
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect('/admin/login');
}

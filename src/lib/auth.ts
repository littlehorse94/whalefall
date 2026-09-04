import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const COOKIE_NAME = 'wf_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export async function verifyPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  return bcrypt.compare(plain, hash);
}

export function verifyUsername(username: string): boolean {
  const expected = process.env.ADMIN_USERNAME;
  return !!expected && username === expected;
}

export async function createSessionToken(): Promise<string> {
  const username = process.env.ADMIN_USERNAME ?? 'admin';
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.sub !== 'string') return null;
    return { username: payload.sub };
  } catch {
    return null;
  }
}

export async function setSessionCookie(): Promise<void> {
  const token = await createSessionToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<{ username: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Throws if there is no valid admin session. Call at the top of every admin Server Action and upload route. */
export async function requireAdmin(): Promise<{ username: string }> {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}

export { COOKIE_NAME };

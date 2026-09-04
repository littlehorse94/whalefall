import { list, put } from '@vercel/blob';

const PREFIX = 'content/';

function pathFor(key: string) {
  return `${PREFIX}${key}.json`;
}

/**
 * Reads a JSON content section from Blob storage. Resolves the current
 * blob by listing on its exact pathname (works regardless of store
 * hostname) rather than guessing a URL. Returns `fallback` the first time
 * a section is read (before anything has ever been saved to it), and also
 * if Blob storage is unreachable or misconfigured — a storage outage
 * degrades the public site to default content instead of taking it down.
 */
export async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: pathFor(key), limit: 1 });
    const blob = blobs.find((b) => b.pathname === pathFor(key));
    if (!blob) return fallback;

    const res = await fetch(blob.url, { cache: 'no-store' });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch (err) {
    console.error(`getSection("${key}") failed, falling back to defaults:`, err);
    return fallback;
  }
}

/**
 * Writes a JSON content section to Blob storage. Uses a stable pathname
 * (no random suffix) with overwrite so the same section always lives at
 * the same URL across edits.
 */
export async function putSection<T>(key: string, data: T): Promise<void> {
  await put(pathFor(key), JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

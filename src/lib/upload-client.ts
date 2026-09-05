'use client';

/** Uploads a file to Blob storage via the admin proxy route. Throws with a readable message on failure. */
export async function uploadFile(file: File, section: string): Promise<string> {
  const pathname = `media/${section}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name}`;
  const formData = new FormData();
  formData.set('file', file);
  formData.set('pathname', pathname);

  const res = await fetch('/api/admin/blob-upload', { method: 'POST', body: formData });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error ?? `Upload failed (${res.status})`);
  }
  return data.url as string;
}

'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

interface MediaUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: 'image/*' | 'video/*' | 'audio/*';
  section: string;
}

export default function MediaUploadField({ label, value, onChange, accept, section }: MediaUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const blob = await upload(`media/${section}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/blob-upload',
      });
      onChange(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.3rem', color: 'rgba(232,244,248,0.6)' }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https:// or upload a file"
          style={{
            flex: 1, padding: '0.55rem 0.7rem', borderRadius: 7,
            border: '1px solid rgba(77,217,232,0.2)', background: 'rgba(5,8,16,0.6)',
            color: '#e8f4f8', fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '0.5rem 0.8rem', borderRadius: 7, border: '1px solid rgba(77,217,232,0.3)',
            background: 'rgba(77,217,232,0.1)', color: '#4dd9e8', fontSize: '0.8rem',
            cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
          }}
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p style={{ color: '#e84d4d', fontSize: '0.78rem', marginTop: '0.3rem' }}>{error}</p>}
      {value && accept === 'image/*' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ marginTop: '0.5rem', maxHeight: '90px', borderRadius: '6px' }} />
      )}
    </div>
  );
}

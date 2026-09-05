'use client';

import { useRef, useState } from 'react';
import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, smallButtonStyle, addButtonStyle } from '@/components/admin/ui';
import MediaUploadField from '@/components/admin/MediaUploadField';
import { uploadFile } from '@/lib/upload-client';
import { saveGalleryEvent, deleteGalleryEvent } from './actions';
import type { GalleryEvent, LightboxPhoto } from '@/lib/content-types';

function titleFromFilename(filename: string): string {
  return filename.replace(/\.[^./]+$/, '').replace(/[_-]+/g, ' ').trim();
}

function PhotoListEditor({ photos, onChange }: { photos: LightboxPhoto[]; onChange: (photos: LightboxPhoto[]) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  function updatePhoto(id: string, patch: Partial<LightboxPhoto>) {
    onChange(photos.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function removePhoto(id: string) {
    onChange(photos.filter((p) => p.id !== id));
  }
  function addPhoto() {
    onChange([...photos, { id: crypto.randomUUID(), url: '', title: '' }]);
  }
  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function removeSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Remove ${selected.size} selected photo${selected.size === 1 ? '' : 's'}?`)) return;
    onChange(photos.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  }

  async function handleBulkFiles(files: FileList) {
    setBulkUploading(true);
    setBulkError(null);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map(async (file) => {
          const url = await uploadFile(file, 'gallery');
          return { id: crypto.randomUUID(), url, title: titleFromFilename(file.name) } satisfies LightboxPhoto;
        }),
      );
      onChange([...photos, ...uploaded]);
    } catch (err) {
      setBulkError(err instanceof Error ? err.message : 'Bulk upload failed');
    } finally {
      setBulkUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <label style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.6)' }}>
          Photos ({photos.length})
        </label>
        {selected.size > 0 && (
          <button type="button" onClick={removeSelected} style={{ ...smallButtonStyle, color: '#e84d4d', borderColor: 'rgba(232,77,77,0.4)' }}>
            Remove {selected.size} selected
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ border: '1px solid rgba(77,217,232,0.15)', borderRadius: '8px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={selected.has(photo.id)}
                onChange={() => toggleSelected(photo.id)}
                style={{ flexShrink: 0, width: '15px', height: '15px', accentColor: '#4dd9e8', cursor: 'pointer' }}
                aria-label="Select this photo"
              />
              <div style={{ flex: 1 }}>
                <TextField label="Title" value={photo.title} onChange={(v) => updatePhoto(photo.id, { title: v })} />
              </div>
            </div>
            <MediaUploadField label="Photo" value={photo.url} onChange={(url) => updatePhoto(photo.id, { url })} accept="image/*" section="gallery" />
            <button type="button" onClick={() => removePhoto(photo.id)} style={{ ...smallButtonStyle, alignSelf: 'flex-end', color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
              Remove photo
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={addPhoto} style={{ ...addButtonStyle, fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}>
          + Add photo
        </button>
        <button
          type="button"
          onClick={() => bulkInputRef.current?.click()}
          disabled={bulkUploading}
          style={{ ...addButtonStyle, fontSize: '0.78rem', padding: '0.4rem 0.8rem', opacity: bulkUploading ? 0.6 : 1 }}
        >
          {bulkUploading ? 'Uploading…' : '+ Bulk upload photos'}
        </button>
        <input
          ref={bulkInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) void handleBulkFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {bulkError && <p style={{ color: '#e84d4d', fontSize: '0.78rem', marginTop: '0.3rem' }}>{bulkError}</p>}
    </div>
  );
}

export default function GalleryManager({ initialItems }: { initialItems: GalleryEvent[] }) {
  return (
    <CrudManager<GalleryEvent>
      items={initialItems}
      itemLabel="event"
      createEmpty={() => ({ id: crypto.randomUUID(), title: '', date: '', description: '', photos: [] })}
      renderItem={(item) => (
        <div>
          <strong>{item.title}</strong> — {item.date}
          <div style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.5)' }}>{item.photos.length} photo(s)</div>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
          <TextField label="Date / category label" value={item.date} onChange={(v) => update({ date: v })} />
          <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} />
          <PhotoListEditor photos={item.photos} onChange={(photos) => update({ photos })} />
        </>
      )}
      onSave={saveGalleryEvent}
      onDelete={deleteGalleryEvent}
    />
  );
}

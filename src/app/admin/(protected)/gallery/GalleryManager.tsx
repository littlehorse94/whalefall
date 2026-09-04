'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, smallButtonStyle, addButtonStyle } from '@/components/admin/ui';
import MediaUploadField from '@/components/admin/MediaUploadField';
import { saveGalleryEvent, deleteGalleryEvent } from './actions';
import type { GalleryEvent, LightboxPhoto } from '@/lib/content-types';

function PhotoListEditor({ photos, onChange }: { photos: LightboxPhoto[]; onChange: (photos: LightboxPhoto[]) => void }) {
  function updatePhoto(id: string, patch: Partial<LightboxPhoto>) {
    onChange(photos.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function removePhoto(id: string) {
    onChange(photos.filter((p) => p.id !== id));
  }
  function addPhoto() {
    onChange([...photos, { id: crypto.randomUUID(), url: '', title: '' }]);
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem', color: 'rgba(232,244,248,0.6)' }}>
        Photos ({photos.length})
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ border: '1px solid rgba(77,217,232,0.15)', borderRadius: '8px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField label="Title" value={photo.title} onChange={(v) => updatePhoto(photo.id, { title: v })} />
            </div>
            <MediaUploadField label="Photo" value={photo.url} onChange={(url) => updatePhoto(photo.id, { url })} accept="image/*" section="gallery" />
            <button type="button" onClick={() => removePhoto(photo.id)} style={{ ...smallButtonStyle, alignSelf: 'flex-end', color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
              Remove photo
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addPhoto} style={{ ...addButtonStyle, marginTop: '0.6rem', fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}>
        + Add photo
      </button>
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

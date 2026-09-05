'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, DateField } from '@/components/admin/ui';
import BulkMediaListEditor, { titleFromFilename } from '@/components/admin/BulkMediaListEditor';
import { saveGalleryEvent, deleteGalleryEvent } from './actions';
import type { GalleryEvent, LightboxPhoto } from '@/lib/content-types';

function PhotoListEditor({ photos, onChange }: { photos: LightboxPhoto[]; onChange: (photos: LightboxPhoto[]) => void }) {
  return (
    <BulkMediaListEditor<LightboxPhoto>
      items={photos}
      onChange={onChange}
      itemLabel="photo"
      mediaLabel="Photo"
      accept="image/*"
      section="gallery"
      getUrl={(photo) => photo.url}
      setUrl={(photo, url) => ({ ...photo, url })}
      createEmpty={() => ({ id: crypto.randomUUID(), url: '', title: '' })}
      createFromFile={(file, url) => ({ id: crypto.randomUUID(), url, title: titleFromFilename(file.name) })}
      renderFields={(photo, update) => (
        <TextField label="Title" value={photo.title} onChange={(v) => update({ title: v })} />
      )}
    />
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
          <DateField
            label="Date / category label"
            value={item.date}
            onChange={(v) => update({ date: v })}
            format="month-year"
            placeholder="e.g. PvP · 2023, or pick a date below"
          />
          <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} />
          <PhotoListEditor photos={item.photos} onChange={(photos) => update({ photos })} />
        </>
      )}
      onSave={saveGalleryEvent}
      onDelete={deleteGalleryEvent}
    />
  );
}

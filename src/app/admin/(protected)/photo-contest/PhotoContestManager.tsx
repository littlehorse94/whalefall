'use client';

import SettingsForm from '@/components/admin/SettingsForm';
import { TextField, TextAreaField } from '@/components/admin/ui';
import BulkMediaListEditor, { titleFromFilename } from '@/components/admin/BulkMediaListEditor';
import { savePhotoContestConfig } from './actions';
import type { PhotoContestConfig } from '@/lib/content-types';

export default function PhotoContestManager({ initial }: { initial: PhotoContestConfig }) {
  return (
    <SettingsForm<PhotoContestConfig>
      initial={initial}
      onSave={savePhotoContestConfig}
      renderForm={(data, update) => (
        <>
          <TextField label="Contest theme" value={data.theme} onChange={(v) => update({ theme: v })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <TextField label="Month label" value={data.monthLabel} onChange={(v) => update({ monthLabel: v })} />
            <TextField label="Days left" type="number" value={data.daysLeft} onChange={(v) => update({ daysLeft: Number(v) })} />
          </div>
          <TextAreaField label="Description" value={data.description} onChange={(v) => update({ description: v })} />
          <BulkMediaListEditor
            items={data.photos}
            onChange={(photos) => update({ photos })}
            itemLabel="photo"
            mediaLabel="Photo"
            accept="image/*"
            section="photo-contest"
            getUrl={(photo) => photo.url}
            setUrl={(photo, url) => ({ ...photo, url })}
            createEmpty={() => ({ id: crypto.randomUUID(), url: '', submitter: '', title: '', votes: 0 })}
            createFromFile={(file, url) => ({ id: crypto.randomUUID(), url, submitter: '', title: titleFromFilename(file.name), votes: 0 })}
            renderFields={(photo, updateRow) => (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                <TextField label="Title" value={photo.title} onChange={(v) => updateRow({ title: v })} />
                <TextField label="Submitter" value={photo.submitter} onChange={(v) => updateRow({ submitter: v })} />
                <TextField label="Votes" type="number" value={photo.votes} onChange={(v) => updateRow({ votes: Number(v) })} />
              </div>
            )}
          />
        </>
      )}
    />
  );
}

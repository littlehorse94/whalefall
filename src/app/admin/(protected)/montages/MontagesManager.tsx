'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField } from '@/components/admin/ui';
import BulkMediaListEditor, { titleFromFilename } from '@/components/admin/BulkMediaListEditor';
import { saveMontageCategory, deleteMontageCategory } from './actions';
import type { MontageCategory, Montage } from '@/lib/content-types';

function VideoListEditor({ videos, onChange }: { videos: Montage[]; onChange: (videos: Montage[]) => void }) {
  return (
    <BulkMediaListEditor<Montage>
      items={videos}
      onChange={onChange}
      itemLabel="video"
      mediaLabel="Or upload a video file"
      accept="video/*"
      section="montages"
      getUrl={(video) => video.videoUrl ?? ''}
      setUrl={(video, url) => ({ ...video, videoUrl: url })}
      createEmpty={() => ({ id: crypto.randomUUID(), title: '', youtubeId: '', videoUrl: '', views: '0', likes: '0' })}
      createFromFile={(file, url) => ({ id: crypto.randomUUID(), title: titleFromFilename(file.name), youtubeId: '', videoUrl: url, views: '0', likes: '0' })}
      renderFields={(video, update) => (
        <>
          <TextField label="Title" value={video.title} onChange={(v) => update({ title: v })} />
          <TextField label="YouTube video ID (leave blank if uploading a file)" value={video.youtubeId} onChange={(v) => update({ youtubeId: v })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <TextField label="Views (display text)" value={video.views} onChange={(v) => update({ views: v })} />
            <TextField label="Likes (display text)" value={video.likes} onChange={(v) => update({ likes: v })} />
          </div>
        </>
      )}
    />
  );
}

export default function MontagesManager({ initialItems }: { initialItems: MontageCategory[] }) {
  return (
    <CrudManager<MontageCategory>
      items={initialItems}
      itemLabel="category"
      createEmpty={() => ({ id: crypto.randomUUID(), title: '', description: '', videos: [] })}
      renderItem={(item) => (
        <div>
          <strong>{item.title}</strong>
          <div style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.5)' }}>{item.videos.length} video(s) — {item.description}</div>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <TextField label="Category title" value={item.title} onChange={(v) => update({ title: v })} />
          <TextAreaField label="Description" value={item.description} onChange={(v) => update({ description: v })} />
          <VideoListEditor videos={item.videos} onChange={(videos) => update({ videos })} />
        </>
      )}
      onSave={saveMontageCategory}
      onDelete={deleteMontageCategory}
    />
  );
}

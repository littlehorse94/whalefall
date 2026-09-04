'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, smallButtonStyle, addButtonStyle } from '@/components/admin/ui';
import MediaUploadField from '@/components/admin/MediaUploadField';
import { saveMontageCategory, deleteMontageCategory } from './actions';
import type { MontageCategory, Montage } from '@/lib/content-types';

function VideoListEditor({ videos, onChange }: { videos: Montage[]; onChange: (videos: Montage[]) => void }) {
  function updateVideo(id: string, patch: Partial<Montage>) {
    onChange(videos.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }
  function removeVideo(id: string) {
    onChange(videos.filter((v) => v.id !== id));
  }
  function addVideo() {
    onChange([...videos, { id: crypto.randomUUID(), title: '', youtubeId: '', videoUrl: '', views: '0', likes: '0' }]);
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem', color: 'rgba(232,244,248,0.6)' }}>
        Videos ({videos.length})
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '360px', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {videos.map((video) => (
          <div key={video.id} style={{ border: '1px solid rgba(77,217,232,0.15)', borderRadius: '8px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <TextField label="Title" value={video.title} onChange={(v) => updateVideo(video.id, { title: v })} />
            <TextField label="YouTube video ID (leave blank if uploading a file)" value={video.youtubeId} onChange={(v) => updateVideo(video.id, { youtubeId: v })} />
            <MediaUploadField label="Or upload a video file" value={video.videoUrl ?? ''} onChange={(url) => updateVideo(video.id, { videoUrl: url })} accept="video/*" section="montages" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <TextField label="Views (display text)" value={video.views} onChange={(v) => updateVideo(video.id, { views: v })} />
              <TextField label="Likes (display text)" value={video.likes} onChange={(v) => updateVideo(video.id, { likes: v })} />
            </div>
            <button type="button" onClick={() => removeVideo(video.id)} style={{ ...smallButtonStyle, alignSelf: 'flex-end', color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
              Remove video
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addVideo} style={{ ...addButtonStyle, marginTop: '0.6rem', fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}>
        + Add video
      </button>
    </div>
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

'use client';

import { useState } from 'react';
import SettingsForm from '@/components/admin/SettingsForm';
import { TextField, InlineListEditor } from '@/components/admin/ui';
import MediaUploadField from '@/components/admin/MediaUploadField';
import { saveMedia } from './actions';
import type { MediaSettings } from '@/lib/content-types';

interface HeroVideoRow { id: string; url: string }

export default function MediaManager({ initial }: { initial: MediaSettings }) {
  const [heroVideos, setHeroVideos] = useState<HeroVideoRow[]>(
    initial.heroVideoUrls.map((url, i) => ({ id: `hv-${i}`, url })),
  );

  return (
    <SettingsForm<MediaSettings>
      initial={initial}
      onSave={(data) => saveMedia({ ...data, heroVideoUrls: heroVideos.map((h) => h.url).filter(Boolean) })}
      renderForm={(data, update) => (
        <>
          <InlineListEditor
            label="Homepage hero background videos (cycles through in order)"
            items={heroVideos}
            onChange={setHeroVideos}
            createEmpty={() => ({ id: crypto.randomUUID(), url: '' })}
            renderRow={(row, updateRow) => (
              <MediaUploadField label="Video" value={row.url} onChange={(url) => updateRow({ url })} accept="video/*" section="hero" />
            )}
          />
          <MediaUploadField
            label="Gallery/Legends/Montages page background video"
            value={data.pageVideoUrl}
            onChange={(url) => update({ pageVideoUrl: url })}
            accept="video/*"
            section="page-bg"
          />
          <MediaUploadField
            label="Ambient background audio track"
            value={data.audioUrl}
            onChange={(url) => update({ audioUrl: url })}
            accept="audio/*"
            section="audio"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField label="Audio toggle label (playing)" value={data.audioLabelPlaying} onChange={(v) => update({ audioLabelPlaying: v })} />
            <TextField label="Audio toggle label (paused)" value={data.audioLabelPaused} onChange={(v) => update({ audioLabelPaused: v })} />
          </div>
        </>
      )}
    />
  );
}

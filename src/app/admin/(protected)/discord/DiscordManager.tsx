'use client';

import SettingsForm from '@/components/admin/SettingsForm';
import { TextField, SelectField, InlineListEditor } from '@/components/admin/ui';
import { saveDiscordConfig } from './actions';
import type { DiscordConfig } from '@/lib/content-types';

export default function DiscordManager({ initial }: { initial: DiscordConfig }) {
  return (
    <SettingsForm<DiscordConfig>
      initial={initial}
      onSave={saveDiscordConfig}
      renderForm={(data, update) => (
        <>
          <TextField label="Discord invite URL" value={data.inviteUrl} onChange={(v) => update({ inviteUrl: v })} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TextField label="Online now" type="number" value={data.presenceCount} onChange={(v) => update({ presenceCount: Number(v) })} />
            <TextField label="Member count" type="number" value={data.memberCount} onChange={(v) => update({ memberCount: Number(v) })} />
            <TextField label="Boost level" type="number" value={data.boostLevel} onChange={(v) => update({ boostLevel: Number(v) })} />
          </div>

          <InlineListEditor
            label="Highlights feed"
            items={data.highlights}
            onChange={(highlights) => update({ highlights })}
            createEmpty={() => ({ id: crypto.randomUUID(), tag: 'Announcement', text: '', time: 'just now' })}
            renderRow={(h, updateRow) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <TextField label="Tag" value={h.tag} onChange={(v) => updateRow({ tag: v })} />
                  <TextField label="Time" value={h.time} onChange={(v) => updateRow({ time: v })} />
                </div>
                <TextField label="Text" value={h.text} onChange={(v) => updateRow({ text: v })} />
              </>
            )}
          />

          <InlineListEditor
            label="Members shown"
            items={data.members}
            onChange={(members) => update({ members })}
            createEmpty={() => ({ id: crypto.randomUUID(), username: '', status: 'online' as const, avatarUrl: null })}
            renderRow={(m, updateRow) => (
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-2">
                <TextField label="Username" value={m.username} onChange={(v) => updateRow({ username: v })} />
                <SelectField
                  label="Status"
                  value={m.status}
                  onChange={(v) => updateRow({ status: v as typeof m.status })}
                  options={[
                    { value: 'online', label: 'Online' },
                    { value: 'idle', label: 'Idle' },
                    { value: 'dnd', label: 'Do Not Disturb' },
                    { value: 'offline', label: 'Offline' },
                  ]}
                />
              </div>
            )}
          />

          <InlineListEditor
            label="Channels shown"
            items={data.channels}
            onChange={(channels) => update({ channels })}
            createEmpty={() => ({ id: crypto.randomUUID(), name: '' })}
            renderRow={(c, updateRow) => (
              <TextField label="Channel name" value={c.name} onChange={(v) => updateRow({ name: v })} />
            )}
          />
        </>
      )}
    />
  );
}

'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField } from '@/components/admin/ui';
import MediaUploadField from '@/components/admin/MediaUploadField';
import { saveLegend, deleteLegend } from './actions';
import type { LegendMember } from '@/lib/content-types';

export default function LegendsManager({ initialItems }: { initialItems: LegendMember[] }) {
  return (
    <CrudManager<LegendMember>
      items={initialItems}
      itemLabel="member"
      createEmpty={() => ({
        id: crypto.randomUUID(), name: '', role: '', title: '', joinDate: '', badge: '⭐',
        badgeLabel: '', quote: '', color: '#4dd9e8', glowColor: '#4dd9e8',
        gradient: 'from-[#1a3a5c] to-[#0a1a2e]', initials: '', photoUrl: '',
      })}
      renderItem={(item) => (
        <div>
          <strong>{item.name}</strong> — {item.role}
          <div style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.5)' }}>{item.title} · joined {item.joinDate}</div>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <TextField label="Name" value={item.name} onChange={(v) => update({ name: v })} />
          <TextField label="Initials (avatar fallback)" value={item.initials} onChange={(v) => update({ initials: v.toUpperCase().slice(0, 3) })} />
          <TextField label="Role" value={item.role} onChange={(v) => update({ role: v })} />
          <TextField label="Flavor title" value={item.title} onChange={(v) => update({ title: v })} />
          <TextField label="Join date" value={item.joinDate} onChange={(v) => update({ joinDate: v })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <TextField label="Badge (emoji)" value={item.badge} onChange={(v) => update({ badge: v })} />
            <TextField label="Badge label" value={item.badgeLabel} onChange={(v) => update({ badgeLabel: v })} />
          </div>
          <TextAreaField label="Quote" value={item.quote} onChange={(v) => update({ quote: v })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <TextField label="Accent color (hex)" value={item.color} onChange={(v) => update({ color: v, glowColor: v })} />
          </div>
          <MediaUploadField
            label="Photo (optional — falls back to initials)"
            value={item.photoUrl ?? ''}
            onChange={(url) => update({ photoUrl: url })}
            accept="image/*"
            section="legends"
          />
        </>
      )}
      onSave={saveLegend}
      onDelete={deleteLegend}
    />
  );
}

'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, SelectField } from '@/components/admin/ui';
import { saveMilestone, deleteMilestone } from './actions';
import type { Milestone } from '@/lib/content-types';

export default function ChronicleManager({ initialItems }: { initialItems: Milestone[] }) {
  return (
    <CrudManager<Milestone>
      items={initialItems}
      itemLabel="milestone"
      createEmpty={() => ({
        id: crypto.randomUUID(), year: '', month: '', title: '', desc: '', icon: '✨', side: 'left',
      })}
      renderItem={(item) => (
        <div>
          <strong>{item.month} {item.year} — {item.title}</strong>
          <div style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.5)' }}>{item.desc}</div>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <TextField label="Year" value={item.year} onChange={(v) => update({ year: v })} />
            <TextField label="Month" value={item.month} onChange={(v) => update({ month: v })} />
          </div>
          <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
          <TextAreaField label="Description" value={item.desc} onChange={(v) => update({ desc: v })} rows={4} />
          <TextField label="Icon (emoji)" value={item.icon} onChange={(v) => update({ icon: v })} />
          <SelectField
            label="Side"
            value={item.side}
            onChange={(v) => update({ side: v as Milestone['side'] })}
            options={[{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]}
          />
        </>
      )}
      onSave={saveMilestone}
      onDelete={deleteMilestone}
    />
  );
}

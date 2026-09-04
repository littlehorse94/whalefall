'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField } from '@/components/admin/ui';
import { saveStat, deleteStat } from './actions';
import type { StatTile } from '@/lib/content-types';

export default function StatsManager({ initialItems }: { initialItems: StatTile[] }) {
  return (
    <CrudManager<StatTile>
      items={initialItems}
      itemLabel="stat"
      createEmpty={() => ({ id: crypto.randomUUID(), label: '', value: 0, prefix: '', suffix: '', desc: '' })}
      renderItem={(item) => (
        <div>
          <strong>{item.prefix}{item.value}{item.suffix}</strong> — {item.label}
          <div style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.5)' }}>{item.desc}</div>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
          <TextField label="Value" type="number" value={item.value} onChange={(v) => update({ value: Number(v) })} />
          <TextField label="Prefix" value={item.prefix} onChange={(v) => update({ prefix: v })} />
          <TextField label="Suffix" value={item.suffix} onChange={(v) => update({ suffix: v })} />
          <TextAreaField label="Description" value={item.desc} onChange={(v) => update({ desc: v })} />
        </>
      )}
      onSave={saveStat}
      onDelete={deleteStat}
    />
  );
}

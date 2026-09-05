'use client';

import { useRef } from 'react';
import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, SelectField } from '@/components/admin/ui';
import { saveMilestone, deleteMilestone } from './actions';
import type { Milestone } from '@/lib/content-types';

function YearMonthPicker({ onPick }: { onPick: (year: string, month: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => inputRef.current?.showPicker?.()}
        aria-label="Pick a date"
        title="Pick a date to fill Year and Month"
        style={{
          width: '2.2rem', height: '2.2rem', borderRadius: '7px', marginTop: '1.35rem',
          border: '1px solid rgba(77,217,232,0.3)', background: 'rgba(77,217,232,0.1)',
          color: '#4dd9e8', cursor: 'pointer', fontSize: '0.9rem',
        }}
      >
        📅
      </button>
      <input
        ref={inputRef}
        type="date"
        onChange={(e) => {
          if (!e.target.value) return;
          const d = new Date(`${e.target.value}T00:00:00`);
          onPick(String(d.getFullYear()), d.toLocaleDateString('en-US', { month: 'long' }));
        }}
        style={{ position: 'absolute', top: '100%', right: 0, width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
        tabIndex={-1}
      />
    </div>
  );
}

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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', alignItems: 'start' }}>
            <TextField label="Year" value={item.year} onChange={(v) => update({ year: v })} />
            <TextField label="Month" value={item.month} onChange={(v) => update({ month: v })} />
            <YearMonthPicker onPick={(year, month) => update({ year, month })} />
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

'use client';

import CrudManager from '@/components/admin/CrudManager';
import { TextField, TextAreaField, DateField } from '@/components/admin/ui';
import { saveGuestbookEntry, deleteGuestbookEntry } from './actions';
import type { GuestbookEntry } from '@/lib/content-types';

export default function GuestbookManager({ initialItems }: { initialItems: GuestbookEntry[] }) {
  return (
    <CrudManager<GuestbookEntry>
      items={initialItems}
      itemLabel="entry"
      createEmpty={() => ({
        id: crypto.randomUUID(), name: '', message: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        avatar: '', color: '#4dd9e8',
      })}
      renderItem={(item) => (
        <div>
          <strong>{item.name}</strong> <span style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.4)' }}>· {item.date}</span>
          <div style={{ fontSize: '0.8rem', color: 'rgba(232,244,248,0.6)' }}>{item.message}</div>
        </div>
      )}
      renderForm={(item, update) => (
        <>
          <TextField label="Name" value={item.name} onChange={(v) => update({ name: v, avatar: v.slice(0, 2).toUpperCase() })} />
          <TextAreaField label="Message" value={item.message} onChange={(v) => update({ message: v })} rows={4} />
          <DateField label="Date" value={item.date} onChange={(v) => update({ date: v })} format="full" />
        </>
      )}
      onSave={saveGuestbookEntry}
      onDelete={deleteGuestbookEntry}
    />
  );
}

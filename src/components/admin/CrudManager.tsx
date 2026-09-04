'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  addButtonStyle, cardStyle, modalStyle, overlayStyle, saveButtonStyle, smallButtonStyle,
} from './ui';

type SaveResult = { error: string } | void;

interface CrudManagerProps<T extends { id: string }> {
  items: T[];
  itemLabel: string;
  createEmpty: () => T;
  renderItem: (item: T) => ReactNode;
  renderForm: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  onSave: (item: T) => Promise<SaveResult>;
  onDelete: (id: string) => Promise<void>;
}

export default function CrudManager<T extends { id: string }>({
  items, itemLabel, createEmpty, renderItem, renderForm, onSave, onDelete,
}: CrudManagerProps<T>) {
  const router = useRouter();
  const [modalItem, setModalItem] = useState<T | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setModalItem(createEmpty());
    setError(null);
  }
  function openEdit(item: T) {
    setModalItem({ ...item });
    setError(null);
  }
  function close() {
    if (busy) return;
    setModalItem(null);
    setError(null);
  }
  function update(patch: Partial<T>) {
    setModalItem((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  async function handleSave() {
    if (!modalItem) return;
    setBusy(true);
    const result = await onSave(modalItem);
    setBusy(false);
    if (result && 'error' in result) {
      setError(result.error);
      return;
    }
    setModalItem(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm(`Delete this ${itemLabel}?`)) return;
    setBusy(true);
    await onDelete(id);
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      <button onClick={openCreate} style={addButtonStyle}>+ Add {itemLabel}</button>

      <div style={{ display: 'grid', gap: '0.65rem', marginTop: '1.25rem' }}>
        {items.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ flex: 1, minWidth: 0 }}>{renderItem(item)}</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button onClick={() => openEdit(item)} style={smallButtonStyle}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ ...smallButtonStyle, color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p style={{ color: 'rgba(232,244,248,0.4)', fontSize: '0.85rem' }}>Nothing here yet.</p>
        )}
      </div>

      {modalItem && (
        <div style={overlayStyle} onClick={close}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.05rem' }}>
              {items.some((i) => i.id === modalItem.id) ? `Edit ${itemLabel}` : `Add ${itemLabel}`}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {renderForm(modalItem, update)}
            </div>
            {error && <p style={{ color: '#e84d4d', fontSize: '0.82rem', marginTop: '0.85rem' }}>{error}</p>}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.4rem', justifyContent: 'flex-end' }}>
              <button onClick={close} style={smallButtonStyle} disabled={busy}>Cancel</button>
              <button onClick={handleSave} disabled={busy} style={{ ...saveButtonStyle, opacity: busy ? 0.6 : 1 }}>
                {busy ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

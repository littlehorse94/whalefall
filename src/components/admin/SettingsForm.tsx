'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { saveButtonStyle } from './ui';

type SaveResult = { error: string } | void;

interface SettingsFormProps<T> {
  initial: T;
  onSave: (data: T) => Promise<SaveResult>;
  renderForm: (data: T, update: (patch: Partial<T>) => void) => ReactNode;
}

export default function SettingsForm<T>({ initial, onSave, renderForm }: SettingsFormProps<T>) {
  const router = useRouter();
  const [data, setData] = useState<T>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(patch: Partial<T>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  async function handleSave() {
    setBusy(true);
    setError(null);
    setSaved(false);
    const result = await onSave(data);
    setBusy(false);
    if (result && 'error' in result) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {renderForm(data, update)}
      </div>
      {error && <p style={{ color: '#e84d4d', fontSize: '0.85rem', marginTop: '1rem' }}>{error}</p>}
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={handleSave} disabled={busy} style={{ ...saveButtonStyle, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span style={{ color: '#4de890', fontSize: '0.85rem' }}>✓ Saved</span>}
      </div>
    </div>
  );
}

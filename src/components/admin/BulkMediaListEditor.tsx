'use client';

import { useRef, useState, type ReactNode } from 'react';
import { smallButtonStyle, addButtonStyle } from './ui';
import MediaUploadField from './MediaUploadField';
import { uploadFile } from '@/lib/upload-client';

export function titleFromFilename(filename: string): string {
  return filename.replace(/\.[^./]+$/, '').replace(/[_-]+/g, ' ').trim();
}

interface BulkMediaListEditorProps<T extends { id: string }> {
  items: T[];
  onChange: (items: T[]) => void;
  itemLabel: string;
  mediaLabel: string;
  accept: 'image/*' | 'video/*';
  section: string;
  getUrl: (item: T) => string;
  setUrl: (item: T, url: string) => T;
  createEmpty: () => T;
  createFromFile: (file: File, url: string) => T;
  renderFields: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}

export default function BulkMediaListEditor<T extends { id: string }>({
  items, onChange, itemLabel, mediaLabel, accept, section, getUrl, setUrl, createEmpty, createFromFile, renderFields,
}: BulkMediaListEditorProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  function updateItem(id: string, patch: Partial<T>) {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function removeItem(id: string) {
    onChange(items.filter((it) => it.id !== id));
  }
  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function removeSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Remove ${selected.size} selected ${itemLabel}${selected.size === 1 ? '' : 's'}?`)) return;
    onChange(items.filter((it) => !selected.has(it.id)));
    setSelected(new Set());
  }

  async function handleBulkFiles(files: FileList) {
    setBulkUploading(true);
    setBulkError(null);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map(async (file) => {
          const url = await uploadFile(file, section);
          return createFromFile(file, url);
        }),
      );
      onChange([...items, ...uploaded]);
    } catch (err) {
      setBulkError(err instanceof Error ? err.message : 'Bulk upload failed');
    } finally {
      setBulkUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <label style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.6)' }}>
          {itemLabel[0].toUpperCase()}{itemLabel.slice(1)}s ({items.length})
        </label>
        {selected.size > 0 && (
          <button type="button" onClick={removeSelected} style={{ ...smallButtonStyle, color: '#e84d4d', borderColor: 'rgba(232,77,77,0.4)' }}>
            Remove {selected.size} selected
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: '1px solid rgba(77,217,232,0.15)', borderRadius: '8px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={selected.has(item.id)}
                onChange={() => toggleSelected(item.id)}
                style={{ flexShrink: 0, width: '15px', height: '15px', marginTop: '0.4rem', accentColor: '#4dd9e8', cursor: 'pointer' }}
                aria-label={`Select this ${itemLabel}`}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {renderFields(item, (patch) => updateItem(item.id, patch))}
              </div>
            </div>
            <MediaUploadField label={mediaLabel} value={getUrl(item)} onChange={(url) => updateItem(item.id, setUrl(item, url))} accept={accept} section={section} />
            <button type="button" onClick={() => removeItem(item.id)} style={{ ...smallButtonStyle, alignSelf: 'flex-end', color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
              Remove {itemLabel}
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => onChange([...items, createEmpty()])}
          style={{ ...addButtonStyle, fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}
        >
          + Add {itemLabel}
        </button>
        <button
          type="button"
          onClick={() => bulkInputRef.current?.click()}
          disabled={bulkUploading}
          style={{ ...addButtonStyle, fontSize: '0.78rem', padding: '0.4rem 0.8rem', opacity: bulkUploading ? 0.6 : 1 }}
        >
          {bulkUploading ? 'Uploading…' : `+ Bulk upload ${itemLabel}s`}
        </button>
        <input
          ref={bulkInputRef}
          type="file"
          accept={accept}
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) void handleBulkFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {bulkError && <p style={{ color: '#e84d4d', fontSize: '0.78rem', marginTop: '0.3rem' }}>{bulkError}</p>}
    </div>
  );
}

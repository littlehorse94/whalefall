import type { CSSProperties, ReactNode } from 'react';

export const cardStyle: CSSProperties = {
  border: '1px solid rgba(77,217,232,0.15)',
  background: 'rgba(255,255,255,0.02)',
  borderRadius: '10px',
  padding: '1rem 1.1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

export const smallButtonStyle: CSSProperties = {
  padding: '0.35rem 0.7rem',
  borderRadius: '6px',
  border: '1px solid rgba(232,244,248,0.2)',
  background: 'transparent',
  color: '#e8f4f8',
  fontSize: '0.78rem',
  cursor: 'pointer',
};

export const addButtonStyle: CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: '1px solid rgba(77,217,232,0.4)',
  background: 'rgba(77,217,232,0.12)',
  color: '#4dd9e8',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
};

export const saveButtonStyle: CSSProperties = {
  padding: '0.5rem 1.1rem',
  borderRadius: '8px',
  border: '1px solid rgba(77,217,232,0.4)',
  background: 'rgba(77,217,232,0.18)',
  color: '#4dd9e8',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
};

export const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
  zIndex: 100,
};

export const modalStyle: CSSProperties = {
  width: '100%',
  maxWidth: '520px',
  maxHeight: '85vh',
  overflowY: 'auto',
  background: '#0f1524',
  border: '1px solid rgba(77,217,232,0.25)',
  borderRadius: '12px',
  padding: '1.5rem',
};

const inputBase: CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.7rem',
  borderRadius: '7px',
  border: '1px solid rgba(77,217,232,0.2)',
  background: 'rgba(5,8,16,0.6)',
  color: '#e8f4f8',
  fontSize: '0.85rem',
  outline: 'none',
};

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.3rem', color: 'rgba(232,244,248,0.6)' }}>
      {children}
    </label>
  );
}

export function TextField({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={inputBase}
      />
    </div>
  );
}

export function TextAreaField({
  label, value, onChange, rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputBase, resize: 'vertical' }}
      />
    </div>
  );
}

export function SelectField({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={inputBase}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function InlineListEditor<T extends { id: string }>({
  label, items, onChange, createEmpty, renderRow,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  createEmpty: () => T;
  renderRow: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  function updateItem(id: string, patch: Partial<T>) {
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }
  function removeItem(id: string) {
    onChange(items.filter((i) => i.id !== id));
  }
  function addItem() {
    onChange([...items, createEmpty()]);
  }

  return (
    <div>
      <FieldLabel>{label} ({items.length})</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: '1px solid rgba(77,217,232,0.15)', borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {renderRow(item, (patch) => updateItem(item.id, patch))}
            <button type="button" onClick={() => removeItem(item.id)} style={{ ...smallButtonStyle, alignSelf: 'flex-end', color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} style={{ ...addButtonStyle, marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}>
        + Add
      </button>
    </div>
  );
}

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{title}</h1>
      {description && <p style={{ color: 'rgba(232,244,248,0.55)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{description}</p>}
    </div>
  );
}

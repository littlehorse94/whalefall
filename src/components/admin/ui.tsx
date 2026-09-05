'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';

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

const DATE_FORMATTERS = {
  full: (d: Date) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  'month-year': (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  year: (d: Date) => String(d.getFullYear()),
} as const;

/**
 * A free-text field with a calendar button that pops out the browser's
 * native date picker (via showPicker()) and writes the picked date into
 * the text field in the given format. Stays free text rather than
 * type="date" because several of these fields hold non-date values too
 * (e.g. gallery event dates like "Scenery · Ongoing").
 */
export function DateField({
  label, value, onChange, format = 'full', placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  format?: keyof typeof DATE_FORMATTERS;
  placeholder?: string;
}) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ position: 'relative', display: 'flex', gap: '0.4rem' }}>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputBase, flex: 1 }}
        />
        <button
          type="button"
          onClick={() => dateInputRef.current?.showPicker?.()}
          aria-label="Pick a date"
          title="Pick a date"
          style={{
            flexShrink: 0, width: '2.2rem', borderRadius: '7px',
            border: '1px solid rgba(77,217,232,0.3)', background: 'rgba(77,217,232,0.1)',
            color: '#4dd9e8', cursor: 'pointer', fontSize: '0.9rem',
          }}
        >
          📅
        </button>
        <input
          ref={dateInputRef}
          type="date"
          onChange={(e) => {
            if (!e.target.value) return;
            const d = new Date(`${e.target.value}T00:00:00`);
            onChange(DATE_FORMATTERS[format](d));
          }}
          style={{ position: 'absolute', right: 0, top: '100%', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}

/**
 * A plain native date input bound directly to a yyyy-mm-dd string — for
 * schedule bounds (start/end) that need to be compared as real dates,
 * unlike DateField's free-text display values.
 */
export function NativeDateField({
  label, value, onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} style={inputBase} />
    </div>
  );
}

export function ToggleField({
  label, description, checked, onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          flexShrink: 0, width: '2.2rem', height: '1.25rem', borderRadius: '999px', marginTop: '0.15rem',
          position: 'relative', transition: 'background 0.2s',
          background: checked ? 'rgba(77,217,232,0.5)' : 'rgba(232,244,248,0.12)',
          border: `1px solid ${checked ? 'rgba(77,217,232,0.7)' : 'rgba(232,244,248,0.25)'}`,
        }}
      >
        <span
          style={{
            position: 'absolute', top: '1px', left: checked ? '1.05rem' : '1px',
            width: '1rem', height: '1rem', borderRadius: '50%', background: '#e8f4f8',
            transition: 'left 0.2s',
          }}
        />
      </span>
      <span>
        <span style={{ display: 'block', fontSize: '0.85rem', color: '#e8f4f8' }}>{label}</span>
        {description && (
          <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(232,244,248,0.5)', marginTop: '0.1rem' }}>
            {description}
          </span>
        )}
      </span>
    </label>
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

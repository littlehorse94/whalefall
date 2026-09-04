import Link from 'next/link';
import { ADMIN_SECTIONS } from '@/lib/admin-sections';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Content Sections</h1>
      <p style={{ color: 'rgba(232,244,248,0.6)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Pick a section to edit its content. Changes go live immediately.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {ADMIN_SECTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/admin/${s.slug}`}
            style={{
              display: 'block',
              padding: '1.25rem',
              borderRadius: '10px',
              border: '1px solid rgba(77,217,232,0.15)',
              background: 'rgba(255,255,255,0.02)',
              textDecoration: 'none',
              color: '#e8f4f8',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>{s.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(232,244,248,0.55)' }}>{s.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

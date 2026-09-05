import Link from 'next/link';
import { ADMIN_SECTION_GROUPS } from '@/lib/admin-sections';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Content Sections</h1>
      <p style={{ color: 'rgba(232,244,248,0.6)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Grouped by which page they appear on. Pick a section to edit its content — changes go live immediately.
      </p>

      {ADMIN_SECTION_GROUPS.map((group) => (
        <section key={group.group} style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem',
              paddingBottom: '0.6rem', borderBottom: '1px solid rgba(77,217,232,0.18)',
            }}
          >
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#4dd9e8', whiteSpace: 'nowrap' }}>
              {group.group}
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.4)', fontFamily: 'monospace' }}>
              {group.description}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {group.sections.map((s) => (
              <Link
                key={s.slug}
                href={`/admin/${s.slug}`}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(77,217,232,0.15)',
                  background: 'rgba(255,255,255,0.02)',
                  textDecoration: 'none',
                  color: '#e8f4f8',
                }}
              >
                <div
                  style={{
                    flexShrink: 0, width: '44px', height: '44px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', background: 'rgba(77,217,232,0.08)',
                    border: '1px solid rgba(77,217,232,0.2)',
                  }}
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(232,244,248,0.55)', lineHeight: 1.4 }}>{s.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

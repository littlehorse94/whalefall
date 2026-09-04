import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logout } from '../login/actions';
import { ADMIN_SECTIONS } from '@/lib/admin-sections';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0e1a', color: '#e8f4f8', fontFamily: 'Inter, sans-serif' }}>
      <aside
        style={{
          width: '240px',
          flexShrink: 0,
          borderRight: '1px solid rgba(77,217,232,0.15)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link href="/admin" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e8f4f8', textDecoration: 'none', marginBottom: '1.5rem', display: 'block' }}>
          鲸落 Admin
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', flex: 1 }}>
          {ADMIN_SECTIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/admin/${s.slug}`}
              style={{
                padding: '0.5rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: 'rgba(232,244,248,0.75)',
                textDecoration: 'none',
              }}
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <button
            type="submit"
            style={{
              width: '100%',
              marginTop: '1rem',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(232,244,248,0.15)',
              background: 'transparent',
              color: 'rgba(232,244,248,0.6)',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Log out ({session.username})
          </button>
        </form>
        <Link href="/" style={{ fontSize: '0.75rem', color: 'rgba(77,217,232,0.6)', marginTop: '0.75rem', textDecoration: 'none' }}>
          ← View site
        </Link>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowX: 'auto' }}>{children}</main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AdminSectionGroup } from '@/lib/admin-sections';

interface AdminSidebarProps {
  groups: AdminSectionGroup[];
  username: string;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}

function NavGroups({ groups }: { groups: AdminSectionGroup[] }) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      {groups.map((group) => (
        <div key={group.group}>
          <div
            style={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(77,217,232,0.55)', padding: '0 0.6rem', marginBottom: '0.35rem',
            }}
          >
            {group.group}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            {group.sections.map((s) => (
              <Link
                key={s.slug}
                href={`/admin/${s.slug}`}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  color: 'rgba(232,244,248,0.75)',
                  textDecoration: 'none',
                }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function LogoutAndViewSite({ username, logoutAction }: { username: string; logoutAction: () => Promise<void> }) {
  return (
    <>
      <form action={logoutAction}>
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
          Log out ({username})
        </button>
      </form>
      <Link href="/" style={{ fontSize: '0.75rem', color: 'rgba(77,217,232,0.6)', marginTop: '0.75rem', textDecoration: 'none', display: 'block' }}>
        ← View site
      </Link>
    </>
  );
}

export default function AdminSidebar({ groups, username, logoutAction, children }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: '#e8f4f8', fontFamily: 'Inter, sans-serif' }}>
      {/* Mobile top bar + dropdown */}
      <div className="md:hidden" style={{ borderBottom: '1px solid rgba(77,217,232,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
          <Link href="/admin" style={{ fontWeight: 700, fontSize: '1.05rem', color: '#e8f4f8', textDecoration: 'none' }}>
            鲸落 Admin
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              width: '2.3rem', height: '2.3rem', borderRadius: '7px', flexShrink: 0,
              border: '1px solid rgba(77,217,232,0.3)', background: 'rgba(77,217,232,0.1)',
              color: '#4dd9e8', fontSize: '1.1rem', cursor: 'pointer',
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{ padding: '0 1rem 1rem', maxHeight: '70vh', overflowY: 'auto' }}
          >
            <NavGroups groups={groups} />
            <LogoutAndViewSite username={username} logoutAction={logoutAction} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex' }}>
        {/* Desktop sidebar */}
        <aside
          className="hidden md:flex"
          style={{
            width: '240px',
            flexShrink: 0,
            borderRight: '1px solid rgba(77,217,232,0.15)',
            padding: '1.5rem 1rem',
            flexDirection: 'column',
          }}
        >
          <Link href="/admin" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e8f4f8', textDecoration: 'none', marginBottom: '1.5rem', display: 'block' }}>
            鲸落 Admin
          </Link>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <NavGroups groups={groups} />
          </div>
          <LogoutAndViewSite username={username} logoutAction={logoutAction} />
        </aside>

        <main style={{ flex: 1, minWidth: 0, padding: '2rem', overflowX: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}

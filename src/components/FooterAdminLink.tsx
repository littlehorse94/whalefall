'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FooterAdminLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/admin"
      style={{
        display: 'inline-block', fontSize: '0.65rem',
        color: hovered ? 'rgba(77,217,232,0.5)' : 'rgba(232,244,248,0.18)',
        marginTop: '0.5rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.15em',
        textDecoration: 'none', transition: 'color 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      admin
    </Link>
  );
}

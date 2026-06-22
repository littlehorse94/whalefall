'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Legends', href: '/legends' },
  { label: 'Montages', href: '/montages' },
];

function DiscordIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
    </svg>
  );
}

// SVG filter for the liquid-glass refraction effect on the floating pill.
function GlassFilter() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="17" result="turbulence" />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
        <feSpecularLighting in="softMap" surfaceScale="4" specularConstant="0.8" specularExponent="80" lightingColor="white" result="specLight">
          <fePointLight x="-150" y="-150" z="250" />
        </feSpecularLighting>
        <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export default function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <GlassFilter />
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', justifyContent: 'center',
          padding: scrolled ? '0.75rem 1rem 0' : '0',
          pointerEvents: 'none',
          transition: 'padding 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.2)',
        }}
      >
        <nav
          style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            pointerEvents: 'auto',
            width: scrolled ? 'min(680px, 100%)' : '100%',
            borderRadius: scrolled ? '999px' : '0px',
            padding: scrolled ? '0.6rem 1.5rem' : '1.25rem 2.5rem',
            boxShadow: scrolled ? '0 6px 24px rgba(0,0,0,0.35), 0 0 20px rgba(77,217,232,0.08)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.2)',
            overflow: 'hidden',
            isolation: 'isolate',
          }}
        >
          {/* ── Liquid glass layers (only meaningfully visible once floating) ──
              The distortion filter must NOT share an element with border-radius:
              SVG filters rasterize the layer as a plain rectangle, so applying
              both to the same element makes the rounded-corner anti-aliasing
              itself get displaced, producing a jagged/pixelated edge. Instead,
              this layer stays a flat unrounded rectangle and lets the parent
              <nav>'s overflow:hidden + border-radius clip it cleanly. */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
              WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
              filter: scrolled ? 'url(#glass-distortion)' : 'none',
              background: scrolled ? 'rgba(10,14,26,0.35)' : 'transparent',
              transition: 'all 0.5s ease',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 1, borderRadius: 'inherit',
              background: 'rgba(255,255,255,0.04)',
              opacity: scrolled ? 1 : 0, transition: 'opacity 0.5s ease',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 2, borderRadius: 'inherit',
              boxShadow: scrolled
                ? 'inset 1px 1px 1px 0 rgba(255,255,255,0.25), inset -1px -1px 1px 1px rgba(77,217,232,0.1)'
                : 'none',
              border: scrolled ? '1px solid rgba(77,217,232,0.15)' : 'none',
              transition: 'all 0.5s ease',
            }}
          />

          {/* ── Three-zone content: logo | menu | discord ── */}
          <div className="relative z-10 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center w-full gap-4">
            <div className="flex justify-start">
              <Link href="/" style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff', fontFamily: "'Long Cang', cursive", textDecoration: 'none', lineHeight: 1 }}>
                鲸落
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-6">
              {NAV_LINKS.map(link => (
                <Link key={link.label} href={link.href} className="nav-link">{link.label}</Link>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <a
                href="https://discord.gg/whalefall"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex"
                style={{ color: '#d1d5db', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#d1d5db')}
              >
                <DiscordIcon />
              </a>

              <button
                onClick={() => setMenuOpen(v => !v)}
                className="md:hidden text-[#4dd9e8] p-1"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
                <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
                <div className="w-5 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
              </button>
            </div>
          </div>

          {/* ── Mobile dropdown ── */}
          {menuOpen && (
            <div
              className="md:hidden absolute left-0 right-0 top-full mt-2 flex flex-col gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(5,8,16,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(77,217,232,0.15)' }}
            >
              {NAV_LINKS.map(link => (
                <Link key={link.label} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <a
                href="https://discord.gg/whalefall"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Discord
              </a>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

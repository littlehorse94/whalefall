'use client';

import { useEffect, useRef } from 'react';
import VideoBackground from '@/components/VideoBackground';
import AudioToggle from '@/components/AudioToggle';

// ── Sub-section components (below the fold) ───────────────────────────────
import StatsSection from '@/components/StatsSection';
import ChronicleSection from '@/components/ChronicleSection';
import GallerySection from '@/components/GallerySection';
import HallOfLegends from '@/components/HallOfLegends';
import MontageLibrary from '@/components/MontageLibrary';
import PhotoContest from '@/components/PhotoContest';
import Guestbook from '@/components/Guestbook';
import WhaleSanctuary from '@/components/WhaleSanctuary';

// Discord SVG
function DiscordIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
    </svg>
  );
}

// Chevron down SVG
function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const FIXED_CARDS = [
  {
    title: 'Guild Chronicle',
    body: 'A living timeline of our victories, milestones, and turning points since 2022.',
  },
  {
    title: 'Memory Gallery',
    body: 'Screenshots and moments from PvP, PvE, guild events, and beyond — preserved in the deep.',
  },
  {
    title: 'Hall of Legends',
    body: 'Honouring the members who carried the soul of Whalefall through every battle.',
  },
  {
    title: 'Montage Library',
    body: 'Relive the battles, the laughs, and the legends through our cinematic video archive.',
  },
  {
    title: 'Photo Contest',
    body: 'Vote for the best screenshot of the month. Every frame a story worth remembering.',
  },
  {
    title: 'Guestbook',
    body: 'Leave your mark. Share a memory, a thank-you, or words for the guild in the deep.',
  },
];

export default function Home() {
  const heroRef        = useRef<HTMLElement>(null);
  const fixedCardsRef  = useRef<HTMLDivElement>(null);
  const cardsGridRef   = useRef<HTMLDivElement>(null);
  const cardsTriggerRef = useRef<HTMLDivElement>(null);
  const s3InnerRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Hero fade out on scroll ──────────────────────────────────────────
    const onScroll = () => {
      const hero = heroRef.current;
      if (hero) {
        const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.35));
        hero.style.opacity = String(fade);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Fixed cards reveal ──────────────────────────────────────────────
    let cardRaf = 0;
    const tickCards = () => {
      const trigger = cardsTriggerRef.current;
      const fixedCards = fixedCardsRef.current;
      const grid = cardsGridRef.current;
      if (trigger && fixedCards && grid) {
        const triggerTop = trigger.getBoundingClientRect().top + window.scrollY;
        const triggerH   = trigger.offsetHeight;
        const vh         = window.innerHeight;
        const sy         = window.scrollY;

        const start = triggerTop - vh * 0.5;
        const end   = triggerTop + triggerH - vh * 0.3;

        const fadeIn  = Math.min(1, Math.max(0, (sy - (start - vh * 0.2)) / (vh * 0.2)));
        const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - sy) / (vh * 0.3)));
        const opacity = Math.min(fadeIn, fadeOut);

        fixedCards.style.opacity        = String(opacity);
        fixedCards.style.pointerEvents  = opacity > 0.1 ? 'auto' : 'none';

        const progress    = Math.max(0, Math.min(1, (sy - start) / (end - start)));
        const revealPct   = progress * 130;
        const isMobile    = window.innerWidth < 768;
        const mask = isMobile
          ? `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
          : `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;

        grid.style.maskImage         = mask;
        grid.style.webkitMaskImage   = mask;
      }
      cardRaf = requestAnimationFrame(tickCards);
    };
    cardRaf = requestAnimationFrame(tickCards);

    // ── Section 3 intersection ──────────────────────────────────────────
    const s3 = s3InnerRef.current;
    let observer: IntersectionObserver | null = null;
    if (s3) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          s3.style.opacity   = '1';
          s3.style.transform = 'translateY(0)';
          s3.style.filter    = 'blur(0)';
          observer?.unobserve(s3);
        }
      }, { threshold: 0.15 });
      observer.observe(s3);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(cardRaf);
      observer?.disconnect();
    };
  }, []);

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: 'transparent', color: '#fff', overflowX: 'hidden' }}>

      {/* Looping video background */}
      <VideoBackground />

      {/* ── Particles canvas (z-index above video) ──────────────────────────── */}
      <ParticlesCanvas />

      {/* ── Fixed cards (appear during trigger zone) ──────────────────────── */}
      <div
        ref={fixedCardsRef}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 5,
          padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 2.5rem)', opacity: 0, pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          ref={cardsGridRef}
          style={{
            maxWidth: '72rem', margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem 2rem',
          }}
        >
          {FIXED_CARDS.map((c) => (
            <div key={c.title}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', fontFamily: "'Cinzel Decorative', cursive" }}>
                {c.title}
              </h3>
              <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: 1.7 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff', fontFamily: "'Long Cang', cursive" }}>
            鲸落
          </span>
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1.5rem', display: 'flex' }}>
            {['Chronicle', 'Gallery', 'Legends', 'Montages'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} className="nav-link">{label}</a>
            ))}
          </div>
        </div>
        <a href="https://discord.gg/whalefall" target="_blank" rel="noopener noreferrer"
          style={{ color: '#d1d5db', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#d1d5db')}
        >
          <DiscordIcon />
        </a>
      </nav>

      {/* ── Main scrollable content ────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          id="hero"
          style={{ position: 'relative', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent, transparent)',
          }} />

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center',
            padding: '0 1.5rem 6rem',
          }}>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem', letterSpacing: '0.1em', fontFamily: "'Cinzel', serif", textTransform: 'uppercase' }}>
              Our Legacy
            </p>

            <h1 style={{
              fontSize: 'clamp(1.6rem, 5vw, 3.75rem)', fontWeight: 600, lineHeight: 1.2,
              maxWidth: '52rem', fontFamily: "'Cinzel', serif",
            }}>
              Where battles end,{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{
                  position: 'absolute', bottom: '0.2rem', left: 0, width: '100%', height: '10px',
                  background: '#1a3a5c', borderRadius: '2px',
                }} />
                <span style={{ position: 'relative' }}>memories</span>
              </span>
              {' '}remain forever.
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="https://discord.gg/whalefall" target="_blank" rel="noopener noreferrer"
                className="cta-button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <DiscordIcon /> Join Our Discord
              </a>
              <a href="#chronicle" className="cta-button cta-button-gold">
                Enter the Abyss →
              </a>
            </div>
          </div>

          {/* Bounce arrow */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', paddingBottom: '2rem' }}>
            <span style={{ color: '#6b7280', animation: 'bounce 1s infinite' }}>
              <ChevronDown />
            </span>
          </div>
        </section>

        {/* Spacer 1 */}
        <div style={{ height: '30vh' }} />

        {/* ── Cards trigger zone ─────────────────────────────────────────────── */}
        <div ref={cardsTriggerRef} style={{ height: '120vh' }} />

        {/* Spacer 2 */}
        <div style={{ height: '20vh' }} />

        {/* ── Section 3 — 鲸落 reveal ───────────────────────────────────────── */}
        <section style={{
          position: 'relative', minHeight: '60vh', display: 'flex',
          alignItems: 'flex-end', justifyContent: 'center',
          padding: '0 2.5rem 5rem',
        }}>
          <div
            ref={s3InnerRef}
            style={{
              position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
              opacity: 0, transform: 'translateY(32px)', filter: 'blur(8px)',
              transition: 'opacity 1s ease-out, transform 1s ease-out, filter 1s ease-out',
            }}
          >
            <p style={{ color: '#d1d5db', fontSize: '1rem', marginBottom: '0.75rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Est. 2022 · Top 60 SEA
            </p>
            <h2
              className="shimmer-text"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, fontFamily: "'Cinzel Decorative', cursive" }}
            >
              <span style={{ fontFamily: "'Long Cang', cursive" }}>鲸落</span>
              {' · '}
              <span>Whalefall</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', marginTop: '1rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}>
              "Some battles fade. Some memories become legends."
            </p>
          </div>
        </section>

        {/* ── Content sections ──────────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,16,0.95) 8%)' }}>
          <StatsSection />
          <Divider />
          <ChronicleSection />
          <Divider />
          <GallerySection />
          <Divider color="#c9a84c" />
          <HallOfLegends />
          <Divider />
          <MontageLibrary />
          <Divider color="#c9a84c" />
          <PhotoContest />
          <Divider />
          <Guestbook />
          <WhaleSanctuary />

          <footer style={{
            position: 'relative', zIndex: 10, padding: '3rem 1.5rem', textAlign: 'center',
            background: 'rgba(1,2,4,0.95)', borderTop: '1px solid rgba(77,217,232,0.1)',
          }}>
            <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
              <div className="shimmer-text" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', fontFamily: "'Cinzel Decorative', cursive" }}>
                <span style={{ fontFamily: "'Long Cang', cursive" }}>鲸落</span>
                {' | Whalefall'}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.35)', marginBottom: '1.5rem', letterSpacing: '0.2em', fontFamily: "'Cinzel', serif" }}>
                TOP 60 SEA GUILD · WHERE WINDS MEET · EST. 2022
              </p>
              <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(77,217,232,0.2), transparent)', marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.2)', fontFamily: "'Cinzel', serif" }}>
                © 2025 Whalefall Guild. All memories preserved in the deep.
              </p>
            </div>
          </footer>
        </div>
      </div>

      <AudioToggle />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 768px) {
          nav { padding: 1rem 1.5rem !important; }
          #fixed-cards-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────
function Divider({ color = '#4dd9e8' }: { color?: string }) {
  return (
    <div style={{ height: '1px', maxWidth: '56rem', margin: '0.5rem auto', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent, ${color}, transparent)`, opacity: 0.3 }} />
    </div>
  );
}

// ── Particles canvas ───────────────────────────────────────────────────────
function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number };
    let particles: Particle[] = [];
    let rafId = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.15,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,235,255,${p.opacity})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}
    />
  );
}

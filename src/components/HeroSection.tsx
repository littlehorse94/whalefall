'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';

// 1 viewport height of scroll = full part1 video. Lower = snappier.
const SCROLL_VH = 1;

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const preRef     = useRef<HTMLVideoElement>(null);
  const part1Ref   = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pre     = preRef.current;
    const part1   = part1Ref.current;
    if (!wrapper || !pre || !part1) return;

    const scrollDist = window.innerHeight * SCROLL_VH;
    wrapper.style.height = `${window.innerHeight + scrollDist}px`;

    pre.play().catch(() => {});

    // Track target time in a ref — updated on scroll, applied on rAF
    let targetTime = 0;
    let rafId = 0;

    const tick = () => {
      if (part1.duration && isFinite(part1.duration)) {
        const diff = targetTime - part1.currentTime;
        if (Math.abs(diff) > 0.016) {
          // fastSeek is much cheaper than setting currentTime directly
          if (typeof (part1 as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function') {
            (part1 as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(targetTime);
          } else {
            part1.currentTime = targetTime;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const handleScroll = () => {
      const scrollY  = window.scrollY;
      const progress = Math.max(0, Math.min(1, scrollY / scrollDist));

      // Crossfade — completes in first 8% of scroll
      const fade = Math.min(1, scrollY / (scrollDist * 0.08));
      pre.style.opacity   = String(1 - fade);
      part1.style.opacity = String(fade);

      if (part1.duration && isFinite(part1.duration)) {
        targetTime = progress * part1.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={wrapperRef}
      id="hero-section"
      style={{ height: `${(1 + SCROLL_VH) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ── Pre-video: loops ───────────────────────────────────────── */}
        <video
          ref={preRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 1,
            opacity: 1,
            transition: 'opacity 0.3s ease',
            transform: 'scale(1.02) translateZ(0)',
            willChange: 'opacity, transform',
            filter: 'contrast(1.06) saturate(1.1) brightness(1.03)',
          }}
          src="/src/whalefall-hero-pre.mp4"
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* ── Part 1: scroll-scrubbed ────────────────────────────────── */}
        <video
          ref={part1Ref}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 2,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            transform: 'scale(1.02) translateZ(0)',
            willChange: 'opacity, transform',
            filter: 'contrast(1.06) saturate(1.1) brightness(1.03)',
          }}
          src="/src/wf-hero-part1.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* ── Vignette ───────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background:
              'linear-gradient(180deg, rgba(5,8,16,0.2) 0%, rgba(5,8,16,0.0) 40%, rgba(5,8,16,0.55) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,8,16,0.5) 100%)',
          }}
        />

        {/* ── 鲸落 ghost glyph ───────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 4 }}
        >
          <span
            style={{
              fontFamily: 'Cinzel Decorative, cursive',
              fontSize: 'clamp(140px, 28vw, 380px)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'rgba(232,244,248,0.06)',
              WebkitTextStroke: '1.5px rgba(77,217,232,0.35)',
              textShadow:
                '0 0 80px rgba(77,217,232,0.18), 0 0 200px rgba(77,217,232,0.07)',
              letterSpacing: '-0.02em',
              userSelect: 'none',
              transform: 'translateY(-5%)',
            }}
          >
            鲸落
          </span>
        </div>

        {/* ── Particles ─────────────────────────────────────────────── */}
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <ParticleField count={50} />
        </div>

        {/* ── Hero content ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-6"
          style={{ zIndex: 6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-5 max-w-3xl"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#4dd9e8]" />
              <span
                className="text-xs tracking-[0.4em] text-[#4dd9e8] uppercase"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Where Winds Meet
              </span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#4dd9e8]" />
            </div>

            <h1 style={{ fontFamily: 'Cinzel Decorative, cursive' }} className="leading-tight">
              <span
                className="block shimmer-text glow-pearl"
                style={{ fontSize: 'clamp(48px, 9vw, 110px)', fontWeight: 900 }}
              >
                鲸落
              </span>
              <span
                className="block text-[#e8f4f8]"
                style={{ fontSize: 'clamp(22px, 4vw, 48px)', fontWeight: 700, marginTop: '-0.15em' }}
              >
                Whalefall Guild
              </span>
            </h1>

            <p
              className="text-[#4dd9e8] tracking-widest uppercase"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(11px, 1.4vw, 18px)',
                letterSpacing: '0.28em',
              }}
            >
              Top 60 SEA Guild in Where Winds Meet
            </p>

            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] opacity-70" />
              <div className="w-14 h-px bg-gradient-to-r from-[#4dd9e8] to-[#c9a84c]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4dd9e8] opacity-70" />
              <div className="w-14 h-px bg-gradient-to-r from-[#c9a84c] to-[#4dd9e8]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] opacity-70" />
            </div>

            <p
              className="italic text-[rgba(232,244,248,0.75)] max-w-md"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(14px, 1.6vw, 20px)',
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
              }}
            >
              &ldquo;Some battles fade. Some memories become legends.&rdquo;
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <button onClick={() => scrollTo('#chronicle')} className="cta-button">
                Enter the Abyss
              </button>
              <button onClick={() => scrollTo('#gallery')} className="cta-button cta-button-gold">
                Guild Gallery
              </button>
              <button
                onClick={() => scrollTo('#guestbook')}
                className="cta-button"
                style={{ borderColor: 'rgba(232,244,248,0.3)' }}
              >
                Join Our Journey
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll hint ────────────────────────────────────────────── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 7 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-xs text-[#4dd9e8] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Scroll to Descend
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[#4dd9e8] to-transparent animate-pulse" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

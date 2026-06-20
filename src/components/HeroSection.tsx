'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';

// How many pixels of scroll = the full 0→10 s scrub range
const SCRUB_PX = typeof window !== 'undefined' ? window.innerHeight * 2.5 : 2000;
const SCRUB_SECONDS = 10;

type Phase = 'idle' | 'scrub' | 'velocity' | 'done';

export default function HeroSection() {
  const preVideoRef  = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef   = useRef<HTMLDivElement>(null);

  // Track phase in both state (renders) and ref (event handlers)
  const [phase, setPhase]   = useState<Phase>('idle');
  const phaseRef            = useRef<Phase>('idle');
  const scrubStartYRef      = useRef(0);
  const triggeredRef        = useRef(false);

  const setPhaseSync = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => {
    const pre  = preVideoRef.current;
    const main = mainVideoRef.current;
    if (!pre || !main) return;

    // ── Pre-video: loop from the start ──────────────────────────────────────
    pre.play().catch(() => {});

    // ── Dynamically size the wrapper once main video duration is known ───────
    // Wrapper = viewport (sticky height) + scrub distance
    const sizWrapper = () => {
      if (!wrapperRef.current) return;
      const scrubPx = window.innerHeight * 2.5;
      wrapperRef.current.style.height = `${window.innerHeight + scrubPx}px`;
    };
    if (main.readyState >= 1) sizWrapper();
    else main.addEventListener('loadedmetadata', sizWrapper, { once: true });

    // ── SCROLL: handles idle→scrub and scrub direction ───────────────────────
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!triggeredRef.current && scrollY > 0) {
        // First scroll event — kick off the transition
        triggeredRef.current = true;
        scrubStartYRef.current = scrollY;
        setPhaseSync('scrub');
        pre.style.transition = 'opacity 0.9s ease';
        main.currentTime = 0;
        main.pause();
        return;
      }

      if (phaseRef.current !== 'scrub') return;

      const relY   = scrollY - scrubStartYRef.current;
      const scrubPx = window.innerHeight * 2.5;
      const clampedRel = Math.max(0, relY);

      if (clampedRel < scrubPx) {
        // Map scroll → currentTime (0–10 s), bidirectional
        const t = (clampedRel / scrubPx) * SCRUB_SECONDS;
        main.currentTime = t;
        main.pause();
      } else {
        // Crossed scrub boundary → hand off to velocity phase
        main.currentTime = SCRUB_SECONDS;
        main.playbackRate = 1;
        main.play().catch(() => {});
        setPhaseSync('velocity');
      }
    };

    // ── WHEEL: velocity phase — controls playbackRate, prevents page scroll ──
    let wheelDecayTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (phaseRef.current !== 'velocity') return;
      e.preventDefault();

      const main = mainVideoRef.current;
      if (!main) return;

      if (e.deltaY > 0) {
        // Scroll down → speed up
        const speed = Math.max(0.5, Math.min(5, Math.abs(e.deltaY) / 40));
        main.playbackRate = speed;
        if (main.paused) main.play().catch(() => {});
      } else if (e.deltaY < 0) {
        // Scroll up → reverse (manually step back)
        main.pause();
        const backStep = Math.min(0.5, Math.abs(e.deltaY) / 80);
        main.currentTime = Math.max(SCRUB_SECONDS, main.currentTime - backStep);
      }

      // Decay back to normal rate after wheel stops
      if (wheelDecayTimer) clearTimeout(wheelDecayTimer);
      wheelDecayTimer = setTimeout(() => {
        if (phaseRef.current === 'velocity' && main && !main.paused) {
          main.playbackRate = 1;
        }
      }, 300);
    };

    // ── VIDEO ENDED ──────────────────────────────────────────────────────────
    const handleEnded = () => {
      setPhaseSync('done');
      // Collapse wrapper so rest of page can scroll normally
      if (wrapperRef.current) {
        wrapperRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('scroll',  handleScroll, { passive: true });
    window.addEventListener('wheel',   handleWheel,  { passive: false });
    main.addEventListener('ended',     handleEnded);

    return () => {
      window.removeEventListener('scroll',  handleScroll);
      window.removeEventListener('wheel',   handleWheel);
      main.removeEventListener('ended',     handleEnded);
      if (wheelDecayTimer) clearTimeout(wheelDecayTimer);
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Pre-video opacity: 1 while idle, fades out once scrub starts
  const preOpacity  = phase === 'idle' ? 1 : 0;
  // Main video opacity: 0 while idle, fades in once scrub starts, out when done
  const mainOpacity = phase === 'idle' ? 0 : phase === 'done' ? 0 : 1;

  return (
    /* Tall wrapper — sticky child stays fixed until wrapper is scrolled past */
    <div ref={wrapperRef} className="relative" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ── Pre-video (loops) ─────────────────────────────────────── */}
        <video
          ref={preVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 1,
            opacity: preOpacity,
            transition: 'opacity 0.9s ease',
            transform: 'scale(1.02) translateZ(0)',
            willChange: 'transform, opacity',
            filter: 'contrast(1.08) saturate(1.1) brightness(1.04)',
          }}
          src="/src/whalefall-hero-pre.mp4"
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* ── Main video (scrub + velocity) ─────────────────────────── */}
        <video
          ref={mainVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 2,
            opacity: mainOpacity,
            transition: 'opacity 0.9s ease',
            transform: 'scale(1.02) translateZ(0)',
            willChange: 'transform, opacity',
            filter: 'contrast(1.08) saturate(1.1) brightness(1.04)',
          }}
          src="/src/whalefall-hero.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* ── Vignette / atmosphere overlays ────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background:
              'linear-gradient(180deg, rgba(5,8,16,0.22) 0%, rgba(5,8,16,0.04) 35%, rgba(5,8,16,0.55) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(5,8,16,0.52) 100%)',
          }}
        />

        {/* ── 鲸落 large background glyph (sits above video) ─────────── */}
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
              color: 'rgba(232,244,248,0.07)',
              WebkitTextStroke: '1.5px rgba(77,217,232,0.4)',
              textShadow:
                '0 0 80px rgba(77,217,232,0.2), 0 0 200px rgba(77,217,232,0.08)',
              letterSpacing: '-0.02em',
              userSelect: 'none',
              transform: 'translateY(-5%)',
            }}
          >
            鲸落
          </span>
        </div>

        {/* ── Particles ────────────────────────────────────────────────── */}
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <ParticleField count={50} />
        </div>

        {/* ── Hero content ─────────────────────────────────────────────── */}
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
            {/* Label */}
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

            {/* Title */}
            <h1 style={{ fontFamily: 'Cinzel Decorative, cursive' }} className="leading-tight">
              <span
                className="block shimmer-text glow-pearl"
                style={{ fontSize: 'clamp(48px, 9vw, 110px)', fontWeight: 900 }}
              >
                鲸落
              </span>
              <span
                className="block text-[#e8f4f8]"
                style={{
                  fontSize: 'clamp(22px, 4vw, 48px)',
                  fontWeight: 700,
                  marginTop: '-0.15em',
                }}
              >
                Whalefall Guild
              </span>
            </h1>

            {/* Subtitle */}
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

            {/* Dots */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] opacity-70" />
              <div className="w-14 h-px bg-gradient-to-r from-[#4dd9e8] to-[#c9a84c]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4dd9e8] opacity-70" />
              <div className="w-14 h-px bg-gradient-to-r from-[#c9a84c] to-[#4dd9e8]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] opacity-70" />
            </div>

            {/* Quote */}
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

            {/* CTAs */}
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

        {/* ── Scroll hint (idle only) ───────────────────────────────────── */}
        <motion.div
          animate={{ opacity: phase === 'idle' ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 7 }}
        >
          <span
            className="text-xs text-[#4dd9e8] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Scroll to Descend
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#4dd9e8] to-transparent animate-pulse" />
        </motion.div>

        {/* ── Velocity mode HUD hint ────────────────────────────────────── */}
        <motion.div
          animate={{ opacity: phase === 'velocity' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 right-8 flex flex-col items-end gap-1"
          style={{ zIndex: 7 }}
        >
          <span
            className="text-[10px] text-[#4dd9e8] tracking-[0.25em] uppercase"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Scroll speed controls playback
          </span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-1 h-3 rounded-full bg-[#4dd9e8] opacity-40 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

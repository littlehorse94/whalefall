'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let scrollTriggered = false;
    let stInstance: { kill: () => void } | null = null;

    // Phase 1 — loop the first 1 second of video until user scrolls
    const LOOP_END = 1.0; // loop 0 → 1s
    const SCRUB_END = 8.0; // pin releases at 8s

    const loopFrame = () => {
      if (scrollTriggered) return;
      if (video.currentTime >= LOOP_END || video.paused) {
        video.currentTime = 0;
      }
      rafId = requestAnimationFrame(loopFrame);
    };

    const startLoop = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
      rafId = requestAnimationFrame(loopFrame);
    };

    // Wait for metadata so duration is known
    const onMeta = () => startLoop();
    if (video.readyState >= 1) {
      startLoop();
    } else {
      video.addEventListener('loadedmetadata', onMeta, { once: true });
    }

    // Phase 2 — GSAP ScrollTrigger: pin hero, scrub 0 → SCRUB_END
    (async () => {
      const { gsap: g } = await import('gsap');
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
      g.registerPlugin(ST);

      stInstance = ST.create({
        trigger: '#hero-section',
        start: 'top top',
        // 700vh of scroll = the "7 seconds" of pinned experience
        end: '+=700%',
        pin: true,
        scrub: 0.2,
        onEnter: () => {
          // Hand off control to scroll
          scrollTriggered = true;
          cancelAnimationFrame(rafId);
          video.pause();
          video.currentTime = 0;
        },
        onUpdate: (self) => {
          if (!isFinite(video.duration)) return;
          // Map 0–1 scroll progress to 0–SCRUB_END seconds
          video.currentTime = Math.min(self.progress * SCRUB_END, SCRUB_END);
          if (self.progress >= 0.99) setScrollUnlocked(true);
        },
        onLeave: () => setScrollUnlocked(true),
      });
    })();

    return () => {
      cancelAnimationFrame(rafId);
      stInstance?.kill();
      video.pause();
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ─── Video ─── */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            // GPU acceleration + perceived sharpness boost
            transform: 'scale(1.02) translateZ(0)',
            willChange: 'transform',
            imageRendering: 'auto',
            filter: 'contrast(1.08) saturate(1.12) brightness(1.04)',
            backfaceVisibility: 'hidden',
          }}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* ─── Subtle vignette / atmosphere ─── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,16,0.25) 0%, rgba(5,8,16,0.05) 35%, rgba(5,8,16,0.55) 100%)',
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(5,8,16,0.55) 100%)',
            zIndex: 1,
          }}
        />

        {/* ─── 鲸落 BIG BACKGROUND GLYPH (sits above video, below other text) ─── */}
        {/* Positioned centre-frame so the whale jumps up through / behind it */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <span
            style={{
              fontFamily: 'Cinzel Decorative, cursive',
              fontSize: 'clamp(140px, 28vw, 380px)',
              fontWeight: 900,
              lineHeight: 1,
              // Semi-transparent so the video shows through slightly
              color: 'rgba(232,244,248,0.08)',
              // Glowing outline
              WebkitTextStroke: '1.5px rgba(77,217,232,0.45)',
              textShadow: '0 0 80px rgba(77,217,232,0.25), 0 0 200px rgba(77,217,232,0.1)',
              letterSpacing: '-0.02em',
              userSelect: 'none',
              // Nudge it slightly upward so the whale jump crosses it naturally
              transform: 'translateY(-5%)',
            }}
          >
            鲸落
          </span>
        </div>

        {/* ─── Particles ─── */}
        <div style={{ zIndex: 3, position: 'absolute', inset: 0 }}>
          <ParticleField count={50} />
        </div>

        {/* ─── Hero Content ─── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-6"
          style={{ zIndex: 4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-5 max-w-3xl"
          >
            {/* Where Winds Meet label */}
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
            <h1
              className="leading-tight"
              style={{ fontFamily: 'Cinzel Decorative, cursive' }}
            >
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

            {/* Subtitle */}
            <p
              className="text-[#4dd9e8] tracking-widest uppercase"
              style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(11px, 1.4vw, 18px)', letterSpacing: '0.28em' }}
            >
              Top 60 SEA Guild in Where Winds Meet
            </p>

            {/* Decorative dots */}
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

            {/* CTA Buttons */}
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

        {/* ─── Scroll indicator (hidden once unlocked) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollUnlocked ? 0 : 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 5 }}
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
    </section>
  );
}

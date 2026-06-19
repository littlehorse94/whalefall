'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    let gsap: typeof import('gsap').gsap | null = null;
    let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'] | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      const { gsap: g } = await import('gsap');
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
      g.registerPlugin(ST);
      gsap = g;
      ScrollTrigger = ST;

      const trigger = ST.create({
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          if (video.duration && isFinite(video.duration)) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      cleanup?.();
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
      className="relative h-[200vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* Overlay gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,8,16,0.3) 0%, rgba(5,8,16,0.1) 40%, rgba(5,8,16,0.7) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,8,16,0.6) 100%)',
          }}
        />

        {/* Whale silhouette */}
        <div
          className="whale-swim-anim absolute"
          style={{ top: '25%', left: 0, right: 0 }}
        >
          <svg
            viewBox="0 0 300 100"
            className="w-64 h-auto opacity-10"
            fill="rgba(77,217,232,0.5)"
          >
            <path d="M20,50 C40,30 80,40 120,35 C160,30 200,45 240,40 C260,37 275,45 280,50 C275,55 260,60 240,58 C200,53 160,68 120,65 C80,62 40,70 20,50 Z" />
            <path d="M20,50 C10,48 5,42 8,38 C12,34 18,40 20,50 Z" />
            <circle cx="270" cy="47" r="3" fill="rgba(77,217,232,0.8)" />
          </svg>
        </div>

        {/* Particles */}
        <ParticleField count={50} />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 max-w-4xl"
          >
            {/* Decorative line */}
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#4dd9e8]" />
              <span
                className="text-xs tracking-[0.4em] text-[#4dd9e8] uppercase"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Where Winds Meet
              </span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#4dd9e8]" />
            </div>

            {/* Main Title */}
            <h1
              className="text-6xl md:text-8xl font-black leading-tight glow-pearl"
              style={{ fontFamily: 'Cinzel Decorative, cursive' }}
            >
              <span className="shimmer-text">鲸落</span>
              <br />
              <span className="text-4xl md:text-5xl text-[#e8f4f8]">Whalefall Guild</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl text-[#4dd9e8] tracking-widest uppercase"
              style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.3em' }}
            >
              Top 60 SEA Guild in Where Winds Meet
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] opacity-60" />
              <div className="w-16 h-px bg-gradient-to-r from-[#4dd9e8] to-[#c9a84c]" />
              <div className="w-2 h-2 rounded-full bg-[#4dd9e8] opacity-60" />
              <div className="w-16 h-px bg-gradient-to-r from-[#c9a84c] to-[#4dd9e8]" />
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] opacity-60" />
            </div>

            {/* Quote */}
            <p
              className="text-xl md:text-2xl italic text-[rgba(232,244,248,0.75)] max-w-lg"
              style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              &ldquo;Some battles fade. Some memories become legends.&rdquo;
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button
                onClick={() => scrollTo('#chronicle')}
                className="cta-button"
              >
                Enter the Abyss
              </button>
              <button
                onClick={() => scrollTo('#gallery')}
                className="cta-button cta-button-gold"
              >
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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

'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import VideoLightbox from './VideoLightbox';

// Placeholder clips — official "Where Winds Meet" trailers, until the guild's
// own montage footage is ready to swap in (just replace youtubeId per entry).
const montages = [
  { id: 1, title: 'Official Gameplay Trailer', youtubeId: 'e8S4yoXNMPU', views: '12.4K', likes: '847', duration: '—' },
  { id: 2, title: 'Official Launch Trailer', youtubeId: 'cpY_JFJRA9Q', views: '9.2K', likes: '631', duration: '—' },
  { id: 3, title: 'Open World Gameplay Trailer', youtubeId: 'gyjHNix6x9E', views: '18.7K', likes: '1.2K', duration: '—' },
  { id: 4, title: 'Heng Blade Gameplay Trailer', youtubeId: 'd_IX82_gokE', views: '22.1K', likes: '1.8K', duration: '—' },
  { id: 5, title: 'Imperial Palace Gameplay Trailer', youtubeId: 'w9AtlAQ9UG8', views: '31.5K', likes: '2.4K', duration: '—' },
  { id: 6, title: 'Qinchuan Hexi Expansion Trailer', youtubeId: 'MBQhCtwo9r8', views: '45.8K', likes: '3.6K', duration: '—' },
  { id: 7, title: 'Hidden Mountain Expansion Trailer', youtubeId: 'GsUkkYMik94', views: '8.9K', likes: '512', duration: '—' },
];

const FRAME_SUFFIXES = ['1', '2', '3'];

function HoverThumb({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [hovering, setHovering] = useState(false);
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    setHovering(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i = (i + 1) % FRAME_SUFFIXES.length;
      setFrame(i);
    }, 450);
  };

  const stopCycle = () => {
    setHovering(false);
    setFrame(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const src = hovering
    ? `https://img.youtube.com/vi/${youtubeId}/${FRAME_SUFFIXES[frame]}.jpg`
    : `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  );
}

export default function MontageLibrary() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section id="montages" className="relative z-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-6"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#4dd9e8] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Cinematic Archive
        </p>
        <h2 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          Montage Library
        </h2>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Relive the battles, the laughs, and the legends through our video archive.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
        <p
          className="mt-4 text-xs text-[rgba(232,244,248,0.35)]"
          style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.2em' }}
        >
          ← Scroll horizontally to explore →
        </p>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex gap-5 overflow-x-auto pb-6 px-6 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(77,217,232,0.5) rgba(5,8,16,0.5)',
          scrollBehavior: 'smooth',
        }}
      >
        {montages.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
            onClick={() => setActiveId(m.youtubeId)}
          >
            {/* Thumbnail */}
            <div
              className="relative w-full rounded-xl overflow-hidden mb-3 bg-black"
              style={{ aspectRatio: '16/9' }}
            >
              <HoverThumb youtubeId={m.youtubeId} title={m.title} />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(5,8,16,0.4)',
                    border: '2px solid rgba(77,217,232,0.7)',
                    boxShadow: '0 0 30px rgba(77,217,232,0.4)',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-[#4dd9e8] ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'rgba(77,217,232,0.08)' }}
              />
            </div>

            {/* Card Info */}
            <div className="px-1">
              <h3
                className="text-sm font-semibold text-[#e8f4f8] mb-2 leading-snug group-hover:text-[#4dd9e8] transition-colors line-clamp-2"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {m.title}
              </h3>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs text-[rgba(232,244,248,0.5)]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Where Winds Meet
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[rgba(232,244,248,0.4)] flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {m.views}
                  </span>
                  <span className="text-xs text-[rgba(232,244,248,0.4)] flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {m.likes}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <VideoLightbox youtubeId={activeId} onClose={() => setActiveId(null)} />
    </section>
  );
}

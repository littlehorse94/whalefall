'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const montages = [
  {
    id: 1,
    title: 'Season 1 Highlights — Birth of the Whale',
    editor: 'CrimsonVeil',
    views: '12.4K',
    likes: '847',
    duration: '8:32',
    gradient: 'from-[#0a1a3a] to-[#1a0a2e]',
  },
  {
    id: 2,
    title: 'The Great Siege of Iron Gate (Full Battle)',
    editor: 'MistyArrow',
    views: '9.2K',
    likes: '631',
    duration: '12:15',
    gradient: 'from-[#1a0a0a] to-[#0a1a2e]',
  },
  {
    id: 3,
    title: 'Anniversary Reel 2023 — A Year of Legends',
    editor: 'LunarPetal',
    views: '18.7K',
    likes: '1.2K',
    duration: '6:48',
    gradient: 'from-[#2a1a0a] to-[#0a0a1a]',
  },
  {
    id: 4,
    title: 'Top 60 Conquest — The Ascent Montage',
    editor: 'ThunderKoi',
    views: '22.1K',
    likes: '1.8K',
    duration: '10:04',
    gradient: 'from-[#0a2a1a] to-[#1a1a0a]',
  },
  {
    id: 5,
    title: 'Funny Moments Compilation Vol. 3',
    editor: 'IronSerpent',
    views: '31.5K',
    likes: '2.4K',
    duration: '15:22',
    gradient: 'from-[#1a1a2a] to-[#0a1a0a]',
  },
  {
    id: 6,
    title: 'Whalefall — 3rd Anniversary Cinematic',
    editor: 'AzureTide',
    views: '45.8K',
    likes: '3.6K',
    duration: '4:55',
    gradient: 'from-[#0a1a3a] to-[#1a0a1a]',
  },
  {
    id: 7,
    title: 'PvP Montage — The Bloodtide Chronicles',
    editor: 'CrimsonVeil',
    views: '8.9K',
    likes: '512',
    duration: '7:11',
    gradient: 'from-[#2a0a0a] to-[#0a0a2a]',
  },
];

export default function MontageLibrary() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          >
            {/* Thumbnail */}
            <div
              className="relative w-full rounded-xl overflow-hidden mb-3"
              style={{ aspectRatio: '16/9' }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${m.gradient}`}
              />
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(77,217,232,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(77,217,232,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(77,217,232,0.15)',
                    border: '2px solid rgba(77,217,232,0.6)',
                    boxShadow: '0 0 30px rgba(77,217,232,0.3)',
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
              {/* Duration badge */}
              <div
                className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs"
                style={{
                  background: 'rgba(5,8,16,0.8)',
                  border: '1px solid rgba(77,217,232,0.3)',
                  color: '#e8f4f8',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                }}
              >
                {m.duration}
              </div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(77,217,232,0.05)' }}
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
                  by {m.editor}
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
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoLightbox from './VideoLightbox';
import TiltVideoCard from './TiltVideoCard';

// Placeholder clips — official "Where Winds Meet" trailers, until the guild's
// own montage footage is ready (just replace youtubeId per entry; add more
// entries any time, the grid below grows to fit).
const montages = [
  { id: 1, title: 'Official Gameplay Trailer', youtubeId: 'e8S4yoXNMPU', views: '12.4K', likes: '847' },
  { id: 2, title: 'Official Launch Trailer', youtubeId: 'cpY_JFJRA9Q', views: '9.2K', likes: '631' },
  { id: 3, title: 'Open World Gameplay Trailer', youtubeId: 'gyjHNix6x9E', views: '18.7K', likes: '1.2K' },
  { id: 4, title: 'Heng Blade Gameplay Trailer', youtubeId: 'd_IX82_gokE', views: '22.1K', likes: '1.8K' },
  { id: 5, title: 'Imperial Palace Gameplay Trailer', youtubeId: 'w9AtlAQ9UG8', views: '31.5K', likes: '2.4K' },
  { id: 6, title: 'Qinchuan Hexi Expansion Trailer', youtubeId: 'MBQhCtwo9r8', views: '45.8K', likes: '3.6K' },
  { id: 7, title: 'Hidden Mountain Expansion Trailer', youtubeId: 'GsUkkYMik94', views: '8.9K', likes: '512' },
];

export default function MontageLibrary() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="montages" className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
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
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
        {montages.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <TiltVideoCard
              title={m.title}
              subtitle="Where Winds Meet"
              youtubeId={m.youtubeId}
              views={m.views}
              likes={m.likes}
              onPlay={() => setActiveId(m.youtubeId)}
            />
          </motion.div>
        ))}
      </div>

      <VideoLightbox youtubeId={activeId} onClose={() => setActiveId(null)} />
    </section>
  );
}

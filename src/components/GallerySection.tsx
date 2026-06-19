'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const categories = ['All', 'PvP', 'PvE', 'Scenery', 'Guild Gatherings', 'Funny Moments', 'Events'];

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=600&q=80', category: 'PvP', title: 'Battle for the Throne' },
  { id: 2, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80', category: 'PvE', title: 'Dragon Raid Night' },
  { id: 3, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', category: 'Scenery', title: 'Dawn at the Crystal Peaks' },
  { id: 4, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', category: 'Guild Gatherings', title: 'Anniversary Party 2023' },
  { id: 5, url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80', category: 'PvP', title: 'Siege of Iron Gate' },
  { id: 6, url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', category: 'Scenery', title: 'Midnight Waterfall' },
  { id: 7, url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80', category: 'Events', title: 'Summer Tournament 2024' },
  { id: 8, url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80', category: 'PvE', title: 'Ancient Temple Clear' },
  { id: 9, url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80', category: 'Funny Moments', title: 'When the Tank Fell Off a Cliff' },
  { id: 10, url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80', category: 'Guild Gatherings', title: 'New Year Celebration' },
  { id: 11, url: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&q=80', category: 'Scenery', title: 'Ocean of Stars' },
  { id: 12, url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', category: 'Events', title: 'Photo Contest Winners' },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#4dd9e8] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Captured Moments
        </p>
        <h2 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          Memory Gallery
        </h2>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Every screenshot tells a story. Every moment shared becomes eternal.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded text-sm transition-all duration-300"
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              border: `1px solid ${activeCategory === cat ? '#4dd9e8' : 'rgba(77,217,232,0.2)'}`,
              background: activeCategory === cat ? 'rgba(77,217,232,0.15)' : 'rgba(77,217,232,0.03)',
              color: activeCategory === cat ? '#4dd9e8' : 'rgba(232,244,248,0.6)',
              boxShadow: activeCategory === cat ? '0 0 15px rgba(77,217,232,0.3)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer rounded-lg overflow-hidden"
              style={{ aspectRatio: '4/3' }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              {/* Hover Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300"
                style={{
                  background: hoveredId === photo.id
                    ? 'linear-gradient(0deg, rgba(5,8,16,0.9) 0%, rgba(5,8,16,0.4) 60%, transparent 100%)'
                    : 'linear-gradient(0deg, rgba(5,8,16,0.5) 0%, transparent 60%)',
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredId === photo.id ? 1 : 0, y: hoveredId === photo.id ? 0 : 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="text-xs px-2 py-0.5 rounded mb-1 inline-block"
                    style={{
                      background: 'rgba(77,217,232,0.2)',
                      border: '1px solid rgba(77,217,232,0.4)',
                      color: '#4dd9e8',
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {photo.category}
                  </span>
                  <p
                    className="text-sm font-semibold text-[#e8f4f8]"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {photo.title}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View More */}
      <div className="text-center mt-12">
        <button className="cta-button">
          View Full Gallery
        </button>
      </div>
    </section>
  );
}

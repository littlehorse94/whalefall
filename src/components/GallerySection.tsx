'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageLightbox, { type LightboxPhoto } from './ImageLightbox';

interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  photos: LightboxPhoto[];
}

const events: GalleryEvent[] = [
  {
    id: 'iron-gate',
    title: 'Siege of Iron Gate',
    date: 'PvP · 2023',
    description: 'Our biggest battlefield campaign — three guilds, one gate, and a night nobody forgot.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=900&q=80', title: 'Battle for the Throne' },
      { url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80', title: 'Siege of Iron Gate' },
      { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80', title: 'Dragon Raid Night' },
    ],
  },
  {
    id: 'anniversary-2023',
    title: '3rd Anniversary Celebration',
    date: 'Guild Gathering · March 2023',
    description: 'Three years of Whalefall, celebrated with the whole guild in one server.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80', title: 'Anniversary Party 2023' },
      { url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&q=80', title: 'New Year Celebration' },
      { url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=900&q=80', title: 'When the Tank Fell Off a Cliff' },
    ],
  },
  {
    id: 'summer-tournament',
    title: 'Summer Tournament 2024',
    date: 'Events · Summer 2024',
    description: 'Our annual guild tournament — raids, races, and a screenshot contest.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80', title: 'Summer Tournament 2024' },
      { url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80', title: 'Photo Contest Winners' },
      { url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&q=80', title: 'Ancient Temple Clear' },
    ],
  },
  {
    id: 'scenic-exploration',
    title: 'Scenic Exploration',
    date: 'Scenery · Ongoing',
    description: 'The quiet moments between battles — the views worth pausing for.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80', title: 'Dawn at the Crystal Peaks' },
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80', title: 'Midnight Waterfall' },
      { url: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=900&q=80', title: 'Ocean of Stars' },
    ],
  },
];

export default function GallerySection() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeEvent = events.find(e => e.id === activeEventId) ?? null;

  const openPhoto = (eventId: string, index: number) => {
    setActiveEventId(eventId);
    setActiveIndex(index);
  };

  const closePhoto = () => setActiveIndex(null);

  return (
    <section id="gallery" className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
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
          Every screenshot tells a story. Every moment shared becomes eternal — organised by the event it came from.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {events.map((ev, eventIdx) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: eventIdx * 0.05 }}
          >
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
              <div>
                <h3
                  className="text-xl font-bold text-[#e8f4f8]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {ev.title}
                </h3>
                <p className="text-sm text-[rgba(232,244,248,0.5)] mt-1">{ev.description}</p>
              </div>
              <span
                className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                style={{
                  background: 'rgba(77,217,232,0.1)', border: '1px solid rgba(77,217,232,0.3)',
                  color: '#4dd9e8', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em',
                }}
              >
                {ev.date}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ev.photos.map((photo, i) => {
                const key = `${ev.id}-${i}`;
                return (
                  <div
                    key={key}
                    className="relative group cursor-pointer rounded-lg overflow-hidden"
                    style={{ aspectRatio: '4/3' }}
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => openPhoto(ev.id, i)}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-3 transition-all duration-300"
                      style={{
                        background: hoveredKey === key
                          ? 'linear-gradient(0deg, rgba(5,8,16,0.85) 0%, rgba(5,8,16,0.3) 60%, transparent 100%)'
                          : 'linear-gradient(0deg, rgba(5,8,16,0.45) 0%, transparent 60%)',
                      }}
                    >
                      <motion.p
                        initial={false}
                        animate={{ opacity: hoveredKey === key ? 1 : 0, y: hoveredKey === key ? 0 : 8 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-semibold text-[#e8f4f8]"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        {photo.title}
                      </motion.p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <ImageLightbox
        photos={activeEvent?.photos ?? []}
        index={activeIndex}
        onClose={closePhoto}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}

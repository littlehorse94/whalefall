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

// Each event can hold any number of photos — the grid below caps the
// initial view and lets visitors expand to see the rest, so this scales
// whether an event has 3 photos or 30.
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
      { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&q=80', title: 'War Room Strategy' },
      { url: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=900&q=80', title: 'Frontline Push' },
      { url: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=900&q=80', title: 'Post-Battle Debrief' },
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
      { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80', title: 'Group Toast' },
      { url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=900&q=80', title: 'Fireworks Finale' },
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
      { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80', title: 'Crowd Watching Finals' },
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
      { url: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=900&q=80', title: 'Forest Trail' },
      { url: 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=900&q=80', title: 'Mountain Pass' },
      { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=900&q=80', title: 'Sunset Ridge' },
    ],
  },
];

const VISIBLE_CAP = 5;

export default function GallerySection() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const activeEvent = events.find(e => e.id === activeEventId) ?? null;

  const openPhoto = (eventId: string, index: number) => {
    setActiveEventId(eventId);
    setActiveIndex(index);
  };

  const toggleExpand = (eventId: string) => {
    setExpandedEvents(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
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
        <h1 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          Memory Gallery
        </h1>
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

            {(() => {
              const expanded = expandedEvents.has(ev.id);
              const overflow = ev.photos.length - VISIBLE_CAP;
              const visible = expanded ? ev.photos : ev.photos.slice(0, VISIBLE_CAP);

              return (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {visible.map((photo, i) => {
                      const key = `${ev.id}-${i}`;
                      const isLastVisible = !expanded && overflow > 0 && i === visible.length - 1;
                      return (
                        <div
                          key={key}
                          className="relative group cursor-pointer rounded-lg overflow-hidden"
                          style={{ aspectRatio: '4/3' }}
                          onMouseEnter={() => setHoveredKey(key)}
                          onMouseLeave={() => setHoveredKey(null)}
                          onClick={() => isLastVisible ? toggleExpand(ev.id) : openPhoto(ev.id, i)}
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
                              background: isLastVisible
                                ? 'rgba(5,8,16,0.75)'
                                : hoveredKey === key
                                  ? 'linear-gradient(0deg, rgba(5,8,16,0.85) 0%, rgba(5,8,16,0.3) 60%, transparent 100%)'
                                  : 'linear-gradient(0deg, rgba(5,8,16,0.45) 0%, transparent 60%)',
                            }}
                          >
                            {isLastVisible ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                  className="text-lg font-bold text-[#4dd9e8]"
                                  style={{ fontFamily: 'Cinzel Decorative, cursive' }}
                                >
                                  +{overflow} more
                                </span>
                              </div>
                            ) : (
                              <motion.p
                                initial={false}
                                animate={{ opacity: hoveredKey === key ? 1 : 0, y: hoveredKey === key ? 0 : 8 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs font-semibold text-[#e8f4f8]"
                                style={{ fontFamily: 'Cinzel, serif' }}
                              >
                                {photo.title}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {ev.photos.length > VISIBLE_CAP && expanded && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => toggleExpand(ev.id)}
                        className="text-xs px-4 py-2 rounded"
                        style={{
                          fontFamily: 'Cinzel, serif', letterSpacing: '0.1em',
                          border: '1px solid rgba(77,217,232,0.3)', color: '#4dd9e8',
                          background: 'rgba(77,217,232,0.05)',
                        }}
                      >
                        Show Less
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
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

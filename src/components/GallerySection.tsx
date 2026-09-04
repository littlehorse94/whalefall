'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageLightbox from './ImageLightbox';
import type { GalleryEvent } from '@/lib/content-types';

const VISIBLE_CAP = 5;

interface GallerySectionProps {
  events: GalleryEvent[];
}

export default function GallerySection({ events }: GallerySectionProps) {
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

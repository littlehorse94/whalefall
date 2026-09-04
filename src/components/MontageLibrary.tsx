'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoLightbox, { type ActiveVideo } from './VideoLightbox';
import TiltVideoCard from './TiltVideoCard';
import type { MontageCategory } from '@/lib/content-types';

const VISIBLE_CAP = 6;

interface MontageLibraryProps {
  categories: MontageCategory[];
}

export default function MontageLibrary({ categories }: MontageLibraryProps) {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (categoryId: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

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
        <h1 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          Montage Library
        </h1>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Relive the battles, the laughs, and the legends through our video archive.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {categories.map((cat, catIdx) => {
          const isExpanded = expanded.has(cat.id);
          const overflow = cat.videos.length - VISIBLE_CAP;
          const visible = isExpanded ? cat.videos : cat.videos.slice(0, VISIBLE_CAP);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.05 }}
            >
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
                <div>
                  <h3
                    className="text-xl font-bold text-[#e8f4f8]"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-sm text-[rgba(232,244,248,0.5)] mt-1">{cat.description}</p>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: 'rgba(77,217,232,0.1)', border: '1px solid rgba(77,217,232,0.3)',
                    color: '#4dd9e8', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em',
                  }}
                >
                  {cat.videos.length} video{cat.videos.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
                {visible.map((m, i) => {
                  const isLastVisible = !isExpanded && overflow > 0 && i === visible.length - 1;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                    >
                      {isLastVisible ? (
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="flex items-center justify-center h-72 w-full rounded-2xl"
                          style={{
                            background: 'rgba(5,8,16,0.5)', border: '1px solid rgba(77,217,232,0.2)',
                          }}
                        >
                          <span
                            className="text-xl font-bold text-[#4dd9e8]"
                            style={{ fontFamily: 'Cinzel Decorative, cursive' }}
                          >
                            +{overflow} more
                          </span>
                        </button>
                      ) : (
                        <TiltVideoCard
                          title={m.title}
                          subtitle="Where Winds Meet"
                          youtubeId={m.youtubeId || undefined}
                          videoUrl={m.videoUrl}
                          views={m.views}
                          likes={m.likes}
                          onPlay={() => setActiveVideo({ youtubeId: m.youtubeId || undefined, videoUrl: m.videoUrl, title: m.title })}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {cat.videos.length > VISIBLE_CAP && isExpanded && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => toggleExpand(cat.id)}
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
            </motion.div>
          );
        })}
      </div>

      <VideoLightbox active={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}

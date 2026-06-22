'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface LightboxPhoto {
  url: string;
  title: string;
}

interface ImageLightboxProps {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ photos, index, onClose, onNavigate }: ImageLightboxProps) {
  const open = index !== null;
  const photo = open ? photos[index!] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index! + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((index! - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, photos.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(1,2,4,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(1rem, 4vw, 3rem)',
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close image"
            style={{
              position: 'fixed', top: 'clamp(1rem, 3vw, 2rem)', right: 'clamp(1rem, 3vw, 2rem)',
              zIndex: 101, width: '2.75rem', height: '2.75rem', borderRadius: '50%',
              background: 'rgba(5,8,16,0.8)', border: '1px solid rgba(77,217,232,0.4)',
              color: '#e8f4f8', fontSize: '1.5rem', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4dd9e8'; e.currentTarget.style.color = '#4dd9e8'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(77,217,232,0.4)'; e.currentTarget.style.color = '#e8f4f8'; }}
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate((index! - 1 + photos.length) % photos.length); }}
                aria-label="Previous image"
                style={navArrowStyle('left')}
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate((index! + 1) % photos.length); }}
                aria-label="Next image"
                style={navArrowStyle('right')}
              >
                ›
              </button>
            </>
          )}

          <motion.div
            key={photo.url}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', maxWidth: '90vw', maxHeight: '85vh',
              borderRadius: '12px', overflow: 'hidden',
              border: '1px solid rgba(77,217,232,0.25)', boxShadow: '0 0 60px rgba(77,217,232,0.2)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.title}
              style={{ display: 'block', maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background: 'linear-gradient(0deg, rgba(5,8,16,0.85), transparent)' }}
            >
              <p className="text-sm font-semibold text-[#e8f4f8]" style={{ fontFamily: 'Cinzel, serif' }}>
                {photo.title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function navArrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'fixed', top: '50%', [side]: 'clamp(0.5rem, 2vw, 1.5rem)',
    transform: 'translateY(-50%)', zIndex: 101,
    width: '3rem', height: '3rem', borderRadius: '50%',
    background: 'rgba(5,8,16,0.6)', border: '1px solid rgba(77,217,232,0.3)',
    color: '#e8f4f8', fontSize: '1.75rem', lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  };
}

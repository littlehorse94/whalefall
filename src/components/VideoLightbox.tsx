'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface VideoLightboxProps {
  youtubeId: string | null;
  title?: string;
  onClose: () => void;
}

export default function VideoLightbox({ youtubeId, title, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!youtubeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [youtubeId, onClose]);

  return (
    <AnimatePresence>
      {youtubeId && (
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
            aria-label="Close video"
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

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '1280px', aspectRatio: '16/9',
              position: 'relative', borderRadius: '12px', overflow: 'hidden',
              border: '1px solid rgba(77,217,232,0.25)', boxShadow: '0 0 60px rgba(77,217,232,0.2)',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useRef, ReactNode } from 'react';

// How many pixels of scroll = 1 second of video
const PX_PER_SECOND = 100;

interface Props {
  src: string;
  id?: string;
  children?: ReactNode;
}

/**
 * Full-screen sticky video background whose playhead syncs 1:1 with scroll.
 * Scroll down → video plays forward. Scroll up → video rewinds.
 * Wrapper height is set dynamically once the video duration is known.
 */
export default function ScrollVideoSection({ src, id, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video   = videoRef.current;
    if (!wrapper || !video) return;

    let wrapperTop = 0;

    const applyHeight = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      const scrollDist = video.duration * PX_PER_SECOND;
      wrapper.style.height = `${window.innerHeight + scrollDist}px`;
      // Recache absolute top after layout update
      requestAnimationFrame(() => {
        wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      });
    };

    if (video.readyState >= 1) applyHeight();
    else video.addEventListener('loadedmetadata', applyHeight, { once: true });

    const handleScroll = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      const relY      = window.scrollY - wrapperTop;
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, relY / scrollable));
      video.currentTime = progress * video.duration;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} id={id} className="relative" style={{ height: '200vh' }}>
      {/* Sticky fullscreen video */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scale(1.02) translateZ(0)',
            willChange: 'transform',
            filter: 'contrast(1.06) saturate(1.1) brightness(1.03)',
          }}
          src={src}
          muted
          playsInline
          preload="auto"
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,16,0.18) 0%, rgba(5,8,16,0.0) 30%, rgba(5,8,16,0.5) 100%)',
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,8,16,0.45) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Any content passed as children renders in normal flow below sticky */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

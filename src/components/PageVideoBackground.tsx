'use client';

import { useEffect, useRef } from 'react';

const VIDEO_URL = 'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/wf-page-video.mp4';

// Same fixed video + scroll-fade treatment as the homepage hero, but for the
// shorter looping clip used as ambient background on the sub-pages.
export default function PageVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 1.2));
      el.style.opacity = String(fade);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: '#010101', transition: 'opacity 0.1s linear',
      }}
    >
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

const VIDEOS = [
  'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/wf-hero-pre.mp4',
  'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/wf-hero.mp4',
];

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playNext = () => {
      indexRef.current = (indexRef.current + 1) % VIDEOS.length;
      video.src = VIDEOS[indexRef.current];
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener('ended', playNext);
    video.play().catch(() => {});
    return () => video.removeEventListener('ended', playNext);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,          // positive so it isn't buried under body background
        background: '#010101',
      }}
    >
      <video
        ref={videoRef}
        src={VIDEOS[0]}
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Subtle darkening overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
    </div>
  );
}

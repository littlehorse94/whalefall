'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videos: string[];
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videos.length === 0) return;

    const playNext = () => {
      indexRef.current = (indexRef.current + 1) % videos.length;
      video.src = videos[indexRef.current];
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener('ended', playNext);
    video.play().catch(() => {});
    return () => video.removeEventListener('ended', playNext);
  }, [videos]);

  if (videos.length === 0) return null;

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
        src={videos[0]}
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

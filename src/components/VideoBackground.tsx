'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videos: string[];
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB || videos.length === 0) return;

    let playlistIndex = 0;
    let active = videoA;
    let standby = videoB;

    // Loads the upcoming clip into the currently-hidden <video> ahead of
    // time, so swapping to it later is instant instead of triggering a
    // fresh fetch (which is what caused the visible blank/black gap).
    const preloadStandby = () => {
      const nextIndex = (playlistIndex + 1) % videos.length;
      standby.src = videos[nextIndex];
      standby.load();
    };

    const swap = () => {
      playlistIndex = (playlistIndex + 1) % videos.length;
      standby.currentTime = 0;
      standby.play().catch(() => {});
      standby.style.opacity = '1';
      active.style.opacity = '0';

      active.removeEventListener('ended', swap);
      [active, standby] = [standby, active];
      active.addEventListener('ended', swap);

      preloadStandby();
    };

    active.src = videos[0];
    active.style.opacity = '1';
    standby.style.opacity = '0';
    active.load();
    active.play().catch(() => {});
    preloadStandby();
    active.addEventListener('ended', swap);

    return () => {
      videoA.removeEventListener('ended', swap);
      videoB.removeEventListener('ended', swap);
    };
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
        ref={videoARef}
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease' }}
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease' }}
      />
      {/* Subtle darkening overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
    </div>
  );
}

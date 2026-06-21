'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/src/whalefall-drift.mp3');
    audio.loop   = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Try to autoplay; browsers may block it until first interaction
    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    // Attempt immediately — succeeds on most browsers after page interaction
    tryPlay();

    // Fallback: play on first user interaction if blocked
    const onInteract = () => {
      if (!playing) tryPlay();
      window.removeEventListener('click', onInteract);
      window.removeEventListener('scroll', onInteract);
    };
    window.addEventListener('click',  onInteract, { once: true });
    window.addEventListener('scroll', onInteract, { once: true, passive: true });

    return () => {
      audio.pause();
      audio.src = '';
      window.removeEventListener('click',  onInteract);
      window.removeEventListener('scroll', onInteract);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full"
      style={{
        background: playing ? 'rgba(77,217,232,0.15)' : 'rgba(5,8,16,0.8)',
        border: `1px solid ${playing ? 'rgba(77,217,232,0.6)' : 'rgba(77,217,232,0.2)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: playing
          ? '0 0 25px rgba(77,217,232,0.3), 0 4px 20px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        {playing ? (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-[#4dd9e8]"
                style={{
                  height: `${6 + i * 3}px`,
                  animation: `pulse-bars ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#4dd9e8]">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        )}
      </div>
      <span style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em', color: playing ? '#4dd9e8' : 'rgba(232,244,248,0.7)', fontSize: '0.7rem' }}>
        {playing ? 'Ocean Song ♪' : 'Song of the Deep'}
      </span>
    </motion.button>
  );
}

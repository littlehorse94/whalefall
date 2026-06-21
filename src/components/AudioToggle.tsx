'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AudioToggle() {
  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/src/whalefall-drift.mp3');
    audio.loop   = true;
    audio.volume = 0.8;
    audioRef.current = audio;

    const unlockPlay = () => {
      if (userMutedRef.current) return;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    // Try immediate autoplay; if blocked, play on first user interaction
    audio.play().then(() => setPlaying(true)).catch(() => {
      document.addEventListener('click',      unlockPlay, { once: true });
      document.addEventListener('touchstart', unlockPlay, { once: true });
    });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click',      unlockPlay);
      document.removeEventListener('touchstart', unlockPlay);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      userMutedRef.current = true;
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      userMutedRef.current = false;
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
      <div className="flex items-center justify-center w-5 h-5">
        {playing ? (
          <div className="flex items-end gap-0.5 h-5">
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
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[rgba(232,244,248,0.5)]">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16.5 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </div>
      <span style={{
        fontFamily: 'Cinzel, serif',
        letterSpacing: '0.05em',
        color: playing ? '#4dd9e8' : 'rgba(232,244,248,0.5)',
        fontSize: '0.7rem',
      }}>
        {playing ? 'Ocean Song ♪' : 'Song of the Deep'}
      </span>
    </motion.button>
  );
}

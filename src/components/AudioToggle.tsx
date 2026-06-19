'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Create an oscillator-based ambient sound using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gainNode: GainNode; osc1: OscillatorNode; osc2: OscillatorNode; osc3: OscillatorNode } | null>(null);

  const createAmbientSound = () => {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(ctx.destination);

    // Low ocean rumble
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55;
    const gain1 = ctx.createGain();
    gain1.gain.value = 0.15;
    osc1.connect(gain1);
    gain1.connect(gainNode);
    osc1.start();

    // Mid whale song
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 180;
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.05;
    osc2.connect(gain2);
    gain2.connect(gainNode);
    osc2.start();

    // High shimmer
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = 440;
    const gain3 = ctx.createGain();
    gain3.gain.value = 0.02;
    osc3.connect(gain3);
    gain3.connect(gainNode);
    osc3.start();

    // Slow frequency modulation for osc2
    let t = 0;
    const interval = setInterval(() => {
      t += 0.01;
      osc2.frequency.value = 180 + Math.sin(t) * 40;
      osc3.frequency.value = 440 + Math.cos(t * 0.7) * 100;
    }, 50);

    audioCtxRef.current = ctx;
    nodesRef.current = { gainNode, osc1, osc2, osc3 };

    return { gainNode, interval };
  };

  const handleToggle = () => {
    if (!playing) {
      if (!audioCtxRef.current) {
        const { gainNode } = createAmbientSound();
        gainNode.gain.setTargetAtTime(volume, audioCtxRef.current!.currentTime, 1);
      } else {
        audioCtxRef.current.resume();
        nodesRef.current?.gainNode.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 1);
      }
      setPlaying(true);
    } else {
      nodesRef.current?.gainNode.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.5);
      setTimeout(() => audioCtxRef.current?.suspend(), 1000);
      setPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      onClick={handleToggle}
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
      {/* Sound waves animation */}
      <div className="relative flex items-center justify-center w-5 h-5">
        {playing ? (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-[#4dd9e8]"
                style={{
                  height: `${6 + i * 3}px`,
                  animation: `pulse-glow ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                  background: '#4dd9e8',
                  opacity: 0.9,
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
      <span
        className="text-xs whitespace-nowrap"
        style={{
          fontFamily: 'Cinzel, serif',
          letterSpacing: '0.05em',
          color: playing ? '#4dd9e8' : 'rgba(232,244,248,0.7)',
          fontSize: '0.7rem',
        }}
      >
        {playing ? 'Ocean Song ♪' : 'Song of the Deep'}
      </span>
    </motion.button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  opacity: number;
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 120,
    rotate: Math.random() * 360,
    opacity: Math.random() * 0.4 + 0.4,
  }));
}

function Petal({ p }: { p: Petal }) {
  return (
    <motion.div
      initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 0 }}
      animate={{ y: '110vh', x: p.drift, rotate: p.rotate, opacity: [0, p.opacity, p.opacity, 0] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
      style={{ position: 'absolute', left: `${p.left}%`, top: 0, width: p.size, height: p.size }}
    >
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <path
          d="M16 2C10 8 6 12 6 18a10 10 0 0020 0c0-6-4-10-10-16z"
          fill="#f9a8c4"
          opacity="0.85"
        />
      </svg>
    </motion.div>
  );
}

/**
 * Randomized petal positions are generated client-side after mount so the
 * server-rendered HTML and first client render match exactly — calling
 * Math.random() during render would trigger a hydration mismatch.
 */
export default function FallingPetals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: one extra paint to avoid a server/client random-value hydration mismatch
    setPetals(generatePetals(count));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {petals.map((p, i) => (
        <Petal key={i} p={p} />
      ))}
    </div>
  );
}

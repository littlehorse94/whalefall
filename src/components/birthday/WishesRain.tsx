'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WISHES, type Wish } from './wishes';

interface FallingWish extends Wish {
  left: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
}

function layoutWishes(): FallingWish[] {
  return WISHES.map((w, i) => ({
    ...w,
    left: 2 + Math.random() * 86,
    duration: 11 + Math.random() * 6,
    delay: i * 0.3 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 70,
    rotate: (Math.random() - 0.5) * 10,
  }));
}

function WishCard({ w }: { w: FallingWish }) {
  return (
    <motion.div
      initial={{ y: '-20vh', x: 0, opacity: 0 }}
      animate={{ y: '120vh', x: w.drift, opacity: [0, 1, 1, 0] }}
      transition={{ duration: w.duration, delay: w.delay, ease: 'linear' }}
      style={{
        position: 'absolute', left: `${w.left}%`, top: 0,
        width: 'min(74vw, 250px)', rotate: w.rotate,
        background: 'rgba(255,255,255,0.92)', borderRadius: 18,
        padding: '0.9rem 1.1rem', boxShadow: '0 12px 28px rgba(138,59,87,0.22)',
      }}
    >
      <p
        style={{
          whiteSpace: 'pre-line', fontSize: '0.85rem', lineHeight: 1.6,
          color: '#5a2e40', fontWeight: 600,
        }}
      >
        {w.text}
      </p>
      <p
        className="text-right mt-1.5"
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.85rem', color: '#d94f7c' }}
      >
        — {w.author}
      </p>
    </motion.div>
  );
}

/**
 * Randomized fall parameters are generated client-side after mount so the
 * server-rendered HTML and first client render match exactly — calling
 * Math.random() during render would trigger a hydration mismatch (same
 * reasoning as FallingPetals).
 */
export default function WishesRain() {
  const [wishes, setWishes] = useState<FallingWish[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: one extra paint to avoid a server/client random-value hydration mismatch
    setWishes(layoutWishes());
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 45 }}>
      {wishes.map((w, i) => (
        <WishCard key={i} w={w} />
      ))}
    </div>
  );
}

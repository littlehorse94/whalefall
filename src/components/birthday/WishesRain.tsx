'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { WISHES, type Wish } from './wishes';

interface FallingWish extends Wish {
  left: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
}

const MAX_LOOPS = 10;
const FALL_DURATION_MIN = 9; // seconds
const FALL_DURATION_RANGE = 3; // + up to this many seconds, randomized
// How long one full pass takes to enter all wishes, one after another —
// the actual loop-to-loop gap; keeps it a gentle drip rather than a burst.
const LOOP_PERIOD = 26; // seconds

// Fisher–Yates — used twice per layout so "which horizontal slot" and
// "which position in the entrance order" are independently randomized,
// instead of the leftmost wish always being both first and left-most.
function shuffledIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function layoutWishes(): FallingWish[] {
  const n = WISHES.length;
  const slotWidth = 84 / n;
  const positionOrder = shuffledIndices(n);
  const entryOrder = shuffledIndices(n);
  const staggerGap = LOOP_PERIOD / n;

  return WISHES.map((w, i) => ({
    ...w,
    // Each wish gets its own horizontal slice of the screen (plus jitter
    // within it), guaranteeing even coverage instead of relying on pure
    // chance to avoid clumping.
    left: 3 + positionOrder[i] * slotWidth + Math.random() * slotWidth * 0.65,
    duration: FALL_DURATION_MIN + Math.random() * FALL_DURATION_RANGE,
    delay: entryOrder[i] * staggerGap + Math.random() * (staggerGap * 0.3),
    drift: (Math.random() - 0.5) * 50,
    rotate: (Math.random() - 0.5) * 8,
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

interface WishesRainProps {
  // Bump this (e.g. via a "Reset" button) to restart the whole 10-loop
  // sequence from scratch with a freshly randomized layout.
  resetSignal?: number;
}

/**
 * Rains all 21 wishes down the screen, one after another, looping the
 * whole (freshly re-randomized) pass up to MAX_LOOPS times before
 * stopping. Randomized layout is generated client-side after mount so
 * the server-rendered HTML and first client render match exactly —
 * calling Math.random() during render would trigger a hydration
 * mismatch (same reasoning as FallingPetals).
 */
export default function WishesRain({ resetSignal = 0 }: WishesRainProps) {
  const [wishes, setWishes] = useState<FallingWish[]>([]);
  const [loopIndex, setLoopIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: restarts the loop sequence whenever the caller bumps resetSignal
    setLoopIndex(0);
  }, [resetSignal]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (loopIndex >= MAX_LOOPS) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: clears the last loop's cards once the 10-loop sequence is done
      setWishes([]);
      return;
    }

    setWishes(layoutWishes());
    timerRef.current = setTimeout(() => setLoopIndex((i) => i + 1), LOOP_PERIOD * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loopIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 45 }}>
      {wishes.map((w, i) => (
        <WishCard key={`${loopIndex}-${i}`} w={w} />
      ))}
    </div>
  );
}

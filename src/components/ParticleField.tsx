'use client';

import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  delay: number;
  bottom: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speedY: Math.random() * 20 + 15,
    speedX: (Math.random() - 0.5) * 5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 15,
    bottom: Math.random() * 20,
  }));
}

export default function ParticleField({ count = 40, className = '' }: { count?: number; className?: string }) {
  // Randomized positions are generated client-side only (after mount) so the
  // server-rendered HTML and the first client render match exactly — calling
  // Math.random() during render would make them differ and trigger a
  // hydration mismatch.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: this is the one extra paint that lets us avoid a server/client hydration mismatch
    setParticles(generateParticles(count));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.speedY}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

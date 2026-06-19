'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  delay: number;
}

export default function ParticleField({ count = 40, className = '' }: { count?: number; className?: string }) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speedY: Math.random() * 20 + 15,
    speedX: (Math.random() - 0.5) * 5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 15,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            bottom: `${Math.random() * 20}%`,
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

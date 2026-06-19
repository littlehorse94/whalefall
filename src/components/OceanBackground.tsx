'use client';

import { useEffect, useRef } from 'react';

export default function OceanBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docHeight;

      if (!bgRef.current) return;

      // Color transitions based on scroll
      let bg = '';
      if (progress < 0.25) {
        const t = progress / 0.25;
        bg = `linear-gradient(180deg,
          rgba(${lerp(20,10,t)}, ${lerp(60,30,t)}, ${lerp(120,60,t)}, 1) 0%,
          rgba(${lerp(10,5,t)}, ${lerp(30,20,t)}, ${lerp(80,50,t)}, 1) 100%
        )`;
      } else if (progress < 0.6) {
        const t = (progress - 0.25) / 0.35;
        bg = `linear-gradient(180deg,
          rgba(${lerp(10,5,t)}, ${lerp(30,15,t)}, ${lerp(60,40,t)}, 1) 0%,
          rgba(${lerp(5,3,t)}, ${lerp(20,10,t)}, ${lerp(50,25,t)}, 1) 100%
        )`;
      } else if (progress < 0.9) {
        const t = (progress - 0.6) / 0.3;
        bg = `linear-gradient(180deg,
          rgba(${lerp(5,3,t)}, ${lerp(15,8,t)}, ${lerp(40,16,t)}, 1) 0%,
          rgba(${lerp(3,2,t)}, ${lerp(10,5,t)}, ${lerp(25,8,t)}, 1) 100%
        )`;
      } else {
        bg = `linear-gradient(180deg,
          rgba(2, 4, 8, 1) 0%,
          rgba(1, 2, 4, 1) 100%
        )`;
      }

      bgRef.current.style.background = bg;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 transition-all duration-300"
      style={{ background: 'linear-gradient(180deg, rgba(20,60,120,1) 0%, rgba(10,20,50,1) 100%)' }}
    >
      {/* Sunrays at top */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 origin-top"
            style={{
              left: '50%',
              width: '3px',
              height: '60%',
              transform: `rotate(${(i - 3.5) * 15}deg)`,
              background: 'linear-gradient(180deg, rgba(150,210,255,0.6), transparent)',
              animation: `sunray-pulse ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * Math.min(1, Math.max(0, t)));
}

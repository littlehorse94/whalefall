'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

interface TiltVideoCardProps {
  title: string;
  subtitle: string;
  youtubeId: string;
  views: string;
  likes: string;
  onPlay: () => void;
}

const FRAME_SUFFIXES = ['1', '2', '3'];

export default function TiltVideoCard({ title, subtitle, youtubeId, views, likes, onPlay }: TiltVideoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const [hovering, setHovering] = useState(false);
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    setHovering(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i = (i + 1) % FRAME_SUFFIXES.length;
      setFrame(i);
    }, 450);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovering(false);
    setFrame(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const src = hovering
    ? `https://img.youtube.com/vi/${youtubeId}/${FRAME_SUFFIXES[frame]}.jpg`
    : `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onPlay}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative h-72 w-full rounded-2xl bg-transparent shadow-2xl cursor-pointer"
    >
      <div
        style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
        className="absolute inset-0 grid h-full w-full grid-rows-[1fr_auto] overflow-hidden rounded-2xl border border-[rgba(77,217,232,0.2)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

        <div className="relative flex flex-col justify-between h-full p-4 text-white">
          <div className="flex items-start justify-between">
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                background: 'rgba(5,8,16,0.7)', border: '1px solid rgba(77,217,232,0.3)',
                color: '#4dd9e8', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em',
              }}
            >
              {subtitle}
            </span>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ transform: 'translateZ(50px)' }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-inset ring-white/30"
            >
              <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
            </motion.div>
          </div>

          <div style={{ transform: 'translateZ(30px)' }}>
            <h3
              className="text-base font-bold leading-snug mb-1"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>{views} views</span>
              <span>·</span>
              <span>{likes} likes</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

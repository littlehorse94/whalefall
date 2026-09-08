'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface PhotoStackItem {
  src: string;
  name: string;
}

export interface InteractivePhotoStackProps {
  items: PhotoStackItem[];
  title: React.ReactNode;
  className?: string;
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// vw/vh-based spread, scaled down at narrower viewports — the same
// overflow risk as the fan carousel it replaces (unscaled spread can
// push cards off-screen on mobile), fixed from the start this time.
function getSpreadRanges() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
  if (w < 480) return { x: 16, y: 10, r: 12, cardW: 30, cardH: 20 };
  if (w < 768) return { x: 22, y: 14, r: 16, cardW: 26, cardH: 18 };
  if (w < 1024) return { x: 30, y: 16, r: 20, cardW: 22, cardH: 16 };
  return { x: 38, y: 20, r: 25, cardW: 20, cardH: 14 };
}

function generateNonOverlappingTransforms(items: PhotoStackItem[]) {
  const positions: { x: number; y: number; r: number }[] = [];
  const displayedItems = items.slice(0, 5);
  const { x: spreadX, y: spreadY, r: spreadR, cardW, cardH } = getSpreadRanges();
  const maxRetries = 100;

  displayedItems.forEach(() => {
    let newPos;
    let collision;
    let retries = 0;

    do {
      collision = false;
      const x = random(-spreadX, spreadX);
      const y = random(-spreadY, spreadY);
      const r = random(-spreadR, spreadR);
      newPos = { x, y, r };

      for (const pos of positions) {
        const dx = Math.abs(newPos.x - pos.x);
        const dy = Math.abs(newPos.y - pos.y);
        if (dx < cardW && dy < cardH) {
          collision = true;
          break;
        }
      }
      retries++;
    } while (collision && retries < maxRetries);

    positions.push(newPos);
  });

  return positions.map((pos) => `translate(${pos.x}vw, ${pos.y}vh) rotate(${pos.r}deg)`);
}

const roseText = '#8a3b57';

const InteractivePhotoStack = React.forwardRef<HTMLDivElement, InteractivePhotoStackProps>(
  ({ items, title, className, ...props }, ref) => {
    const [topCardIndex, setTopCardIndex] = React.useState(0);
    const [isGroupHovered, setIsGroupHovered] = React.useState(false);
    const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
    const [spreadTransforms, setSpreadTransforms] = React.useState<string[]>([]);

    const displayedItems = items.slice(0, 5);
    const baseRotations = ['rotate-2', '-rotate-2', 'rotate-4', '-rotate-4', 'rotate-6'];

    const handleMouseEnter = () => {
      setSpreadTransforms(generateNonOverlappingTransforms(items));
      setIsGroupHovered(true);
    };

    const handleTouchStart = () => {
      if (!isGroupHovered) {
        setSpreadTransforms(generateNonOverlappingTransforms(items));
        setIsGroupHovered(true);
      }
    };

    const handleCardClick = (index: number) => {
      if (isGroupHovered) {
        setClickedIndex(index);
        setTimeout(() => {
          setIsGroupHovered(false);
          setTopCardIndex(index);
          setClickedIndex(null);
        }, 700);
      } else {
        setTopCardIndex(index);
      }
    };

    return (
      <div ref={ref} className={cn('flex flex-col items-center justify-center gap-10', className)} {...props}>
        <div
          className="relative h-72 sm:h-80 md:h-96 w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => !clickedIndex && setIsGroupHovered(false)}
          onTouchStart={handleTouchStart}
        >
          <div className="relative left-1/2 top-1/2 h-56 w-44 sm:h-64 sm:w-52 md:h-80 md:w-64 -translate-x-1/2 -translate-y-1/2">
            {displayedItems.map((item, index) => {
              const isTopCard = index === topCardIndex;
              const numItems = displayedItems.length;
              let stackPosition = index - topCardIndex;
              if (stackPosition < 0) stackPosition += numItems;
              const isClicked = index === clickedIndex;
              const transform = isGroupHovered
                ? spreadTransforms[index]
                : `translateY(${stackPosition * 0.5}rem) scale(${1 - stackPosition * 0.05})`;

              return (
                <div
                  key={item.name}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    'absolute inset-0 cursor-pointer rounded-xl bg-white p-2 shadow-xl transition-all duration-500 ease-in-out',
                    isGroupHovered && 'rotate-0',
                    !isGroupHovered && !isTopCard && baseRotations[stackPosition],
                    isGroupHovered && !isClicked && 'hover:scale-110',
                    isClicked && 'animate-spin-y',
                  )}
                  style={{
                    transform,
                    zIndex: isClicked ? 200 : isGroupHovered ? 100 : isTopCard ? numItems : numItems - stackPosition,
                    boxShadow: '0 15px 30px rgba(138,59,87,0.25)',
                  }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-start">
                    <div className="relative w-full flex-1">
                      <Image src={item.src} alt={item.name} fill className="rounded-md object-cover" sizes="(max-width: 480px) 176px, (max-width: 768px) 208px, 256px" />
                    </div>
                    <div className="flex h-10 shrink-0 items-center justify-center">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', color: roseText }}>
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h3
          className="text-center text-2xl sm:text-3xl"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 800, color: roseText }}
        >
          {title}
        </h3>
      </div>
    );
  },
);

InteractivePhotoStack.displayName = 'InteractivePhotoStack';

export { InteractivePhotoStack };

'use client';

import { motion } from 'framer-motion';
import ParticleField from './ParticleField';

export default function WhaleSanctuary() {
  return (
    <section
      className="relative z-10 py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, transparent, rgba(1,2,8,0.95) 20%, rgba(1,2,8,1) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ParticleField count={30} />

      <div className="max-w-5xl mx-auto w-full text-center relative">
        {/* Bioluminescent particles around whale */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(77,217,232,${Math.random() * 0.8 + 0.2}), transparent)`,
              animation: `bioluminescent-pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <p
            className="text-xs tracking-[0.6em] text-[#4dd9e8] uppercase mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            The Eternal Sanctuary
          </p>
        </motion.div>

        {/* Whale Skeleton SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-16 flex justify-center"
          style={{ animation: 'skeleton-glow 3s ease-in-out infinite' }}
        >
          <svg
            viewBox="0 0 700 300"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-2xl"
            fill="none"
            stroke="#4dd9e8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Spine */}
            <path
              d="M80,150 C150,145 250,140 350,143 C450,146 550,148 650,145"
              strokeWidth="3"
              opacity="0.9"
            />

            {/* Head/Skull */}
            <path
              d="M80,150 C70,140 60,135 55,140 C50,145 50,155 55,160 C60,165 70,162 80,150 Z"
              strokeWidth="2"
              opacity="0.8"
            />
            {/* Jaw */}
            <path
              d="M80,150 C72,158 62,165 58,162 C54,160 54,168 58,170 C65,172 75,168 80,155"
              strokeWidth="1.5"
              opacity="0.6"
            />
            {/* Eye socket */}
            <circle cx="65" cy="143" r="4" strokeWidth="1.5" opacity="0.7" />

            {/* Ribs - left side */}
            {[
              [150, 143, 148, 175, 155, 188, 165, 190],
              [200, 141, 198, 178, 207, 192, 218, 194],
              [250, 140, 248, 180, 258, 196, 270, 198],
              [300, 141, 298, 182, 308, 198, 320, 200],
              [350, 142, 348, 182, 358, 196, 370, 198],
              [400, 143, 398, 180, 408, 194, 418, 196],
              [450, 144, 448, 176, 456, 188, 466, 190],
              [500, 145, 498, 172, 505, 182, 514, 183],
              [550, 146, 548, 168, 554, 176, 562, 177],
            ].map(([x1, y1, x2, y2, x3, y3, x4, y4], i) => (
              <path
                key={i}
                d={`M${x1},${y1} C${x2},${y2} ${x3},${y3} ${x4},${y4}`}
                strokeWidth={1.8 - i * 0.05}
                opacity={0.7 - i * 0.03}
              />
            ))}

            {/* Ribs - right side (dorsal) */}
            {[
              [150, 143, 148, 118, 155, 108, 162, 106],
              [200, 141, 198, 112, 207, 100, 216, 98],
              [250, 140, 248, 110, 258, 97, 268, 95],
              [300, 141, 298, 111, 308, 97, 318, 95],
              [350, 142, 348, 112, 358, 99, 368, 97],
              [400, 143, 398, 114, 406, 102, 415, 100],
              [450, 144, 448, 116, 455, 106, 463, 104],
              [500, 145, 498, 120, 504, 111, 511, 109],
            ].map(([x1, y1, x2, y2, x3, y3, x4, y4], i) => (
              <path
                key={`d-${i}`}
                d={`M${x1},${y1} C${x2},${y2} ${x3},${y3} ${x4},${y4}`}
                strokeWidth={1.8 - i * 0.05}
                opacity={0.6 - i * 0.02}
              />
            ))}

            {/* Dorsal fin */}
            <path
              d="M300,141 C305,110 315,90 330,80 C345,70 360,80 370,97"
              strokeWidth="2"
              opacity="0.7"
            />

            {/* Pectoral fin */}
            <path
              d="M160,150 C155,165 145,185 135,200 C130,210 125,212 123,208 C120,203 125,195 130,190 C138,180 148,168 158,155"
              strokeWidth="2"
              opacity="0.65"
            />

            {/* Tail flukes */}
            <path
              d="M640,145 C660,130 685,118 695,125 C700,130 695,140 685,148"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M640,145 C660,158 680,170 690,165 C698,160 695,150 685,148"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M620,145 L640,145"
              strokeWidth="2.5"
              opacity="0.8"
            />

            {/* Vertebral bumps along spine */}
            {[130, 180, 230, 280, 330, 380, 430, 480, 530, 580, 620].map((x, i) => (
              <circle
                key={`v-${i}`}
                cx={x}
                cy={144 + Math.sin(i * 0.5) * 2}
                r="3"
                strokeWidth="1"
                opacity="0.6"
              />
            ))}

            {/* Small creatures around the skeleton */}
            {/* Fish 1 */}
            <path d="M420,80 C425,78 430,80 428,82 C426,84 421,82 420,80 Z M430,80 C433,78 436,79 434,81 Z" strokeWidth="0.8" opacity="0.5" />
            {/* Fish 2 */}
            <path d="M180,220 C185,218 190,220 188,222 C186,224 181,222 180,220 Z M190,220 C193,218 196,219 194,221 Z" strokeWidth="0.8" opacity="0.4" />
            {/* Fish 3 */}
            <path d="M520,100 C525,98 530,100 528,102 C526,104 521,102 520,100 Z M530,100 C533,98 536,99 534,101 Z" strokeWidth="0.8" opacity="0.5" />

            {/* Bubbles */}
            {[
              [200, 95, 4], [230, 80, 3], [300, 70, 5], [380, 75, 3], [420, 65, 4], [480, 85, 3],
            ].map(([cx, cy, r], i) => (
              <circle key={`b-${i}`} cx={cx} cy={cy} r={r} strokeWidth="0.8" opacity="0.3" />
            ))}
          </svg>
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 glow-pearl"
            style={{ fontFamily: 'Cinzel Decorative, cursive', color: '#e8f4f8' }}
          >
            Even after the journey ends,
            <br />
            <span className="shimmer-text">the memories continue to give life.</span>
          </h2>

          <div
            className="text-4xl md:text-6xl mb-8 glow-cyan"
            style={{ fontFamily: 'Cinzel Decorative, cursive', color: '#4dd9e8' }}
          >
            鲸落，万物生
          </div>

          <p
            className="text-lg text-[rgba(232,244,248,0.5)] max-w-2xl mx-auto italic"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            &ldquo;When a whale falls to the ocean floor, it becomes a sanctuary for life.
            So too, does every memory we create together become a sanctuary for our souls.&rdquo;
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#4dd9e8]" />
          <div
            className="text-[#4dd9e8] text-lg"
            style={{ animation: 'bioluminescent-pulse 2s ease-in-out infinite' }}
          >
            🐋
          </div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#4dd9e8]" />
        </motion.div>
      </div>
    </section>
  );
}

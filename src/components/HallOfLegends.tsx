'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { LegendMember } from '@/lib/content-types';

interface HallOfLegendsProps {
  members: LegendMember[];
}

export default function HallOfLegends({ members }: HallOfLegendsProps) {
  return (
    <section id="hall-of-legends" className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#c9a84c] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          The Pillars
        </p>
        <h1 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-gold">
          Hall of Legends
        </h1>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          These adventurers shaped the soul of Whalefall. Their deeds echo through the depths.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass rounded-xl overflow-hidden card-hover group"
            style={{ border: `1px solid ${member.color}25`, '--hover-glow': `${member.glowColor}40` } as CSSProperties}
          >
            {/* Card Header */}
            <div
              className={`bg-gradient-to-br ${member.gradient} p-6 flex items-center gap-4`}
              style={{ borderBottom: `1px solid ${member.color}20` }}
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 overflow-hidden"
                style={{
                  background: `radial-gradient(circle, ${member.color}30, ${member.color}05)`,
                  border: `2px solid ${member.color}60`,
                  color: member.color,
                  fontFamily: 'Cinzel Decorative, cursive',
                  boxShadow: `0 0 20px ${member.color}30`,
                }}
              >
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  member.initials
                )}
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-[#e8f4f8]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: member.color, fontFamily: 'Cinzel, serif', fontSize: '0.75rem' }}
                >
                  {member.title}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: `${member.color}15`,
                    border: `1px solid ${member.color}30`,
                    color: member.color,
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {member.role}
                </span>
                <span
                  className="text-xs flex items-center gap-1"
                  style={{ color: 'rgba(232,244,248,0.4)', fontFamily: 'Cinzel, serif' }}
                >
                  {member.badge} {member.badgeLabel}
                </span>
              </div>

              <p
                className="text-xs mb-4"
                style={{
                  color: 'rgba(232,244,248,0.4)',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                }}
              >
                Joined: {member.joinDate}
              </p>

              <blockquote
                className="text-sm italic leading-relaxed"
                style={{ color: 'rgba(232,244,248,0.65)', borderLeft: `2px solid ${member.color}40`, paddingLeft: '12px' }}
              >
                {member.quote}
              </blockquote>
            </div>

            {/* Bottom glow line */}
            <div
              className="h-0.5 transition-all duration-500 opacity-0 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const members = [
  {
    name: 'AzureTide',
    role: 'Guild Master',
    title: 'The Leviathan',
    joinDate: 'March 2022',
    badge: '👑',
    badgeLabel: 'Founder',
    quote: '"Every whale fall begins with a single step into the unknown."',
    gradient: 'from-[#1a3a5c] to-[#0a1a2e]',
    color: '#4dd9e8',
    glowColor: '#4dd9e8',
    initials: 'AT',
  },
  {
    name: 'CrimsonVeil',
    role: 'PvP Commander',
    title: 'The Bloodtide',
    joinDate: 'April 2022',
    badge: '⚔️',
    badgeLabel: 'PvP Legend',
    quote: '"In the chaos of battle, find the silence of purpose."',
    gradient: 'from-[#3a1a1a] to-[#1a0a0a]',
    color: '#e84d4d',
    glowColor: '#e84d4d',
    initials: 'CV',
  },
  {
    name: 'LunarPetal',
    role: 'Event Coordinator',
    title: 'The Starweaver',
    joinDate: 'June 2022',
    badge: '🌙',
    badgeLabel: 'Event Maestro',
    quote: '"A guild lives through the events that bring hearts together."',
    gradient: 'from-[#2a1a3a] to-[#1a0a2e]',
    color: '#c9a84c',
    glowColor: '#a78bfa',
    initials: 'LP',
  },
  {
    name: 'IronSerpent',
    role: 'PvE Raid Leader',
    title: 'The Dungeon Diver',
    joinDate: 'August 2022',
    badge: '🐉',
    badgeLabel: 'Raid Master',
    quote: '"No boss lives through three wipes. On the fourth, we feast."',
    gradient: 'from-[#1a2a1a] to-[#0a1a0a]',
    color: '#4de890',
    glowColor: '#4de890',
    initials: 'IS',
  },
  {
    name: 'MistyArrow',
    role: 'Photography Captain',
    title: 'The Chronicler',
    joinDate: 'January 2023',
    badge: '📸',
    badgeLabel: 'Memory Keeper',
    quote: '"Every screenshot is a moment that deserves to live forever."',
    gradient: 'from-[#1a3a5c] to-[#0a2a4c]',
    color: '#4dd9e8',
    glowColor: '#4dd9e8',
    initials: 'MA',
  },
  {
    name: 'ThunderKoi',
    role: 'Recruitment Officer',
    title: 'The Harbor Master',
    joinDate: 'March 2023',
    badge: '🎯',
    badgeLabel: 'Top Recruiter',
    quote: '"A guild is only as strong as the bonds between its people."',
    gradient: 'from-[#3a2a1a] to-[#1a1a0a]',
    color: '#e8a84d',
    glowColor: '#e8a84d',
    initials: 'TK',
  },
];

export default function HallOfLegends() {
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
        <h2 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-gold">
          Hall of Legends
        </h2>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          These adventurers shaped the soul of Whalefall. Their deeds echo through the depths.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, i) => (
          <motion.div
            key={member.name}
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
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{
                  background: `radial-gradient(circle, ${member.color}30, ${member.color}05)`,
                  border: `2px solid ${member.color}60`,
                  color: member.color,
                  fontFamily: 'Cinzel Decorative, cursive',
                  boxShadow: `0 0 20px ${member.color}30`,
                }}
              >
                {member.initials}
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

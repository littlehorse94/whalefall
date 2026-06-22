'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/GlowingEffect';

const stats = [
  { label: 'SEA Ranking', value: 60, prefix: 'Top ', suffix: '', desc: 'In Where Winds Meet' },
  { label: 'Members', value: 200, prefix: '', suffix: '+', desc: 'Active adventurers' },
  { label: 'Guild Age', value: 3, prefix: '', suffix: ' Years', desc: 'Of shared memories' },
  { label: 'Events Hosted', value: 50, prefix: '', suffix: '+', desc: 'Epic gatherings' },
  { label: 'Photos Uploaded', value: 1000, prefix: '', suffix: '+', desc: 'Captured moments' },
  { label: 'Montages', value: 20, prefix: '', suffix: '+', desc: 'Cinematic memories' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative z-10 py-20 px-6">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(77,217,232,0.03) 50%, transparent)',
        }}
      />

      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#4dd9e8] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Guild Achievements
        </p>
        <h2
          className="section-title text-3xl md:text-4xl text-[#e8f4f8] glow-pearl"
        >
          Our Legacy in Numbers
        </h2>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      {/* Stats Grid */}
      <div
        ref={ref}
        className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative glass rounded-lg p-6 text-center border-glow card-hover flex flex-col"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <GlowingEffect disabled={false} glow proximity={60} spread={24} borderWidth={1.5} />
            <div
              className="flex items-center justify-center text-3xl md:text-4xl font-bold mb-1 glow-cyan"
              style={{ fontFamily: 'Cinzel Decorative, cursive', color: '#4dd9e8', minHeight: '4.5rem' }}
            >
              {stat.prefix}
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  delay={i * 0.1}
                />
              ) : (
                '0'
              )}
              {stat.suffix}
            </div>
            <div
              className="text-sm text-[#e8f4f8] font-semibold mb-1"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {stat.label}
            </div>
            <div className="text-xs text-[rgba(232,244,248,0.5)]">{stat.desc}</div>

            {/* Decorative bottom line */}
            <div className="mt-3 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent opacity-40" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

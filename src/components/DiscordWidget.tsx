'use client';

import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/GlowingEffect';
import type { DiscordConfig } from '@/lib/content-types';

const STATUS_COLOR: Record<string, string> = {
  online: '#4de890',
  idle: '#e8a84d',
  dnd: '#e84d4d',
  offline: '#6b7280',
};

function WidgetCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative glass rounded-2xl p-6 border-glow flex flex-col"
    >
      <GlowingEffect disabled={false} glow proximity={70} spread={28} borderWidth={1.5} />
      {children}
    </motion.div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-sm font-bold text-[#4dd9e8] mb-4 uppercase tracking-wider"
      style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
    >
      {children}
    </h3>
  );
}

interface DiscordWidgetProps {
  config: DiscordConfig;
}

export default function DiscordWidget({ config: data }: DiscordWidgetProps) {

  return (
    <section id="discord" className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#4dd9e8] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Always Online
        </p>
        <h2 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          The Tide Never Sleeps
        </h2>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Live activity from our Discord — join the conversation any time.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Members */}
        <WidgetCard>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#4de890]" style={{ boxShadow: '0 0 10px #4de890' }} />
              <span className="font-bold text-[#e8f4f8]" style={{ fontFamily: 'Cinzel, serif' }}>
                {data.guildName}
              </span>
            </div>
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                background: 'rgba(77,217,232,0.15)', border: '1px solid rgba(77,217,232,0.3)',
                color: '#4dd9e8', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em',
              }}
            >
              {data.presenceCount} online
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {data.members.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(77,217,232,0.04)' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #0d1b2e, #1a3a5c)',
                    border: `1.5px solid ${STATUS_COLOR[m.status]}80`,
                    color: '#e8f4f8', fontFamily: 'Cinzel Decorative, cursive',
                  }}
                >
                  {m.username.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm text-[rgba(232,244,248,0.8)] flex-1" style={{ fontFamily: 'Cinzel, serif' }}>
                  {m.username}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: STATUS_COLOR[m.status], boxShadow: `0 0 6px ${STATUS_COLOR[m.status]}` }}
                />
              </div>
            ))}
          </div>
        </WidgetCard>

        {/* Server Pulse */}
        <WidgetCard delay={0.1}>
          <CardTitle>Server Pulse</CardTitle>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(77,217,232,0.06)' }}>
              <div className="text-2xl font-bold text-[#4dd9e8]" style={{ fontFamily: 'Cinzel Decorative, cursive' }}>{data.memberCount}</div>
              <div className="text-xs text-[rgba(232,244,248,0.5)]" style={{ fontFamily: 'Cinzel, serif' }}>Members</div>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(201,168,76,0.06)' }}>
              <div className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel Decorative, cursive' }}>Lv.{data.boostLevel}</div>
              <div className="text-xs text-[rgba(232,244,248,0.5)]" style={{ fontFamily: 'Cinzel, serif' }}>Boost Level</div>
            </div>
          </div>

          <p className="text-xs text-[rgba(232,244,248,0.4)] mb-2" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
            ACTIVE CHANNELS
          </p>
          <div className="flex flex-wrap gap-2">
            {data.channels.map((c) => (
              <span
                key={c.id}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(77,217,232,0.08)', border: '1px solid rgba(77,217,232,0.2)',
                  color: 'rgba(232,244,248,0.7)', fontFamily: 'Cinzel, serif',
                }}
              >
                {c.name}
              </span>
            ))}
          </div>
        </WidgetCard>

        {/* Recent Highlights */}
        <WidgetCard delay={0.2}>
          <CardTitle>Recent Highlights</CardTitle>
          <div className="flex flex-col gap-3">
            {data.highlights.map((h) => (
              <div key={h.id} className="rounded-lg p-3" style={{ background: 'rgba(77,217,232,0.04)', borderLeft: '2px solid rgba(77,217,232,0.4)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: 'rgba(77,217,232,0.15)', color: '#4dd9e8', fontFamily: 'Cinzel, serif', fontSize: '0.65rem' }}
                  >
                    {h.tag}
                  </span>
                  <span className="text-xs text-[rgba(232,244,248,0.35)]">{h.time}</span>
                </div>
                <p className="text-xs text-[rgba(232,244,248,0.7)] leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      <div className="max-w-5xl mx-auto mt-6">
        <a
          href={data.inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button cta-button-gold w-full"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          Join the Server
        </a>
      </div>
    </section>
  );
}

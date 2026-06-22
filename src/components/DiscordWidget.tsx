'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data shape mirrors Discord's free widget API response
// (https://discord.com/developers/docs/resources/guild#get-guild-widget-json),
// fetched from https://discord.com/api/guilds/<SERVER_ID>/widget.json once a
// real server ID is supplied and Server Settings → Widget → Enable is turned on.
interface DiscordWidgetData {
  name: string;
  presence_count: number;
  member_count: number;
  boost_level: number;
  members: { username: string; status: string; avatar_url: string | null }[];
  channels: { name: string }[];
}

const MOCK_DATA: DiscordWidgetData = {
  name: 'Whalefall',
  presence_count: 47,
  member_count: 214,
  boost_level: 2,
  members: [
    { username: 'AzureTide', status: 'online', avatar_url: null },
    { username: 'CrimsonVeil', status: 'online', avatar_url: null },
    { username: 'LunarPetal', status: 'idle', avatar_url: null },
    { username: 'IronSerpent', status: 'online', avatar_url: null },
    { username: 'MistyArrow', status: 'dnd', avatar_url: null },
    { username: 'ThunderKoi', status: 'online', avatar_url: null },
  ],
  channels: [
    { name: '🌊 general-chat' },
    { name: '⚔️ pvp-strategy' },
    { name: '🎙️ Raid Voice 1' },
    { name: '📸 screenshots' },
  ],
};

const HIGHLIGHTS = [
  { tag: 'Announcement', text: 'Guild reached Top 60 SEA this season — celebration event this weekend!', time: '2h ago' },
  { tag: 'Event', text: 'Saturday Raid Night — Iron Gate Siege, 8PM server time.', time: '1d ago' },
  { tag: 'Recruitment', text: 'Recruitment open for PvE Raid Leader and Photography roles.', time: '3d ago' },
];

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
      className="glass rounded-2xl p-6 border-glow flex flex-col"
    >
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

export default function DiscordWidget() {
  // Swap this for a real fetch once a server ID is available:
  // useEffect(() => { fetch(`https://discord.com/api/guilds/${ID}/widget.json`).then(...) }, []);
  const [data] = useState<DiscordWidgetData>(MOCK_DATA);

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
                {data.name}
              </span>
            </div>
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                background: 'rgba(77,217,232,0.15)', border: '1px solid rgba(77,217,232,0.3)',
                color: '#4dd9e8', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em',
              }}
            >
              {data.presence_count} online
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {data.members.map((m) => (
              <div key={m.username} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(77,217,232,0.04)' }}>
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
              <div className="text-2xl font-bold text-[#4dd9e8]" style={{ fontFamily: 'Cinzel Decorative, cursive' }}>{data.member_count}</div>
              <div className="text-xs text-[rgba(232,244,248,0.5)]" style={{ fontFamily: 'Cinzel, serif' }}>Members</div>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(201,168,76,0.06)' }}>
              <div className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel Decorative, cursive' }}>Lv.{data.boost_level}</div>
              <div className="text-xs text-[rgba(232,244,248,0.5)]" style={{ fontFamily: 'Cinzel, serif' }}>Boost Level</div>
            </div>
          </div>

          <p className="text-xs text-[rgba(232,244,248,0.4)] mb-2" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
            ACTIVE CHANNELS
          </p>
          <div className="flex flex-wrap gap-2">
            {data.channels.map((c) => (
              <span
                key={c.name}
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
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="rounded-lg p-3" style={{ background: 'rgba(77,217,232,0.04)', borderLeft: '2px solid rgba(77,217,232,0.4)' }}>
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
          href="https://discord.gg/whalefall"
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

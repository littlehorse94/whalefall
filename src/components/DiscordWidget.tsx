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
  members: { username: string; status: string; avatar_url: string | null }[];
  channels: { name: string }[];
}

const MOCK_DATA: DiscordWidgetData = {
  name: 'Whalefall',
  presence_count: 47,
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
  ],
};

const STATUS_COLOR: Record<string, string> = {
  online: '#4de890',
  idle: '#e8a84d',
  dnd: '#e84d4d',
  offline: '#6b7280',
};

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
        className="text-center mb-12"
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto glass rounded-2xl p-6 md:p-8 border-glow"
      >
        <div className="flex items-center justify-between mb-6">
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

        <div className="flex flex-col gap-2 mb-6">
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

        <div className="flex flex-wrap gap-2 mb-6">
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

        <a
          href="https://discord.gg/whalefall"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button cta-button-gold w-full"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          Join the Server
        </a>
      </motion.div>
    </section>
  );
}

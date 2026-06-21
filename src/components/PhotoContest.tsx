'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const contestPhotos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&q=80',
    submitter: 'MistyArrow',
    title: 'Ocean Dreamscape',
    votes: 142,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80',
    submitter: 'LunarPetal',
    title: 'Crystal Depths',
    votes: 98,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80',
    submitter: 'ThunderKoi',
    title: 'Night Bloom',
    votes: 187,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    submitter: 'IronSerpent',
    title: 'Forest of Serenity',
    votes: 73,
  },
];

const leaderboard = [
  { rank: 1, name: 'ThunderKoi', votes: 187, photo: 'Night Bloom' },
  { rank: 2, name: 'MistyArrow', votes: 142, photo: 'Ocean Dreamscape' },
  { rank: 3, name: 'LunarPetal', votes: 98, photo: 'Crystal Depths' },
  { rank: 4, name: 'IronSerpent', votes: 73, photo: 'Forest of Serenity' },
];

export default function PhotoContest() {
  const [votes, setVotes] = useState<Record<number, number>>(
    Object.fromEntries(contestPhotos.map(p => [p.id, p.votes]))
  );
  const [voted, setVoted] = useState<Set<number>>(new Set());

  const handleVote = (id: number) => {
    if (voted.has(id)) return;
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setVoted(prev => new Set(prev).add(id));
  };

  return (
    <section className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#c9a84c] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          June 2025
        </p>
        <h2 className="text-3xl md:text-5xl text-[#e8f4f8] glow-gold" style={{ fontFamily: "'Long Cang', cursive" }}>
          鲸落摄影大赛
        </h2>
        <p
          className="mt-2 text-lg text-[#c9a84c]"
          style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
        >
          Monthly Photo Contest
        </p>
        <p className="mt-3 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Vote for your favourite screenshot of the month. One vote per photo allowed.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      </motion.div>

      {/* Contest Banner */}
      <div
        className="max-w-6xl mx-auto rounded-2xl p-6 mb-10"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(77,217,232,0.05))',
          border: '1px solid rgba(201,168,76,0.3)',
          boxShadow: '0 0 40px rgba(201,168,76,0.1)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3
              className="text-xl font-bold text-[#c9a84c] mb-1"
              style={{ fontFamily: 'Cinzel Decorative, cursive' }}
            >
              🏆 Contest Theme: &ldquo;Depths of Wonder&rdquo;
            </h3>
            <p className="text-sm text-[rgba(232,244,248,0.6)]">
              Submit screenshots that capture the most breathtaking vistas in Where Winds Meet
            </p>
          </div>
          <div className="text-center">
            <div
              className="text-3xl font-bold text-[#c9a84c]"
              style={{ fontFamily: 'Cinzel Decorative, cursive' }}
            >
              12
            </div>
            <div
              className="text-xs text-[rgba(232,244,248,0.5)]"
              style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
            >
              DAYS LEFT
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Photo Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contestPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <div className="relative" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(0deg, rgba(5,8,16,0.8) 0%, transparent 50%)' }}
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <p
                    className="text-xs font-semibold text-[#e8f4f8]"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {photo.title}
                  </p>
                  <p
                    className="text-xs text-[rgba(232,244,248,0.5)]"
                  >
                    by {photo.submitter}
                  </p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span
                  className="text-sm font-bold"
                  style={{ color: '#c9a84c', fontFamily: 'Cinzel, serif' }}
                >
                  {votes[photo.id]} votes
                </span>
                <button
                  onClick={() => handleVote(photo.id)}
                  disabled={voted.has(photo.id)}
                  className="text-xs px-3 py-1.5 rounded transition-all duration-300"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    letterSpacing: '0.1em',
                    background: voted.has(photo.id) ? 'rgba(77,217,232,0.1)' : 'rgba(201,168,76,0.15)',
                    border: `1px solid ${voted.has(photo.id) ? 'rgba(77,217,232,0.3)' : 'rgba(201,168,76,0.5)'}`,
                    color: voted.has(photo.id) ? '#4dd9e8' : '#c9a84c',
                    cursor: voted.has(photo.id) ? 'not-allowed' : 'pointer',
                  }}
                >
                  {voted.has(photo.id) ? '✓ Voted' : '♡ Vote'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard */}
        <div
          className="glass rounded-xl p-6 h-fit"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <h3
            className="text-lg font-bold text-[#c9a84c] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            <span>🏆</span> Leaderboard
          </h3>
          <div className="flex flex-col gap-3">
            {[...leaderboard]
              .map(l => ({ ...l, currentVotes: votes[contestPhotos.find(p => p.submitter === l.name)?.id ?? 0] ?? l.votes }))
              .sort((a, b) => b.currentVotes - a.currentVotes)
              .map((entry, i) => (
                <div
                  key={entry.name}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: i === 0 ? 'rgba(201,168,76,0.1)' : 'rgba(77,217,232,0.03)',
                    border: `1px solid ${i === 0 ? 'rgba(201,168,76,0.3)' : 'rgba(77,217,232,0.08)'}`,
                  }}
                >
                  <span
                    className="text-lg font-bold w-6 text-center"
                    style={{
                      fontFamily: 'Cinzel Decorative, cursive',
                      color: i === 0 ? '#c9a84c' : i === 1 ? '#9ba8b8' : i === 2 ? '#c87533' : 'rgba(232,244,248,0.4)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold text-[#e8f4f8] truncate"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {entry.name}
                    </p>
                    <p
                      className="text-xs text-[rgba(232,244,248,0.4)] truncate"
                    >
                      {entry.photo}
                    </p>
                  </div>
                  <span
                    className="text-sm font-bold flex-shrink-0"
                    style={{ color: '#c9a84c', fontFamily: 'Cinzel, serif' }}
                  >
                    {entry.currentVotes}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

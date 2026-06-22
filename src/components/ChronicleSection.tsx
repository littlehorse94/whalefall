'use client';

import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2022',
    month: 'March',
    title: 'Guild Founded',
    desc: 'Whalefall (鲸落) was established by a group of passionate adventurers united by one dream — to build a guild that feels like a second family.',
    icon: '🐋',
    side: 'left',
  },
  {
    year: '2022',
    month: 'August',
    title: 'First PvP Victory',
    desc: 'Our first major battlefield triumph. The strategy, the coordination, the roar of 30 voices celebrating in voice chat — unforgettable.',
    icon: '⚔️',
    side: 'right',
  },
  {
    year: '2023',
    month: 'February',
    title: 'Reached Top 100 SEA',
    desc: 'A landmark achievement as Whalefall broke into the Top 100 guilds in Southeast Asia, cementing our place among the elite.',
    icon: '🏆',
    side: 'left',
  },
  {
    year: '2023',
    month: 'March',
    title: '1st Guild Anniversary',
    desc: 'We celebrated one year of laughter, battles, and late-night raids. The anniversary party drew over 80 members in a single event.',
    icon: '🎉',
    side: 'right',
  },
  {
    year: '2024',
    month: 'January',
    title: 'Broke into Top 60 SEA',
    desc: 'Through relentless dedication and tactical brilliance, Whalefall ascended to the Top 60 — where legends dwell.',
    icon: '🌊',
    side: 'left',
  },
  {
    year: '2024',
    month: 'September',
    title: '100th Member Milestone',
    desc: 'One hundred adventurers now called Whalefall home. Each one a chapter in our ongoing story of the deep.',
    icon: '👥',
    side: 'right',
  },
  {
    year: '2025',
    month: 'March',
    title: '3rd Anniversary Celebration',
    desc: 'Three years strong. The guild gathered for our grandest celebration yet — a testament to bonds forged in the depths of adventure.',
    icon: '✨',
    side: 'left',
  },
];

export default function ChronicleSection() {
  return (
    <section id="chronicle" className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p
          className="text-xs tracking-[0.5em] text-[#4dd9e8] uppercase mb-3"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Our Story
        </p>
        <h2 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          Guild Chronicle
        </h2>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Every great guild has a story. Here is ours — told in the milestones that shaped who we are.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        {/* Center line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{ background: 'linear-gradient(180deg, transparent, #4dd9e8 10%, #4dd9e8 90%, transparent)' }}
        />

        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`relative flex items-center mb-16 ${
              m.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
            } flex-col`}
          >
            {/* Content Card */}
            <div
              className={`w-full md:w-5/12 ${
                m.side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
              }`}
            >
              <div className="glass rounded-xl p-6 border-glow card-hover">
                <div
                  className={`flex items-center gap-2 mb-3 ${
                    m.side === 'left' ? 'md:justify-end' : 'md:justify-start'
                  } justify-start`}
                >
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      background: 'rgba(77,217,232,0.15)',
                      border: '1px solid rgba(77,217,232,0.3)',
                      color: '#4dd9e8',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {m.month} {m.year}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold text-[#e8f4f8] mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {m.title}
                </h3>
                <p className="text-sm text-[rgba(232,244,248,0.65)] leading-relaxed">{m.desc}</p>
              </div>
            </div>

            {/* Center icon */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 items-center justify-center rounded-full z-10"
              style={{
                background: 'linear-gradient(135deg, #0d1b2e, #1a3a5c)',
                border: '2px solid #4dd9e8',
                boxShadow: '0 0 20px rgba(77,217,232,0.5)',
              }}
            >
              <span className="text-xl">{m.icon}</span>
            </div>

            {/* Year label */}
            <div
              className={`hidden md:block w-5/12 overflow-hidden ${
                m.side === 'left' ? 'pl-16' : 'pr-16 text-right'
              }`}
            >
              <span
                className="font-black opacity-20"
                style={{
                  fontFamily: 'Cinzel Decorative, cursive', color: '#4dd9e8',
                  fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', whiteSpace: 'nowrap',
                }}
              >
                {m.year}
              </span>
            </div>

            {/* Mobile icon */}
            <div
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full mb-3"
              style={{
                background: 'linear-gradient(135deg, #0d1b2e, #1a3a5c)',
                border: '2px solid #4dd9e8',
                boxShadow: '0 0 15px rgba(77,217,232,0.4)',
              }}
            >
              <span className="text-lg">{m.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

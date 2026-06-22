'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties } from 'react';

const sampleMessages = [
  {
    id: 1,
    name: 'CrimsonVeil',
    message: 'Three years with this guild and it still feels like home. The memories we\'ve made together are worth more than any ranking. To many more years of battles and laughter!',
    date: 'June 12, 2025',
    avatar: 'CV',
    color: '#e84d4d',
  },
  {
    id: 2,
    name: 'LunarPetal',
    message: 'Every event I organise, every screenshot I take, every moment I share — it\'s all because of this incredible community. Whalefall is not just a guild. It\'s family. 鲸落万岁！',
    date: 'June 10, 2025',
    avatar: 'LP',
    color: '#c9a84c',
  },
  {
    id: 3,
    name: 'NewWave99',
    message: 'Just joined last month and already feel so welcomed. Can\'t believe I found a guild with such amazing people. The vibes here are immaculate. Excited for what\'s ahead!',
    date: 'June 8, 2025',
    avatar: 'NW',
    color: '#4dd9e8',
  },
  {
    id: 4,
    name: 'ThunderKoi',
    message: 'When a whale falls to the ocean floor, it becomes a sanctuary for thousands of creatures. That\'s exactly what this guild is — a sanctuary. Thank you, AzureTide, for everything.',
    date: 'June 5, 2025',
    avatar: 'TK',
    color: '#e8a84d',
  },
];

export default function Guestbook() {
  const [messages, setMessages] = useState(sampleMessages);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const colors = ['#4dd9e8', '#c9a84c', '#e84d4d', '#4de890', '#e8a84d'];
    const newMsg = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: name.trim().slice(0, 2).toUpperCase(),
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setMessages(prev => [newMsg, ...prev]);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="guestbook" className="relative z-10 py-24 px-6">
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
          Leave Your Mark
        </p>
        <h2 className="section-title text-3xl md:text-5xl text-[#e8f4f8] glow-pearl">
          Guestbook
        </h2>
        <p className="mt-4 text-[rgba(232,244,248,0.5)] max-w-xl mx-auto">
          Share your memories, your thanks, or your hopes. Every word matters in the deep.
        </p>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 mb-12 border-glow"
        >
          <h3
            className="text-lg font-bold text-[#e8f4f8] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            <span className="text-[#4dd9e8]">✍</span> Write in the Depths
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label
                className="block text-xs mb-2 text-[rgba(232,244,248,0.6)]"
                style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.15em' }}
              >
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your guild name or username..."
                className="w-full px-4 py-3 rounded-lg text-sm text-[#e8f4f8] outline-none transition-all duration-300"
                style={{
                  background: 'rgba(5,8,16,0.6)',
                  border: '1px solid rgba(77,217,232,0.2)',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(77,217,232,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(77,217,232,0.2)'}
              />
            </div>
            <div>
              <label
                className="block text-xs mb-2 text-[rgba(232,244,248,0.6)]"
                style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.15em' }}
              >
                YOUR MESSAGE
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Share a memory, a thank-you, or words for the guild..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-sm text-[#e8f4f8] outline-none transition-all duration-300 resize-none"
                style={{
                  background: 'rgba(5,8,16,0.6)',
                  border: '1px solid rgba(77,217,232,0.2)',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(77,217,232,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(77,217,232,0.2)'}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="cta-button"
                style={{ padding: '12px 32px' }}
              >
                Send to the Deep
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-[#4dd9e8]"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    ✓ Message received!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>

        {/* Messages */}
        <div className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass rounded-xl p-6 card-hover"
                style={{ border: `1px solid ${msg.color}20`, '--hover-glow': `${msg.color}33` } as CSSProperties}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: `radial-gradient(circle, ${msg.color}30, ${msg.color}05)`,
                      border: `1.5px solid ${msg.color}60`,
                      color: msg.color,
                      fontFamily: 'Cinzel Decorative, cursive',
                      boxShadow: `0 0 12px ${msg.color}25`,
                    }}
                  >
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-semibold text-[#e8f4f8]"
                        style={{ fontFamily: 'Cinzel, serif', color: msg.color }}
                      >
                        {msg.name}
                      </span>
                      <span
                        className="text-xs text-[rgba(232,244,248,0.35)]"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        {msg.date}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed text-[rgba(232,244,248,0.75)]"
                    >
                      {msg.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero-section' },
  { label: 'Chronicle', href: '#chronicle' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Legends', href: '#hall-of-legends' },
  { label: 'Montages', href: '#montages' },
  { label: 'Guestbook', href: '#guestbook' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5,8,16,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(77,217,232,0.15)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero-section')}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="20" cy="20" r="18" stroke="rgba(77,217,232,0.4)" strokeWidth="1" />
              <path
                d="M8 22 C12 16, 20 18, 28 14 C32 12, 35 16, 34 20 C32 26, 24 24, 20 22 C16 20, 10 24, 8 22Z"
                fill="rgba(77,217,232,0.2)"
                stroke="#4dd9e8"
                strokeWidth="0.8"
              />
              <circle cx="31" cy="17" r="1.5" fill="#4dd9e8" opacity="0.8" />
              <path d="M6 23 C4 25, 5 27, 7 26" stroke="#4dd9e8" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className="text-lg font-bold leading-none"
              style={{ fontFamily: 'Cinzel Decorative, cursive', color: '#4dd9e8', letterSpacing: '0.05em' }}
            >
              鲸落
            </span>
            <span
              className="text-xs leading-none mt-0.5"
              style={{ fontFamily: 'Cinzel, serif', color: 'rgba(232,244,248,0.6)', letterSpacing: '0.2em' }}
            >
              WHALEFALL
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="nav-link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Discord Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://discord.gg/whalefall"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-button-gold"
            style={{ padding: '8px 20px', fontSize: '0.75rem' }}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Discord
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#4dd9e8] p-2"
        >
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <div className="w-6 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-dark border-t border-[rgba(77,217,232,0.1)]"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

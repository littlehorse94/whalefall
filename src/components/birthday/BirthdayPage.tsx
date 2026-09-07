'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FallingPetals from './FallingPetals';
import { Blob, Blossom, RingShape, DiamondShape, Sparkle } from './Decor';

const PHOTO_DIR = '/gallery/Xiaoxingxing';

const STORY = [
  { title: 'The First Hello', photo: `${PHOTO_DIR}/2.webp` },
  { title: 'Our First Date', photo: `${PHOTO_DIR}/3.webp` },
  { title: 'Adventures Together', photo: `${PHOTO_DIR}/4.webp` },
  { title: 'You & Me', photo: `${PHOTO_DIR}/5.webp` },
];

const REASONS = [
  { icon: '🙂', text: '为了任务' },
  { icon: '♥', text: '为了衣服' },
  { icon: '♥', text: '年龄差', big: true },
  { icon: '★', text: '师徒' },
];

const roseText = '#8a3b57';
const roseAccent = '#d94f7c';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Every Chinese word on this page renders in Long Cang (already loaded
// site-wide via globals.css) instead of the Latin display fonts.
function Zh({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'Long Cang', cursive" }}>{children}</span>;
}

function PartnerName() {
  return (
    <>
      My <Zh>小星星</Zh>
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-4xl sm:text-5xl text-center"
      style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: roseText }}
    >
      {children}
    </h2>
  );
}

export default function BirthdayPage() {
  const [soundOn, setSoundOn] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(2);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [musicBoxOpen, setMusicBoxOpen] = useState(false);
  const storyTrackRef = useRef<HTMLDivElement>(null);

  // Swap the guild site's dark-theme scrollbar for a pink one while this
  // page is mounted, then hand it back on the way out.
  useEffect(() => {
    document.body.classList.add('birthday-theme');
    return () => document.body.classList.remove('birthday-theme');
  }, []);

  const scrollStory = (dir: 1 | -1) => {
    const track = storyTrackRef.current;
    if (!track) return;
    // Cards are ~78vw on mobile (the only width this button is shown at),
    // so scroll by roughly one card's width instead of a fixed pixel amount.
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflowX: 'hidden',
        background: 'linear-gradient(180deg, #fbe7dd 0%, #fbd9de 22%, #fdeef2 55%, #fdf5f7 100%)',
        color: roseText,
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
    >
      {/* ── Ambient background blobs (behind everything) ── */}
      <Blob size={380} color="#fcd2a8" style={{ top: -140, right: -160 }} />
      <Blob size={340} color="#f6a8c2" style={{ top: '55%', left: -200 }} />
      <Blob size={300} color="#e7c6e8" style={{ top: '115%', right: -160 }} />
      <Blob size={260} color="#fcd2a8" style={{ top: '175%', left: -150 }} />

      {/* Falling petals — fixed to the viewport so they drift over every
          section as the page scrolls, not just the hero. */}
      <FallingPetals />

      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 py-4">
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.1rem', color: roseText }}>
          For <PartnerName /> ♥
        </span>
        <button
          type="button"
          onClick={() => setSoundOn((v) => !v)}
          className="text-sm sm:text-base"
          style={{ color: roseText, opacity: 0.75, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {soundOn ? 'Sound on ♫' : 'Turn on sound ♫'}
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-12">
        {/* Static flower cluster + geometric accents, echoing the reference's corner blossoms */}
        <Blossom size={54} rotate={12} style={{ bottom: '8%', right: '4%' }} />
        <Blossom size={34} rotate={-18} opacity={0.45} style={{ bottom: '16%', right: '12%' }} />
        <Blossom size={26} rotate={40} opacity={0.4} style={{ bottom: '4%', right: '18%' }} />
        <Blossom size={30} rotate={-8} opacity={0.35} style={{ top: '14%', left: '4%' }} />
        <RingShape size={54} style={{ top: '30%', left: '10%' }} />
        <RingShape size={26} opacity={0.35} style={{ bottom: '22%', left: '20%' }} />
        <DiamondShape size={14} style={{ top: '20%', right: '30%' }} />
        <Sparkle size={20} style={{ top: '12%', right: '8%' }} />
        <Sparkle size={14} opacity={0.4} style={{ bottom: '30%', left: '30%' }} />

        <div className="relative z-10 flex-1 text-center lg:text-left">
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.6rem' }}>
            Happy
          </p>
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(3.5rem, 9vw, 6rem)',
              lineHeight: 1,
              color: roseAccent,
              margin: '0.1em 0',
            }}
          >
            Birthday
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem' }}>
            <PartnerName /> <span style={{ fontSize: '1.2rem' }}>♡</span>
          </p>
          <p className="mt-5 max-w-md mx-auto lg:mx-0" style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8 }}>
            <Zh>从师徒到侠缘，我们真的经历了很多很多</Zh>
          </p>
          <button
            type="button"
            onClick={() => scrollToId('story')}
            className="mt-7 px-8 py-3.5 rounded-full text-base font-medium"
            style={{ background: roseAccent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(217,79,124,0.35)' }}
          >
            Start Our Journey ♡
          </button>
          <button
            type="button"
            onClick={() => scrollToId('story')}
            className="block mt-8 mx-auto lg:mx-0 text-sm"
            style={{ background: 'none', border: 'none', color: roseText, opacity: 0.6, cursor: 'pointer' }}
          >
            Scroll down
            <motion.span
              className="block mx-auto"
              style={{ width: 14, marginTop: 2 }}
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              ⌄
            </motion.span>
          </button>
        </div>

        <div className="relative z-10 flex-1 flex justify-center">
          {/* Static, not animated — this card is visible immediately on
              load (above the fold), so a mount-triggered fade only adds
              risk (a rAF hiccup right after mount can leave it stuck
              mid-transition) for no visible benefit. */}
          <div
            style={{
              position: 'relative', background: '#fff', padding: '0.9rem 0.9rem 2.2rem',
              borderRadius: '4px', boxShadow: '0 25px 50px rgba(138,59,87,0.25)',
              width: 'min(80vw, 320px)', transform: 'rotate(-3deg)',
            }}
          >
            <div
              style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%) rotate(-4deg)',
                width: 70, height: 22, background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            />
            <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
              <Image src={`${PHOTO_DIR}/1.webp`} alt="Us" fill className="object-cover" sizes="320px" priority />
            </div>
            <p className="text-center mt-3" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem' }}>
              You mean the world to me ♥
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Story — photos only ── */}
      <section id="story" className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-12">
        <Blossom size={38} rotate={-15} opacity={0.4} style={{ top: '0%', left: '2%' }} />
        <RingShape size={40} opacity={0.3} style={{ bottom: '5%', right: '4%' }} />
        <SectionHeading>Our Story ♡</SectionHeading>
        <p className="text-center mt-2" style={{ opacity: 0.7, fontSize: '1.1rem' }}>Every moment with you is my favorite.</p>

        <div className="relative mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollStory(-1)}
            aria-label="Previous"
            className="flex sm:hidden flex-shrink-0 items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: '#fff', color: roseAccent, border: 'none', cursor: 'pointer', boxShadow: '0 6px 16px rgba(138,59,87,0.15)' }}
          >
            ‹
          </button>

          {/* Big enough to fill the row on tablet/desktop with no overflow
              (so no scrollbar appears there); on mobile the cards are
              deliberately wider than the viewport so the strip scrolls. */}
          <div ref={storyTrackRef} className="flex-1 overflow-x-auto sm:overflow-visible" style={{ scrollSnapType: 'x mandatory' }}>
            <div className="flex gap-4 sm:gap-6 pt-6 pb-10 sm:py-6 px-2">
              {/* Static, not scroll-triggered — these photos are the whole
                  point of the section, so they must always render, not
                  risk getting stuck mid-fade if the animation frame loop
                  hiccups right as the section scrolls into view (the same
                  failure mode fixed on the hero photo earlier). */}
              {STORY.map((s, i) => (
                <div
                  key={s.title}
                  className="flex-shrink-0 w-[78vw] sm:w-auto sm:flex-1 sm:flex-shrink"
                  style={{
                    position: 'relative', background: '#fff', padding: '0.6rem 0.6rem 1.4rem',
                    boxShadow: '0 15px 30px rgba(138,59,87,0.18)', scrollSnapAlign: 'center',
                    transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-3deg)',
                      width: 46, height: 16, background: 'rgba(255,255,255,0.7)', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  />
                  <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                    <Image src={s.photo} alt={s.title} fill className="object-cover" sizes="(max-width: 640px) 78vw, 22vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollStory(1)}
            aria-label="Next"
            className="flex sm:hidden flex-shrink-0 items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: roseAccent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 6px 16px rgba(138,59,87,0.25)' }}
          >
            ›
          </button>
        </div>
      </section>

      {/* ── Reasons Why I Love You ── */}
      <section id="reasons" className="relative z-10 px-6 pb-10">
        <div className="relative max-w-4xl mx-auto rounded-3xl px-6 sm:px-10 py-12 overflow-hidden" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <Blossom size={46} rotate={20} opacity={0.35} style={{ top: '-6%', right: '-2%' }} />
          <DiamondShape size={16} style={{ bottom: '8%', left: '4%' }} />
          <SectionHeading><Zh>记得我们的清醒四部曲吗</Zh> ♡</SectionHeading>
          <p className="text-center mt-2" style={{ opacity: 0.7, fontSize: '1.1rem' }}>Just a few of the countless reasons…</p>
          <p
            className="text-center mt-4 max-w-lg mx-auto"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.9 }}
          >
            <Zh>但是以后，我不想再有任何清醒四部曲，想忘了时间，忘了季节更替，沉沦于跟你一起的花海！</Zh>
          </p>

          <div className="mt-10 flex items-stretch justify-center gap-3 sm:gap-4 flex-wrap">
            {REASONS.map((r, i) => {
              const active = i === reasonIndex;
              return (
                <button
                  key={r.text}
                  type="button"
                  onClick={() => setReasonIndex(i)}
                  className="flex flex-col items-center justify-center text-center gap-3 rounded-2xl transition-all"
                  style={{
                    width: active ? 168 : 128,
                    padding: active ? '1.75rem 1.1rem' : '1.25rem 0.9rem',
                    background: active ? '#fff' : '#fdeef2',
                    boxShadow: active ? '0 20px 40px rgba(138,59,87,0.2)' : 'none',
                    border: 'none', cursor: 'pointer', color: roseText,
                  }}
                >
                  <span style={{ fontSize: active ? '2.1rem' : '1.5rem', color: roseAccent }}>{r.icon}</span>
                  <span className="font-medium" style={{ fontSize: '1.05rem', lineHeight: 1.4 }}><Zh>{r.text}</Zh></span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {REASONS.map((r, i) => (
              <button
                key={r.text}
                type="button"
                onClick={() => setReasonIndex(i)}
                aria-label={`Show reason ${i + 1}`}
                style={{
                  width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: i === reasonIndex ? roseAccent : 'rgba(217,79,124,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Special Surprise ── */}
      <section id="surprise" className="relative z-10 px-6 pb-14">
        <div
          className="relative max-w-4xl mx-auto rounded-3xl px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #fdeef2, #fbd9de)' }}
        >
          <Sparkle size={20} style={{ top: '10%', left: '6%' }} />
          <Sparkle size={14} opacity={0.4} style={{ bottom: '14%', right: '38%' }} />
          <RingShape size={30} opacity={0.3} style={{ top: '12%', right: '10%' }} />
          <div className="text-center sm:text-left">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem' }}>
              A Special Surprise Awaits You ♡
            </h3>
            <p className="mt-1" style={{ opacity: 0.75, fontSize: '1.05rem' }}>
              {surpriseOpen ? 'Happy birthday — this one is just for you.' : 'Click the button below to open your birthday surprise!'}
            </p>
            <AnimatePresence>
              {surpriseOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 italic"
                  style={{ maxWidth: 380, fontSize: '1rem' }}
                >
                  “[Write your special birthday message here — a memory, a promise, or
                  everything you love about them.]”
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {musicBoxOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 italic"
                  style={{ maxWidth: 380, fontSize: '1rem' }}
                >
                  🎵 [The <Zh>八音</Zh> melody plays here once the audio file is hooked up.] 🎵
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
              {!surpriseOpen && (
                <button
                  type="button"
                  onClick={() => setSurpriseOpen(true)}
                  className="px-7 py-3.5 rounded-full text-base font-medium"
                  style={{ background: roseAccent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(217,79,124,0.35)' }}
                >
                  Open Your Surprise 🎁
                </button>
              )}
              <button
                type="button"
                onClick={() => setMusicBoxOpen((v) => !v)}
                className="px-7 py-3.5 rounded-full text-base font-medium"
                style={{ background: '#fff', color: roseAccent, border: `1px solid ${roseAccent}`, cursor: 'pointer' }}
              >
                Click for <Zh>八音</Zh> 🎵
              </button>
            </div>
          </div>
          <motion.div
            animate={surpriseOpen ? { scale: [1, 1.2, 1] } : { scale: [1, 1.05, 1] }}
            transition={{ duration: surpriseOpen ? 0.6 : 2, repeat: surpriseOpen ? 0 : Infinity }}
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 96, height: 96, fontSize: '2.4rem',
              background: 'radial-gradient(circle, rgba(217,79,124,0.25), rgba(217,79,124,0.05))',
            }}
          >
            {surpriseOpen ? '💝' : '🔒'}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center px-6 pb-10">
        <Blossom size={28} rotate={0} opacity={0.5} style={{ position: 'static', display: 'inline-block', marginBottom: '0.5rem' }} />
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.4rem' }}>
          ♡ Happy Birthday, <PartnerName /> ♡
        </p>
        <p className="mt-1" style={{ opacity: 0.65, fontSize: '1rem' }}>I love you more than words can say.</p>
      </footer>
    </div>
  );
}

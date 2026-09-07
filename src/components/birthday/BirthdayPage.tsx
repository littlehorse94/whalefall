'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FallingPetals from './FallingPetals';
import WishesRain from './WishesRain';
import { Blob, Blossom, RingShape, DiamondShape, Sparkle } from './Decor';
import CardFanCarousel from '@/components/ui/card-fan-carousel';

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
      style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 800, color: roseText }}
    >
      {children}
    </h2>
  );
}

// The "song of the star" button is never meant to be caught — these tune
// how paranoid it is.
// It roams the whole viewport (not just the surprise card) so it always has
// somewhere to run — a small box meant it could eventually get cornered.
const DODGE_TRIGGER_RADIUS = 160; // start fleeing once the pointer gets this close (px)
const DODGE_JUMP = 300; // roughly how far it bolts per flee (px)
const DODGE_THROTTLE_MS = 80; // don't recompute on every single mousemove pixel
const DODGE_RETURN_DELAY_MS = 1500; // drift back home after this long without interaction
const DODGE_EDGE_MARGIN = 16; // never let it dodge fully off-screen

// This page's own background track — separate from the guild's ambient
// audio (which AudioToggle already hides on /birthday). Served from Blob
// storage rather than /public — large media there is gitignored and
// CDN-served (see .gitignore), same as the guild's own video/audio assets.
const BIRTHDAY_AUDIO_URL = 'https://fxkwv9qn6m8lrc7q.public.blob.vercel-storage.com/Tide%20of%20Jade%20Echoes.mp3';

export default function BirthdayPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(2);
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  // A hidden same-size spacer left in the button's normal spot in the
  // surprise card — reserves its layout space and, since it never itself
  // moves, doubles as the "home" position the real (fixed, viewport-roaming)
  // button drifts back to once left alone.
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const musicBtnRef = useRef<HTMLButtonElement>(null);
  // 'home': resting in the surprise card — pos is in document coordinates,
  // so it scrolls with the page exactly like an ordinary inline element.
  // 'fled': actively evading — pos is in viewport coordinates and the
  // button roams the whole visible screen, not just the card.
  const [mode, setMode] = useState<'home' | 'fled'>('home');
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  // Sits still until the very first direct hover/touch on the button
  // itself — only then does it start reacting to the cursor globally, so
  // it isn't already darting around before anyone's even found it.
  const [activated, setActivated] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const lastDodgeAtRef = useRef(0);
  const returnHomeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Swap the guild site's dark-theme scrollbar for a pink one while this
  // page is mounted, then hand it back on the way out.
  useEffect(() => {
    document.body.classList.add('birthday-theme');
    return () => document.body.classList.remove('birthday-theme');
  }, []);

  // This page's own background track. Browsers only block *starting*
  // playback-with-sound without a gesture — muted autoplay is always
  // allowed, and unmuting an already-playing element isn't gated the
  // same way. So it starts muted immediately (reliable) and unmutes
  // itself the instant there's any interaction at all, rather than
  // waiting on a fresh play() call that could itself get blocked.
  useEffect(() => {
    const audio = new Audio(BIRTHDAY_AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.6;
    audio.muted = true;
    audioRef.current = audio;

    // Skip the track's first 20s on load — currentTime only reliably
    // sticks once the browser knows the seekable range.
    audio.addEventListener('loadedmetadata', () => { audio.currentTime = 20; }, { once: true });

    audio.play().catch(() => {});

    const revealSound = () => {
      audio.muted = false;
      if (audio.paused) audio.play().catch(() => {});
      setSoundOn(true);
    };

    document.addEventListener('click', revealSound, { once: true });
    document.addEventListener('touchstart', revealSound, { once: true });
    document.addEventListener('keydown', revealSound, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', revealSound);
      document.removeEventListener('touchstart', revealSound);
      document.removeEventListener('keydown', revealSound);
    };
  }, []);

  useEffect(() => () => {
    if (returnHomeTimerRef.current) clearTimeout(returnHomeTimerRef.current);
  }, []);

  // Drifts the button back to the placeholder's current spot (re-measured
  // live, in viewport coordinates — the button is always position:fixed,
  // never absolute, so a mid-flight mode switch can never make its spring
  // animation misread stale coordinates in the wrong frame of reference).
  const returnHome = useCallback(() => {
    const home = placeholderRef.current;
    if (!home) return;
    const r = home.getBoundingClientRect();
    setPos({ x: r.left, y: r.top });
    setMode('home');
  }, []);

  // Bolts the "song of the star" button away from (pointerX, pointerY) if it's gotten too
  // close, landing anywhere in the viewport (with a small edge margin) —
  // not boxed into the surprise card, so it always has room to run.
  // Reads the button's live rect rather than any stored position, so it
  // composes cleanly however many times it's already fled.
  const fleeFrom = useCallback((pointerX: number, pointerY: number) => {
    const btn = musicBtnRef.current;
    if (!btn) return;

    const now = Date.now();
    if (now - lastDodgeAtRef.current < DODGE_THROTTLE_MS) return;

    const btnRect = btn.getBoundingClientRect();
    const centerX = btnRect.left + btnRect.width / 2;
    const centerY = btnRect.top + btnRect.height / 2;
    if (Math.hypot(centerX - pointerX, centerY - pointerY) > DODGE_TRIGGER_RADIUS) return;

    lastDodgeAtRef.current = now;

    // Flee roughly away from the pointer, with a little randomness so it
    // doesn't just ping-pong back and forth along one line.
    const away = Math.atan2(centerY - pointerY, centerX - pointerX);
    const angle = away + (Math.random() - 0.5) * 1.0;

    const maxX = Math.max(DODGE_EDGE_MARGIN, window.innerWidth - DODGE_EDGE_MARGIN - btnRect.width);
    const maxY = Math.max(DODGE_EDGE_MARGIN, window.innerHeight - DODGE_EDGE_MARGIN - btnRect.height);
    const rawX = btnRect.left + Math.cos(angle) * DODGE_JUMP;
    const rawY = btnRect.top + Math.sin(angle) * DODGE_JUMP;

    setPos({
      x: Math.min(Math.max(rawX, DODGE_EDGE_MARGIN), maxX),
      y: Math.min(Math.max(rawY, DODGE_EDGE_MARGIN), maxY),
    });
    setMode('fled');
    setDodgeCount((c) => c + 1);

    if (returnHomeTimerRef.current) clearTimeout(returnHomeTimerRef.current);
    returnHomeTimerRef.current = setTimeout(returnHome, DODGE_RETURN_DELAY_MS);
  }, [returnHome]);

  // Tracked globally (not just over the surprise card) so it starts fleeing
  // the instant the cursor gets close, wherever on the page that happens —
  // but only once activated (see the button's onMouseEnter/onTouchStart).
  useEffect(() => {
    if (!activated) return;
    const onMove = (e: MouseEvent) => fleeFrom(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) fleeFrom(t.clientX, t.clientY);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [activated, fleeFrom]);

  // Seed its starting position from the placeholder once mounted. Waits
  // for web fonts (the Chinese text is Long Cang) first — measuring
  // before they swap in and re-measuring afterward would mean two
  // different positions, and since the button is already mounted by
  // then, `initial={false}` can't suppress an animated glide between
  // them. Waiting means it only ever appears already in its right spot.
  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(returnHome);
    } else {
      returnHome();
    }
  }, [returnHome]);

  // While at rest, keep it visually anchored to the surprise card as the
  // page scrolls or resizes.
  useEffect(() => {
    if (mode !== 'home') return;
    window.addEventListener('scroll', returnHome, { passive: true });
    window.addEventListener('resize', returnHome);
    return () => {
      window.removeEventListener('scroll', returnHome);
      window.removeEventListener('resize', returnHome);
    };
  }, [mode, returnHome]);

  // Clicking/tapping it directly always counts as "too close" — it bolts
  // instead of doing anything else. It is never meant to be caught.
  const handleAttempt = () => {
    const r = musicBtnRef.current?.getBoundingClientRect();
    if (r) fleeFrom(r.left + r.width / 2, r.top + r.height / 2);
    else setDodgeCount((c) => c + 1);
  };

  // Mutes rather than pauses — keeps the element already-playing so
  // turning it back on is instant and never at risk of a fresh play()
  // call getting blocked.
  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.muted = true;
      setSoundOn(false);
    } else {
      audio.muted = false;
      if (audio.paused) audio.play().catch(() => {});
      setSoundOn(true);
    }
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
        fontWeight: 600,
      }}
    >
      {/* Falling petals — fixed to the viewport so they drift over every
          section as the page scrolls, not just the hero. */}
      <FallingPetals />

      {/* Rains every wish from Wishes.md down the screen once the surprise
          is opened — a single pass, not looped. */}
      {surpriseOpen && <WishesRain />}

      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center px-5 sm:px-8 py-4">
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.1rem', color: roseText }}>
          For <PartnerName /> ♥
        </span>
      </div>

      {/* ── Sound toggle — also doubles as the explicit gesture that
          unlocks autoplay in browsers that block it without one. ── */}
      <button
        type="button"
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-40 text-sm sm:text-base rounded-full px-4 py-2.5"
        style={{
          color: roseText, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
          border: `1px solid ${soundOn ? roseAccent : 'rgba(138,59,87,0.2)'}`,
          boxShadow: '0 6px 16px rgba(138,59,87,0.15)', cursor: 'pointer',
        }}
      >
        Song of little star ♫
      </button>

      {/* ── Hero ── */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-12">
        {/* Ambient color blob — a fixed pixel offset, safe regardless of
            this section's height (percentage offsets on earlier drafts of
            these blobs were placed on the whole unbounded page instead of
            a section, which stretched the scrollable page by thousands of
            pixels — see the other three blobs below for the same fix). */}
        <Blob size={380} color="#fcd2a8" style={{ top: -140, right: -160 }} />
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
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '1.6rem' }}>
            Happy
          </p>
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(3.5rem, 9vw, 6rem)',
              lineHeight: 1,
              color: roseAccent,
              fontWeight: 800,
              margin: '0.1em 0',
            }}
          >
            Birthday
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '1.9rem' }}>
            <PartnerName /> <span style={{ fontSize: '1.2rem' }}>♡</span>
          </p>
          <p className="mt-5 max-w-md mx-auto lg:mx-0" style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8 }}>
            <Zh>从师徒到侠缘，我们真的经历了很多很多</Zh>
          </p>
          <button
            type="button"
            onClick={() => scrollToId('story')}
            className="mt-7 px-8 py-3.5 rounded-full text-base font-bold"
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
          {/* Not animated on mount/load (a rAF hiccup right after mount can
              leave a mount-triggered animation stuck mid-transition) —
              only whileHover, which is a direct response to a pointer
              event and carries no such risk. */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: -1, boxShadow: '0 32px 60px rgba(138,59,87,0.35)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'relative', background: '#fff', padding: '0.9rem 0.9rem 2.2rem',
              borderRadius: '4px', boxShadow: '0 25px 50px rgba(138,59,87,0.25)',
              width: 'min(80vw, 320px)', rotate: -3,
            }}
          >
            <div
              style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%) rotate(-4deg)',
                width: 70, height: 22, background: 'rgba(255,255,255,0.65)', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            />
            <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
              <Image src={`${PHOTO_DIR}/1.webp`} alt="Us" fill className="object-cover" sizes="320px" priority />
            </div>
            <p className="text-center mt-3" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem' }}>
              You mean the world to me ♥
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Story — photos only ── */}
      <section id="story" className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-12">
        <Blob size={280} color="#f6a8c2" style={{ top: '10%', left: -180 }} />
        <Blossom size={38} rotate={-15} opacity={0.4} style={{ top: '0%', left: '2%' }} />
        <RingShape size={40} opacity={0.3} style={{ bottom: '5%', right: '4%' }} />
        <SectionHeading>Our Story ♡</SectionHeading>
        <p className="text-center mt-2" style={{ opacity: 0.7, fontSize: '1.1rem' }}>Every moment with you is my favorite.</p>

        <div className="mt-6">
          <CardFanCarousel
            cards={STORY.map((s) => ({ imgUrl: s.photo, alt: s.title }))}
            onCardClick={(card) => setLightboxPhoto(card.imgUrl)}
          />
        </div>
      </section>

      {/* ── Reasons Why I Love You ── */}
      <section id="reasons" className="relative z-10 px-6 pb-10">
        <div className="relative max-w-4xl mx-auto rounded-3xl px-6 sm:px-10 py-12 overflow-hidden" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <Blob size={260} color="#e7c6e8" style={{ bottom: '-15%', left: '-10%' }} />
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
                  <span className="font-bold" style={{ fontSize: '1.05rem', lineHeight: 1.4 }}><Zh>{r.text}</Zh></span>
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
          <Blob size={220} color="#fcd2a8" style={{ bottom: '-20%', right: '-8%' }} />
          <Sparkle size={20} style={{ top: '10%', left: '6%' }} />
          <Sparkle size={14} opacity={0.4} style={{ bottom: '14%', right: '38%' }} />
          <RingShape size={30} opacity={0.3} style={{ top: '12%', right: '10%' }} />
          <div className="text-center sm:text-left">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 800, fontSize: '1.9rem' }}>
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
                  Everyone who loves you had something to say — here it comes. ♡
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
              {!surpriseOpen && (
                <button
                  type="button"
                  onClick={() => setSurpriseOpen(true)}
                  className="px-7 py-3.5 rounded-full text-base font-bold"
                  style={{ background: roseAccent, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(217,79,124,0.35)' }}
                >
                  Open Your Surprise 🎁
                </button>
              )}
              {/* Never catchable, on purpose — see fleeFrom/handleAttempt.
                  This invisible spacer reserves the button's normal spot in
                  the layout and doubles as its "home" position; the real
                  button below is fixed to the viewport so it can roam the
                  whole page, not just this card, once something gets close. */}
              <span
                ref={placeholderRef}
                aria-hidden
                className="inline-block px-7 py-3.5 rounded-full text-base font-bold"
                style={{ visibility: 'hidden', border: '1px solid transparent' }}
              >
                song of the star ♥
              </span>
              {/* Portal'd to <body> — rendering it here would make its
                  position:absolute/fixed resolve against this card's own
                  box (it's a positioning container too), not the document
                  or viewport, breaking exactly the roaming this is for. */}
              {pos && typeof document !== 'undefined' && createPortal(
                <motion.button
                  ref={musicBtnRef}
                  type="button"
                  onClick={handleAttempt}
                  onMouseEnter={(e) => { setActivated(true); fleeFrom(e.clientX, e.clientY); }}
                  onTouchStart={(e) => {
                    setActivated(true);
                    const t = e.touches[0];
                    if (t) fleeFrom(t.clientX, t.clientY);
                  }}
                  initial={false}
                  // Perfectly still — same as the "Open Your Surprise"
                  // button next to it — until the first hover/touch. Only
                  // once activated does it pick up the idle float/wobble.
                  animate={
                    activated
                      ? { left: pos.x, top: pos.y, y: [0, -5, 0], rotate: [0, -3, 3, 0] }
                      : { left: pos.x, top: pos.y, y: 0, rotate: 0 }
                  }
                  transition={{
                    left: { type: 'tween', ease: 'easeOut', duration: 0.5 },
                    top: { type: 'tween', ease: 'easeOut', duration: 0.5 },
                    y: activated ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 },
                    rotate: activated ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 },
                  }}
                  className="px-7 py-3.5 rounded-full text-base font-bold"
                  style={{
                    position: 'fixed', zIndex: 60,
                    background: '#fff', color: roseAccent,
                    border: `1px solid ${roseAccent}`, cursor: 'pointer',
                  }}
                >
                  song of the star ♥
                </motion.button>,
                document.body,
              )}
            </div>
            <AnimatePresence>
              {dodgeCount > 0 && (
                <motion.p
                  key={dodgeCount < 3 ? 'a' : dodgeCount < 6 ? 'b' : 'c'}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 italic"
                  style={{ fontSize: '0.95rem', opacity: 0.7 }}
                >
                  {dodgeCount < 3 ? 'Nice try! 😄' : dodgeCount < 6 ? "You'll never catch it… 😆" : 'Still no. 😭'}
                </motion.p>
              )}
            </AnimatePresence>
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
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 800, fontSize: '1.4rem' }}>
          ♡ Happy Birthday, <PartnerName /> ♡
        </p>
        <p className="mt-1" style={{ opacity: 0.65, fontSize: '1rem' }}>I love you more than words can say.</p>
      </footer>

      {/* Story-photo lightbox — click any Our Story photo to pop it out;
          click the dark backdrop (not the photo itself) to dismiss. */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: 'rgba(20,10,15,0.8)', cursor: 'zoom-out' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
              style={{
                width: 'min(85vw, 620px)', aspectRatio: '1/1', background: '#fff',
                padding: '0.9rem', borderRadius: '4px', boxShadow: '0 30px 70px rgba(0,0,0,0.4)',
              }}
            >
              <div className="relative w-full h-full">
                <Image src={lightboxPhoto} alt="" fill className="object-cover" sizes="85vw" />
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Close"
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  top: -16, right: -16, width: 36, height: 36, background: '#fff', color: roseText,
                  border: 'none', cursor: 'pointer', boxShadow: '0 6px 16px rgba(0,0,0,0.25)', fontSize: '1.1rem',
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

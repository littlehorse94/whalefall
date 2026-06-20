'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ScrollVideoSection from '@/components/ScrollVideoSection';
import StatsSection from '@/components/StatsSection';
import ChronicleSection from '@/components/ChronicleSection';
import GallerySection from '@/components/GallerySection';
import HallOfLegends from '@/components/HallOfLegends';
import MontageLibrary from '@/components/MontageLibrary';
import PhotoContest from '@/components/PhotoContest';
import Guestbook from '@/components/Guestbook';
import WhaleSanctuary from '@/components/WhaleSanctuary';
import AudioToggle from '@/components/AudioToggle';

const Divider = ({ color = '#4dd9e8' }: { color?: string }) => (
  <div className="relative h-px mx-auto max-w-4xl my-2">
    <div
      className="absolute inset-0 opacity-30"
      style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
    />
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">

      <Navigation />

      {/* ── Part 1: pre-video loops → scrub on scroll ─────────────────────── */}
      <HeroSection />

      {/* ── Part 2: scroll-synced background video ────────────────────────── */}
      <ScrollVideoSection src="/src/wf-hero-part2.mp4" id="part2" />

      {/* ── Part 3: scroll-synced background video ────────────────────────── */}
      <ScrollVideoSection src="/src/wf-hero-part3.mp4" id="part3" />

      {/* ── Page content after cinematic intro ────────────────────────────── */}
      <div className="relative z-10">

        <StatsSection />

        <Divider />
        <ChronicleSection />

        <Divider />
        <GallerySection />

        <Divider color="#c9a84c" />
        <HallOfLegends />

        <Divider />
        <MontageLibrary />

        <Divider color="#c9a84c" />
        <PhotoContest />

        <Divider />
        <Guestbook />

        <WhaleSanctuary />

        <footer
          className="relative z-10 py-12 px-6 text-center"
          style={{
            background: 'rgba(1,2,4,0.95)',
            borderTop: '1px solid rgba(77,217,232,0.1)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div
              className="text-3xl font-bold mb-2 glow-cyan"
              style={{ fontFamily: 'Cinzel Decorative, cursive', color: '#4dd9e8' }}
            >
              鲸落 | Whalefall
            </div>
            <p
              className="text-xs text-[rgba(232,244,248,0.35)] mb-6"
              style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.2em' }}
            >
              TOP 60 SEA GUILD · WHERE WINDS MEET · EST. 2022
            </p>
            <div className="flex justify-center gap-6 mb-8">
              {['Discord', 'Gallery', 'Chronicle'].map((label, i) => (
                <span key={label} className="flex items-center gap-6">
                  {i > 0 && <span className="text-[rgba(77,217,232,0.2)]">·</span>}
                  <a
                    href={label === 'Discord' ? 'https://discord.gg/whalefall' : `#${label.toLowerCase()}`}
                    target={label === 'Discord' ? '_blank' : undefined}
                    rel={label === 'Discord' ? 'noopener noreferrer' : undefined}
                    className="text-xs text-[rgba(232,244,248,0.4)] hover:text-[#4dd9e8] transition-colors"
                    style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
                  >
                    {label}
                  </a>
                </span>
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(77,217,232,0.2)] to-transparent mb-6" />
            <p
              className="text-xs text-[rgba(232,244,248,0.2)]"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              &copy; 2025 Whalefall Guild. All memories preserved in the deep.
            </p>
          </div>
        </footer>
      </div>

      <AudioToggle />
    </main>
  );
}

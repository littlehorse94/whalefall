'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ChronicleSection from '@/components/ChronicleSection';
import GallerySection from '@/components/GallerySection';
import HallOfLegends from '@/components/HallOfLegends';
import MontageLibrary from '@/components/MontageLibrary';
import PhotoContest from '@/components/PhotoContest';
import Guestbook from '@/components/Guestbook';
import WhaleSanctuary from '@/components/WhaleSanctuary';
import AudioToggle from '@/components/AudioToggle';
import OceanBackground from '@/components/OceanBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed ocean background */}
      <OceanBackground />

      {/* Navigation */}
      <Navigation />

      {/* Content layers */}
      <div className="relative z-10">
        <HeroSection />

        {/* Stats */}
        <StatsSection />

        {/* Divider */}
        <div className="relative h-px mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent opacity-30" />
        </div>

        {/* Chronicle */}
        <ChronicleSection />

        {/* Divider */}
        <div className="relative h-px mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent opacity-30" />
        </div>

        {/* Gallery */}
        <GallerySection />

        {/* Divider */}
        <div className="relative h-px mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-30" />
        </div>

        {/* Hall of Legends */}
        <HallOfLegends />

        {/* Divider */}
        <div className="relative h-px mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent opacity-30" />
        </div>

        {/* Montage Library */}
        <MontageLibrary />

        {/* Divider */}
        <div className="relative h-px mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-30" />
        </div>

        {/* Photo Contest */}
        <PhotoContest />

        {/* Divider */}
        <div className="relative h-px mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4dd9e8] to-transparent opacity-30" />
        </div>

        {/* Guestbook */}
        <Guestbook />

        {/* Whale Sanctuary */}
        <WhaleSanctuary />

        {/* Footer */}
        <footer
          className="relative z-10 py-12 px-6 text-center"
          style={{
            background: 'rgba(1,2,4,0.9)',
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
              <a
                href="https://discord.gg/whalefall"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[rgba(232,244,248,0.4)] hover:text-[#4dd9e8] transition-colors"
                style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
              >
                Discord
              </a>
              <span className="text-[rgba(77,217,232,0.2)]">·</span>
              <a
                href="#gallery"
                className="text-xs text-[rgba(232,244,248,0.4)] hover:text-[#4dd9e8] transition-colors"
                style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
              >
                Gallery
              </a>
              <span className="text-[rgba(77,217,232,0.2)]">·</span>
              <a
                href="#chronicle"
                className="text-xs text-[rgba(232,244,248,0.4)] hover:text-[#4dd9e8] transition-colors"
                style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
              >
                Chronicle
              </a>
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

      {/* Fixed Audio Toggle */}
      <AudioToggle />
    </main>
  );
}

import type { Metadata } from 'next';
import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import GallerySection from '@/components/GallerySection';
import PhotoContest from '@/components/PhotoContest';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Memory Gallery',
  description: 'Screenshots and moments from Whalefall guild events, organised by event — PvP sieges, anniversaries, tournaments, and scenic exploration.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <PageVideoBackground />
      <ParticlesCanvas />
      <GlassNav />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ paddingTop: '7rem' }}>
          <GallerySection />
          <PhotoContest />
        </div>
        <Footer />
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import MontageLibrary from '@/components/MontageLibrary';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Montage Library',
  description: 'Cinematic montages and gameplay trailers from Whalefall and Where Winds Meet.',
  alternates: { canonical: '/montages' },
};

export default function MontagesPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <PageVideoBackground />
      <ParticlesCanvas />
      <GlassNav />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ paddingTop: '7rem' }}>
          <MontageLibrary />
        </div>
        <Footer />
      </div>
    </main>
  );
}

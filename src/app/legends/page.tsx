import type { Metadata } from 'next';
import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import HallOfLegends from '@/components/HallOfLegends';
import Guestbook from '@/components/Guestbook';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hall of Legends & Guestbook',
  description: 'Meet the members who carried the soul of Whalefall, and leave your own mark in the guestbook.',
  alternates: { canonical: '/legends' },
};

export default function LegendsPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <PageVideoBackground />
      <ParticlesCanvas />
      <GlassNav />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ paddingTop: '7rem' }}>
          <HallOfLegends />
          <Guestbook />
        </div>
        <Footer />
      </div>
    </main>
  );
}

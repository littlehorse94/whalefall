import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import SiteNav from '@/components/SiteNav';
import HallOfLegends from '@/components/HallOfLegends';
import Guestbook from '@/components/Guestbook';
import Footer from '@/components/Footer';

export default function LegendsPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <PageVideoBackground />
      <ParticlesCanvas />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SiteNav />
        <div style={{ paddingTop: '3rem' }}>
          <HallOfLegends />
          <Guestbook />
        </div>
        <Footer />
      </div>
    </main>
  );
}

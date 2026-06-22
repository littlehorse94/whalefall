import OceanBackground from '@/components/OceanBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import SiteNav from '@/components/SiteNav';
import MontageLibrary from '@/components/MontageLibrary';
import Footer from '@/components/Footer';

export default function MontagesPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <OceanBackground />
      <ParticlesCanvas />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SiteNav />
        <div style={{ paddingTop: '3rem' }}>
          <MontageLibrary />
        </div>
        <Footer />
      </div>
    </main>
  );
}

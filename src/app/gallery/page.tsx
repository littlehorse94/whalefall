import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import GallerySection from '@/components/GallerySection';
import PhotoContest from '@/components/PhotoContest';
import Footer from '@/components/Footer';

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

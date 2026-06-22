import OceanBackground from '@/components/OceanBackground';
import SiteNav from '@/components/SiteNav';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <OceanBackground />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SiteNav />
        <div style={{ paddingTop: '3rem' }}>
          <GallerySection />
        </div>
        <Footer />
      </div>
    </main>
  );
}

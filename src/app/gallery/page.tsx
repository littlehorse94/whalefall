import type { Metadata } from 'next';
import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import GallerySection from '@/components/GallerySection';
import PhotoContest from '@/components/PhotoContest';
import Footer from '@/components/Footer';
import { getSection } from '@/lib/blob-store';
import { GALLERY_SEED, MEDIA_SEED, PHOTO_CONTEST_SEED, SITE_SETTINGS_SEED } from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Memory Gallery',
  description: 'Screenshots and moments from Whalefall guild events, organised by event — PvP sieges, anniversaries, tournaments, and scenic exploration.',
  alternates: { canonical: '/gallery' },
};

export default async function GalleryPage() {
  const [events, media, contest, settings] = await Promise.all([
    getSection('gallery', GALLERY_SEED),
    getSection('media', MEDIA_SEED),
    getSection('photo-contest', PHOTO_CONTEST_SEED),
    getSection('site-settings', SITE_SETTINGS_SEED),
  ]);

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <PageVideoBackground videoUrl={media.pageVideoUrl} />
      <ParticlesCanvas />
      <GlassNav navLinks={settings.navLinks} discordInviteUrl={settings.discordInviteUrl} guildName={settings.guildName} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ paddingTop: '7rem' }}>
          <GallerySection events={events} />
          <PhotoContest config={contest} />
        </div>
        <Footer settings={settings} />
      </div>
    </main>
  );
}

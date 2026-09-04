import type { Metadata } from 'next';
import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import MontageLibrary from '@/components/MontageLibrary';
import Footer from '@/components/Footer';
import { getSection } from '@/lib/blob-store';
import { MONTAGES_SEED, MEDIA_SEED, SITE_SETTINGS_SEED } from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Montage Library',
  description: 'Cinematic montages and gameplay trailers from Whalefall and Where Winds Meet.',
  alternates: { canonical: '/montages' },
};

export default async function MontagesPage() {
  const [categories, media, settings] = await Promise.all([
    getSection('montages', MONTAGES_SEED),
    getSection('media', MEDIA_SEED),
    getSection('site-settings', SITE_SETTINGS_SEED),
  ]);

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#fff', position: 'relative' }}>
      <PageVideoBackground videoUrl={media.pageVideoUrl} />
      <ParticlesCanvas />
      <GlassNav navLinks={settings.navLinks} discordInviteUrl={settings.discordInviteUrl} guildName={settings.guildName} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ paddingTop: '7rem' }}>
          <MontageLibrary categories={categories} />
        </div>
        <Footer settings={settings} />
      </div>
    </main>
  );
}

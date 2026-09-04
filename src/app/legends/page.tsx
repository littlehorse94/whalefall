import type { Metadata } from 'next';
import PageVideoBackground from '@/components/PageVideoBackground';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import GlassNav from '@/components/GlassNav';
import HallOfLegends from '@/components/HallOfLegends';
import Guestbook from '@/components/Guestbook';
import Footer from '@/components/Footer';
import { getSection } from '@/lib/blob-store';
import { LEGENDS_SEED, GUESTBOOK_SEED, MEDIA_SEED, SITE_SETTINGS_SEED } from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hall of Legends & Guestbook',
  description: 'Meet the members who carried the soul of Whalefall, and leave your own mark in the guestbook.',
  alternates: { canonical: '/legends' },
};

export default async function LegendsPage() {
  const [members, entries, media, settings] = await Promise.all([
    getSection('legends', LEGENDS_SEED),
    getSection('guestbook', GUESTBOOK_SEED),
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
          <HallOfLegends members={members} />
          <Guestbook entries={entries} />
        </div>
        <Footer settings={settings} />
      </div>
    </main>
  );
}

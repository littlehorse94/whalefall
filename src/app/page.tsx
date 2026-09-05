import HomeView from '@/components/HomeView';
import { getSection } from '@/lib/blob-store';
import { getVotedPhotoId } from '@/lib/public-actions';
import {
  HERO_SEED, STATS_SEED, CHRONICLE_SEED, DISCORD_SEED, MEDIA_SEED, SITE_SETTINGS_SEED, getPhotoContestConfig,
} from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [hero, stats, milestones, discord, contest, media, settings, votedPhotoId] = await Promise.all([
    getSection('hero', HERO_SEED),
    getSection('stats', STATS_SEED),
    getSection('chronicle', CHRONICLE_SEED),
    getSection('discord', DISCORD_SEED),
    getPhotoContestConfig(),
    getSection('media', MEDIA_SEED),
    getSection('site-settings', SITE_SETTINGS_SEED),
    getVotedPhotoId(),
  ]);

  return (
    <HomeView
      hero={hero}
      stats={stats}
      milestones={milestones}
      discord={discord}
      contest={contest}
      media={media}
      settings={settings}
      votedPhotoId={votedPhotoId}
    />
  );
}

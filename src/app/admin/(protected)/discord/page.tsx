import { getSection } from '@/lib/blob-store';
import { DISCORD_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import DiscordManager from './DiscordManager';

export default async function DiscordAdminPage() {
  const data = await getSection('discord', DISCORD_SEED);
  return (
    <div>
      <SectionHeading title="Discord Widget" description="Invite link, live-activity display, and highlights feed." />
      <DiscordManager initial={data} />
    </div>
  );
}

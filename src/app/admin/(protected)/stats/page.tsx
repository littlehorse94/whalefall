import { getSection } from '@/lib/blob-store';
import { STATS_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import StatsManager from './StatsManager';

export default async function StatsAdminPage() {
  const items = await getSection('stats', STATS_SEED);
  return (
    <div>
      <SectionHeading title="Stats" description="The 6 animated stat tiles on the homepage." />
      <StatsManager initialItems={items} />
    </div>
  );
}

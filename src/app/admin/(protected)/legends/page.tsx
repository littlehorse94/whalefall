import { getSection } from '@/lib/blob-store';
import { LEGENDS_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import LegendsManager from './LegendsManager';

export default async function LegendsAdminPage() {
  const items = await getSection('legends', LEGENDS_SEED);
  return (
    <div>
      <SectionHeading title="Hall of Legends" description="Officer / legend member profiles." />
      <LegendsManager initialItems={items} />
    </div>
  );
}

import { getSection } from '@/lib/blob-store';
import { MONTAGES_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import MontagesManager from './MontagesManager';

export default async function MontagesAdminPage() {
  const items = await getSection('montages', MONTAGES_SEED);
  return (
    <div>
      <SectionHeading title="Montage Library" description="Video categories and montages (YouTube ID or uploaded file)." />
      <MontagesManager initialItems={items} />
    </div>
  );
}

import { getSection } from '@/lib/blob-store';
import { CHRONICLE_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import ChronicleManager from './ChronicleManager';

export default async function ChronicleAdminPage() {
  const items = await getSection('chronicle', CHRONICLE_SEED);
  return (
    <div>
      <SectionHeading title="Guild Chronicle" description="The guild history timeline." />
      <ChronicleManager initialItems={items} />
    </div>
  );
}

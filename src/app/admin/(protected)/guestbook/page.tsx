import { getSection } from '@/lib/blob-store';
import { GUESTBOOK_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import GuestbookManager from './GuestbookManager';

export default async function GuestbookAdminPage() {
  const items = await getSection('guestbook', GUESTBOOK_SEED);
  return (
    <div>
      <SectionHeading title="Guestbook" description="Moderate messages submitted by visitors on the public site." />
      <GuestbookManager initialItems={items} />
    </div>
  );
}

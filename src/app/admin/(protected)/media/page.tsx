import { getSection } from '@/lib/blob-store';
import { MEDIA_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import MediaManager from './MediaManager';

export default async function MediaAdminPage() {
  const data = await getSection('media', MEDIA_SEED);
  return (
    <div>
      <SectionHeading title="Media" description="Background videos and ambient audio track." />
      <MediaManager initial={data} />
    </div>
  );
}

import { getSection } from '@/lib/blob-store';
import { PHOTO_CONTEST_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import PhotoContestManager from './PhotoContestManager';

export default async function PhotoContestAdminPage() {
  const data = await getSection('photo-contest', PHOTO_CONTEST_SEED);
  return (
    <div>
      <SectionHeading title="Photo Contest" description="Contest details and submitted photos. Votes are cast from the public site." />
      <PhotoContestManager initial={data} />
    </div>
  );
}

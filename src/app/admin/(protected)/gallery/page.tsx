import { getSection } from '@/lib/blob-store';
import { GALLERY_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import GalleryManager from './GalleryManager';

export default async function GalleryAdminPage() {
  const items = await getSection('gallery', GALLERY_SEED);
  return (
    <div>
      <SectionHeading title="Gallery" description="Event albums and photos." />
      <GalleryManager initialItems={items} />
    </div>
  );
}

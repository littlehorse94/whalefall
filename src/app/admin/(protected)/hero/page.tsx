import { getSection } from '@/lib/blob-store';
import { HERO_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import HeroManager from './HeroManager';

export default async function HeroAdminPage() {
  const data = await getSection('hero', HERO_SEED);
  return (
    <div>
      <SectionHeading title="Hero" description="Homepage headline, CTA buttons, and the 6 preview cards." />
      <HeroManager initial={data} />
    </div>
  );
}

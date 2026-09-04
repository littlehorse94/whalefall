import { getSection } from '@/lib/blob-store';
import { SITE_SETTINGS_SEED } from '@/lib/seed-data';
import { SectionHeading } from '@/components/admin/ui';
import SiteSettingsManager from './SiteSettingsManager';

export default async function SiteSettingsAdminPage() {
  const data = await getSection('site-settings', SITE_SETTINGS_SEED);
  return (
    <div>
      <SectionHeading title="Site Settings" description="Guild name/rank, single-source Discord link, nav links, footer text." />
      <SiteSettingsManager initial={data} />
    </div>
  );
}

'use client';

import SettingsForm from '@/components/admin/SettingsForm';
import { TextField, TextAreaField, InlineListEditor } from '@/components/admin/ui';
import { saveSiteSettings } from './actions';
import type { SiteSettings } from '@/lib/content-types';

export default function SiteSettingsManager({ initial }: { initial: SiteSettings }) {
  return (
    <SettingsForm<SiteSettings>
      initial={initial}
      onSave={saveSiteSettings}
      renderForm={(data, update) => (
        <>
          <TextField label="Guild name" value={data.guildName} onChange={(v) => update({ guildName: v })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <TextField label="Guild rank" value={data.guildRank} onChange={(v) => update({ guildRank: v })} />
            <TextField label="Member count (display)" value={data.memberCount} onChange={(v) => update({ memberCount: v })} />
          </div>
          <TextField label="Discord invite URL (single source used site-wide)" value={data.discordInviteUrl} onChange={(v) => update({ discordInviteUrl: v })} />

          <InlineListEditor
            label="Nav links"
            items={data.navLinks}
            onChange={(navLinks) => update({ navLinks })}
            createEmpty={() => ({ id: crypto.randomUUID(), label: '', href: '' })}
            renderRow={(link, updateRow) => (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <TextField label="Label" value={link.label} onChange={(v) => updateRow({ label: v })} />
                <TextField label="Link" value={link.href} onChange={(v) => updateRow({ href: v })} />
              </div>
            )}
          />

          <TextField label="Footer tagline" value={data.footerTagline} onChange={(v) => update({ footerTagline: v })} />
          <TextAreaField label="Footer copyright" value={data.footerCopyright} onChange={(v) => update({ footerCopyright: v })} rows={2} />
          <TextField label="Footer credit line" value={data.footerCredit} onChange={(v) => update({ footerCredit: v })} />
        </>
      )}
    />
  );
}

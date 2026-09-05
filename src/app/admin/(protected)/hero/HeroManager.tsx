'use client';

import SettingsForm from '@/components/admin/SettingsForm';
import { TextField, TextAreaField, InlineListEditor } from '@/components/admin/ui';
import { saveHero } from './actions';
import type { HeroContent } from '@/lib/content-types';

export default function HeroManager({ initial }: { initial: HeroContent }) {
  return (
    <SettingsForm<HeroContent>
      initial={initial}
      onSave={saveHero}
      renderForm={(data, update) => (
        <>
          <TextField label="Eyebrow text" value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
          <TextField label="Headline (before highlight)" value={data.headlinePrefix} onChange={(v) => update({ headlinePrefix: v })} />
          <TextField label="Headline (highlighted word)" value={data.headlineHighlight} onChange={(v) => update({ headlineHighlight: v })} />
          <TextField label="Headline (after highlight)" value={data.headlineSuffix} onChange={(v) => update({ headlineSuffix: v })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField label="Primary CTA label" value={data.ctaPrimaryLabel} onChange={(v) => update({ ctaPrimaryLabel: v })} />
            <TextField label="Secondary CTA label" value={data.ctaSecondaryLabel} onChange={(v) => update({ ctaSecondaryLabel: v })} />
          </div>
          <TextField label="Secondary CTA link" value={data.ctaSecondaryHref} onChange={(v) => update({ ctaSecondaryHref: v })} />
          <TextField label="Reveal section eyebrow" value={data.revealEyebrow} onChange={(v) => update({ revealEyebrow: v })} />
          <TextAreaField label="Reveal section quote" value={data.revealQuote} onChange={(v) => update({ revealQuote: v })} />

          <InlineListEditor
            label="Preview cards"
            items={data.cards}
            onChange={(cards) => update({ cards })}
            createEmpty={() => ({ id: crypto.randomUUID(), title: '', body: '', href: '' })}
            renderRow={(card, updateRow) => (
              <>
                <TextField label="Title" value={card.title} onChange={(v) => updateRow({ title: v })} />
                <TextAreaField label="Body" value={card.body} onChange={(v) => updateRow({ body: v })} rows={2} />
                <TextField label="Link" value={card.href} onChange={(v) => updateRow({ href: v })} />
              </>
            )}
          />
        </>
      )}
    />
  );
}

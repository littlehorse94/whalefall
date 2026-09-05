export interface SectionPreview {
  /** Public path to render in the live preview iframe. */
  path: string;
  /** Vertical scroll offset (px) within a fixed 1280x900 reference viewport that frames this section. */
  scrollTop: number;
}

export interface AdminSection {
  slug: string;
  label: string;
  description: string;
  preview: SectionPreview;
}

export interface AdminSectionGroup {
  group: string;
  description: string;
  sections: AdminSection[];
}

export const ADMIN_SECTION_GROUPS: AdminSectionGroup[] = [
  {
    group: 'Site-wide',
    description: 'Shows up on every page.',
    sections: [
      { slug: 'site-settings', label: 'Site Settings', description: 'Guild name/rank, single-source Discord link, nav links, footer text.', preview: { path: '/', scrollTop: 0 } },
      { slug: 'media', label: 'Media', description: 'Background videos and ambient audio track.', preview: { path: '/', scrollTop: 0 } },
    ],
  },
  {
    group: 'Homepage',
    description: 'whalefall-ten.vercel.app/',
    sections: [
      { slug: 'hero', label: 'Hero', description: 'Homepage headline, CTA buttons, and the 6 preview cards.', preview: { path: '/', scrollTop: 0 } },
      { slug: 'stats', label: 'Stats', description: 'The animated stat tiles (rank, members, years, etc).', preview: { path: '/', scrollTop: 3330 } },
      { slug: 'chronicle', label: 'Guild Chronicle', description: 'The guild history timeline.', preview: { path: '/', scrollTop: 4030 } },
      { slug: 'discord', label: 'Discord Widget', description: 'Invite link, live-activity display, highlights feed.', preview: { path: '/', scrollTop: 6270 } },
      { slug: 'photo-contest', label: 'Photo Contest', description: 'Contest details and submitted photos. Also shown on the Gallery page.', preview: { path: '/', scrollTop: 7157 } },
    ],
  },
  {
    group: 'Gallery page',
    description: 'whalefall-ten.vercel.app/gallery',
    sections: [
      { slug: 'gallery', label: 'Gallery', description: 'Event albums and photos.', preview: { path: '/gallery', scrollTop: 112 } },
    ],
  },
  {
    group: 'Hall of Legends page',
    description: 'whalefall-ten.vercel.app/legends',
    sections: [
      { slug: 'legends', label: 'Hall of Legends', description: 'Officer / legend member profiles.', preview: { path: '/legends', scrollTop: 112 } },
      { slug: 'guestbook', label: 'Guestbook', description: 'Moderate messages submitted by visitors.', preview: { path: '/legends', scrollTop: 1092 } },
    ],
  },
  {
    group: 'Montage Library page',
    description: 'whalefall-ten.vercel.app/montages',
    sections: [
      { slug: 'montages', label: 'Montage Library', description: 'Video categories and montages.', preview: { path: '/montages', scrollTop: 112 } },
    ],
  },
];

export const ADMIN_SECTIONS: AdminSection[] = ADMIN_SECTION_GROUPS.flatMap((g) => g.sections);

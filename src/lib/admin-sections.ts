export interface AdminSection {
  slug: string;
  label: string;
  description: string;
  icon: string;
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
      { slug: 'site-settings', label: 'Site Settings', description: 'Guild name/rank, single-source Discord link, nav links, footer text.', icon: '⚙️' },
      { slug: 'media', label: 'Media', description: 'Background videos and ambient audio track.', icon: '🎬' },
    ],
  },
  {
    group: 'Homepage',
    description: 'whalefall-ten.vercel.app/',
    sections: [
      { slug: 'hero', label: 'Hero', description: 'Homepage headline, CTA buttons, and the 6 preview cards.', icon: '🏔️' },
      { slug: 'stats', label: 'Stats', description: 'The animated stat tiles (rank, members, years, etc).', icon: '📊' },
      { slug: 'chronicle', label: 'Guild Chronicle', description: 'The guild history timeline.', icon: '📜' },
      { slug: 'discord', label: 'Discord Widget', description: 'Invite link, live-activity display, highlights feed.', icon: '💬' },
      { slug: 'photo-contest', label: 'Photo Contest', description: 'Contest details and submitted photos. Also shown on the Gallery page.', icon: '🏆' },
    ],
  },
  {
    group: 'Gallery page',
    description: 'whalefall-ten.vercel.app/gallery',
    sections: [
      { slug: 'gallery', label: 'Gallery', description: 'Event albums and photos.', icon: '🖼️' },
    ],
  },
  {
    group: 'Hall of Legends page',
    description: 'whalefall-ten.vercel.app/legends',
    sections: [
      { slug: 'legends', label: 'Hall of Legends', description: 'Officer / legend member profiles.', icon: '👑' },
      { slug: 'guestbook', label: 'Guestbook', description: 'Moderate messages submitted by visitors.', icon: '✍️' },
    ],
  },
  {
    group: 'Montage Library page',
    description: 'whalefall-ten.vercel.app/montages',
    sections: [
      { slug: 'montages', label: 'Montage Library', description: 'Video categories and montages.', icon: '🎥' },
    ],
  },
];

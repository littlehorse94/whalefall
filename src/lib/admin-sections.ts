export interface AdminSection {
  slug: string;
  label: string;
  description: string;
}

export const ADMIN_SECTIONS: AdminSection[] = [
  { slug: 'hero', label: 'Hero', description: 'Homepage headline, CTA buttons, and the 6 preview cards.' },
  { slug: 'media', label: 'Media', description: 'Background videos and ambient audio track.' },
  { slug: 'stats', label: 'Stats', description: 'The animated stat tiles (rank, members, years, etc).' },
  { slug: 'chronicle', label: 'Guild Chronicle', description: 'The guild history timeline.' },
  { slug: 'gallery', label: 'Gallery', description: 'Event albums and photos.' },
  { slug: 'legends', label: 'Hall of Legends', description: 'Officer / legend member profiles.' },
  { slug: 'montages', label: 'Montage Library', description: 'Video categories and montages.' },
  { slug: 'discord', label: 'Discord Widget', description: 'Invite link, live-activity display, highlights feed.' },
  { slug: 'guestbook', label: 'Guestbook', description: 'Moderate messages submitted by visitors.' },
  { slug: 'photo-contest', label: 'Photo Contest', description: 'Contest details and submitted photos.' },
  { slug: 'site-settings', label: 'Site Settings', description: 'Guild name/rank, nav links, footer text.' },
];

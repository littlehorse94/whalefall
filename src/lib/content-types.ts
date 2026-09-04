// Shared shapes for every editable content section. These are the single
// source of truth used by the admin CRUD pages, the public components that
// render the content, and the one-time seed script.

export interface HeroCard {
  id: string;
  title: string;
  body: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  revealEyebrow: string;
  revealQuote: string;
  cards: HeroCard[];
}

export interface MediaSettings {
  heroVideoUrls: string[];
  pageVideoUrl: string;
  audioUrl: string;
  audioLabelPlaying: string;
  audioLabelPaused: string;
}

export interface StatTile {
  id: string;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  desc: string;
}

export interface Milestone {
  id: string;
  year: string;
  month: string;
  title: string;
  desc: string;
  icon: string;
  side: 'left' | 'right';
}

export interface LightboxPhoto {
  id: string;
  url: string;
  title: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  photos: LightboxPhoto[];
}

export interface LegendMember {
  id: string;
  name: string;
  role: string;
  title: string;
  joinDate: string;
  badge: string;
  badgeLabel: string;
  quote: string;
  color: string;
  glowColor: string;
  gradient: string;
  initials: string;
  photoUrl?: string;
}

export interface Montage {
  id: string;
  title: string;
  youtubeId: string;
  videoUrl?: string;
  views: string;
  likes: string;
}

export interface MontageCategory {
  id: string;
  title: string;
  description: string;
  videos: Montage[];
}

export interface DiscordMember {
  id: string;
  username: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  avatarUrl: string | null;
}

export interface DiscordChannel {
  id: string;
  name: string;
}

export interface DiscordHighlight {
  id: string;
  tag: string;
  text: string;
  time: string;
}

export interface DiscordConfig {
  inviteUrl: string;
  guildName: string;
  presenceCount: number;
  memberCount: number;
  boostLevel: number;
  members: DiscordMember[];
  channels: DiscordChannel[];
  highlights: DiscordHighlight[];
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
  avatar: string;
  color: string;
}

export interface ContestPhoto {
  id: string;
  url: string;
  submitter: string;
  title: string;
  votes: number;
}

export interface PhotoContestConfig {
  theme: string;
  monthLabel: string;
  daysLeft: number;
  description: string;
  photos: ContestPhoto[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SiteSettings {
  guildName: string;
  guildRank: string;
  memberCount: string;
  discordInviteUrl: string;
  navLinks: NavLink[];
  footerTagline: string;
  footerCredit: string;
  footerCopyright: string;
}

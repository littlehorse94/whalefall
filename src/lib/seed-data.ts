// Default content for every section — this is today's real site copy. It
// doubles as the fallback `getSection` returns before an admin has ever
// saved that section, so the site (and the admin panel) always shows real
// content instead of an empty list on first load.
import type {
  HeroContent, MediaSettings, StatTile, Milestone, GalleryEvent, LegendMember,
  MontageCategory, DiscordConfig, GuestbookEntry, PhotoContestConfig, SiteSettings,
} from './content-types';

export const HERO_SEED: HeroContent = {
  eyebrow: 'Our Legacy',
  headlinePrefix: 'Where battles end,',
  headlineHighlight: 'memories',
  headlineSuffix: 'remain forever.',
  ctaPrimaryLabel: 'Join Our Discord',
  ctaSecondaryLabel: 'Enter the Abyss →',
  ctaSecondaryHref: '#chronicle',
  revealEyebrow: 'Est. 2022 · Top 60 SEA',
  revealQuote: '"Some battles fade. Some memories become legends."',
  cards: [
    { id: 'chronicle', title: 'Guild Chronicle', body: 'A living timeline of our victories, milestones, and turning points since 2022.', href: '#chronicle' },
    { id: 'gallery', title: 'Memory Gallery', body: 'Screenshots and moments from PvP, PvE, guild events, and beyond — preserved in the deep.', href: '/gallery' },
    { id: 'legends', title: 'Hall of Legends', body: 'Honouring the members who carried the soul of Whalefall through every battle.', href: '/legends' },
    { id: 'montages', title: 'Montage Library', body: 'Relive the battles, the laughs, and the legends through our cinematic video archive.', href: '/montages' },
    { id: 'photo-contest', title: 'Photo Contest', body: 'Vote for the best screenshot of the month. Every frame a story worth remembering.', href: '#photo-contest' },
    { id: 'guestbook', title: 'Guestbook', body: 'Leave your mark. Share a memory, a thank-you, or words for the guild in the deep.', href: '/legends#guestbook' },
  ],
};

export const MEDIA_SEED: MediaSettings = {
  heroVideoUrls: [
    'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/wf-hero-pre.mp4',
    'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/wf-hero-video.mp4',
  ],
  pageVideoUrl: 'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/wf-page-video.mp4',
  audioUrl: 'https://24crvoriam0dl2l7.public.blob.vercel-storage.com/Celestial-Whale-Tide.mp3',
  audioLabelPlaying: 'Ocean Song ♪',
  audioLabelPaused: 'Song of the Deep',
};

export const STATS_SEED: StatTile[] = [
  { id: 'rank', label: 'SEA Ranking', value: 60, prefix: 'Top ', suffix: '', desc: 'In Where Winds Meet' },
  { id: 'members', label: 'Members', value: 200, prefix: '', suffix: '+', desc: 'Active adventurers' },
  { id: 'age', label: 'Guild Age', value: 3, prefix: '', suffix: ' Years', desc: 'Of shared memories' },
  { id: 'events', label: 'Events Hosted', value: 50, prefix: '', suffix: '+', desc: 'Epic gatherings' },
  { id: 'photos', label: 'Photos Uploaded', value: 1000, prefix: '', suffix: '+', desc: 'Captured moments' },
  { id: 'montages', label: 'Montages', value: 20, prefix: '', suffix: '+', desc: 'Cinematic memories' },
];

export const CHRONICLE_SEED: Milestone[] = [
  { id: 'm1', year: '2022', month: 'March', title: 'Guild Founded', desc: 'Whalefall (鲸落) was established by a group of passionate adventurers united by one dream — to build a guild that feels like a second family.', icon: '🐋', side: 'left' },
  { id: 'm2', year: '2022', month: 'August', title: 'First PvP Victory', desc: 'Our first major battlefield triumph. The strategy, the coordination, the roar of 30 voices celebrating in voice chat — unforgettable.', icon: '⚔️', side: 'right' },
  { id: 'm3', year: '2023', month: 'February', title: 'Reached Top 100 SEA', desc: 'A landmark achievement as Whalefall broke into the Top 100 guilds in Southeast Asia, cementing our place among the elite.', icon: '🏆', side: 'left' },
  { id: 'm4', year: '2023', month: 'March', title: '1st Guild Anniversary', desc: 'We celebrated one year of laughter, battles, and late-night raids. The anniversary party drew over 80 members in a single event.', icon: '🎉', side: 'right' },
  { id: 'm5', year: '2024', month: 'January', title: 'Broke into Top 60 SEA', desc: 'Through relentless dedication and tactical brilliance, Whalefall ascended to the Top 60 — where legends dwell.', icon: '🌊', side: 'left' },
  { id: 'm6', year: '2024', month: 'September', title: '100th Member Milestone', desc: 'One hundred adventurers now called Whalefall home. Each one a chapter in our ongoing story of the deep.', icon: '👥', side: 'right' },
  { id: 'm7', year: '2025', month: 'March', title: '3rd Anniversary Celebration', desc: 'Three years strong. The guild gathered for our grandest celebration yet — a testament to bonds forged in the depths of adventure.', icon: '✨', side: 'left' },
];

export const GALLERY_SEED: GalleryEvent[] = [
  {
    id: 'iron-gate', title: 'Siege of Iron Gate', date: 'PvP · 2023',
    description: 'Our biggest battlefield campaign — three guilds, one gate, and a night nobody forgot.',
    photos: [
      { id: 'p1', url: '/gallery/blade-drawn.webp', title: 'Blade Drawn' },
      { id: 'p2', url: '/gallery/old-allies.webp', title: 'Old Allies' },
      { id: 'p3', url: '/gallery/under-the-storm.webp', title: 'Under the Storm' },
    ],
  },
  {
    id: 'anniversary-2023', title: '3rd Anniversary Celebration', date: 'Guild Gathering · March 2023',
    description: 'Three years of Whalefall, celebrated with the whole guild in one server.',
    photos: [
      { id: 'p4', url: '/gallery/winter-gathering.webp', title: 'Winter Gathering' },
      { id: 'p5', url: '/gallery/a-familiar-face.webp', title: 'A Familiar Face' },
      { id: 'p6', url: '/gallery/golden-hour.webp', title: 'Golden Hour' },
    ],
  },
  {
    id: 'summer-tournament', title: 'Summer Tournament 2024', date: 'Events · Summer 2024',
    description: 'Our annual guild tournament — raids, races, and a screenshot contest.',
    photos: [
      { id: 'p7', url: '/gallery/storm-on-the-horizon.webp', title: 'Storm on the Horizon' },
      { id: 'p8', url: '/gallery/moonlit-watch.webp', title: 'Moonlit Watch' },
      { id: 'p9', url: '/gallery/fallen-petals.webp', title: 'Fallen Petals' },
    ],
  },
  {
    id: 'scenic-exploration', title: 'Scenic Exploration', date: 'Scenery · Ongoing',
    description: 'The quiet moments between battles — the views worth pausing for.',
    photos: [
      { id: 'p10', url: '/gallery/lantern-bridge.webp', title: 'Lantern Bridge' },
      { id: 'p11', url: '/gallery/koi-garden.webp', title: 'Koi Garden' },
    ],
  },
];

export const LEGENDS_SEED: LegendMember[] = [
  { id: 'azuretide', name: 'AzureTide', role: 'Guild Master', title: 'The Leviathan', joinDate: 'March 2022', badge: '👑', badgeLabel: 'Founder', quote: '"Every whale fall begins with a single step into the unknown."', gradient: 'from-[#1a3a5c] to-[#0a1a2e]', color: '#4dd9e8', glowColor: '#4dd9e8', initials: 'AT' },
  { id: 'crimsonveil', name: 'CrimsonVeil', role: 'PvP Commander', title: 'The Bloodtide', joinDate: 'April 2022', badge: '⚔️', badgeLabel: 'PvP Legend', quote: '"In the chaos of battle, find the silence of purpose."', gradient: 'from-[#3a1a1a] to-[#1a0a0a]', color: '#e84d4d', glowColor: '#e84d4d', initials: 'CV' },
  { id: 'lunarpetal', name: 'LunarPetal', role: 'Event Coordinator', title: 'The Starweaver', joinDate: 'June 2022', badge: '🌙', badgeLabel: 'Event Maestro', quote: '"A guild lives through the events that bring hearts together."', gradient: 'from-[#2a1a3a] to-[#1a0a2e]', color: '#c9a84c', glowColor: '#a78bfa', initials: 'LP' },
  { id: 'ironserpent', name: 'IronSerpent', role: 'PvE Raid Leader', title: 'The Dungeon Diver', joinDate: 'August 2022', badge: '🐉', badgeLabel: 'Raid Master', quote: '"No boss lives through three wipes. On the fourth, we feast."', gradient: 'from-[#1a2a1a] to-[#0a1a0a]', color: '#4de890', glowColor: '#4de890', initials: 'IS' },
  { id: 'mistyarrow', name: 'MistyArrow', role: 'Photography Captain', title: 'The Chronicler', joinDate: 'January 2023', badge: '📸', badgeLabel: 'Memory Keeper', quote: '"Every screenshot is a moment that deserves to live forever."', gradient: 'from-[#1a3a5c] to-[#0a2a4c]', color: '#4dd9e8', glowColor: '#4dd9e8', initials: 'MA' },
  { id: 'thunderkoi', name: 'ThunderKoi', role: 'Recruitment Officer', title: 'The Harbor Master', joinDate: 'March 2023', badge: '🎯', badgeLabel: 'Top Recruiter', quote: '"A guild is only as strong as the bonds between its people."', gradient: 'from-[#3a2a1a] to-[#1a1a0a]', color: '#e8a84d', glowColor: '#e8a84d', initials: 'TK' },
];

export const MONTAGES_SEED: MontageCategory[] = [
  {
    id: 'gameplay', title: 'Gameplay Trailers', description: 'Combat, exploration, and the world of Where Winds Meet in motion.',
    videos: [
      { id: 'v1', title: 'Official Gameplay Trailer', youtubeId: 'e8S4yoXNMPU', views: '12.4K', likes: '847' },
      { id: 'v3', title: 'Open World Gameplay Trailer', youtubeId: 'gyjHNix6x9E', views: '18.7K', likes: '1.2K' },
      { id: 'v4', title: 'Heng Blade Gameplay Trailer', youtubeId: 'd_IX82_gokE', views: '22.1K', likes: '1.8K' },
      { id: 'v5', title: 'Imperial Palace Gameplay Trailer', youtubeId: 'w9AtlAQ9UG8', views: '31.5K', likes: '2.4K' },
    ],
  },
  {
    id: 'expansions', title: 'Expansion Trailers', description: 'New regions, new stories — the major content drops since launch.',
    videos: [
      { id: 'v6', title: 'Qinchuan Hexi Expansion Trailer', youtubeId: 'MBQhCtwo9r8', views: '45.8K', likes: '3.6K' },
      { id: 'v7', title: 'Hidden Mountain Expansion Trailer', youtubeId: 'GsUkkYMik94', views: '8.9K', likes: '512' },
    ],
  },
  {
    id: 'launch', title: 'Launch & Cinematics', description: 'Where it all began.',
    videos: [
      { id: 'v2', title: 'Official Launch Trailer', youtubeId: 'cpY_JFJRA9Q', views: '9.2K', likes: '631' },
    ],
  },
];

export const DISCORD_SEED: DiscordConfig = {
  inviteUrl: 'https://discord.gg/whalefall',
  guildName: 'Whalefall',
  presenceCount: 47,
  memberCount: 214,
  boostLevel: 2,
  members: [
    { id: 'd1', username: 'AzureTide', status: 'online', avatarUrl: null },
    { id: 'd2', username: 'CrimsonVeil', status: 'online', avatarUrl: null },
    { id: 'd3', username: 'LunarPetal', status: 'idle', avatarUrl: null },
    { id: 'd4', username: 'IronSerpent', status: 'online', avatarUrl: null },
    { id: 'd5', username: 'MistyArrow', status: 'dnd', avatarUrl: null },
    { id: 'd6', username: 'ThunderKoi', status: 'online', avatarUrl: null },
  ],
  channels: [
    { id: 'c1', name: '🌊 general-chat' },
    { id: 'c2', name: '⚔️ pvp-strategy' },
    { id: 'c3', name: '🎙️ Raid Voice 1' },
    { id: 'c4', name: '📸 screenshots' },
  ],
  highlights: [
    { id: 'h1', tag: 'Announcement', text: 'Guild reached Top 60 SEA this season — celebration event this weekend!', time: '2h ago' },
    { id: 'h2', tag: 'Event', text: 'Saturday Raid Night — Iron Gate Siege, 8PM server time.', time: '1d ago' },
    { id: 'h3', tag: 'Recruitment', text: 'Recruitment open for PvE Raid Leader and Photography roles.', time: '3d ago' },
  ],
};

export const GUESTBOOK_SEED: GuestbookEntry[] = [
  { id: 'g1', name: 'CrimsonVeil', message: "Three years with this guild and it still feels like home. The memories we've made together are worth more than any ranking. To many more years of battles and laughter!", date: 'June 12, 2025', avatar: 'CV', color: '#e84d4d' },
  { id: 'g2', name: 'LunarPetal', message: "Every event I organise, every screenshot I take, every moment I share — it's all because of this incredible community. Whalefall is not just a guild. It's family. 鲸落万岁！", date: 'June 10, 2025', avatar: 'LP', color: '#c9a84c' },
  { id: 'g3', name: 'NewWave99', message: "Just joined last month and already feel so welcomed. Can't believe I found a guild with such amazing people. The vibes here are immaculate. Excited for what's ahead!", date: 'June 8, 2025', avatar: 'NW', color: '#4dd9e8' },
  { id: 'g4', name: 'ThunderKoi', message: "When a whale falls to the ocean floor, it becomes a sanctuary for thousands of creatures. That's exactly what this guild is — a sanctuary. Thank you, AzureTide, for everything.", date: 'June 5, 2025', avatar: 'TK', color: '#e8a84d' },
];

export const PHOTO_CONTEST_SEED: PhotoContestConfig = {
  theme: 'Depths of Wonder',
  monthLabel: 'June 2025',
  daysLeft: 12,
  description: 'Submit screenshots that capture the most breathtaking vistas in Where Winds Meet',
  photos: [
    { id: 'c1', url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&q=80', submitter: 'MistyArrow', title: 'Ocean Dreamscape', votes: 142 },
    { id: 'c2', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', submitter: 'LunarPetal', title: 'Crystal Depths', votes: 98 },
    { id: 'c3', url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80', submitter: 'ThunderKoi', title: 'Night Bloom', votes: 187 },
    { id: 'c4', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', submitter: 'IronSerpent', title: 'Forest of Serenity', votes: 73 },
  ],
};

export const SITE_SETTINGS_SEED: SiteSettings = {
  guildName: '鲸落',
  guildRank: 'Top 60 SEA',
  memberCount: '200+',
  discordInviteUrl: 'https://discord.gg/whalefall',
  navLinks: [
    { id: 'n1', label: 'Gallery', href: '/gallery' },
    { id: 'n2', label: 'Legends', href: '/legends' },
    { id: 'n3', label: 'Montages', href: '/montages' },
  ],
  footerTagline: 'TOP 60 SEA GUILD · WHERE WINDS MEET · EST. 2022',
  footerCredit: 'Developed by Macatting Studio',
  footerCopyright: '© 2026 Whalefall Guild. All memories preserved in the deep.',
};

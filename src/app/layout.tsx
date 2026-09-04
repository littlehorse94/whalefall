import type { Metadata, Viewport } from "next";
import "./globals.css";
import AudioToggle from "@/components/AudioToggle";
import { getSection } from "@/lib/blob-store";
import { MEDIA_SEED } from "@/lib/seed-data";

// Set NEXT_PUBLIC_SITE_URL in Vercel project settings once the production
// domain is final — every absolute URL below (OG images, canonical links,
// sitemap) is derived from this one place.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whalefall.vercel.app";

// Content is served from Blob storage and can change at any time via the
// admin panel, so every page needs to render per-request rather than being
// frozen into the build's static output.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "鲸落 | Whalefall Guild — Top 60 SEA Guild in Where Winds Meet",
    template: "%s | 鲸落 Whalefall",
  },
  description:
    "Whalefall (鲸落) is a Top 60 SEA gaming guild in Where Winds Meet. Some battles fade. Some memories become legends.",
  keywords: [
    "Whalefall",
    "鲸落",
    "Where Winds Meet",
    "Where Winds Meet guild",
    "Top 60 SEA guild",
    "Where Winds Meet SEA",
    "gaming guild",
  ],
  authors: [{ name: "Whalefall Guild" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "鲸落 Whalefall",
    title: "鲸落 | Whalefall Guild — Top 60 SEA Guild in Where Winds Meet",
    description:
      "A Top 60 SEA gaming guild in Where Winds Meet. Some battles fade. Some memories become legends.",
  },
  twitter: {
    card: "summary_large_image",
    title: "鲸落 | Whalefall Guild",
    description:
      "A Top 60 SEA gaming guild in Where Winds Meet. Some battles fade. Some memories become legends.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0e1a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const media = await getSection('media', MEDIA_SEED);

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#0a0e1a] text-[#e8f4f8] antialiased">
        {children}
        <AudioToggle audioUrl={media.audioUrl} labelPlaying={media.audioLabelPlaying} labelPaused={media.audioLabelPaused} />
      </body>
    </html>
  );
}

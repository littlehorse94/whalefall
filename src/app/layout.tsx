import type { Metadata } from "next";
import "./globals.css";
import AudioToggle from "@/components/AudioToggle";

export const metadata: Metadata = {
  title: "鲸落 | Whalefall Guild — Top 60 SEA Guild in Where Winds Meet",
  description: "Whalefall (鲸落) is a Top 60 SEA gaming guild in Where Winds Meet. Some battles fade. Some memories become legends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <AudioToggle />
      </body>
    </html>
  );
}

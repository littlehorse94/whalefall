import type { Metadata } from 'next';
import BirthdayPage from '@/components/birthday/BirthdayPage';

// Personal one-off page — not part of the guild site, not meant to be indexed.
export const metadata: Metadata = {
  title: { absolute: 'Happy Birthday' },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital@0;1&family=ZCOOL+XiaoWei&display=swap"
        rel="stylesheet"
      />
      <BirthdayPage />
    </>
  );
}

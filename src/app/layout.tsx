import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://youtubecreatorhub.vercel.app'),
  title: 'CreatorToolsHub — 35 Free Online YouTube Creator Tools (2026)',
  description: 'Free, lightweight workspace for YouTube creators. 35 client-side tools for thumbnail download, CTR titles, keyword research, revenue calculations, and Shorts hooks.',
  keywords: ['youtube creator tools', 'free youtube tools', 'youtube thumbnail downloader', 'youtube title generator', 'youtube earnings calculator', 'youtube seo'],
  authors: [{ name: 'CreatorToolsHub Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'CreatorToolsHub — 35 Free YouTube Creator Tools',
    description: 'Free browser-based tools for modern video creators. No signup required.',
    url: 'https://youtubecreatorhub.vercel.app',
    siteName: 'CreatorToolsHub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorToolsHub — 35 Free YouTube Creator Tools',
    description: 'Free browser-based tools for modern video creators.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0F0F12] text-[#F0F0F5] antialiased selection:bg-[#7C5CFC]/30 selection:text-[#00D4AA] min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

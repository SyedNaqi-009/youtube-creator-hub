import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CreatorToolsHub | Free Tools for Modern YouTubers',
  description: 'Learn about CreatorToolsHub, our mission to provide high quality, free creator utilities without intrusive ads, forced signups, or paywalls.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">CreatorToolsHub</span>
        </h1>
        <p className="text-base sm:text-lg text-text-muted">
          A modern, privacy-first web utility suite created by YouTubers, for YouTubers.
        </p>
      </header>

      <div className="prose prose-invert max-w-none space-y-6 text-text-muted leading-relaxed">
        <p>
          Building a sustainable YouTube channel in 2026 requires continuous data analysis, rapid iteration, and polished metadata. Unfortunately, the current landscape of creator tools is split between two extremes: expensive monthly SaaS subscriptions with mandatory browser extensions, and outdated free sites smothered in popups, redirects, and trackers.
        </p>

        <p>
          <strong>CreatorToolsHub was built to solve this problem.</strong> We believe fundamental creator utilities—such as accurate earnings calculations, thumbnail downloads, tag generation, Shorts hook ideation, and title length testing—should be completely free, lightning-fast, and respectful of your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
          <div className="p-5 bg-surface-card border border-surface-border rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-brand-purple flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-text-primary text-base">Zero Friction</h3>
            <p className="text-xs text-text-muted">No accounts to create, no email verification walls, and no paywalls after 3 usages.</p>
          </div>
          <div className="p-5 bg-surface-card border border-surface-border rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-brand-teal flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-text-primary text-base">Client-Side Privacy</h3>
            <p className="text-xs text-text-muted">Algorithms and calculations run in your local browser sandbox. Your data stays yours.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text-primary pt-4">Our Technology & Standards</h2>
        <p>
          Our platform is built on modern web standards with Next.js and Tailwind CSS, deployed on global edge networks to ensure sub-second page loads worldwide. We update our formulas, CPM benchmarks, and YouTube Shorts guidelines continuously to match YouTube’s evolving platform updates.
        </p>

        <div className="pt-6 border-t border-surface-border">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-purple hover:bg-purple-600 text-white font-bold text-sm transition"
          >
            Explore the Tools Suite
          </Link>
        </div>
      </div>
    </div>
  );
}

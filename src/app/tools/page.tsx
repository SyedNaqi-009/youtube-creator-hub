import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';
import ToolCard from '@/components/tools/ToolCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'All 35 Free YouTube Creator Tools | CreatorToolsHub',
  description: 'Browse 35 free YouTube creator utilities for SEO, analytics, monetization calculations, Shorts optimization, thumbnail downloads, and channel growth.',
  alternates: {
    canonical: 'https://youtubecreatorhub.vercel.app/tools',
  },
};

async function ToolsList({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const currentCategory = category || 'all';
  const filteredTools = currentCategory === 'all'
    ? TOOLS
    : TOOLS.filter((t) => t.category === currentCategory);

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/tools"
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            currentCategory === 'all'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'bg-surface-card border border-surface-border text-text-muted hover:text-text-primary hover:border-text-muted'
          }`}
        >
          All Tools ({TOOLS.length})
        </Link>
        {CATEGORIES.map((cat) => {
          const count = TOOLS.filter((t) => t.category === cat.id).length;
          const isActive = currentCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/tools?category=${cat.id}`}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                isActive
                  ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
                  : 'bg-surface-card border border-surface-border text-text-muted hover:text-text-primary hover:border-text-muted'
              }`}
            >
              {cat.name} ({count})
            </Link>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </>
  );
}

export default function ToolsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Tools Directory', href: '/tools' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight">
          YouTube Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">Tools Suite</span>
        </h1>
        <p className="text-text-muted text-base sm:text-lg">
          35 completely free, client-side web utilities built to accelerate your YouTube production workflow. No signups, zero limits.
        </p>
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {TOOLS.slice(0, 6).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      }>
        <ToolsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

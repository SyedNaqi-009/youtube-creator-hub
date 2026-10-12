import { Metadata } from 'next';
import { ARTICLES } from '@/data/articles';
import ArticleCard from '@/components/blog/ArticleCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'YouTube Growth Guides & Creator Playbooks | CreatorToolsHub Blog',
  description: 'In-depth educational articles covering YouTube monetization, SEO, CTR optimization, Shorts growth algorithms, and sponsorship pitching.',
  alternates: {
    canonical: 'https://youtubecreatorhub.vercel.app/blog',
  },
};

export default function BlogListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Blog & Guides', href: '/blog' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight">
          Creator Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">Playbooks</span>
        </h1>
        <p className="text-text-muted text-base sm:text-lg">
          Master the mechanics of YouTube in 2026. Actionable research, algorithm case studies, monetization benchmarks, and tactical tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

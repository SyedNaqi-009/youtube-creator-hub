import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { TOOLS } from '@/data/tools';
import { constructArticleMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ArticleCard from '@/components/blog/ArticleCard';
import ToolCard from '@/components/tools/ToolCard';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return constructArticleMetadata(article);
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedTools = TOOLS.filter((t) => article.relatedToolSlugs?.includes(t.slug));
  const relatedArticles = ARTICLES.filter((a) => article.relatedArticleSlugs?.includes(a.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'CreatorToolsHub Editorial',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CreatorToolsHub',
      url: 'https://youtubecreatorhub.vercel.app',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: article.title, href: `/blog/${article.slug}` },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted pb-6 border-b border-surface-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-purple" />
              {article.publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-teal" />
              {article.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-amber" />
              CreatorToolsHub Editorial
            </span>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-text-primary leading-relaxed">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-text-primary pt-6 pb-2 border-b border-surface-border">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-text-primary pt-4 pb-1 text-brand-purple">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').filter((l) => l.trim().startsWith('- '));
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 text-sm text-text-muted">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-sm sm:text-base text-text-muted leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Related Interactive Tools Callout */}
        {relatedTools.length > 0 && (
          <div className="p-6 bg-surface-card border border-surface-border rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-text-primary">
              Recommended Free Tools for This Strategy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="p-4 bg-surface-input border border-surface-border hover:border-brand-purple rounded-xl transition flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-bold text-text-primary group-hover:text-brand-purple transition">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-muted line-clamp-1">{t.shortDescription}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-teal group-hover:translate-x-1 transition shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-surface-border">
            <h3 className="text-xl font-bold text-text-primary">More In-Depth Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

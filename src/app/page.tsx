import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Flame, 
  TrendingUp, 
  DollarSign, 
  Video, 
  Layers,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';
import { ARTICLES } from '@/data/articles';
import ToolCard from '@/components/tools/ToolCard';
import ArticleCard from '@/components/blog/ArticleCard';

export default function HomePage() {
  const featuredTools = TOOLS.filter((t) => ['youtube-earnings-calculator', 'youtube-thumbnail-downloader', 'youtube-title-generator', 'youtube-shorts-hook-generator', 'youtube-tag-generator', 'youtube-sponsorship-calculator'].includes(t.slug)).slice(0, 6);
  const recentArticles = ARTICLES.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-purple/20 via-brand-teal/15 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-surface-border text-xs font-semibold text-brand-teal">
            <Sparkles className="w-3.5 h-3.5" />
            <span>35 High-Performance Utilities Built for 2026 YouTube Creators</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-[1.1]">
            Grow Faster with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-teal to-brand-amber">
              Modern YouTube Tools
            </span>
          </h1>

          <p className="text-text-muted text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Free, privacy-friendly creator suite. Download thumbnails, predict channel earnings, generate high-CTR titles, and master the YouTube algorithm without subscriptions.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-purple-600 text-white font-bold text-sm shadow-xl shadow-brand-purple/25 hover:opacity-95 transition"
            >
              Explore All 35 Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/youtube-earnings-calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-card border border-surface-border hover:bg-surface-border text-text-primary font-bold text-sm transition"
            >
              <DollarSign className="w-4 h-4 text-brand-teal" /> Calculate YouTube Revenue
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Free Creator Tools', value: '35 Tools' },
              { label: 'Client-Side Privacy', value: '100% Local' },
              { label: 'Registration Required', value: 'No Sign-up' },
              { label: 'Usage Limitations', value: 'Unlimited' },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-surface-card/60 backdrop-blur-sm border border-surface-border/60 rounded-xl">
                <p className="text-base sm:text-lg font-bold text-text-primary">{stat.value}</p>
                <p className="text-[11px] text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-amber uppercase tracking-wider">
              <Flame className="w-4 h-4" /> Most Popular
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary mt-1">
              Essential Tools Every Creator Uses
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs sm:text-sm font-semibold text-brand-teal hover:underline inline-flex items-center gap-1"
          >
            View all 35 tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Category Explorer Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary">
            Curated Creator Toolkits
          </h2>
          <p className="text-sm text-text-muted">
            Targeted solutions tailored for every phase of your YouTube production workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/tools?category=${cat.id}`}
                className="group p-5 bg-surface-card border border-surface-border hover:border-brand-purple/50 rounded-2xl transition flex flex-col justify-between space-y-4 hover:shadow-lg hover:shadow-brand-purple/5"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-input flex items-center justify-center text-brand-purple group-hover:scale-110 transition duration-300">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-text-primary mt-3 group-hover:text-brand-purple transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-brand-teal pt-2 border-t border-surface-border/50">
                  <span>{count} tools</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust & Differentiation Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-surface-card to-surface-input border border-surface-border rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Built Different for Real Creators
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Why thousands of YouTubers prefer CreatorToolsHub over bloated, ad-cluttered alternatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-brand-purple flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">Instant & Zero Signup</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Launch any tool and get immediate results. No credit cards, no passwords, no forced browser extension installations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-brand-teal flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">100% Client-Side Privacy</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Your video titles, scripts, revenue inputs, and thumbnails remain strictly in your browser. We never log or sell creator ideas.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-brand-amber flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">Mobile & Studio Ready</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Optimized responsive dark interface designed specifically for video editors, phone creators, and multi-monitor studio setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Guides & Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-purple uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> YouTube Academy
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary mt-1">
              Latest Growth Guides & Playbooks
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-semibold text-brand-teal hover:underline inline-flex items-center gap-1"
          >
            View all 12 articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

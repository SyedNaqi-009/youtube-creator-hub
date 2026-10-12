import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogArticle } from '@/data/articles';

export function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <article className="group flex flex-col justify-between p-6 rounded-2xl bg-[#161620] border border-[#242436] hover:border-[#7C5CFC]/70 hover:shadow-xl hover:shadow-[#7C5CFC]/10 transition-all duration-200">
      <div>
        <div className="flex items-center gap-3 text-xs text-[#9090A8] mb-3">
          <span className="px-2 py-0.5 rounded bg-[#242436] text-[#7C5CFC] font-semibold text-[10px] uppercase">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#606078]" />
            {article.readTimeMinutes} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#606078]" />
            {article.publishDate}
          </span>
        </div>

        <h2 className="text-lg font-bold text-[#F0F0F5] group-hover:text-[#7C5CFC] transition-colors leading-snug mb-3">
          <Link href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h2>

        <p className="text-xs text-[#9090A8] leading-relaxed line-clamp-3 mb-4">
          {article.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-[#242436]/60 flex items-center justify-between text-xs">
        <Link
          href={`/blog/${article.slug}`}
          className="font-semibold text-[#7C5CFC] group-hover:text-[#9B82FD] flex items-center gap-1"
        >
          <span>Read Full Guide</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[11px] text-[#606078]">
          Featured Tool: {article.primaryToolName}
        </span>
      </div>
    </article>
  );
}

export default ArticleCard;

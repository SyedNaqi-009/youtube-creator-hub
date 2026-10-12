import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ToolDefinition } from '@/data/tools';

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#161620] border border-[#242436] hover:border-[#7C5CFC]/70 hover:shadow-xl hover:shadow-[#7C5CFC]/10 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#242436] text-[#9090A8] group-hover:bg-[#7C5CFC]/20 group-hover:text-[#7C5CFC] transition-colors">
            {tool.categoryName}
          </span>
          {tool.isApiDependent && (
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#FFB547]/20 text-[#FFB547]">
              API Ready
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[#F0F0F5] group-hover:text-[#7C5CFC] transition-colors leading-snug mb-2">
          {tool.name}
        </h3>

        <p className="text-xs text-[#9090A8] leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#242436]/60 flex items-center justify-between text-xs font-medium text-[#7C5CFC] group-hover:text-[#9B82FD]">
        <span>Launch Tool</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default ToolCard;

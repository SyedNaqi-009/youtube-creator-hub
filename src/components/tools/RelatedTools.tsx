import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/data/tools';
import { ArrowRight, Wrench } from 'lucide-react';

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const tools = TOOLS.filter(t => slugs.includes(t.slug));

  if (tools.length === 0) return null;

  return (
    <section className="my-10 pt-8 border-t border-[#242436]">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5 text-[#7C5CFC]" />
        <h2 className="text-xl font-bold text-[#F0F0F5]">Related Creator Tools</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="group p-4 rounded-xl bg-[#161620] border border-[#242436] hover:border-[#7C5CFC] hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] text-[#9090A8] uppercase tracking-wider block mb-1">
                {tool.categoryName}
              </span>
              <h3 className="text-sm font-semibold text-[#F0F0F5] group-hover:text-[#7C5CFC] transition-colors mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-[#9090A8] line-clamp-2">
                {tool.shortDescription}
              </p>
            </div>
            <div className="mt-3 text-xs text-[#7C5CFC] flex items-center gap-1 font-medium">
              <span>Open tool</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;

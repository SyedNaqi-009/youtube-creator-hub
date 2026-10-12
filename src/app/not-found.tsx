import Link from 'next/link';
import { Search, Home, Wrench, FileQuestion } from 'lucide-react';
import { TOOLS } from '@/data/tools';

export default function NotFound() {
  const popularTools = TOOLS.slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#7C5CFC]/20 text-[#7C5CFC] flex items-center justify-center mb-6">
        <FileQuestion className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#F0F0F5] mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-[#9090A8] max-w-md mx-auto mb-8">
        The tool or page you are looking for does not exist or may have moved. Explore our directory of 35 free creator utilities below.
      </p>

      <div className="flex items-center justify-center gap-4 mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white font-medium text-sm hover:opacity-90 shadow-lg shadow-[#7C5CFC]/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161620] border border-[#2A2A3A] hover:border-[#7C5CFC] text-[#F0F0F5] font-medium text-sm transition-all"
        >
          <Wrench className="w-4 h-4 text-[#7C5CFC]" />
          <span>Browse All 35 Tools</span>
        </Link>
      </div>

      <div className="text-left pt-10 border-t border-[#2A2A3A]">
        <h2 className="text-base font-semibold text-[#F0F0F5] mb-4">
          Popular Tools You Might Need:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {popularTools.map((t) => (
            <Link
              key={t.id}
              href={`/tools/${t.slug}`}
              className="p-3 rounded-lg bg-[#161620] border border-[#242436] hover:border-[#7C5CFC] text-xs text-[#9090A8] hover:text-[#F0F0F5] flex items-center justify-between"
            >
              <span className="font-medium text-[#F0F0F5]">{t.name}</span>
              <span className="text-[10px] text-[#7C5CFC]">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

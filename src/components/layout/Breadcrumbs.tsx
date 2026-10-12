import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#9090A8]">
        <li>
          <Link href="/" className="hover:text-[#F0F0F5] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-[#606078]" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[#F0F0F5] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#F0F0F5] font-medium truncate max-w-[240px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

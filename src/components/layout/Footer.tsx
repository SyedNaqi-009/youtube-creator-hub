import React from 'react';
import Link from 'next/link';
import { Video, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-[#242436] bg-[#0A0A0D] text-[#8E8EA6] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C5CFC] to-[#00D4AA] flex items-center justify-center shadow-md">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-[#F0F0F5]">
                Creator<span className="text-[#7C5CFC]">Tools</span>Hub
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#9090A8]">
              The all-in-one free workspace for modern YouTube creators. 35 client-side utilities engineered for thumbnail optimization, CTR titles, keyword discovery, and revenue forecasting.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#00D4AA]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free · No Signup · Client-Side Privacy</span>
            </div>
          </div>

          {/* Column 2: Tool Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F0F0F5] mb-3">
              Tool Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/tools?category=${c.id}`}
                    className="hover:text-[#F0F0F5] hover:underline transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources & Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F0F0F5] mb-3">
              Resources & Education
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="hover:text-[#F0F0F5] transition-colors">
                  Creator Growth Blog
                </Link>
              </li>
              <li>
                <Link href="/blog/youtube-thumbnail-size-guide" className="hover:text-[#F0F0F5] transition-colors">
                  Thumbnail Size Guide (2026)
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-calculate-youtube-earnings" className="hover:text-[#F0F0F5] transition-colors">
                  YouTube Earnings Explained
                </Link>
              </li>
              <li>
                <Link href="/blog/youtube-cpm-vs-rpm" className="hover:text-[#F0F0F5] transition-colors">
                  CPM vs RPM Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/youtube-seo-checklist" className="hover:text-[#F0F0F5] transition-colors">
                  Complete SEO Checklist
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-[#F0F0F5] transition-colors">
                  Complete 35 Tools Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F0F0F5] mb-3">
              Transparency & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#F0F0F5] transition-colors">
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F0F0F5] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F0F0F5] transition-colors">
                  Privacy Policy (GDPR / CCPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F0F0F5] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#F0F0F5] transition-colors">
                  Earnings & Accuracy Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1F1F2C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#606078]">
          <p>© {currentYear} CreatorToolsHub. Built for ambitious video creators worldwide.</p>
          <p className="text-[11px]">
            YouTube is a trademark of Google LLC. CreatorToolsHub is an independent utility platform not affiliated with or endorsed by YouTube or Google.
          </p>
        </div>
      </div>
    </footer>
  );
}

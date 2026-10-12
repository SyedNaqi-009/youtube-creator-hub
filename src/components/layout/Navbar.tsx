'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, ChevronDown, Video, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { TOOLS } from '@/data/tools';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? TOOLS.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSelectTool = (slug: string) => {
    setSearchQuery('');
    setSearchFocused(false);
    setMobileMenuOpen(false);
    router.push(`/tools/${slug}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0F0F12]/90 border-b border-[#2A2A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo / Home Button */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" title="CreatorToolsHub Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C5CFC] to-[#00D4AA] flex items-center justify-center shadow-lg shadow-[#7C5CFC]/20 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-[#F0F0F5] group-hover:text-white transition-colors">
                Creator<span className="text-[#7C5CFC]">Tools</span>Hub
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#9090A8] -mt-1">
                YouTube Workspace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm font-medium text-[#9090A8] hover:text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg transition-colors"
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#9090A8] hover:text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg transition-colors"
              >
                <span>Tools (35)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-72 rounded-xl border border-[#2A2A3A] bg-[#161620] shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#2A2A3A] mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7C5CFC]">
                      Categories
                    </span>
                  </div>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/tools?category=${cat.id}`}
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#9090A8] hover:text-[#F0F0F5] hover:bg-[#1F1F2E] rounded-lg transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2A2A3A] text-[#9090A8]">
                        {cat.badge}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#2A2A3A]">
                    <Link
                      href="/tools"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="block px-3 py-1.5 text-xs text-center font-medium text-[#7C5CFC] hover:text-[#9B82FD] rounded-lg transition-colors"
                    >
                      View All 35 Tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="px-3 py-1.5 text-sm font-medium text-[#9090A8] hover:text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg transition-colors"
            >
              Guides & Blog
            </Link>

            <Link
              href="/about"
              className="px-3 py-1.5 text-sm font-medium text-[#9090A8] hover:text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Search Bar & Theme Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#9090A8] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-40 sm:w-56 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC] transition-all"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border border-[#2A2A3A] bg-[#161620] shadow-2xl p-2 z-50">
                  <div className="text-[10px] font-semibold text-[#606078] uppercase px-3 py-1">
                    Matching Tools
                  </div>
                  {searchResults.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool.slug)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1F1F2E] flex flex-col gap-0.5 transition-colors"
                    >
                      <span className="text-xs font-medium text-[#F0F0F5]">{tool.name}</span>
                      <span className="text-[10px] text-[#9090A8] truncate">{tool.shortDescription}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg border border-[#2A2A3A] text-[#9090A8] hover:text-[#F0F0F5] hover:bg-[#1A1A24]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2A2A3A] bg-[#0F0F12] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg"
          >
            Home
          </Link>
          <Link
            href="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg"
          >
            All 35 Tools Directory
          </Link>
          <div className="pl-4 space-y-1">
            {CATEGORIES.map(c => (
              <Link
                key={c.id}
                href={`/tools?category=${c.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-xs text-[#9090A8] hover:text-[#F0F0F5]"
              >
                • {c.name} ({c.badge})
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg"
          >
            Guides & Blog
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-[#F0F0F5] hover:bg-[#1A1A24] rounded-lg"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

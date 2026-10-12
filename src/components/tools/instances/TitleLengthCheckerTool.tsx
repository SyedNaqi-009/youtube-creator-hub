'use client';

import React, { useState } from 'react';
import { Type, Monitor, Smartphone, Search, AlertCircle } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function TitleLengthCheckerTool() {
  const [title, setTitle] = useState('How to Build a Full Stack Web Application from Scratch in 2026');

  const charCount = title.length;
  const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0;

  // Status threshold
  let badgeColor = 'bg-[#00D4AA]/20 text-[#00D4AA]';
  let statusText = 'Optimal Length (≤60 chars)';
  if (charCount > 70) {
    badgeColor = 'bg-[#FF5C5C]/20 text-[#FF5C5C]';
    statusText = 'Truncated on Mobile & Desktop (>70 chars)';
  } else if (charCount > 60) {
    badgeColor = 'bg-[#FFB547]/20 text-[#FFB547]';
    statusText = 'May be cut off on smaller phones (61-70 chars)';
  }

  const desktopTruncated = charCount > 70 ? `${title.slice(0, 67)}...` : title;
  const mobileTruncated = charCount > 50 ? `${title.slice(0, 48)}...` : title;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          Enter Your Prospective Video Title
        </label>
        <textarea
          rows={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type or paste your video title here..."
          className="w-full p-4 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC] leading-relaxed"
        />
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block">Characters</span>
          <span className="text-xl font-bold text-[#F0F0F5]">{charCount}</span>
          <span className="text-[10px] text-[#606078] block">Limit: 100</span>
        </div>

        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block">Words</span>
          <span className="text-xl font-bold text-[#F0F0F5]">{wordCount}</span>
          <span className="text-[10px] text-[#606078] block">Ideal: 6-10</span>
        </div>

        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center sm:col-span-2 flex flex-col justify-center items-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block mb-1">Status Rating</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}`}>
            {statusText}
          </span>
        </div>
      </div>

      {/* Live Previews */}
      <div className="space-y-4 pt-4 border-t border-[#242436]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7C5CFC]">
          Real-Time Device Truncation Previews
        </h3>

        {/* Mobile Viewport */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436]">
          <div className="flex items-center gap-1.5 text-xs text-[#9090A8] mb-2 font-medium">
            <Smartphone className="w-3.5 h-3.5 text-[#00D4AA]" />
            <span>Mobile YouTube App Feed (≈50 characters visible)</span>
          </div>
          <div className="p-3 rounded-lg bg-[#161620] border border-[#2A2A3A]">
            <p className="text-xs font-bold text-[#F0F0F5] leading-snug">
              {mobileTruncated || 'Title will appear here...'}
            </p>
            <p className="text-[10px] text-[#9090A8] mt-1">Channel Name · 12K views · 2 hours ago</p>
          </div>
        </div>

        {/* Desktop Viewport */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436]">
          <div className="flex items-center gap-1.5 text-xs text-[#9090A8] mb-2 font-medium">
            <Monitor className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>Desktop YouTube Home & Search (≈70 characters visible)</span>
          </div>
          <div className="p-3 rounded-lg bg-[#161620] border border-[#2A2A3A]">
            <p className="text-sm font-bold text-[#F0F0F5] leading-snug">
              {desktopTruncated || 'Title will appear here...'}
            </p>
            <p className="text-[11px] text-[#9090A8] mt-1">Channel Name · 142K views · 3 days ago</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton text={title} label="Copy Title" />
      </div>
    </div>
  );
}

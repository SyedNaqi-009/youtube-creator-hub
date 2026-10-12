'use client';

import React, { useState } from 'react';
import { AlignLeft, Eye, Link as LinkIcon, Hash } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function DescriptionLengthCheckerTool() {
  const [mode, setMode] = useState<'video' | 'channel'>('video');
  const [content, setContent] = useState(
    'In this complete masterclass, we dive deep into building high-converting YouTube videos. Master the algorithm, optimize click-through rate, and turn casual viewers into loyal subscribers.\n\nTimestamps:\n0:00 Intro\n2:30 Hook Strategy\n5:45 Retention Secrets\n\nFollow us: https://creatorhub.tools #YouTubeGrowth #ContentCreator'
  );

  const limit = mode === 'video' ? 5000 : 1000;
  const charCount = content.length;
  const linesCount = content ? content.split('\n').length : 0;
  const linksCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
  const hashtagCount = (content.match(/#[a-zA-Z0-9_]+/g) || []).length;

  const aboveTheFoldSnippet = content.slice(0, 200);

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('video')}
          type="button"
          className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            mode === 'video'
              ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white'
              : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
          }`}
        >
          Video Description (5,000 max)
        </button>
        <button
          onClick={() => setMode('channel')}
          type="button"
          className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            mode === 'channel'
              ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white'
              : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
          }`}
        >
          Channel About Bio (1,000 max)
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          Paste {mode === 'video' ? 'Video Description' : 'Channel About Text'}
        </label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste or write description here..."
          className="w-full p-4 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC] leading-relaxed"
        />
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block">Characters</span>
          <span className={`text-xl font-bold ${charCount > limit ? 'text-[#FF5C5C]' : 'text-[#F0F0F5]'}`}>
            {charCount}
          </span>
          <span className="text-[10px] text-[#606078] block">Limit: {limit}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block">Line Breaks</span>
          <span className="text-xl font-bold text-[#F0F0F5]">{linesCount}</span>
          <span className="text-[10px] text-[#606078] block">Lines</span>
        </div>

        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block">External Links</span>
          <span className="text-xl font-bold text-[#F0F0F5]">{linksCount}</span>
          <span className="text-[10px] text-[#606078] block">URLs Found</span>
        </div>

        <div className="p-3 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-[10px] uppercase font-semibold text-[#9090A8] block">Hashtags</span>
          <span className="text-xl font-bold text-[#F0F0F5]">{hashtagCount}</span>
          <span className="text-[10px] text-[#606078] block">Tags Found</span>
        </div>
      </div>

      {/* Above the Fold Preview */}
      <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-[#7C5CFC] font-semibold">
          <Eye className="w-4 h-4" />
          <span>Above-the-Fold Teaser Preview (First ~200 characters)</span>
        </div>
        <p className="text-xs text-[#9090A8]">
          This is the only snippet viewers see before clicking &quot;Show more&quot;. Ensure your core value and primary link are placed here:
        </p>
        <div className="p-3 rounded-lg bg-[#161620] border border-[#2A2A3A] text-xs text-[#F0F0F5] font-mono leading-relaxed">
          {aboveTheFoldSnippet}
          {content.length > 200 && <span className="text-[#7C5CFC] font-bold"> ...Show more</span>}
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton text={content} label="Copy Text" />
      </div>
    </div>
  );
}

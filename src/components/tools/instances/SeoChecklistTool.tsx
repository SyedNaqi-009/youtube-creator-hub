'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, RotateCcw, ExternalLink } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  toolSlug?: string;
  toolName?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Title
  { id: 't1', category: 'Title Optimization', label: 'Primary target keyword placed within the first 50 characters', toolSlug: 'youtube-title-length-checker', toolName: 'Check Title Length' },
  { id: 't2', category: 'Title Optimization', label: 'Compelling curiosity gap or emotional hook included', toolSlug: 'youtube-title-generator', toolName: 'Generate Titles' },
  { id: 't3', category: 'Title Optimization', label: 'Total title length is 70 characters or fewer for mobile feed visibility' },

  // Description
  { id: 'd1', category: 'Description Structure', label: 'First 2 lines (above the fold) summarize value and include primary keyword', toolSlug: 'youtube-description-length-checker', toolName: 'Check Above-the-Fold' },
  { id: 'd2', category: 'Description Structure', label: 'Structured timestamps / chapters added starting with 0:00', toolSlug: 'youtube-chapter-generator', toolName: 'Format Chapters' },
  { id: 'd3', category: 'Description Structure', label: 'Clear call to action (subscribe, playlist, or external link) present', toolSlug: 'youtube-description-generator', toolName: 'Draft Description' },
  { id: 'd4', category: 'Description Structure', label: 'FTC affiliate disclosure included if monetized links are present' },

  // Thumbnail
  { id: 'th1', category: 'Thumbnail & Visuals', label: 'Custom 1280×720 resolution thumbnail uploaded', toolSlug: 'youtube-thumbnail-size-checker', toolName: 'Audit Size' },
  { id: 'th2', category: 'Thumbnail & Visuals', label: 'High visual contrast verified for dark and light YouTube UI modes', toolSlug: 'youtube-thumbnail-preview', toolName: 'Preview UI' },
  { id: 'th3', category: 'Thumbnail & Visuals', label: 'No critical text or faces in the bottom-right timestamp badge safe zone' },

  // Tags & Hashtags
  { id: 'tg1', category: 'Tags & Hashtags', label: 'Exact match and common misspellings added in tag settings', toolSlug: 'youtube-tag-generator', toolName: 'Generate Tags' },
  { id: 'tg2', category: 'Tags & Hashtags', label: '3 to 5 relevant hashtags included at the end of the description', toolSlug: 'youtube-hashtag-generator', toolName: 'Generate Hashtags' },

  // Polish & Cards
  { id: 'p1', category: 'Player Retention & Cards', label: 'End screen elements added linking to a relevant video or playlist' },
  { id: 'p2', category: 'Player Retention & Cards', label: 'Info cards placed at key drop-off points to retain viewers' },
  { id: 'p3', category: 'Player Retention & Cards', label: 'Closed captions / subtitles uploaded or auto-captions reviewed' },

  // Community
  { id: 'c1', category: 'Engagement & Community', label: 'Engaging discussion question pinned in top comment', toolSlug: 'youtube-pinned-comment-generator', toolName: 'Draft Pinned Comment' },
  { id: 'c2', category: 'Engagement & Community', label: 'Notification bell reminder and comment hearts planned for first 2 hours' },
];

export function SeoChecklistTool() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yt_seo_checklist');
      if (saved) setCheckedIds(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    const updated = checkedIds.includes(id)
      ? checkedIds.filter(i => i !== id)
      : [...checkedIds, id];
    setCheckedIds(updated);
    try {
      localStorage.setItem('yt_seo_checklist', JSON.stringify(updated));
    } catch {}
  };

  const resetAll = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem('yt_seo_checklist');
    } catch {}
  };

  const progressPercent = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  const categories = Array.from(new Set(CHECKLIST_ITEMS.map(i => i.category)));

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="p-5 rounded-xl bg-[#12121A] border border-[#242436] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-1">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#F0F0F5]">Optimization Score</span>
            <span className="font-bold text-[#7C5CFC]">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#161620] overflow-hidden border border-[#242436]">
            <div
              className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#00D4AA] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={resetAll}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A3A] hover:border-[#FF5C5C] text-xs text-[#9090A8] hover:text-[#FF5C5C] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Checklist</span>
        </button>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
              {cat}
            </h3>
            <div className="space-y-2">
              {CHECKLIST_ITEMS.filter(i => i.category === cat).map((item) => {
                const isChecked = checkedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-[#12121A] border-[#00D4AA]/40 text-[#F0F0F5]'
                        : 'bg-[#161620] border-[#242436] text-[#9090A8] hover:border-[#3E3E52]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isChecked ? 'bg-[#00D4AA] border-[#00D4AA]' : 'border-[#2A2A3A] bg-[#12121A]'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F12]" />}
                      </div>
                      <span className={`text-xs sm:text-sm ${isChecked ? 'line-through text-[#606078]' : ''}`}>
                        {item.label}
                      </span>
                    </div>

                    {item.toolSlug && (
                      <Link
                        href={`/tools/${item.toolSlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 text-[10px] text-[#7C5CFC] hover:underline flex items-center gap-1 font-medium bg-[#7C5CFC]/10 px-2 py-1 rounded"
                      >
                        <span>{item.toolName}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

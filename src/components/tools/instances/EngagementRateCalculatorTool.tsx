'use client';

import React, { useState } from 'react';
import { calculateEngagementRate } from '@/lib/tool-logic';
import { ThumbsUp, MessageSquare, Share2, Eye, Award } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function EngagementRateCalculatorTool() {
  const [views, setViews] = useState(50000);
  const [likes, setLikes] = useState(2400);
  const [comments, setComments] = useState(310);
  const [shares, setShares] = useState(120);

  const stats = calculateEngagementRate(views, likes, comments, shares);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Total Views *
          </label>
          <input
            type="number"
            min={1}
            value={views}
            onChange={(e) => setViews(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Total Likes *
          </label>
          <input
            type="number"
            min={0}
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Comments *
          </label>
          <input
            type="number"
            min={0}
            value={comments}
            onChange={(e) => setComments(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Shares (Optional)
          </label>
          <input
            type="number"
            min={0}
            value={shares}
            onChange={(e) => setShares(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      {/* Engagement Results Display */}
      <div className="p-6 rounded-2xl bg-[#12121A] border border-[#242436] space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#242436]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9090A8] block">
              Calculated Engagement Rate
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-[#F0F0F5] font-mono">
                {stats.rate}%
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                stats.badgeColor === 'teal' ? 'bg-[#00D4AA]/20 text-[#00D4AA]' :
                stats.badgeColor === 'purple' ? 'bg-[#7C5CFC]/20 text-[#7C5CFC]' :
                stats.badgeColor === 'amber' ? 'bg-[#FFB547]/20 text-[#FFB547]' :
                'bg-[#FF5C5C]/20 text-[#FF5C5C]'
              }`}>
                {stats.benchmark}
              </span>
            </div>
          </div>

          <CopyButton text={`Engagement Rate: ${stats.rate}% (${stats.benchmark})`} label="Copy Result" />
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-[#161620] border border-[#242436] flex items-center justify-between">
            <span className="text-xs text-[#9090A8] flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-[#7C5CFC]" />
              <span>Like-to-View Ratio</span>
            </span>
            <span className="text-sm font-bold text-[#F0F0F5] font-mono">{stats.likeRatio}%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161620] border border-[#242436] flex items-center justify-between">
            <span className="text-xs text-[#9090A8] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#00D4AA]" />
              <span>Comment-to-View Ratio</span>
            </span>
            <span className="text-sm font-bold text-[#F0F0F5] font-mono">{stats.commentRatio}%</span>
          </div>
        </div>

        {/* Formula Transparency */}
        <div className="p-3 rounded-lg bg-[#161620] text-xs font-mono text-[#9090A8]">
          Formula: ((Likes + Comments + Shares) / Total Views) × 100 = (({likes} + {comments} + {shares}) / {views}) × 100 = {stats.rate}%
        </div>
      </div>
    </div>
  );
}

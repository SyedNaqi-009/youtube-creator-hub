'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function WatchTimeCalculatorTool() {
  const [durationMinutes, setDurationMinutes] = useState(4);
  const [durationSeconds, setDurationSeconds] = useState(30);
  const [views, setViews] = useState(15000);

  const totalMinutes = (durationMinutes + durationSeconds / 60) * views;
  const totalWatchHours = Math.round(totalMinutes / 60);

  const yppGoal = 4000;
  const percentComplete = Math.min(100, Math.round((totalWatchHours / yppGoal) * 100));

  // Required daily views to reach 4000 in 90 days
  const remainingHours = Math.max(0, yppGoal - totalWatchHours);
  const remainingMinutes = remainingHours * 60;
  const avgDurationInMinutes = durationMinutes + durationSeconds / 60;
  const neededViewsTotal = avgDurationInMinutes > 0 ? Math.round(remainingMinutes / avgDurationInMinutes) : 0;
  const dailyViewsNeeded = Math.round(neededViewsTotal / 90);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Avg View Duration (Mins)
          </label>
          <input
            type="number"
            min={0}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Avg View Duration (Secs)
          </label>
          <input
            type="number"
            min={0}
            max={59}
            value={durationSeconds}
            onChange={(e) => setDurationSeconds(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Accumulated Total Views
          </label>
          <input
            type="number"
            min={1}
            value={views}
            onChange={(e) => setViews(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs uppercase font-semibold text-[#9090A8] block mb-1">
            Total Watch Hours
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#7C5CFC] font-mono">
            {formatNumber(totalWatchHours)} hrs
          </span>
          <span className="text-[11px] text-[#606078] block mt-1">
            ≈ {formatNumber(Math.round(totalMinutes))} total minutes
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs uppercase font-semibold text-[#00D4AA] block mb-1">
            YPP 4,000 Hour Progress
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#00D4AA] font-mono">
            {percentComplete}%
          </span>
          <div className="w-full h-2 rounded-full bg-[#161620] mt-3 overflow-hidden">
            <div className="h-full bg-[#00D4AA] transition-all" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
      </div>

      {/* Target Roadmap */}
      {remainingHours > 0 && (
        <div className="p-4 rounded-xl bg-[#161620] border border-[#242436] flex items-start gap-3 text-xs text-[#9090A8]">
          <TrendingUp className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
          <p>
            You need <strong className="text-[#F0F0F5]">{formatNumber(remainingHours)} more watch hours</strong> to reach the 4,000 threshold. At your current view duration of {durationMinutes}m {durationSeconds}s, you need approximately <strong className="text-[#00D4AA]">{formatNumber(dailyViewsNeeded)} daily views</strong> over the next 90 days.
          </p>
        </div>
      )}
    </div>
  );
}
